import { Checkbox } from "@mui/material"
import type { ProjectType, TaskType } from '../types/task';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { green, red } from '@mui/material/colors';

type Props = {
    task: TaskType
    projects: ProjectType[] | undefined
    isInTable: boolean
    handleClickEdit: () => void
    handleDoneTask: (id: TaskType['id']) => void
    handleStart: (id: TaskType['id']) => void
    handleStop: (id: TaskType['id']) => void
}

function Task(props: Props) {
    const { task, projects, isInTable, handleClickEdit, handleDoneTask, handleStart, handleStop } = props;
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
                <td className="py-3 px-4 project">{projects?.find(project => project.id === task.projectId)?.label}</td>
                <td className="py-3 px-4 date">{task.date}</td>
                <td className="py-3 px-4 text-right expectedTime">{task.expectedTime}min</td>
                <td className="py-3 px-4 text-right actualTime">{task.actualTime}min</td>
                <td className="py-3 px-4 w-3">
                    <IconButton aria-label="edit" onClick={handleClickEdit}>
                        <EditOutlinedIcon />
                    </IconButton>
                </td>
                <td className="py-3 px-4 text-left w-3">
                    {task.isWorking ?
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
            <div className="rounded-lg p-4 mb-3 border-l-4 bg-white transition-all">
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Task