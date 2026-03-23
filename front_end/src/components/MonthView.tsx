import dayjs from "dayjs";
import { getCalendarDays, getCompletedTasksForDate } from "../util/dayUtils";
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContextProvider';
import { Check } from "lucide-react";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
    const [open, setOpen] = useState(false);

    const currentMonth = monthStartDate.month() + 1;
    const calenderDays = getCalendarDays(monthStartDate);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <div className="flex flex-col h-full">
                <div className="bg-white z-10 border-b px-6 py-2 sticky top-0">
                    <h3 className="text-xl font-semibold">
                        {`${monthStartDate.format('YYYY')} ${monthStartDate.format('MMMM')}`}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Done tasks</p>
                </div>

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
                                        onClick={toggleDrawer(true)}>
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
                                                {day.format('D')}
                                            </span>
                                            {completedTasks.length > 0 && (
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Check className="w-3 h-3 text-green-600" />
                                                    {completedTasks.length}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            {completedTasks.slice(0, 2).map(task => {
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
                                                    +{completedTasks.length - 2}
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

            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    )
}

export default MonthView