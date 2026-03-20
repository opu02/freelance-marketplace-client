import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AllJobs from './pages/AllJobs'
import JobDetails from './pages/JobDetails'
import AddJob from './pages/AddJob'
import MyAddedJobs from './pages/MyAddedJobs'
import MyAcceptedTasks from './pages/MyAcceptedTasks'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/allJobs" element={<AllJobs />} />

          {/* Private routes */}
          <Route path="/allJobs/:id" element={
            <PrivateRoute><JobDetails /></PrivateRoute>
          } />
          <Route path="/addJob" element={
            <PrivateRoute><AddJob /></PrivateRoute>
          } />
          <Route path="/myAddedJobs" element={
            <PrivateRoute><MyAddedJobs /></PrivateRoute>
          } />
          <Route path="/my-accepted-tasks" element={
            <PrivateRoute><MyAcceptedTasks /></PrivateRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
