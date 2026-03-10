import { Checkbox } from "@mui/material"
import Button from '@mui/material/Button';

type Props = {
    id: number,
    title: string,
    project: string,
    done: boolean,
    date: string,
    expectedTime: number,
    actualTime: number
    isWorking: boolean
    handleClickEdit: () => void
}

function Task(props: Props) {
    const { id, title, project, done, date, expectedTime, actualTime, isWorking, handleClickEdit } = props;
    return (
        <tr className="border-b">
            <td className="py-3 px-4">
                <Checkbox
                    onChange={() => alert('done')}
                    slotProps={{
                        input: { 'aria-label': 'controlled' },
                    }}
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