export default function IdentificacaoForm() {
  return (
    <form
      id="formIdentificacao"
      className="card form-card p-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="card-header bg-white border-0 pb-0">
        <h5 className="mb-0">Identificação do Documento</h5>
      </div>

      <div className="card-body pt-3">

        {/* Linha 1 */}
        <div className="row m-3">
          <div className="col-md-6">
            <label className="form-label">
              Nome do documento <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="nomeDocumento"
              className="form-control"
              maxLength={50}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Ramo <span className="text-danger">*</span>
            </label>
            <select
              id="ramo"
              className="form-control filter-option-inner"
              required
            >
              <option value="">Selecione</option>
              <option value="1">CAPITALIZAÇÃO</option>
              <option value="2">PREVIDÊNCIA</option>
              <option value="3">SEGUROS</option>
              <option value="4">FUNDO DE PENSÃO</option>
            </select>
          </div>
        </div>

        {/* Linha 2 */}
        <div className="row m-3">
          <div className="col-md-6">
            <label className="form-label">
              Status <span className="text-danger">*</span>
            </label>
            <select
              id="statusDocumento"
              className="form-control"
              required
            >
              <option value="">Selecione</option>
              <option value="1">1 - Ativo</option>
              <option value="2">2 - Inativo</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Centro de custo <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="centroCusto"
              className="form-control"
              maxLength={5}
              required
            />
          </div>
        </div>

        {/* Linha 3 */}
        <div className="row m-3">
          <div className="col-md-6">
            <label className="form-label">
              Responsável <span className="text-danger">*</span>
            </label>

            <span className="form-control" id="responsavelNome">
              Administrador
            </span>

            <input type="hidden" id="responsavel" value="1" />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Identificação da demanda <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="demanda"
              className="form-control"
              maxLength={50}
              required
            />
          </div>
        </div>

        {/* Linha 4 – Checkboxes */}
        <div className="row m-5">
          <div className="col-md-6">

            <div className="form-label">
              <input
                type="checkbox"
                className="form-check-input"
                id="isIcatu"
              />
              <label className="form-check-label ms-2" htmlFor="isIcatu">
                Documento Icatu?
              </label>
            </div>

            <div className="form-label">
              <input
                type="checkbox"
                className="form-check-input"
                id="isRG"
              />
              <label className="form-check-label ms-2" htmlFor="isRG">
                Documento Rio Grande?
              </label>
            </div>

            <div className="form-label">
              <input
                type="checkbox"
                className="form-check-input"
                id="isCaixa"
              />
              <label className="form-check-label ms-2" htmlFor="isCaixa">
                Documento Caixa?
              </label>
            </div>

          </div>
        </div>

        {/* Ações */}
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
