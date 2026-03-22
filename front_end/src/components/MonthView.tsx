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

                </div>
            </div>
        </div>
    )
}

export default MonthView