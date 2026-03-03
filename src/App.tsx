import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login/Login'
import DocumentsList from './pages/DocumentsList/DocumentsList'
import Home from './pages/Home/Home'
import Checklists from './pages/Checklists/Checklists'
import ExpiredLogin from './pages/ExpiredLogin/ExpiredLogin'
import ErrorPage from './pages/Error/ErrorPage'

import { useState, useEffect } from 'react'
import type { UsuarioDTO } from './dto/UsuarioDTO'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {

  const [novoLayout, setNovoLayout] = useState(false)
  const [user, setUser] = useState<UsuarioDTO | null>(null)

  useEffect(() => {
    (window as any).hideLoading?.();
  }, []);

  return (
    <>
      <Routes>

        {/* ROTAS PÚBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/ExpiredLogin" element={<ExpiredLogin />} />
        <Route path="/Error" element={<ErrorPage />} />

        {/* ÁREA LOGADA */}
        <Route element={<AppLayout setUser={setUser} user={user} />}>

          {/* LISTAGEM */}
          <Route
            path="/home"
            element={<DocumentsList setNovoLayout={setNovoLayout} />}
          />

          {/* EDIÇÃO / VISUALIZAÇÃO */}
          <Route
            path="/home/:id/:idVersao"
            element={
              <Home
                novoLayout={novoLayout}
                setNovoLayout={setNovoLayout}
                user={user}
              />
            }
          />

          <Route path="/checklists" element={<Checklists />} />

        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>

      {/* ⭐ TOAST GLOBAL */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  )
}