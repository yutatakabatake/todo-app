import { BrowserRouter, Link, Route, Routes } from 'react-router'
import TaskList from '../pages/TaskList';
import Calender from '../pages/Calender';
import Project from '../pages/Project';



function Navigation() {
    return (
        <>
            <BrowserRouter>
                <nav>
                    <h1>TODO APP</h1>
                    <Link to="/">Tasks</Link>
                    <Link to="/calender">Calender</Link>
                    <Link to="/project">Project</Link>
                </nav>

                <Routes>
                    <Route path='/' element={<TaskList />} />
                    <Route path='/calender' element={<Calender />} />
                    <Route path='/project' element={<Project />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Navigation