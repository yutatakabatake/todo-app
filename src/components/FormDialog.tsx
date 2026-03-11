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
import type { ProjectType, TaskType, TimeSlot } from '../pages/TaskList';
import dayjs from 'dayjs'

type Props = {
    open: boolean
    isEditing: boolean
    editingTask: TaskType | undefined
    projects: ProjectType[] | undefined
    handleClose: () => void
    handleAddTask: (
        title: TaskType['title'],
        project: TaskType['projectId'],
        date: TaskType['date'],
        expectedTime: TaskType['expectedTime'],
        timeSlot: TimeSlot
    ) => void
    handleDeleteTask: (id: TaskType['id']) => void
    handleEditTask: (
        editingTask: TaskType | undefined,
        newTitle: TaskType['title'],
        newProject: TaskType['projectId'],
        newDate: TaskType['date'],
        newExpectedTime: TaskType['expectedTime'],
        newTimeSlot: TimeSlot
    ) => void
}

export default function FormDialog(props: Props) {
    const { open, isEditing, editingTask, projects, handleClose, handleAddTask, handleDeleteTask, handleEditTask } = props;

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const title: TaskType['title'] = formJson.title;
        const project: TaskType['projectId'] = formJson.project;
        const timeSlot: TimeSlot = formJson.timeSlot;
        const expectedTime: TaskType['expectedTime'] = parseInt(formJson.expectedTime);

        const date: TaskType['date'] = dayjs().format('YYYY/MM/DD');

        if (isEditing) {
            handleEditTask(editingTask, title, project, date, expectedTime, timeSlot);
        } else {
            handleAddTask(title, project, date, expectedTime, timeSlot);
        }
        handleClose();
    }

    function handleDelete(id: TaskType['id']) {
        handleDeleteTask(id);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} scroll='paper' maxWidth='sm' fullWidth={true}>
            <DialogTitle>{isEditing ? 'Edit task' : 'Add new task'}</DialogTitle>
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
                                defaultValue={isEditing ? editingTask?.title : ''} />
                        </div>

                        <div className='space-y-2'>
                            <FormControl fullWidth>
                                <InputLabel id="project">Project</InputLabel>
                                <Select
                                    labelId="project"
                                    id="name"
                                    name='project'
                                    label="Project">
                                    {projects?.map(project => (
                                        <MenuItem key={project.id} value={project.id}>{project.value}</MenuItem>
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
                                    defaultValue={'Nothing'} >
                                    <MenuItem value={'Morning'}>Morning</MenuItem>
                                    <MenuItem value={'Evening'}>Evening</MenuItem>
                                    <MenuItem value={'Night'}>Night</MenuItem>
                                    <MenuItem value={'Nothing'}>Nothing</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className='space-y-2'>
                            <NumberField id='name' name='expectedTime' label='expectedTime' required />
                        </div>
                    </div>
                </form>
            </DialogContent >
            <DialogActions>
                {isEditing &&
                    <div className='mr-auto'>
                        <Button
                            color='error'
                            onClick={() => editingTask?.id !== undefined && handleDelete(editingTask.id)}>
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