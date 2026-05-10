import { Checkbox } from "@mui/material"
import type { TaskType } from '../types/task';
import IconButton from '@mui/material/IconButton';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { green, red } from '@mui/material/colors';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContextProvider';
import { Calendar, Clock } from "lucide-react";
import EditTaskFormDialog from "./EditTaskFormDialog";

type Props = {
    task: TaskType
    isInTable: boolean
}

function Task(props: Props) {
    const { task, isInTable } = props;
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }
    const { projects, handleDoneTask, handleStart, handleStop } = context;
    const [open, setOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<TaskType | undefined>(undefined);


    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleClickEdit(task: TaskType) {
        setEditingTask(task);
        handleOpen();
    }

    function handleClickEditWithStop(event: React.MouseEvent) {
        event.stopPropagation();
        handleClickEdit(task);
    }

    if (isInTable) {
        return (
            <>
                <tr className="border-b border-gray-200" data-id={task.id.toString()}>
                    <td className="py-2 sm:py-3 px-1 sm:px-4">
                        <Checkbox
                            onChange={() => handleDoneTask(task.id)}
                            slotProps={{
                                input: { 'aria-label': 'controlled' },
                            }}
                            checked={task.done}
                            size="small"
                            sx={{
                                padding: { xs: '2px', sm: '9px' }
                            }}
                        />
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-4 cursor-pointer hover:text-gray-600 title text-xs sm:text-sm" onClick={handleClickEditWithStop}>
                        <span className="block truncate max-w-20 sm:max-w-none">{task.title}</span>
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-4 cursor-pointer hover:text-gray-600 project text-xs sm:text-sm" onClick={handleClickEditWithStop}>
                        <span className="block truncate `max-w-15 sm:max-w-none">{projects?.find(project => project.id === task.project_id)?.label}</span>
                    </td>
                    <td className="hidden sm:table-cell py-3 px-4 cursor-pointer hover:text-gray-600 date text-sm" onClick={handleClickEditWithStop}>
                        {task.task_date}
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-4 cursor-pointer hover:text-gray-600 text-right expected_time text-xs sm:text-sm whitespace-nowrap">
                        <span className="sm:hidden">{task.expected_time}m</span>
                        <span className="hidden sm:inline">{task.expected_time}m</span>
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-4 text-right actual_time text-xs sm:text-sm whitespace-nowrap">
                        <span className="sm:hidden">{task.actual_time !== null ? `${task.actual_time}m` : ''}</span>
                        <span className="hidden sm:inline">{task.actual_time !== null ? `${task.actual_time}m` : ''}</span>
                    </td>
                    <td className="py-2 sm:py-3 px-0 sm:px-4 text-left w-8 sm:w-12">
                        {task.is_working ?
                            <IconButton onClick={() => handleStop(task.id)} size="small" sx={{ padding: { xs: '4px', sm: '8px' } }}>
                                <StopCircleOutlinedIcon sx={{ color: red[400], fontSize: { xs: '1.1rem', sm: '1.5rem' } }} />
                            </IconButton>
                            :
                            <IconButton onClick={() => handleStart(task.id)} disabled={task.done} size="small"
                                sx={{ color: green[400], padding: { xs: '4px', sm: '8px' } }} >
                                <PlayArrowRoundedIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem' } }} />
                            </IconButton>}
                    </td>
                </tr>
                <EditTaskFormDialog
                    open={open}
                    editingTask={editingTask}
                    handleClose={handleClose} />
            </>
        )
    } else {
        return (
            <>
                <div className="rounded-lg p-4 mb-3 border border-gray-200 bg-white transition-all">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <Checkbox
                                    onChange={() => handleDoneTask(task.id)}
                                    slotProps={{
                                        input: { 'aria-label': 'controlled' },
                                    }}
                                    checked={task.done}
                                />
                                <h4 className="cursor-pointer hover:text-gray-600"
                                    onClick={handleClickEditWithStop}>
                                    {task.title}
                                </h4>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                                <span className="px-2 py-0.5 rounded-full bg-gray-100">{task.time_slot}</span>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{task.task_date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{task.expected_time}m</span>
                                </div>
                                {task.done &&
                                    <div className='flex items-center gap-1 text-green-600 font-medium'>
                                        <Clock className="w-3 h-3" />
                                        <span>{task.actual_time ?? 0}m</span>
                                    </div>}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {task.is_working ?
                                <IconButton onClick={() => handleStop(task.id)}>
                                    <StopCircleOutlinedIcon sx={{ color: red[400] }} />
                                </IconButton>
                                :
                                <IconButton onClick={() => handleStart(task.id)} disabled={task.done}
                                    sx={{ color: green[400] }} >
                                    <PlayArrowRoundedIcon />
                                </IconButton>}
                        </div>
                    </div>
                </div>

                <EditTaskFormDialog
                    open={open}
                    editingTask={editingTask}
                    handleClose={handleClose} />
            </>
        );
    }
}

export default Task
