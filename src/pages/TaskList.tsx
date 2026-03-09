import Button from '@mui/material/Button';
import Table from "../components/Table";
import FormDialog from "../components/FormDialog";
import { useState } from 'react';


function TaskList() {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    function handleClickNew() {
        setIsEditing(false);
        setOpen(!open);
    }

    function handleClickEdit() {
        setOpen(!open);
        setIsEditing(true);
    }

    function handleClose() {
        setOpen(!open);
    }

    return (
        <>
            <div className="border-b px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">TaskList</h2>
                        <p className="text-gray-600">X pending tasks</p>
                    </div>
                    <div>
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
                    <Table category='Morning' handleClickEdit={handleClickEdit} />
                    <Table category='Evening' handleClickEdit={handleClickEdit} />
                    <Table category='Night' handleClickEdit={handleClickEdit} />
                    <Table category='Nothing' handleClickEdit={handleClickEdit} />
                </div>
            </div>
            <FormDialog
                open={open}
                isEditing={isEditing}
                handleClose={handleClose} />
        </>
    )
}

export default TaskList