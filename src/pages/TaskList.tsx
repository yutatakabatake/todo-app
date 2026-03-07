import ButtonUsage from "../components/Button"
import Checkbox from '@mui/material/Checkbox';

function TaskList() {
    return (
        <>
            <div className="border-b px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">TaskList</h2>
                        <p className="text-gray-600">X pending tasks</p>
                    </div>
                    <div>
                        <ButtonUsage handleClick={() => alert('click!')} text='new' color="success" />
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="bg-white rounded-lg border mx-auto overflow-hidden">
                        <div className="bg-gray-50 border-b px-6 py-3">
                            <h3 className="font-semibold">Morning</h3>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="font-medium text-sm text-gray-600 py-3 px-4 text-left w-12">
                                        Done
                                    </th>
                                    <th className="font-medium text-sm text-gray-600 py-3 px-4 text-left">
                                        Title
                                    </th>
                                    <th className="font-medium text-sm text-gray-600 py-3 px-4 text-left">
                                        Project
                                    </th>
                                    <th className="font-medium text-sm text-gray-600 py-3 px-4 text-left">
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
                                <tr className="border-b">
                                    <td className="py-3 px-4">
                                        <Checkbox
                                            onChange={() => alert('done')}
                                            slotProps={{
                                                input: { 'aria-label': 'controlled' },
                                            }}
                                        />
                                    </td>
                                    <td className="py-3 px-4">Eat</td>
                                    <td className="py-3 px-4">Life</td>
                                    <td className="py-3 px-4">2026/03/08</td>
                                    <td className="py-3 px-4 text-right">30min</td>
                                    <td className="py-3 px-4 text-right">50min</td>
                                    <td className="py-3 px-4">
                                        <ButtonUsage text="edit" color="primary" handleClick={() => console.log('edit')} />
                                    </td>
                                </tr>
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
                </div>
            </div>
        </>
    )
}

export default TaskList