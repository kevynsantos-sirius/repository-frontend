// pages/Home/Home.tsx
import AppLayout from '../../layouts/AppLayout'

export default function Home() {
  return (
    <AppLayout>

      <div className="content-header">
        <div className="submenu-top">
          <button className="submenu-item active">Identificação</button>
          <button className="submenu-item">TI</button>
          <button className="submenu-item">Checklists</button>
          <button className="submenu-item">Modelo</button>
        </div>

        <button className="btn btn-outline-secondary btn-versoes">
          Versões
        </button>
      </div>

      <div className="card p-4">
        <h5>Selecione uma opção no menu</h5>
      </div>

    </AppLayout>
  )
}
