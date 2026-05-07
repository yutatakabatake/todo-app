import axios from 'axios';
import { createContext, useState, useEffect } from 'react'
import dayjs from 'dayjs'
import type { ProjectType, TaskType, TimeSlot } from '../types/task';

// Mock data for demonstration
const today = dayjs().format('YYYY/MM/DD');
const yesterday = dayjs().subtract(1, 'day').format('YYYY/MM/DD');

const MOCK_PROJECTS: ProjectType[] = [
    { id: 1, label: 'Work' },
    { id: 2, label: 'Personal' },
    { id: 3, label: 'Study' },
];

const MOCK_TASKS: TaskType[] = [
    // Morning tasks
    { id: 1, title: 'Check emails', project_id: 1, expected_time: 30, actual_time: null, time_slot: 'Morning', task_date: today, done: false, is_working: false, start_time: null, done_date: null },
    { id: 2, title: 'Team meeting', project_id: 1, expected_time: 60, actual_time: null, time_slot: 'Morning', task_date: today, done: false, is_working: true, start_time: dayjs(), done_date: null },
    { id: 3, title: 'Morning exercise', project_id: 2, expected_time: 45, actual_time: 50, time_slot: 'Morning', task_date: today, done: true, is_working: false, start_time: null, done_date: today },
    // Evening tasks
    { id: 4, title: 'Code review', project_id: 1, expected_time: 45, actual_time: null, time_slot: 'Evening', task_date: today, done: false, is_working: false, start_time: null, done_date: null },
    { id: 5, title: 'Read book', project_id: 2, expected_time: 30, actual_time: null, time_slot: 'Evening', task_date: today, done: false, is_working: false, start_time: null, done_date: null },
    // Night tasks
    { id: 6, title: 'Study React', project_id: 3, expected_time: 60, actual_time: null, time_slot: 'Night', task_date: today, done: false, is_working: false, start_time: null, done_date: null },
    { id: 7, title: 'Write journal', project_id: 2, expected_time: 15, actual_time: null, time_slot: 'Night', task_date: today, done: false, is_working: false, start_time: null, done_date: null },
    // Yesterday completed tasks (for calendar view)
    { id: 8, title: 'Project setup', project_id: 1, expected_time: 90, actual_time: 85, time_slot: 'Morning', task_date: yesterday, done: true, is_working: false, start_time: null, done_date: yesterday },
    { id: 9, title: 'TypeScript study', project_id: 3, expected_time: 60, actual_time: 55, time_slot: 'Evening', task_date: yesterday, done: true, is_working: false, start_time: null, done_date: yesterday },
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
    // Initialize with mock data for demonstration
    const [tasks, setTasks] = useState<TaskType[]>(MOCK_TASKS);
    const [projects, setProjects] = useState<ProjectType[]>(MOCK_PROJECTS);

    useEffect(() => {
        let ignore = false;
        async function fetchTasks() {
            try {
                const response = await axios.get('http://localhost:3000/api/tasks');
                if (!ignore) {
                    setTasks(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchTasks();

        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        let ignore = false;
        async function fetchProjects() {
            try {
                const response = await axios.get('http://localhost:3000/api/projects');
                if (!ignore) {
                    setProjects(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchProjects();

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

    async function handleStop(id: TaskType['id']) {
        try {
            const response = await axios.put(`http://localhost:3000/api/tasks/stop/${id}`);
            const updatedTaskFromServer = response.data;
            const formattedTask: TaskType = {
                ...updatedTaskFromServer,
                // 文字列を dayjs オブジェクトに変換
                start_time: dayjs(updatedTaskFromServer.start_time),
                done_date: dayjs(updatedTaskFromServer.done_date).format('YYYY/MM/DD')
            };
            const newTasks = tasks.map(task => (task.id === id ? formattedTask : task));
            setTasks(newTasks);
        } catch (error) {
            console.error('Error editing item', error);
        }
    }

    async function handleAddProject(projectLabel: ProjectType['label']) {
        try {
            const response = await axios.post('http://localhost:3000/api/projects', {
                label: projectLabel
            });
            setProjects([...projects, response.data]);
        } catch (error) {
            console.error('Error adding project', error);
        }
    }

    async function handleDeleteProject(id: ProjectType['id']) {
        try {
            await axios.delete(`http://localhost:3000/api/projects/${id}`);
            const newProjects = projects.filter(project => project.id !== id);
            setProjects(newProjects);

            // delete tasks in deleted project
            const newTasks = tasks.filter(task => task.project_id !== id);
            setTasks(newTasks);
        } catch (error) {
            console.error('Error deleting project', error);
        }
    }

    async function handleEditProject(
        editingProject: ProjectType,
        label: ProjectType['label']
    ) {
        try {
            const response = await axios.put(`http://localhost:3000/api/projects/${editingProject.id}`, {
                label: label
            });
            const newProjects = projects.map(project => (project.id === editingProject.id ? response.data : project));
            setProjects(newProjects);
        } catch (error) {
            console.error('Error editing project', error);
        }
    }

    return (
        <AppContext value={{ tasks, projects, handleAddTask, handleDeleteTask, handleDoneTask, handleEditTask, handleStart, handleStop, handleAddProject, handleDeleteProject, handleEditProject }}>
            {children}
        </ AppContext>
    );
}
