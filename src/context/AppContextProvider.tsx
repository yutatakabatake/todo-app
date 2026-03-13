import { createContext, useState } from 'react'
import dayjs from 'dayjs'
import type { ProjectType, TaskType, TimeSlot } from '../types/task';

const INIT_PROJECTS: ProjectType[] = [
    { id: 1, label: 'Life' },
    { id: 2, label: 'Research' },
    { id: 3, label: 'Work' },
];

const INIT_TASKS: TaskType[] = [
    {
        id: 1,
        title: 'Eat',
        projectId: 1,
        done: false,
        date: dayjs().format('YYYY/MM/DD'),
        expectedTime: 30,
        startTime: null,
        actualTime: null,
        timeSlot: 'Morning',
        isWorking: false
    },
    {
        id: 2,
        title: 'Run',
        projectId: 1,
        done: false,
        date: dayjs().format('YYYY/MM/DD'),
        expectedTime: 60,
        startTime: null,
        actualTime: null,
        timeSlot: 'Evening',
        isWorking: false
    },
    {
        id: 3,
        title: 'Coding',
        projectId: 2,
        done: false,
        date: dayjs().format('YYYY/MM/DD'),
        expectedTime: 90,
        startTime: null,
        actualTime: null,
        timeSlot: 'Night',
        isWorking: false
    },
    {
        id: 4,
        title: 'Code reading',
        projectId: 2,
        done: false,
        date: dayjs().format('YYYY/MM/DD'),
        expectedTime: 20,
        startTime: null,
        actualTime: null,
        timeSlot: 'Nothing',
        isWorking: false
    }, {
        id: 5,
        title: 'Sleep',
        projectId: 3,
        done: false,
        date: dayjs('2026/03/03').format('YYYY/MM/DD'),
        expectedTime: 15,
        startTime: null,
        actualTime: null,
        timeSlot: 'Morning',
        isWorking: false
    },
];

type AppContextType = {
    tasks: TaskType[]
    projects: ProjectType[]
    handleAddTask: (
        title: TaskType['title'],
        projectId: TaskType['projectId'],
        date: TaskType['date'],
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
}

type Props = {
    children: React.ReactNode
}

export const AppContext = createContext<AppContextType | null>(null);

export default function AppContextProvider(props: Props) {
    const { children } = props;
    const [tasks, setTasks] = useState<TaskType[]>(INIT_TASKS);
    const [projects, setProjects] = useState<ProjectType[]>(INIT_PROJECTS);

    function handleAddTask(
        title: TaskType['title'],
        projectId: TaskType['projectId'],
        date: TaskType['date'],
        expectedTime: TaskType['expectedTime'],
        timeSlot: TimeSlot
    ) {
        const newTask: TaskType = {
            id: tasks.length + 1,
            title: title,
            projectId: projectId,
            done: false,
            date: date,
            expectedTime: expectedTime,
            startTime: null,
            actualTime: null,
            timeSlot: timeSlot,
            isWorking: false
        };
        setTasks([...tasks, newTask]);
    }

    function handleDeleteTask(id: TaskType['id']) {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    }

    function handleDoneTask(id: TaskType['id']) {
        const newTasks = tasks.map(task => (task.id === id ? { ...task, done: !task.done } : task));
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

    return (
        <AppContext value={{ tasks, projects, handleAddTask, handleDeleteTask, handleDoneTask, handleEditTask, handleStart, handleStop, handleAddProject }}>
            {children}
        </ AppContext>
    );
}