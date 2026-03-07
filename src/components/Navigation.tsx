import { BrowserRouter, Link, Route, Routes } from 'react-router'
import TaskList from '../pages/TaskList';
import Calender from '../pages/Calender';
import Project from '../pages/Project';
import { ListTodo, Calendar, Folder } from 'lucide-react';

function Navigation() {
    return (
        <BrowserRouter>
            <header className='border-b px-6 py-4 sticky top-0 z-0'>
                <nav>
                    <h1 className='font-bold text-2xl mb-4'>TODO APP</h1>
                    <div className='flex gap-6'>
                        <Link to="/" className='flex bg-blue-400 gap-1 px-4 py-2 rounded-xl'><ListTodo />Tasks</Link>
                        <Link to="/calender" className='flex'><Calendar />Calender</Link>
                        <Link to="/project" className='flex'><Folder />Project</Link>
                    </div>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<TaskList />} />
                <Route path='/calender' element={<Calender />} />
                <Route path='/project' element={<Project />} />
            </Routes>
        </BrowserRouter >
    )
}

export default Navigation