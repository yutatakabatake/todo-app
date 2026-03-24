import { Checkbox } from "@mui/material"
import type { TaskType } from '../types/task';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
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

    if (isInTable) {
        return (
            <tr className="border-b" data-id={task.id.toString()}>
                <td className="py-3 px-4">
                    <Checkbox
                        onChange={() => handleDoneTask(task.id)}
                        slotProps={{
                            input: { 'aria-label': 'controlled' },
                        }}
                        checked={task.done}
                    />
                </td>
                <td className="py-3 px-4 title">{task.title}</td>
                <td className="py-3 px-4 project">{projects?.find(project => project.id === task.project_id)?.label}</td>
                <td className="py-3 px-4 date">{task.task_date}</td>
                <td className="py-3 px-4 text-right expected_time">{task.expected_time}min</td>
                <td className="py-3 px-4 text-right actual_time">{task.actual_time !== null ? `${task.actual_time}min` : ''}</td>
                <td className="py-3 px-4 w-3">
                    <IconButton aria-label="edit" onClick={() => handleClickEdit(task)}>
                        <EditOutlinedIcon />
                    </IconButton>
                    <EditTaskFormDialog
                        open={open}
                        editingTask={editingTask}
                        handleClose={handleClose} />
                </td>
                <td className="py-3 px-4 text-left w-3">
                    {task.is_working ?
                        <IconButton onClick={() => handleStop(task.id)}>
                            <StopCircleOutlinedIcon sx={{ color: red[400] }} />
                        </IconButton>
                        :
                        <IconButton onClick={() => handleStart(task.id)}>
                            <PlayArrowRoundedIcon sx={{ color: green[400] }} />
                        </IconButton>}
                </td>
            </tr>
        )
    } else {
        return (
            <>
                <div className="rounded-lg p-4 mb-3 border bg-white transition-all">
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
                                    onClick={() => handleClickEdit(task)}>
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
                                    <span>{task.expected_time}min</span>
                                </div>
                                {task.done &&
                                    <div className='flex items-center gap-1 text-green-600 font-medium'>
                                        <Clock className="w-3 h-3" />
                                        <span>{task.actual_time ?? 0}min</span>
                                    </div>}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {task.is_working ?
                                <IconButton onClick={() => handleStop(task.id)}>
                                    <StopCircleOutlinedIcon sx={{ color: red[400] }} />
                                </IconButton>
                                :
                                <IconButton onClick={() => handleStart(task.id)}>
                                    <PlayArrowRoundedIcon sx={{ color: green[400] }} />
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