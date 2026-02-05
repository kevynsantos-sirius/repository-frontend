export default function TopHeader() {

  function handleLogout() {
    // depois você liga no backend
    console.log('logout')
  }

  return (
    <header className="top-header d-flex justify-content-between align-items-center px-4 py-2 border-bottom bg-white">

      <strong className="logo">
        Sistema de Documentos
      </strong>

      <div className="d-flex align-items-center gap-3">

        <span className="text-muted">
          Administrador
        </span>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}
        >
          Sair
        </button>

      </div>
    </header>
  )
}
