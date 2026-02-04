import AppLayout from '../../layouts/AppLayout'

export default function Identificacao() {
  return (
    <AppLayout>

      <div className="content-header">
        <div className="submenu-top">
          <button className="submenu-item active">Identificação</button>
          <button className="submenu-item">TI</button>
        </div>
      </div>

      <form className="card p-4">
        <div className="mb-3">
          <label>Nome do Documento</label>
          <input className="form-control" />
        </div>

        <button className="btn btn-salvar">Salvar</button>
      </form>

    </AppLayout>
  )
}
