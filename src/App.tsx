import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Navigation from './components/Navigation'
import TaskList from './pages/TaskList';
import Calender from './pages/Calender';
import Project from './pages/Project';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/calender' element={<Calender />} />
        <Route path='/project' element={<Project />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
