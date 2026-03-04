import { Outlet, useNavigate } from 'react-router-dom'
import { logout, getUser } from '../services/authService'
import { useEffect } from 'react'
import type { UsuarioDTO } from '../dto/UsuarioDTO'
import logo from '../assets/images/checklist_docs_logo.png'

type AppLayoutProps = {
  user: UsuarioDTO | null
  setUser: React.Dispatch<React.SetStateAction<UsuarioDTO | null>>
}

export default function AppLayout({
  user,
  setUser
}: AppLayoutProps) {
  const navigate = useNavigate()

  useEffect(() => {
    const carregarUsuario = async () => {
      const user = await getUser();
      setUser(user)
    }

    carregarUsuario()
  }, [])

  function logoutUser() {
    logout()
    navigate('/login')
  }

  return (
    <>
      <header className="topbar d-flex justify-content-between align-items-center p-3 border-bottom">

        {/* 🔹 Logo no lugar do texto */}
        <img
          src={logo}
          alt="Checklist Docs"
          style={{ height: 40, cursor: 'pointer' }}
          onClick={() => navigate('/home')}
        />


        <div className="d-flex align-items-center gap-3">
            <span>
              {user?.admin ? (
                <a
                  onClick={() => navigate('/admin/users')}
                  className="admin-badge"
                  role="button"
                >
                  👑 {user?.nomeUsuario}
                </a>
              ) : (
                <span>{user?.nomeUsuario}</span>
              )}
            </span>
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
