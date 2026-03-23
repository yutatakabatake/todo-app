import dayjs from "dayjs";
import { getCalendarDays, getCompletedTasksForDate } from "../util/dayUtils";
import { useContext } from 'react';
import { AppContext } from '../context/AppContextProvider';
import { Check } from "lucide-react";
import CalenderInfo from "./CalenderInfo";

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
type Props = {
    toggle: boolean
}

function MonthView(props: Props) {
    const { toggle } = props;
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }
    const { tasks } = context;

    const today = dayjs();
    const currentMonth = today.month() + 1;
    const calenderDays = getCalendarDays(today);
    return (
        <div className="flex flex-col h-full">
            <CalenderInfo
                date={today}
                toggle={toggle} />

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
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

                    <div className="grid grid-cols-7 gap-2">
                        {calenderDays.map((day, index) => {
                            const isCurrentMonth = day.month() + 1 === currentMonth;
                            const isToday = today.isSame(day, 'day');
                            const isSunday = index % 7 === 0;
                            const isSaturday = index % 7 === 6;
                            const completedTasks = getCompletedTasksForDate(tasks, day);

                            return (
                                <div
                                    key={day.format('YYYY/MM/DD')}
                                    className={`min-h-30 border rounded-lg p-2 cursor-pointer transition-all hover:shadow-md
                                        ${isToday ? 'bg-blue-50 border-blue-500 border-2' : 'bg-white'}
                                        ${!isCurrentMonth ? 'opacity-40' : ''}`}
                                    onClick={() => alert('click')}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span
                                            className={`text-sm font-medium ${isToday
                                                ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                                                : isSunday
                                                    ? 'text-red-600'
                                                    : isSaturday
                                                        ? 'text-blue-600'
                                                        : 'text-gray-700'
                                                }`}>
                                            {day.format('DD')}
                                        </span>
                                        {completedTasks.length > 0 && (
                                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                                <Check className="w-3 h-3 text-green-600" />
                                                {completedTasks.length}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        {completedTasks.map(task => {
                                            return (
                                                <div
                                                    key={task.id}
                                                    className="text-xs rounded px-2 py-1 truncate flex items-center gap-1 bg-gray-50">
                                                    <Check className="w-3 h-3 shrink-0 text-green-600" />
                                                    <span className="text-gray-600">
                                                        {task.title}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                        {completedTasks.length > 3 && (
                                            <div className="text-xs text-gray-500 text-center">
                                                +{completedTasks.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonthView