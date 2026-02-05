export default function IdentificacaoForm() {
  return (
    <form className="card form-card p-3">

      <div className="card-header bg-white border-0 pb-0">
        <h5 className="mb-0">Identificação do Documento</h5>
      </div>

      <div className="card-body pt-3">

        <div className="row m-3">
          <div className="col-md-6">
            <label className="form-label">
              Nome do documento <span className="text-danger">*</span>
            </label>
            <input type="text" className="form-control" maxLength={50} />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Ramo <span className="text-danger">*</span>
            </label>
            <select className="form-control">
              <option value="">Selecione</option>
            </select>
          </div>
        </div>

        <div className="row m-3">
          <div className="col-md-6">
            <label className="form-label">
              Status <span className="text-danger">*</span>
            </label>
            <select className="form-control">
              <option value="">Selecione</option>
              <option value="1">1 - Ativo</option>
              <option value="2">2 - Inativo</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Centro de custo <span className="text-danger">*</span>
            </label>
            <input type="text" className="form-control" maxLength={5} />
          </div>
        </div>

        <div className="row m-3">
          <div className="col-md-6">
            <label className="form-label">
              Responsável <span className="text-danger">*</span>
            </label>
            <span className="form-control bg-light">—</span>
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Identificação da demanda <span className="text-danger">*</span>
            </label>
            <input type="text" className="form-control" maxLength={50} />
          </div>
        </div>

        <div className="row m-5">
          <div className="col-md-6">

            <div className="form-check mb-2">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">
                Documento Icatu?
              </label>
            </div>

            <div className="form-check mb-2">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">
                Documento Rio Grande?
              </label>
            </div>

          </div>
        </div>

        <div className="d-flex gap-2 m-3">
          <button type="button" className="btn btn-salvar">
            Salvar
          </button>
          <button type="button" className="btn btn-cancelar">
            Cancelar
          </button>
        </div>

      </div>
    </form>
  )
}
