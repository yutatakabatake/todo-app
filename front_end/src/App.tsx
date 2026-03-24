import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Navigation from './components/Navigation'
import TaskList from './pages/TaskList';
import Project from './pages/Project';
import AppContextProvider from './context/AppContextProvider';
import Calendar from './pages/Calender';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <div className="h-screen flex flex-col bg-gray-50">
          <Navigation />
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/project' element={<Project />} />
            <Route path='/calender' element={<Calendar />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContextProvider>
  )
}

export default App
