import { Checkbox } from "@mui/material"
import Button from '@mui/material/Button';

type Props = {
    title: string,
    project: string,
    date: string,
    expectedTime: number,
    actualTime: number
}

function Task(props: Props) {
    const { title, project, date, expectedTime, actualTime } = props;
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
            <td className="py-3 px-4">{title}</td>
            <td className="py-3 px-4">{project}</td>
            <td className="py-3 px-4">{date}</td>
            <td className="py-3 px-4 text-right">{expectedTime}min</td>
            <td className="py-3 px-4 text-right">{actualTime}min</td>
            <td className="py-3 px-4">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => alert('edit')}>
                    edit
                </Button>
            </td>
        </tr>
    )
}

export default Task