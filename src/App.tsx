import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AddApplicationPage from './pages/AddApplicationPage'
import EditApplicationPage from './pages/EditApplicationPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add" element={<AddApplicationPage />} />
        <Route path="/edit/:id" element={<EditApplicationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App