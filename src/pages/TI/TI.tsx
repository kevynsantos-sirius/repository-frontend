import AppLayout from '../../layouts/AppLayout'

export default function TI() {
  return (
    <AppLayout>

      {/* HEADER / SUBMENU */}
      <div className="content-header">
        <div className="submenu-top">
          <button className="submenu-item">Identificação</button>
          <button className="submenu-item active">TI</button>
          <button className="submenu-item">Checklists</button>
          <button className="submenu-item">Modelo</button>
        </div>

        <button className="btn btn-outline-secondary btn-versoes">
          Versões
        </button>
      </div>

      {/* FORMULÁRIO */}
      <form className="card p-4">

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Sistema</label>
            <input className="form-control" />
          </div>

          <div className="col-md-6">
            <label>Responsável</label>
            <input className="form-control" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Ambiente</label>
            <select className="form-select">
              <option>Produção</option>
              <option>Homologação</option>
            </select>
          </div>

          <div className="col-md-6">
            <label>Backup</label>
            <select className="form-select">
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button type="button" className="btn btn-salvar">
            Salvar
          </button>

          <button type="button" className="btn btn-cancelar">
            Cancelar
          </button>
        </div>

      </form>

    </AppLayout>
  )
}
