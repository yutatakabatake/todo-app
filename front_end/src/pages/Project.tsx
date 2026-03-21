import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContextProvider';
import { Button } from '@mui/material';
import { FolderKanban } from 'lucide-react';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import Task from "../components/Task"
import TaskFormDialog from '../components/TaskFormDialog';
import ProjectFormDialog from '../components/ProjectFormDialog';
import type { ProjectType, TaskType } from '../types/task';


function Project() {
    const [projectFormOpen, setProjectFormOpen] = useState<boolean>(false);
    const [isEditingProject, setIsEditingProject] = useState(false);
    const [onProject, setOnProject] = useState<ProjectType | undefined>(undefined);
    const [taskFormOpen, setTaskFormOpen] = useState<boolean>(false);
    const [isEditingTask, setIsEditingTask] = useState<boolean>(false);
    const [editingTask, setEditingTask] = useState<TaskType | undefined>(undefined);
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }
    const { tasks, projects } = context;

    function handleOpenProjectForm() {
        setProjectFormOpen(!projectFormOpen);
    }

    function handleCloseProjectForm() {
        setProjectFormOpen(!projectFormOpen);
        setIsEditingProject(!isEditingProject);
    }

    function handleOpenTaskForm() {
        setIsEditingTask(false);
        setTaskFormOpen(!taskFormOpen);
    }

    function handleOpenAddTask(project: ProjectType) {
        setOnProject(project);
        handleOpenTaskForm();
    }

    function handleCloseTaskForm() {
        setTaskFormOpen(!taskFormOpen);
    }

    function handleClickEditProject(id: ProjectType['id']) {
        setIsEditingProject(!isEditingProject);
        const nowEditingProject = projects.find(project => project.id === id);
        setOnProject(nowEditingProject);
        setProjectFormOpen(!projectFormOpen);
    }

    function handleClickEditTask(
        taskId: TaskType['id'],
    ) {
        const nowEditingTask = tasks.find(task => task.id === taskId);
        setEditingTask(nowEditingTask);
        setIsEditingTask(true);
        setTaskFormOpen(!taskFormOpen);
    }

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
                                        <IconButton onClick={() => handleClickEditProject(project.id)}>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="text-gray-500">
                                            {tasks.filter(task => task.project_id === project.id && !task.done).length} pending tasks
                                        </div>
                                        <IconButton aria-label='add task' onClick={() => handleOpenAddTask(project)}>
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
                                        onClick={handleOpenProjectForm}>
                                        Create first project
                                    </Button>
                                </div>}

                            <div className="space-y-8">
                                {projects.map(project => {
                                    const projectTasks = tasks.filter(task => task.project_id === project.id);
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
                                                            handleClickEdit={() => handleClickEditTask(task.id)} />
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

            <ProjectFormDialog
                open={projectFormOpen}
                isEditing={isEditingProject}
                editingProject={onProject}
                handleClose={handleCloseProjectForm}
            />

            <TaskFormDialog
                open={taskFormOpen}
                isEditing={isEditingTask}
                editingTask={editingTask}
                defaultProject={onProject}
                handleClose={handleCloseTaskForm}
            />
        </>
    )
}

export default Project