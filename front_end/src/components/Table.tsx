import Task from "./Task"
import type { TaskType, TimeSlot } from '../types/task';

type Props = {
    timeSlot: TimeSlot
    tasks: TaskType[]
}

function Table(props: Props) {
    const { timeSlot, tasks } = props;

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
                <h3 className="font-semibold">{timeSlot}</h3>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
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
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            isInTable={true} />
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-gray-50">
                        <td colSpan={4} className="text-center">Total</td>
                        <td className="py-3 px-4 text-right">{tasks.reduce((sum, task) => sum + task.expected_time, 0)}min</td>
                        <td className="py-3 px-4 text-right">{tasks.reduce((sum, task) => sum + (task.actual_time ?? 0), 0)}min</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Table