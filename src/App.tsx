import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Checklists from './pages/Checklists/Checklists'

export default function App() {
  return (
    <Routes>

      {/* ROTA PÚBLICA */}
      <Route path="/login" element={<Login />} />

      {/* ÁREA LOGADA */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/checklists" element={<Checklists />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  )
}
