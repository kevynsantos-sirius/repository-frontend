import AppLayout from '../../layouts/AppLayout'
import SubmenuHeader from '../../components/SubmenuHeader/SubmenuHeader'

export default function Modelo() {
  return (
    <AppLayout>

      <SubmenuHeader active="modelo" />

      <form className="card p-4">

        <div className="mb-3">
          <label>Nome do Modelo</label>
          <input className="form-control" />
        </div>

        <div className="mb-3">
          <label>Descrição</label>
          <textarea className="form-control" rows={4}></textarea>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Status</label>
            <select className="form-select">
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>

          <div className="col-md-6">
            <label>Versão</label>
            <input className="form-control" />
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
