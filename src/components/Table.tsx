import Task from "./Task"
import type { TaskType, TimeSlot } from "../pages/TaskList"

type Props = {
    timeSlot: TimeSlot
    handleClickEdit: any
    tasks: TaskType[]
}

function Table(props: Props) {
    const { timeSlot, handleClickEdit, tasks } = props;
    return (
        <div className="bg-white rounded-lg border overflow-hidden">
            <div className="bg-gray-50 border-b px-6 py-3">
                <h3 className="font-semibold">{timeSlot}</h3>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-b bg-gray-50">
                        <th className="font-medium text-sm text-gray-600 py-3 px-4 text-left w-12">
                            Done
                        </th>
                        <th className="font-medium text-sm text-gray-600 py-3 px-4 text-left w-60">
                            Title
                        </th>
                        <th className="font-medium text-sm text-gray-600 py-3 px-4 text-left w-50">
                            Project
                        </th>
                        <th className="font-medium text-sm text-gray-600 py-3 px-4 text-left w-8">
                            Date
                        </th>
                        <th className="font-medium text-sm text-gray-600 py-3 px-4 text-right">
                            Exptected time
                        </th>
                        <th className="font-medium text-sm text-gray-600 py-3 px-4 text-right">
                            Actual time
                        </th>
                        <th className="font-medium text-sm text-gray-600 py-3 px-4 text-left">
                            Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <Task
                            title={task.title}
                            project={task.project ?? ''}
                            date={task.date}
                            expectedTime={task.expectedTime}
                            actualTime={task.actualTime ?? 0}
                            handleClickEdit={handleClickEdit} />
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-gray-50">
                        <td colSpan={4} className="text-center">Total</td>
                        <td className="py-3 px-4 text-right">30min</td>
                        <td className="py-3 px-4 text-right">50min</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Table