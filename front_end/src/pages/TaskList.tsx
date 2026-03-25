import Button from '@mui/material/Button';
import Table from "../components/Table";
import { useState } from 'react';
import dayjs from 'dayjs'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { Filter } from '../types/task';
import { useContext } from 'react';
import { AppContext } from '../context/AppContextProvider';
import AddTaskFormDialog from '../components/AddTaskFormDialog'

function TaskList() {
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }
    const { tasks } = context;
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState<Filter>('today');

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleFilterChange(_: any, filter: Filter) {
        setFilter(filter);
    };

    const filterdTasks = tasks.filter(task => {
        if (filter === 'today') {
            return task.task_date === dayjs().format('YYYY/MM/DD');
        } else {
            return task.task_date !== dayjs().format('YYYY/MM/DD');
        }
    });
    const pendingTasks = filterdTasks.filter(task => !task.done);

    return (
        <>
            <div className="border-b border-gray-200 px-6 py-4 bg-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">TaskList</h2>
                        <p className="text-gray-600">{pendingTasks.length} pending tasks</p>
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
                            onClick={handleOpen}>
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
                            tasks={filterdTasks.filter(task => task.time_slot === 'Morning')} />
                        <Table
                            timeSlot='Evening'
                            tasks={filterdTasks.filter(task => task.time_slot === 'Evening')} />
                        <Table
                            timeSlot='Night'
                            tasks={filterdTasks.filter(task => task.time_slot === 'Night')} />
                        <Table
                            timeSlot='Nothing'
                            tasks={filterdTasks.filter(task => task.time_slot === 'Nothing')} />
                    </div>}
                {filter === 'expired' &&
                    <div className="max-w-6xl mx-auto space-y-6">
                        <Table
                            timeSlot='Nothing'
                            tasks={filterdTasks} />
                    </div>}
            </div>

            <AddTaskFormDialog
                open={open}
                handleClose={handleClose} />
        </>
    )
}

export default TaskList