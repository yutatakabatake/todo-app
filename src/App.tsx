import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Navigation from './components/Navigation'
import TaskList from './pages/TaskList';
import Calender from './pages/Calender';
import Project from './pages/Project';

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col bg-gray-50">
        <Navigation />
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/calender' element={<Calender />} />
          <Route path='/project' element={<Project />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
