import { Checkbox } from "@mui/material"
import Button from '@mui/material/Button';
import type { TaskType } from "../pages/TaskList";

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
}

function Task(props: Props) {
    const { id, title, project, done, date, expectedTime, actualTime, isWorking, handleClickEdit, handleDoneTask } = props;
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
            <td className="py-3 px-4">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleClickEdit}>
                    edit
                </Button>
            </td>
            <td>
                {isWorking ?
                    <Button>
                        Stop
                    </Button> :
                    <Button
                        variant="outlined">
                        Start
                    </Button>}
            </td>
        </tr>
    )
}

export default Task