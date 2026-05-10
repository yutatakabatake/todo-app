import { NavLink } from 'react-router'
import { ListTodo, Folder, Calendar, ChartPie } from 'lucide-react';

const NAV_ITEMS = [
    { path: "/", icon: ListTodo, label: 'Tasks' },
    { path: "/project", icon: Folder, label: 'Projects' },
    { path: "/calender", icon: Calendar, label: 'Calender' },
    { path: "/24h", icon: ChartPie, label: '24h' }
];

function Navigation() {
    return (
        <header className='bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-10'>
            <nav>
                <div className='flex items-center justify-between sm:block'>
                    <h1 className='font-bold text-xl sm:text-2xl sm:mb-4'>TODO APP</h1>
                    <div className='flex gap-2 sm:gap-6'>
                        {NAV_ITEMS.map(item => {
                            const Icon = item.icon;

                            return (<NavLink
                                key={item.label}
                                to={item.path}
                                className={
                                    ({ isActive, isPending }) =>
                                        `flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl
                                        ${isPending ? '' : isActive ? 'bg-blue-400 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <Icon className="w-5 h-5" />
                                <span className='hidden sm:inline'>{item.label}</span>
                            </NavLink>);
                        })}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navigation
