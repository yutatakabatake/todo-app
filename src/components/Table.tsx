import Task from "./Task"
import type { ProjectType, TaskType, TimeSlot } from "../pages/TaskList"

type Props = {
    timeSlot: TimeSlot
    handleClickEdit: any
    tasks: TaskType[]
    projects: ProjectType[] | undefined
    handleDoneTask: (id: TaskType['id']) => void
    handleStart: (id: TaskType['id']) => void
    handleStop: (id: TaskType['id']) => void
}

function Table(props: Props) {
    const { timeSlot, handleClickEdit, tasks, projects, handleDoneTask, handleStart, handleStop } = props;
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <Task
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            projectId={task.projectId}
                            done={task.done}
                            date={task.date}
                            expectedTime={task.expectedTime}
                            actualTime={task.actualTime ?? 0}
                            isWorking={task.isWorking}
                            projects={projects}
                            handleClickEdit={handleClickEdit}
                            handleStart={handleStart}
                            handleStop={handleStop}
                            handleDoneTask={handleDoneTask} />
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-gray-50">
                        <td colSpan={4} className="text-center">Total</td>
                        <td className="py-3 px-4 text-right">{tasks.reduce((sum, task) => sum + task.expectedTime, 0)}min</td>
                        <td className="py-3 px-4 text-right">{tasks.reduce((sum, task) => sum + (task.actualTime ?? 0), 0)}min</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Table