import { NavLink } from 'react-router'
import { ListTodo, Calendar, Folder } from 'lucide-react';

const NAV_ITEMS = [
    { path: "/", icon: ListTodo, label: 'Tasks' },
    { path: "/calender", icon: Calendar, label: 'Calender' },
    { path: "/project", icon: Folder, label: 'Projects' },
];

function Navigation() {
    return (
        <header className='border-b px-6 py-4 sticky top-0 z-0'>
            <nav>
                <h1 className='font-bold text-2xl mb-4'>TODO APP</h1>
                <div className='flex gap-6'>
                    {NAV_ITEMS.map(item => {
                        const Icon = item.icon;

                        return (<NavLink
                            key={item.label}
                            to={item.path}
                            className={
                                ({ isActive, isPending }) =>
                                    `flex gap-1 px-4 py-2 rounded-xl
                                    ${isPending ? '' : isActive ? 'bg-blue-400 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <Icon />
                            {item.label}
                        </NavLink>);
                    })}
                </div>
            </nav>
        </header>
    )
}

export default Navigation