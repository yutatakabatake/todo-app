import { Checkbox } from "@mui/material"
import type { TaskType } from "../pages/TaskList";
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { green, red } from '@mui/material/colors';

type Props = {
    id: TaskType['id']
    title: TaskType['title']
    project: TaskType['project']
    done: TaskType['done']
    date: TaskType['date']
    expectedTime: TaskType['expectedTime']
    actualTime: TaskType['actualTime']
    isWorking: TaskType['isWorking']
    handleClickEdit: () => void
    handleDoneTask: (id: TaskType['id']) => void
    handleStart: (id: TaskType['id']) => void
    handleStop: (id: TaskType['id']) => void
}

function Task(props: Props) {
    const { id, title, project, done, date, expectedTime, actualTime, isWorking, handleClickEdit, handleDoneTask, handleStart, handleStop } = props;
    return (
        <tr className="border-b" data-id={id.toString()}>
            <td className="py-3 px-4">
                <Checkbox
                    onChange={() => handleDoneTask(id)}
                    slotProps={{
                        input: { 'aria-label': 'controlled' },
                    }}
                    checked={done}
                />
            </td>
            <td className="py-3 px-4 title">{title}</td>
            <td className="py-3 px-4 project">{project}</td>
            <td className="py-3 px-4 date">{date}</td>
            <td className="py-3 px-4 text-right expectedTime">{expectedTime}min</td>
            <td className="py-3 px-4 text-right actualTime">{actualTime}min</td>
            <td className="py-3 px-4 w-3">
                <IconButton aria-label="edit" onClick={handleClickEdit}>
                    <EditOutlinedIcon />
                </IconButton>
            </td>
            <td className="py-3 px-4 text-left w-3">
                {isWorking ?
                    <IconButton onClick={() => handleStop(id)}>
                        <StopCircleOutlinedIcon sx={{ color: red[400] }} />
                    </IconButton>
                    :
                    <IconButton onClick={() => handleStart(id)}>
                        <PlayArrowRoundedIcon sx={{ color: green[400] }} />
                    </IconButton>}
            </td>
        </tr>
    )
}

export default Task