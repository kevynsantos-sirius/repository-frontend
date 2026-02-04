export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-wrapper">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="logo">PADD</div>

        <button className="btn-novo active mb-3">
          Novo Documento
        </button>

        <ul className="lista-versoes" id="listaVersoesLateral">
          <li className="atual">
            <small>Doc 4999 - Inclusão massa</small>
            <small>Versão 10 - 26/01</small>
          </li>
          <li>
            <small>Doc 4999 - Inclusão massa</small>
            <small>Versão 9 - 12/01</small>
          </li>
        </ul>

        <div className="sidebar-user-footer mt-auto">
          <div className="avatar-circle">KS</div>
          <div className="ms-2">
            <div className="nome-usuario">Kevyn Santos</div>
            <button className="btn-logout mt-1">Sair</button>
          </div>
        </div>

      </aside>

      {/* CONTEÚDO */}
      <main className="content-area p-4">
        {children}
      </main>

    </div>
  )
}
