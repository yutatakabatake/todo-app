import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContextProvider';
import { Button } from '@mui/material';
import { FolderKanban } from 'lucide-react';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import Task from "../components/Task"
import ProjectFormDialog from '../components/ProjectFormDialog';
import type { ProjectType } from '../types/task';
import AddTaskFormDialog from '../components/AddTaskFormDialog';


function Project() {
    const [addTaskFormOpen, setAddTaskFormOpen] = useState(false);
    const [projectFormOpen, setProjectFormOpen] = useState<boolean>(false);
    const [isEditingProject, setIsEditingProject] = useState(false);
    const [onProject, setOnProject] = useState<ProjectType | undefined>(undefined);
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }
    const { tasks, projects } = context;

    function handleOpenAddTaskForm(project: ProjectType) {
        setOnProject(project);
        setAddTaskFormOpen(true);
    }

    function handleCloseAddTaskForm() {
        setAddTaskFormOpen(false);
    }

    function handleOpenProjectForm() {
        setProjectFormOpen(true);
    }

    function handleCloseProjectForm() {
        setProjectFormOpen(false);
        // Dialog のクローズアニメーション完了後にリセット
        setTimeout(() => {
            setIsEditingProject(false);
        }, 300);
    }


    function handleClickEditProject(id: ProjectType['id']) {
        setIsEditingProject(!isEditingProject);
        const nowEditingProject = projects.find(project => project.id === id);
        setOnProject(nowEditingProject);
        setProjectFormOpen(!projectFormOpen);
    }

    return (
        <>
            <div className="flex-1 overflow-hidden flex flex-col sm:flex-row">
                {/* Sidebar - horizontal scroll on mobile */}
                <div className="w-full sm:w-80 bg-white border-b sm:border-b-0 sm:border-r border-gray-200 overflow-x-auto sm:overflow-y-auto sm:overflow-x-hidden shrink-0">
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 z-10">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-sm sm:text-base">Projects</h2>
                            <Button
                                variant='contained'
                                color='success'
                                onClick={handleOpenProjectForm}
                                size="small"
                                sx={{
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    padding: { xs: '4px 8px', sm: '6px 16px' }
                                }}>
                                New
                            </Button>
                        </div>
                    </div>

                    <div className="p-3 sm:p-4">
                        {projects.length === 0 &&
                            <div className="text-center py-6 sm:py-8 text-gray-400 text-sm">
                                <p>No projects</p>
                            </div>}

                        {/* Horizontal scroll on mobile, vertical on desktop */}
                        <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
                            {projects.map(project => (
                                <div key={project.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-white min-w-[200px] sm:min-w-0 shrink-0 sm:shrink">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="min-w-0">
                                            <h3 className="font-medium text-base sm:text-lg truncate">{project.label}</h3>
                                        </div>
                                        <IconButton onClick={() => handleClickEditProject(project.id)} size="small">
                                            <EditOutlinedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                                        </IconButton>
                                    </div>

                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <div className="text-gray-500">
                                            {tasks.filter(task => task.project_id === project.id && !task.done).length} pending
                                        </div>
                                        <IconButton aria-label='add task' onClick={() => handleOpenAddTaskForm(project)} size="small">
                                            <AddIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="p-4 sm:p-6">
                        <div className="max-w-4xl mx-auto">

                            <div className="mb-4 sm:mb-6">
                                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">All tasks</h2>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Management tasks by project
                                </p>
                            </div>

                            {projects.length === 0 &&
                                <div className="bg-white rounded-lg p-8 sm:p-12 text-center">
                                    <FolderKanban className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-300 mb-3 sm:mb-4" />
                                    <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Create a project and organize your tasks</p>
                                    <Button
                                        variant='contained'
                                        color='success'
                                        onClick={handleOpenProjectForm}
                                        size="small">
                                        Create first project
                                    </Button>
                                </div>}

                            <div className="space-y-6 sm:space-y-8">
                                {projects.map(project => {
                                    const projectTasks = tasks.filter(task => task.project_id === project.id);
                                    const incompleteTasks = projectTasks.filter(task => !task.done);

                                    return (
                                        <div key={project.id} className="bg-white rounded-lg p-4 sm:p-6">
                                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                <h3 className="text-base sm:text-lg font-semibold">{project.label}</h3>
                                                <span className="text-xs sm:text-sm text-gray-500">
                                                    ({incompleteTasks.length} tasks)
                                                </span>
                                            </div>

                                            {projectTasks.length === 0 ?
                                                <div className="text-center py-6 sm:py-8 text-gray-400 text-sm">
                                                    <p>No pending tasks</p>
                                                </div>
                                                :
                                                <div>
                                                    {projectTasks.map(task => (
                                                        <Task
                                                            key={task.id}
                                                            task={task}
                                                            isInTable={false} />
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
            <AddTaskFormDialog
                open={addTaskFormOpen}
                defaultProject={onProject}
                handleClose={handleCloseAddTaskForm} />
        </>
    )
}

export default Project
