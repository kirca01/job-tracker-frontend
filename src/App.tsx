import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AddApplicationPage from './pages/AddApplicationPage'
import EditApplicationPage from './pages/EditApplicationPage'
import StatsPage from './pages/StatsPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />
        <Route path="/add" element={
          <ProtectedRoute><AddApplicationPage /></ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute><EditApplicationPage /></ProtectedRoute>
        } />
        <Route path="/stats" element={
          <ProtectedRoute><StatsPage /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
export default App