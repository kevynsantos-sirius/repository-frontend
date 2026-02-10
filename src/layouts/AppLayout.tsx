import { Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../services/authService'

export default function AppLayout() {
  const navigate = useNavigate()

  function logoutUser() {
    // limpar token, session, etc
    logout();
    navigate('/login')
  }

  return (
    <>
      <header className="topbar d-flex justify-content-between align-items-center p-3 border-bottom">
        <strong>Meu Sistema</strong>

        <div className="d-flex align-items-center gap-3">
          <span>Administrador</span>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={logoutUser}
          >
            Sair
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}
