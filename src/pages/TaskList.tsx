import Button from '@mui/material/Button';
import Table from "../components/Table";
import FormDialog from "../components/FormDialog";
import { useState } from 'react';


function TaskList() {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTaskTitle, setEditingTaskTitle] = useState('');
    const [filter, setFilter] = useState('today');

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
                <div className="max-w-6xl mx-auto space-y-6">
                    <Table timeSlot='Morning' handleClickEdit={handleClickEdit} />
                    <Table timeSlot='Evening' handleClickEdit={handleClickEdit} />
                    <Table timeSlot='Night' handleClickEdit={handleClickEdit} />
                    <Table timeSlot='Nothing' handleClickEdit={handleClickEdit} />
                </div>
            </div>
            <FormDialog
                open={open}
                isEditing={isEditing}
                taskTitle={editingTaskTitle}
                handleClose={handleClose} />
        </>
    )
}

export default TaskList