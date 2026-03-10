import Button from '@mui/material/Button';
import Table from "../components/Table";
import FormDialog from "../components/FormDialog";
import { useState } from 'react';

export type TimeSlot = 'Morning' | 'Evening' | 'Night' | 'Nothing'
export type TaskType = {
    id: number
    title: string
    project: string | null
    done: boolean
    date: string
    expectedTime: number
    actualTime: number | null
    timeSlot: TimeSlot
    isWorking: boolean
}

const INIT_TASKS: TaskType[] = [
    {
        id: 0,
        title: 'Eat',
        project: 'Life',
        done: false,
        date: '2026/03/06',
        expectedTime: 30,
        actualTime: null,
        timeSlot: 'Morning',
        isWorking: false
    },
    {
        id: 1,
        title: 'Run',
        project: 'Life',
        done: false,
        date: '2026/03/06',
        expectedTime: 60,
        actualTime: null,
        timeSlot: 'Evening',
        isWorking: false
    },
    {
        id: 2,
        title: 'Coding',
        project: 'Research',
        done: false,
        date: '2026/03/06',
        expectedTime: 90,
        actualTime: null,
        timeSlot: 'Night',
        isWorking: false
    },
    {
        id: 3,
        title: 'Code reading',
        project: null,
        done: false,
        date: '2026/03/06',
        expectedTime: 20,
        actualTime: null,
        timeSlot: 'Nothing',
        isWorking: false
    },
];

function TaskList() {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTaskTitle, setEditingTaskTitle] = useState('');
    const [filter, setFilter] = useState('today');
    const [tasks, setTasks] = useState(INIT_TASKS);

    function handleClickNew() {
        setIsEditing(false);
        setOpen(!open);
    }

    function handleClickEdit(e: React.ChangeEvent<HTMLInputElement>) {
        const title = e.target.parentNode?.parentNode?.querySelector('.title')?.textContent || '';
        setEditingTaskTitle(title);
        setOpen(!open);
        setIsEditing(true);
    }

    function handleClose() {
        setOpen(!open);
    }

    function handleClilckToday() {
        setFilter('today');
    }

    function handleClilckExpired() {
        setFilter('expired');
    }

    function handleAddTask(
        title: TaskType['title'],
        project: TaskType['project'],
        date: TaskType['date'],
        expectedTime: TaskType['expectedTime'],
        timeSlot: TimeSlot) {
        const newTask: TaskType = {
            id: tasks.length,
            title: title,
            project: project,
            done: false,
            date: date,
            expectedTime: expectedTime,
            actualTime: null,
            timeSlot: timeSlot,
            isWorking: false
        };
        setTasks([...tasks, newTask]);
    }


    return (
        <>
            <div className="border-b px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">TaskList</h2>
                        <p className="text-gray-600">X pending tasks</p>
                    </div>
                    <div className='flex gap-6'>
                        <div className='flex gap-2'>
                            <Button
                                variant={filter === 'today' ? 'contained' : 'outlined'}
                                onClick={handleClilckToday}>
                                today
                            </Button>
                            <Button
                                variant={filter === 'expired' ? 'contained' : 'outlined'}
                                onClick={handleClilckExpired}>
                                expired
                            </Button>
                        </div>
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
                        <Table timeSlot='Morning' handleClickEdit={handleClickEdit} tasks={tasks.filter(task => task.timeSlot === 'Morning')} />
                        <Table timeSlot='Evening' handleClickEdit={handleClickEdit} tasks={tasks.filter(task => task.timeSlot === 'Evening')} />
                        <Table timeSlot='Night' handleClickEdit={handleClickEdit} tasks={tasks.filter(task => task.timeSlot === 'Night')} />
                        <Table timeSlot='Nothing' handleClickEdit={handleClickEdit} tasks={tasks.filter(task => task.timeSlot === 'Nothing')} />
                    </div>}
                {filter === 'expired' &&
                    <div className="max-w-6xl mx-auto space-y-6">
                        <Table timeSlot='Nothing' handleClickEdit={handleClickEdit} tasks={tasks} />
                    </div>}
            </div>
            <FormDialog
                open={open}
                isEditing={isEditing}
                taskTitle={editingTaskTitle}
                handleClose={handleClose}
                handleAddTask={handleAddTask} />
        </>
    )
}

export default TaskList