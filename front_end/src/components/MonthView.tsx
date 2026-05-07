import dayjs from "dayjs";
import { getCalendarDays, getCompletedTasksForDate } from "../util/dayUtils";
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContextProvider';
import { Check } from "lucide-react";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Task from "./Task";
import { IconButton } from "@mui/material";
import { green } from '@mui/material/colors';
import AddTaskFormDialog from "./AddTaskFormDialog";

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekDaysMobile = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
type Props = {
    today: dayjs.Dayjs
    monthStartDate: dayjs.Dayjs
}
function MonthView(props: Props) {
    const { today, monthStartDate } = props;
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }
    const { tasks } = context;
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openAddTaskForm, setOpenAddTaskForm] = useState(false);
    const [date, setDate] = useState(today);

    const currentMonth = monthStartDate.month() + 1;
    const calenderDays = getCalendarDays(monthStartDate);

    const toggleDrawer = (newOpen: boolean, day: dayjs.Dayjs) => () => {
        setDate(day);
        setOpenDrawer(newOpen);
    };

    function handleOpenAddTaskForm(event: React.MouseEvent) {
        event.stopPropagation();
        setOpenAddTaskForm(true);
    }

    function handleCloseAddTaskForm() {
        setOpenAddTaskForm(false);
    }

    const DrawerList = (
        <>
            <Box sx={{ width: { xs: '100vw', sm: 300 }, maxWidth: '100vw' }} role="presentation" onClick={toggleDrawer(false, date)}>
                <div className="flex justify-between items-center px-3 sm:px-4 py-2">
                    <div className="text-lg sm:text-2xl font-semibold">
                        {date.format('YYYY/MM/DD')}
                    </div>
                    <IconButton sx={{ color: green[400] }} onClick={handleOpenAddTaskForm} size="small">
                        <AddCircleOutlineRoundedIcon />
                    </IconButton>
                </div>
                <List>
                    {tasks.filter(task => task.done_date === date.format('YYYY/MM/DD') || task.task_date === date.format('YYYY/MM/DD'))
                        .map(task => {
                            return (
                                <ListItem key={task.id}>
                                    <Task
                                        key={task.id}
                                        task={task}
                                        isInTable={false} />
                                </ListItem>
                            );
                        })}
                </List>
            </Box >
            <AddTaskFormDialog
                open={openAddTaskForm}
                handleClose={handleCloseAddTaskForm} />
        </>
    );

    return (
        <>
            <div className="flex flex-col h-full">
                <div className="bg-white z-10 border-b border-gray-200 px-3 sm:px-6 py-2 sticky top-0">
                    <h3 className="text-base sm:text-xl font-semibold">
                        {`${monthStartDate.format('YYYY')} ${monthStartDate.format('MMMM')}`}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Done tasks</p>
                </div>

                <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-gray-50">
                    <div className="overflow-hidden">
                        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-1 sm:mb-2">
                            {weekDays.map((day, index) => (
                                <div
                                    key={index}
                                    className={`text-center font-medium py-1 sm:py-2 text-xs sm:text-sm ${index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-700'
                                        }`}>
                                    <span className="hidden sm:inline">{day}</span>
                                    <span className="sm:hidden">{weekDaysMobile[index]}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1 sm:gap-2">
                            {calenderDays.map((day, index) => {
                                const isCurrentMonth = day.month() + 1 === currentMonth;
                                const isToday = today.isSame(day, 'day');
                                const isSunday = index % 7 === 0;
                                const isSaturday = index % 7 === 6;
                                const completedTasks = getCompletedTasksForDate(tasks, day);

                                return (
                                    <div
                                        key={day.format('YYYY/MM/DD')}
                                        className={`min-h-16 sm:min-h-30 border rounded-md sm:rounded-lg p-1 sm:p-2 cursor-pointer transition-all hover:shadow-md
                                        ${isToday ? 'bg-blue-50 border-blue-500 border-2' : 'bg-white border-gray-200'}
                                        ${!isCurrentMonth ? 'opacity-40' : ''}`}
                                        onClick={toggleDrawer(true, day)}>
                                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                                            <span
                                                className={`text-xs sm:text-sm font-medium ${isToday
                                                    ? 'bg-blue-600 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center'
                                                    : isSunday
                                                        ? 'text-red-600'
                                                        : isSaturday
                                                            ? 'text-blue-600'
                                                            : 'text-gray-700'
                                                    }`}>
                                                {day.format('D')}
                                            </span>
                                            {completedTasks.length > 0 && (
                                                <div className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-0.5 sm:gap-1">
                                                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                                                    <span className="hidden sm:inline">{completedTasks.length}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Hide task list on mobile, show only count badge */}
                                        <div className="hidden sm:block space-y-1">
                                            {completedTasks.slice(0, 2).map(task => {
                                                return (
                                                    <div
                                                        key={task.id}
                                                        className="text-xs rounded px-2 py-1 truncate flex items-center gap-1 bg-gray-50 border-green-600 border">
                                                        <Check className="w-3 h-3 shrink-0 text-green-600" />
                                                        <span className="text-gray-600">
                                                            {task.title}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                            {completedTasks.length > 3 && (
                                                <div className="text-xs text-gray-500 text-center">
                                                    +{completedTasks.length - 2}
                                                </div>
                                            )}
                                        </div>
                                        {/* Mobile: show count badge if more than 0 completed tasks */}
                                        {completedTasks.length > 0 && (
                                            <div className="sm:hidden text-center">
                                                <span className="inline-flex items-center justify-center w-4 h-4 text-[9px] bg-green-100 text-green-700 rounded-full">
                                                    {completedTasks.length}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false, date)}>
                {DrawerList}
            </Drawer>
        </>
    )
}

export default MonthView
