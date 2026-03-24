import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NumberField from './NumberField';
import type { ProjectType, TaskType, TimeSlot } from '../types/task';
import { useContext } from 'react';
import { AppContext } from '../context/AppContextProvider';

type Props = {
    open: boolean
    editingTask: TaskType | undefined
    defaultProject?: ProjectType
    handleClose: () => void
}

export default function TaskFormDialog(props: Props) {
    const { open, editingTask, handleClose } = props;
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }
    const { projects, handleDeleteTask, handleEditTask } = context;

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const title: TaskType['title'] = formJson.title;
        const projectId: TaskType['project_id'] = parseInt(formJson.project);
        const timeSlot: TimeSlot = formJson.timeSlot;
        const expectedTime: TaskType['expected_time'] = parseInt(formJson.expectedTime);

        handleEditTask(editingTask, title, projectId, expectedTime, timeSlot);
        handleClose();
    }

    function handleDelete(id: TaskType['id']) {
        handleDeleteTask(id);
        handleClose();
    }

    let defaultValueProject: any = '';

    defaultValueProject = editingTask?.project_id;

    return (
        <Dialog open={open} onClose={handleClose} scroll='paper' maxWidth='sm' fullWidth={true}>
            <DialogTitle>Edit task</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="subscription-form">
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                name='title'
                                label="Title"
                                sx={{ mt: 1 }}
                                defaultValue={editingTask?.title} />
                        </div>

                        <div className='space-y-2'>
                            <FormControl fullWidth>
                                <InputLabel id="project">Project</InputLabel>
                                <Select
                                    labelId="project"
                                    id="name"
                                    name='project'
                                    label="Project"
                                    defaultValue={defaultValueProject}>
                                    {projects?.map(project => (
                                        <MenuItem key={project.id} value={project.id}>{project.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className='space-y-2'>
                            <FormControl fullWidth>
                                <InputLabel id="timeSlot">Time slot</InputLabel>
                                <Select
                                    labelId="timeSlot"
                                    id="name"
                                    name='timeSlot'
                                    label="timeSlot"
                                    defaultValue={editingTask?.time_slot} >
                                    <MenuItem value={'Morning'}>Morning</MenuItem>
                                    <MenuItem value={'Evening'}>Evening</MenuItem>
                                    <MenuItem value={'Night'}>Night</MenuItem>
                                    <MenuItem value={'Nothing'}>Nothing</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className='space-y-2'>
                            <NumberField
                                id='name'
                                name='expectedTime'
                                label='Expected time'
                                required
                                min={1}
                                max={480}
                                defaultValue={editingTask?.expected_time} />
                        </div>
                    </div>
                </form>
            </DialogContent >
            <DialogActions>
                <div className='mr-auto'>
                    <Button
                        color='error'
                        onClick={() => editingTask?.id !== undefined && handleDelete(editingTask.id)}>
                        Delete
                    </Button>
                </div>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" form="subscription-form">
                    Edit
                </Button>
            </DialogActions>
        </Dialog >
    );
}