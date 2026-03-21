import axios from 'axios';
import { createContext, useState, useEffect } from 'react'
import dayjs from 'dayjs'
import type { ProjectType, TaskType, TimeSlot } from '../types/task';

const INIT_PROJECTS: ProjectType[] = [
    { id: 1, label: 'Life' },
    { id: 2, label: 'Research' },
    { id: 3, label: 'Work' },
];

type AppContextType = {
    tasks: TaskType[]
    projects: ProjectType[]
    handleAddTask: (
        title: TaskType['title'],
        projectId: TaskType['projectId'],
        expectedTime: TaskType['expectedTime'],
        timeSlot: TimeSlot
    ) => void
    handleDeleteTask: (id: TaskType['id']) => void
    handleDoneTask: (id: TaskType['id']) => void
    handleEditTask: (
        editingTask: TaskType | undefined,
        newTitle: TaskType['title'],
        newProjectId: TaskType['projectId'],
        newDate: TaskType['date'],
        newExpectedTime: TaskType['expectedTime'],
        newTimeSlot: TimeSlot
    ) => void
    handleStart: (id: TaskType['id']) => void
    handleStop: (id: TaskType['id']) => void
    handleAddProject: (projectLabel: ProjectType['label']) => void
    handleDeleteProject: (id: ProjectType['id']) => void
    handleEditProject: (
        editingProject: ProjectType,
        label: ProjectType['label']
    ) => void
}

type Props = {
    children: React.ReactNode
}

export const AppContext = createContext<AppContextType | null>(null);

export default function AppContextProvider(props: Props) {
    const { children } = props;
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [projects, setProjects] = useState<ProjectType[]>(INIT_PROJECTS);

    useEffect(() => {
        let ignore = false;
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/tasks');
                if (!ignore) {
                    setTasks(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

        return () => {
            ignore = true;
        };
    }, []);

    async function handleAddTask(
        title: TaskType['title'],
        projectId: TaskType['projectId'],
        expectedTime: TaskType['expectedTime'],
        timeSlot: TimeSlot
    ) {
        try {
            const response = await axios.post('http://localhost:3000/api/tasks', {
                title: title,
                project_id: projectId,
                expected_time: expectedTime,
                time_slot: timeSlot
            });
            console.log('Item added successfully', response.data);
            // setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding item', error);
        }
    }

    function handleDeleteTask(id: TaskType['id']) {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    }

    function handleDoneTask(id: TaskType['id']) {
        const newTasks = tasks.map(task => (task.id === id ? { ...task, done: !task.done, actualTime: task.actualTime ?? 0 } : task));
        setTasks(newTasks);
    }

    function handleEditTask(
        editingTask: TaskType | undefined,
        newTitle: TaskType['title'],
        newProjectId: TaskType['projectId'],
        newDate: TaskType['date'],
        newExpectedTime: TaskType['expectedTime'],
        newTimeSlot: TimeSlot
    ) {
        const newTasks = tasks.map(task => (task.id === editingTask?.id ?
            {
                ...task,
                title: newTitle,
                projectId: newProjectId,
                date: newDate,
                expectedTime: newExpectedTime,
                timeSlot: newTimeSlot
            } :
            task));
        setTasks(newTasks);
    }

    function handleStart(id: TaskType['id']) {
        const now = dayjs();
        const newTasks = tasks.map(task => (task.id === id ? { ...task, startTime: now, isWorking: true } : task));
        setTasks(newTasks);
    }

    function handleStop(id: TaskType['id']) {
        const now = dayjs();
        const startTime = tasks.find(task => task.id === id)?.startTime;
        const diff = now.diff(startTime, 'minutes');
        const newTasks = tasks.map(task => (task.id === id ? { ...task, done: true, actualTime: diff, isWorking: false } : task));
        setTasks(newTasks);
    }

    function handleAddProject(projectLabel: ProjectType['label']) {
        const newProject: ProjectType = {
            id: projects.length + 1,
            label: projectLabel
        };
        const newProjects: ProjectType[] = [...projects, newProject];
        setProjects(newProjects);
    }

    function handleDeleteProject(id: ProjectType['id']) {
        const newProjects = projects.filter(project => project.id !== id);
        setProjects(newProjects);

        // delete tasks in deleted project
        const newTasks = tasks.filter(task => task.projectId !== id);
        setTasks(newTasks);
    }

    function handleEditProject(
        editingProject: ProjectType,
        label: ProjectType['label']
    ) {
        const newProjects = projects.map(project =>
        (project.id === editingProject.id ?
            { ...project, label: label } : project));

        setProjects(newProjects);
    }

    return (
        <AppContext value={{ tasks, projects, handleAddTask, handleDeleteTask, handleDoneTask, handleEditTask, handleStart, handleStop, handleAddProject, handleDeleteProject, handleEditProject }}>
            {children}
        </ AppContext>
    );
}