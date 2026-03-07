import ButtonUsage from "../components/Button"

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
        </>
    )
}

export default TaskList