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
        projectId: TaskType['project_id'],
        expectedTime: TaskType['expected_time'],
        timeSlot: TimeSlot
    ) => void
    handleDeleteTask: (id: TaskType['id']) => void
    handleDoneTask: (id: TaskType['id']) => void
    handleEditTask: (
        editingTask: TaskType | undefined,
        newTitle: TaskType['title'],
        newProjectId: TaskType['project_id'],
        newExpectedTime: TaskType['expected_time'],
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
        project_id: TaskType['project_id'],
        expected_time: TaskType['expected_time'],
        time_slot: TimeSlot
    ) {
        try {
            const response = await axios.post('http://localhost:3000/api/tasks', {
                title: title,
                project_id: project_id,
                expected_time: expected_time,
                time_slot: time_slot
            });
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding item', error);
        }
    }

    async function handleDeleteTask(id: TaskType['id']) {
        try {
            await axios.delete(`http://localhost:3000/api/tasks/${id}`);
            const newTasks = tasks.filter(task => task.id !== id);
            setTasks(newTasks);
        } catch (error) {
            console.error('Error deleting item', error);
        }
    }

    async function handleDoneTask(id: TaskType['id']) {
        try {
            const response = await axios.put(`http://localhost:3000/api/tasks/done/${id}`);
            const newTasks = tasks.map(task => (task.id === id ? response.data : task));
            setTasks(newTasks);
        } catch (error) {
            console.error('Error checking item', error);
        }
    }

    async function handleEditTask(
        editingTask: TaskType | undefined,
        newTitle: TaskType['title'],
        newProjectId: TaskType['project_id'],
        newExpectedTime: TaskType['expected_time'],
        newTimeSlot: TimeSlot
    ) {
        try {
            const newTaskData = {
                title: newTitle,
                project_id: newProjectId,
                expected_time: newExpectedTime,
                time_slot: newTimeSlot
            }
            const response = await axios.put(`http://localhost:3000/api/tasks/${editingTask?.id}`, newTaskData);
            const newTasks = tasks.map(task => (task.id === editingTask?.id ? response.data : task));
            setTasks(newTasks);
        } catch (error) {
            console.error('Error editing item', error);
        }
    }

    async function handleStart(id: TaskType['id']) {
        try {
            const response = await axios.put(`http://localhost:3000/api/tasks/start/${id}`);
            const updatedTaskFromServer = response.data;
            const formattedTask: TaskType = {
                ...updatedTaskFromServer,
                // 文字列を dayjs オブジェクトに変換。null の場合は null のままにする
                start_time: updatedTaskFromServer.start_time ? dayjs(updatedTaskFromServer.start_time) : null
            };
            const newTasks = tasks.map(task => (task.id === id ? formattedTask : task));
            setTasks(newTasks);
        } catch (error) {
            console.error('Error editing item', error);
        }
    }

    function handleStop(id: TaskType['id']) {
        const now = dayjs();
        const startTime = tasks.find(task => task.id === id)?.start_time;
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
        const newTasks = tasks.filter(task => task.project_id !== id);
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