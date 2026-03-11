import { Checkbox } from "@mui/material"
import Button from '@mui/material/Button';
import type { TaskType } from "../pages/TaskList";
import { Play, Pause } from 'lucide-react';

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
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleClickEdit}>
                    edit
                </Button>
            </td>
            <td className="py-3 px-4 text-left w-3">
                {isWorking ?
                    <Button
                        onClick={() => handleStop(id)}>
                        <Pause color="#fb2c36" />
                    </Button> :
                    <Button
                        onClick={() => handleStart(id)}
                        className="border-green-500 text-green-500">
                        <Play color="#36dd7f" />
                    </Button>}
            </td>
        </tr>
    )
}

export default Task