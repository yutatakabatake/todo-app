import Button from '@mui/material/Button';
import Table from "../components/Table";
import FormDialog from "../components/FormDialog";
import { useState } from 'react';
import dayjs from 'dayjs'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { Filter, TaskType } from '../types/task';
import { useContext } from 'react';
import { AppContext } from '../context/AppContextProvider';

function TaskList() {
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }
    const { tasks } = context;
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTask, setEditingTask] = useState<TaskType | undefined>();
    const [filter, setFilter] = useState<Filter>('today');

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

    function handleFilterChange(_: any, filter: Filter) {
        setFilter(filter);
    };

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
                            tasks={tasks.filter(task => task.timeSlot === 'Morning' && task.date === dayjs().format('YYYY/MM/DD'))} />
                        <Table
                            timeSlot='Evening'
                            handleClickEdit={handleClickEdit}
                            tasks={tasks.filter(task => task.timeSlot === 'Evening' && task.date === dayjs().format('YYYY/MM/DD'))} />
                        <Table
                            timeSlot='Night'
                            handleClickEdit={handleClickEdit}
                            tasks={tasks.filter(task => task.timeSlot === 'Night' && task.date === dayjs().format('YYYY/MM/DD'))} />
                        <Table
                            timeSlot='Nothing'
                            handleClickEdit={handleClickEdit}
                            tasks={tasks.filter(task => task.timeSlot === 'Nothing' && task.date === dayjs().format('YYYY/MM/DD'))} />
                    </div>}
                {filter === 'expired' &&
                    <div className="max-w-6xl mx-auto space-y-6">
                        <Table
                            timeSlot='Nothing'
                            handleClickEdit={handleClickEdit}
                            tasks={tasks.filter(task => task.date !== dayjs().format('YYYY/MM/DD'))} />
                    </div>}
            </div>
            <FormDialog
                open={open}
                isEditing={isEditing}
                editingTask={editingTask}
                handleClose={handleClose} />
        </>
    )
}

export default TaskList