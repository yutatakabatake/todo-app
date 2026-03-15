import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../context/AppContextProvider';
import type { ProjectType } from '../types/task';

type Props = {
    open: boolean
    isEditing: boolean
    editingProject: ProjectType | undefined
    handleClose: () => void
}

function ProjectFormDialog(props: Props) {
    const { open, isEditing, editingProject, handleClose } = props;
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }
    const { handleAddProject, handleDeleteProject } = context;

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const project = formJson.project;

        handleAddProject(project);

        handleClose();
    };

    function handleDelete(id: ProjectType['id']) {
        handleDeleteProject(id);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} scroll='paper' maxWidth='sm' fullWidth>
            <DialogTitle>{isEditing ? 'Edit project' : 'Add new project'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="subscription-form">
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="project"
                        label="Project"
                        fullWidth
                        variant="standard"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                {isEditing &&
                    <div className='mr-auto'>
                        <Button
                            color='error'
                            onClick={() => editingProject !== undefined && handleDelete(editingProject.id)}>
                            Delete
                        </Button>
                    </div>}
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" form="subscription-form">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProjectFormDialog