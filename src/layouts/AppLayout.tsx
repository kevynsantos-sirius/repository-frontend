import { Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../services/authService'
import { useEffect } from 'react'
import { getUserName } from '../services/authService'

type AppLayoutProps = {
  userName: string
  setUserName: React.Dispatch<React.SetStateAction<string>>
}

export default function AppLayout({
  userName,
  setUserName
}: AppLayoutProps) {
  const navigate = useNavigate()

  useEffect(() => {
    const carregarNome = async () => {
      const name = await getUserName();
      setUserName(name);
    };

    carregarNome();
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
          <span>{userName}</span>
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
