import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login/Login'
import DocumentsList from './pages/DocumentsList/DocumentsList'
import Home from './pages/Home/Home'
import Checklists from './pages/Checklists/Checklists'

export default function App() {
  return (
    <Routes>

      {/* ROTA PÚBLICA */}
      <Route path="/login" element={<Login />} />

      {/* ÁREA LOGADA */}
      <Route element={<AppLayout />}>

        {/* LISTAGEM */}
        <Route path="/home" element={<DocumentsList />} />

        {/* EDIÇÃO / VISUALIZAÇÃO */}
        <Route path="/home/:id/:idVersao" element={<Home />} />

        <Route path="/checklists" element={<Checklists />} />

      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  )
}
