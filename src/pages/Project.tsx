import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContextProvider';
import { Button, TextField } from '@mui/material';
import { FolderKanban } from 'lucide-react';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import Task from "../components/Task"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TaskFormDialog from '../components/TaskFormDialog';

function Project() {
    const [projectFormOpen, setProjectFormOpen] = useState<boolean>(false);
    const [taskFormOpen, setTaskFormOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingTask, setEditingTask] = useState(undefined);
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }
    const { tasks, projects, handleAddProject } = context;

    function handleOpenProjectForm() {
        setProjectFormOpen(true);
    }

    function handleCloseProjectForm() {
        setProjectFormOpen(false);
    }

    function handleOpenTaskForm() {
        setIsEditing(false);
        setTaskFormOpen(true);
    }

    function handleCloseTaskForm() {
        setTaskFormOpen(false);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const project = formJson.project;

        handleAddProject(project);

        handleCloseProjectForm();
    };

    return (
        <>
            <div className="flex-1 overflow-hidden flex">
                <div className="w-80 bg-white border-r overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b p-4 z-10">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold">Projects</h2>
                            <Button
                                variant='contained'
                                color='success'
                                onClick={handleOpenProjectForm}>
                                New
                            </Button>
                        </div>
                    </div>

                    <div className="p-4">
                        {projects.length === 0 &&
                            <div className="text-center py-8 text-gray-400 text-sm">
                                <p>No projects</p>
                            </div>}

                        <div className="space-y-3">
                            {projects.map(project => (
                                <div key={project.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="min-w-0">
                                            <h3 className="font-medium text-lg">{project.label}</h3>
                                        </div>
                                        <IconButton onClick={() => alert('edit')}>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="text-gray-500">
                                            {tasks.filter(task => task.projectId === project.id && !task.done).length} pending tasks
                                        </div>
                                        <IconButton aria-label='add task' onClick={handleOpenTaskForm}>
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="p-6">
                        <div className="max-w-4xl mx-auto">

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">All tasks</h2>
                                <p className="text-sm text-gray-500">
                                    Management tasks by project
                                </p>
                            </div>

                            {projects.length === 0 &&
                                <div className="bg-white rounded-lg p-12 text-center">
                                    <FolderKanban className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-400 mb-4">Create a project and organize your tasks</p>
                                    <Button
                                        variant='contained'
                                        color='success'
                                        onClick={() => alert('add project')}>
                                        Create first project
                                    </Button>
                                </div>}

                            <div className="space-y-8">
                                {projects.map(project => {
                                    const projectTasks = tasks.filter(task => task.projectId === project.id);
                                    const incompleteTasks = projectTasks.filter(task => !task.done);

                                    return (
                                        <div key={project.id} className="bg-white rounded-lg p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <h3 className="text-lg font-semibold">{project.label}</h3>
                                                <span className="text-sm text-gray-500">
                                                    ({incompleteTasks.length} tasks)
                                                </span>
                                            </div>

                                            {projectTasks.length === 0 ?
                                                <div className="text-center py-8 text-gray-400 text-sm">
                                                    <p>No pending tasks</p>
                                                </div>
                                                :
                                                <div>
                                                    {projectTasks.map(task => (
                                                        <Task
                                                            key={task.id}
                                                            task={task}
                                                            isInTable={false}
                                                            handleClickEdit={() => alert('edit')} />
                                                    ))}
                                                </div>}

                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <Dialog open={projectFormOpen} onClose={handleCloseProjectForm} scroll='paper' maxWidth='sm' fullWidth={true}>
                <DialogTitle>Add new project</DialogTitle>
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
                    <Button onClick={handleCloseProjectForm}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <TaskFormDialog
                open={taskFormOpen}
                isEditing={isEditing}
                editingTask={editingTask}
                handleClose={handleCloseTaskForm}
            />
        </>
    )
}

export default Project