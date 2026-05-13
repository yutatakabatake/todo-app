import Task from "./Task"
import type { TaskType, TimeSlot } from '../types/task';
import { CheckCircle, Type, Folder, Clock, Timer } from 'lucide-react';

type Props = {
    timeSlot: TimeSlot
    tasks: TaskType[]
}

const term = {
    Morning: '：6:00-12:00',
    Evening: '：12:00-18:00',
    Night: '：18:00-24:00',
    Nothing: ''
};
function Table(props: Props) {
    const { timeSlot, tasks } = props;

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 py-3">
                <h3 className="font-semibold text-sm sm:text-base">{timeSlot}{term[timeSlot]}</h3>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-1 sm:px-4 text-left w-8 sm:w-12">
                            <span className="sm:hidden" title="Done"><CheckCircle className="w-4 h-4" /></span>
                            <span className="hidden sm:inline">Done</span>
                        </th>
                        <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-1 sm:px-4 text-left">
                            <span className="sm:hidden" title="Title"><Type className="w-4 h-4" /></span>
                            <span className="hidden sm:inline">Title</span>
                        </th>
                        <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-1 sm:px-4 text-left">
                            <span className="sm:hidden" title="Project"><Folder className="w-4 h-4" /></span>
                            <span className="hidden sm:inline">Project</span>
                        </th>
                        <th className="hidden sm:table-cell font-medium text-sm text-gray-600 py-2 sm:py-3 px-1 sm:px-4 text-left">
                            Date
                        </th>
                        <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-1 sm:px-4 text-right w-12 sm:w-auto">
                            <span className="sm:hidden" title="Expected time"><Clock className="w-4 h-4 ml-auto" /></span>
                            <span className="hidden sm:inline">Exptected time</span>
                        </th>
                        <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-1 sm:px-4 text-right w-12 sm:w-auto">
                            <span className="sm:hidden" title="Actual time"><Timer className="w-4 h-4 ml-auto" /></span>
                            <span className="hidden sm:inline">Actual time</span>
                        </th>
                        <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-1 sm:px-4 text-left w-8 sm:w-auto">
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
                        <td colSpan={3} className="sm:hidden text-center text-xs py-2 px-1">Total</td>
                        <td colSpan={4} className="hidden sm:table-cell text-center text-sm py-3 px-4">Total</td>
                        <td className="py-2 sm:py-3 px-1 sm:px-4 text-right text-xs sm:text-sm">{tasks.reduce((sum, task) => sum + task.expected_time, 0)}m</td>
                        <td className="py-2 sm:py-3 px-1 sm:px-4 text-right text-xs sm:text-sm">{tasks.reduce((sum, task) => sum + (task.actual_time ?? 0), 0)}m</td>
                        <td className="w-8 sm:w-auto"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Table
