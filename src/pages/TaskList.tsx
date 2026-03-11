import Button from '@mui/material/Button';
import Table from "../components/Table";
import FormDialog from "../components/FormDialog";
import { useState } from 'react';
import dayjs from 'dayjs'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export type TimeSlot = 'Morning' | 'Evening' | 'Night' | 'Nothing'
export type Filter = 'today' | 'expired'
export type TaskType = {
    id: number
    title: string
    project: string | null
    done: boolean
    date: string
    expectedTime: number
    startTime: dayjs.Dayjs | null
    actualTime: number | null
    timeSlot: TimeSlot
    isWorking: boolean
}

const INIT_TASKS: TaskType[] = [
    {
        id: 1,
        title: 'Eat',
        project: 'Life',
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
        project: 'Life',
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
        project: 'Research',
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
        project: null,
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
        project: null,
        done: false,
        date: dayjs('2026/03/03').format('YYYY/MM/DD'),
        expectedTime: 15,
        startTime: null,
        actualTime: null,
        timeSlot: 'Morning',
        isWorking: false
    },
];

function TaskList() {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTask, setEditingTask] = useState<TaskType | undefined>();
    const [filter, setFilter] = useState<Filter>('today');
    const [tasks, setTasks] = useState(INIT_TASKS);

    function handleClickNew() {
        setIsEditing(false);
        setOpen(!open);
    }

    function handleClickEdit(e: React.ChangeEvent<HTMLInputElement>) {
        const nowEditingTaskId = parseInt((e.currentTarget.parentNode?.parentNode as HTMLElement)?.dataset.id?.toString() ?? '');
        const nowEditingTask = tasks.find(task => task.id === nowEditingTaskId);

        setEditingTask(nowEditingTask);
        setOpen(!open);
        setIsEditing(true);
    }

    function handleClose() {
        setOpen(!open);
    }

    function handleFilterChange(event: React.MouseEvent<HTMLElement>, filter: Filter) {
        setFilter(filter);
    };

    function handleAddTask(
        title: TaskType['title'],
        project: TaskType['project'],
        date: TaskType['date'],
        expectedTime: TaskType['expectedTime'],
        timeSlot: TimeSlot
    ) {
        const newTask: TaskType = {
            id: tasks.length + 1,
            title: title,
            project: project,
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
        newProject: TaskType['project'],
        newDate: TaskType['date'],
        newExpectedTime: TaskType['expectedTime'],
        newTimeSlot: TimeSlot
    ) {
        const newTasks = tasks.map(task => (task.id === editingTask?.id ?
            {
                ...task,
                title: newTitle,
                project: newProject,
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

    return (
        <>
            <div className="border-b px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">TaskList</h2>
                        <p className="text-gray-600">{tasks.filter(task => !task.done).length} pending tasks</p>
                    </div>
                    <div className='flex gap-6'>
                        <ToggleButtonGroup
                            exclusive
                            value={filter}
                            onChange={handleFilterChange}>
                            <ToggleButton value="today" aria-label="today">
                                today
                            </ToggleButton>
                            <ToggleButton value="expired" aria-label="expired">
                                expired
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <Button
                            variant='contained'
                            color='success'
                            onClick={handleClickNew}>
                            new
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
                {filter === 'today' &&
                    <div className="max-w-6xl mx-auto space-y-6">
                        <Table
                            timeSlot='Morning'
                            handleClickEdit={handleClickEdit}
                            tasks={tasks.filter(task => task.timeSlot === 'Morning' && task.date === dayjs().format('YYYY/MM/DD'))}
                            handleDoneTask={handleDoneTask}
                            handleStart={handleStart}
                            handleStop={handleStop} />
                        <Table
                            timeSlot='Evening'
                            handleClickEdit={handleClickEdit}
                            tasks={tasks.filter(task => task.timeSlot === 'Evening' && task.date === dayjs().format('YYYY/MM/DD'))}
                            handleDoneTask={handleDoneTask}
                            handleStart={handleStart}
                            handleStop={handleStop} />
                        <Table
                            timeSlot='Night'
                            handleClickEdit={handleClickEdit}
                            tasks={tasks.filter(task => task.timeSlot === 'Night' && task.date === dayjs().format('YYYY/MM/DD'))}
                            handleDoneTask={handleDoneTask}
                            handleStart={handleStart}
                            handleStop={handleStop} />
                        <Table
                            timeSlot='Nothing'
                            handleClickEdit={handleClickEdit}
                            tasks={tasks.filter(task => task.timeSlot === 'Nothing' && task.date === dayjs().format('YYYY/MM/DD'))}
                            handleDoneTask={handleDoneTask}
                            handleStart={handleStart}
                            handleStop={handleStop} />
                    </div>}
                {filter === 'expired' &&
                    <div className="max-w-6xl mx-auto space-y-6">
                        <Table
                            timeSlot='Nothing'
                            handleClickEdit={handleClickEdit}
                            tasks={tasks.filter(task => task.date !== dayjs().format('YYYY/MM/DD'))}
                            handleDoneTask={handleDoneTask}
                            handleStart={handleStart}
                            handleStop={handleStop} />
                    </div>}
            </div>
            <FormDialog
                open={open}
                isEditing={isEditing}
                editingTask={editingTask}
                handleClose={handleClose}
                handleAddTask={handleAddTask}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask} />
        </>
    )
}

export default TaskList