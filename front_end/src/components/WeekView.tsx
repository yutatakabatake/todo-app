import dayjs from "dayjs"
import { getCompletedTasksForDate, getWeekDays } from "../util/dayUtils";
import { useContext } from 'react';
import { AppContext } from '../context/AppContextProvider';
import { Check } from "lucide-react";

function WeekView() {
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }
    const { tasks } = context;

    const today = dayjs();
    const calenderDays = getWeekDays(today);
    return (
        <div className="flex flex-col h-full">
            <div className="bg-white z-10 border-b px-6 py-2 sticky top-0">
                <h3 className="text-xl font-semibold">
                    {`${today.startOf('week').format('YYYY/MM/DD')} - ${today.endOf('week').format('YYYY/MM/DD')}`}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Done tasks</p>
            </div>

            <div className="grid grid-cols-7 divide-x">
                {calenderDays.map(day => {
                    const completedTasks = getCompletedTasksForDate(tasks, day);
                    const isToday = day.isSame(today, 'day');

                    return (
                        <div
                            key={day.format('YYYY/MM/DD')}
                            className={`min-h-screen cursor-pointer ${isToday ? 'bg-blue-50 border-blue-500 border-2' : ''}`}
                            onClick={() => alert('click')}>
                            <div className="sticky top-18.25 bg-white border-b p-3 z-10">
                                <div className="text-center">
                                    <div className="text-xs text-gray-500 mb-1">
                                        {day.format('ddd')}
                                    </div>
                                    <div className={`text-lg font-semibold 
                                            ${isToday
                                            ? 'bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto'
                                            : ''}`}>
                                        {day.format('DD')}
                                    </div>
                                    {completedTasks.length > 0 && (
                                        <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                                            <Check className="w-3 h-3 text-green-600" />
                                            {completedTasks.length}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="space-y-2">
                                    {completedTasks.map(task => {
                                        return (
                                            <div
                                                key={task.id}
                                                className="text-xs rounded px-2 py-2 bg-white border">
                                                <div className="flex items-center gap-1 mb-1">
                                                    <Check className="w-3 h-3 shrink-0 text-green-600" />
                                                    <span className="text-gray-600 truncate">
                                                        {task.title}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
// week　viewで今日の日付のボーダーを
export default WeekView