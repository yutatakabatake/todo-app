const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function MonthView() {
    return (
        <div className="flex flex-col h-full">
            <div className="bg-white z-10 border-b px-6 py-2 sticky top-0">
                <h3 className="text-xl font-semibold">
                    2026 March
                </h3>
                <p className="text-sm text-gray-500 mt-1">Done tasks</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="overflow-hidden">
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {weekDays.map((day, index) => (
                            <div
                                key={index}
                                className={`text-center font-medium py-2 ${index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-700'
                                    }`}>
                                {day}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MonthView