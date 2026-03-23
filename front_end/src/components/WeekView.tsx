import dayjs from "dayjs"

function WeekView() {
    const today = dayjs();
    const startOfWeek = today.startOf('week');
    const endOfWeek = today.endOf('week');
    return (
        <div className="flex flex-col h-full">
            <div className="bg-white z-10 border-b px-6 py-2 sticky top-0">
                <h3 className="text-xl font-semibold">
                    {`${startOfWeek.format('YYYY/MM/DD')} - ${endOfWeek.format('YYYY/MM/DD')}`}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Done tasks</p>
            </div>

            <div>WeekView</div>
        </div>
    )
}

export default WeekView