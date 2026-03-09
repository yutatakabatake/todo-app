import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NumberField from './NumberField';

type Props = {
    open: boolean
    isEditing: boolean
    taskTitle: string
    handleClose: () => void
}

export default function FormDialog(props: Props) {
    const { open, isEditing, taskTitle, handleClose } = props;

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('edit');
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEditing ? 'Edit task' : 'Add new task'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="subscription-form">
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <TextField
                                required
                                id="title"
                                label="Title"
                                className='space-y-2'
                                defaultValue={isEditing ? taskTitle : ''} />
                        </div>

                        <div className='space-y-2'>
                            <FormControl fullWidth>
                                <InputLabel id="project">Project</InputLabel>
                                <Select
                                    labelId="project"
                                    id="project"
                                    // value={age}
                                    label="Project"
                                // onChange={}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className='space-y-2'>
                            <FormControl fullWidth>
                                <InputLabel id="timeSlot">Time slot</InputLabel>
                                <Select
                                    labelId="timeSlot"
                                    id="timeSlot"
                                    label="timeSlot"
                                    defaultValue={'Nothing'} >
                                    <MenuItem value={'Morning'}>Morning</MenuItem>
                                    <MenuItem value={'Evening'}>Evening</MenuItem>
                                    <MenuItem value={'Night'}>Night</MenuItem>
                                    <MenuItem value={'Nothing'}>Nothing</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className='space-y-2'>
                            <NumberField label="Number Spinner" />
                        </div>
                    </div>
                </form>
            </DialogContent >
            <DialogActions>
                {isEditing &&
                    <div className='left-0'>
                        <Button
                            color='error'
                            onClick={() => alert('delete')}>
                            Delete
                        </Button>
                    </div>}
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" form="subscription-form">
                    {isEditing ? 'Edit' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog >
    );
}