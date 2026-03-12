import { createContext, useState } from 'react'
import dayjs from 'dayjs'
import type { ProjectType, TaskType, } from '../types/task';

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
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
    setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>
}

type Props = {
    children: React.ReactNode
}

export const AppContext = createContext<AppContextType | null>(null);

export default function AppContextProvider(props: Props) {
    const { children } = props;
    const [tasks, setTasks] = useState<TaskType[]>(INIT_TASKS);
    const [projects, setProjects] = useState<ProjectType[]>(INIT_PROJECTS);

    return (
        <AppContext value={{ tasks, projects, setTasks, setProjects }}>
            {children}
        </ AppContext>
    );
}