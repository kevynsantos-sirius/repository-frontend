import { Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../services/authService'
import { useEffect } from 'react'
import { getUser } from '../services/authService'
import type { UsuarioDTO } from '../dto/UsuarioDTO'

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
      setUser(user);
    };

    carregarUsuario();
  }, []);


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
          <span>{user?.nomeUsuario}</span>
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
