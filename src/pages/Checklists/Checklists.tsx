import AppLayout from '../../layouts/AppLayout'
import SubmenuHeader from '../../components/SubmenuHeader/SubmenuHeader'

export default function Checklists() {
  return (
    <AppLayout>


      <SubmenuHeader
        active="ti"
        onChange={() => {}}
      />


      <div className="card p-4">

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Categoria</label>
            <select className="form-select">
              <option>Selecione</option>
              <option>Obrigatório</option>
              <option>Opcional</option>
            </select>
          </div>

          <div className="col-md-6">
            <label>Status</label>
            <select className="form-select">
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Obrigatório</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Documento assinado</td>
                <td>Sim</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary">
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-salvar">
            Salvar
          </button>

          <button className="btn btn-cancelar">
            Cancelar
          </button>
        </div>

      </div>

    </AppLayout>
  )
}
