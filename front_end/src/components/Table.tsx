import Task from "./Task"
import type { TaskType, TimeSlot } from '../types/task';
import { CheckCircle, Type, Folder, Calendar, Clock, Timer } from 'lucide-react';

type Props = {
    timeSlot: TimeSlot
    tasks: TaskType[]
}

function Table(props: Props) {
    const { timeSlot, tasks } = props;

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 py-3">
                <h3 className="font-semibold text-sm sm:text-base">{timeSlot}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] sm:min-w-0">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-2 sm:px-4 text-left w-10 sm:w-12">
                                <span className="sm:hidden" title="Done"><CheckCircle className="w-4 h-4" /></span>
                                <span className="hidden sm:inline">Done</span>
                            </th>
                            <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-2 sm:px-4 text-left w-32 sm:w-60">
                                <span className="sm:hidden" title="Title"><Type className="w-4 h-4" /></span>
                                <span className="hidden sm:inline">Title</span>
                            </th>
                            <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-2 sm:px-4 text-left w-24 sm:w-50">
                                <span className="sm:hidden" title="Project"><Folder className="w-4 h-4" /></span>
                                <span className="hidden sm:inline">Project</span>
                            </th>
                            <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-2 sm:px-4 text-left w-20 sm:w-8">
                                <span className="sm:hidden" title="Date"><Calendar className="w-4 h-4" /></span>
                                <span className="hidden sm:inline">Date</span>
                            </th>
                            <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-2 sm:px-4 text-right">
                                <span className="sm:hidden" title="Expected time"><Clock className="w-4 h-4 ml-auto" /></span>
                                <span className="hidden sm:inline">Exptected time</span>
                            </th>
                            <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-2 sm:px-4 text-right">
                                <span className="sm:hidden" title="Actual time"><Timer className="w-4 h-4 ml-auto" /></span>
                                <span className="hidden sm:inline">Actual time</span>
                            </th>
                            <th className="font-medium text-sm text-gray-600 py-2 sm:py-3 px-2 sm:px-4 text-left">
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
                        <td colSpan={4} className="text-center text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4">Total</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-right text-xs sm:text-sm">{tasks.reduce((sum, task) => sum + task.expected_time, 0)}min</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-right text-xs sm:text-sm">{tasks.reduce((sum, task) => sum + (task.actual_time ?? 0), 0)}min</td>
                        <td></td>
                    </tr>
                </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Table
