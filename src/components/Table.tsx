import Task from "./Task"

type Category = 'Morning' | 'Evening' | 'Night' | 'Nothing'

type Props = {
    category: Category
    handleClickEdit: () => void
}

function Table(props: Props) {
    const { category, handleClickEdit } = props;
    return (
        <div className="bg-white rounded-lg border overflow-hidden">
            <div className="bg-gray-50 border-b px-6 py-3">
                <h3 className="font-semibold">{category}</h3>
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
                    <Task title="Eat" project="Life" date="2026/03/06" expectedTime={30} actualTime={50} handleClickEdit={handleClickEdit} />
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