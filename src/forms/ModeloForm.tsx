export default function ModeloForm() {
  return (
    <div id="aba-modelo" className="aba" style={{ display: 'block' }}>
      <div id="modelo" className="card form-card">

        <div className="card-header bg-white border-0 pb-0">
          <h5 className="mb-0">Modelo do Documento</h5>
        </div>

        <div className="card-body pt-3">
          <form id="formModelo" onSubmit={(e) => e.preventDefault()}>

            {/* Nome Recurso */}
            {/* <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Nome Recurso</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome Recurso"
                  maxLength={100}
                  disabled
                />
              </div>
            </div> */}

            {/* Arquivo Modelo */}
            {/* <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Arquivo de Modelo</label>
                <input
                  type="file"
                  className="form-control"
                  id="arquivoModelo"
                  name="arquivoModelo"
                />
              </div>
            </div> */}

            {/* Observação */}
            {/* <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Observação</label>

                <div
                  id="toolbar-observacao"
                  className="border rounded p-2 mb-2 text-muted"
                >
                  Toolbar do editor (placeholder)
                </div>

                <div
                  id="editor-observacao"
                  className="quillLayout"
                  style={{ background: 'white', height: '100px' }}
                />

                <input
                  type="hidden"
                  name="observacao"
                  id="observacao-hidden"
                  className="obsLayoutHidden"
                />
              </div>
            </div> */}

            {/* Impresso / CRC / Duplex */}
            {/* <div className="row mb-3">
              <div className="col-md-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkImpresso"
                  />
                  <label className="form-check-label" htmlFor="checkImpresso">
                    Impresso
                  </label>
                </div>
              </div> */}

              {/* <div className="col-md-4">
                <div className="form-check">
                  <input
                    className="form-check-input d-none"
                    type="checkbox"
                    id="checkCrc"
                  />
                  <label
                    className="form-check-label d-none"
                    htmlFor="checkCrc"
                  >
                    CRC
                  </label>
                </div>
              </div> */}

              {/* <div className="col-md-4">
                <div className="form-check">
                  <input
                    className="form-check-input d-none"
                    type="checkbox"
                    id="checkDuplex"
                  />
                  <label
                    className="form-check-label d-none"
                    htmlFor="checkDuplex"
                  >
                    Duplex
                  </label>
                </div>
              </div>
            </div> */}

            {/* Pré-impresso / Acabamento */}
            {/* <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Pré Impresso</label>
                <select id="preImpresso" className="form-select">
                  <option value="">Nenhum</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label d-none">Acabamento</label>
                <select id="acabamento" className="form-select d-none">
                  <option value="">Nenhum</option>
                  <option value="1">Autoenvelopado A3</option>
                  <option value="2">Autoenvelopado A4</option>
                  <option value="3">Envelopado A4</option>
                </select>
              </div>
            </div> */}

            {/* Armazenamento */}
            {/* <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkArmazenamento"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="checkArmazenamento"
                  >
                    Armazenamento
                  </label>
                </div>
              </div>

              <div className="col-md-6 d-none">
                <label className="form-label">Tempo Armazenamento</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Dias de Tempo Armazenamento"
                />
              </div>
            </div> */}

            {/* Campos de Busca */}
            {/* <h6>Campos de Busca</h6>

            <div className="card">
              <div className="row mb-3 ms-4 mt-2">

                <div className="col-md-2">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">BackOffice</label>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Cliente</label>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Corretor</label>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Estipulante</label>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Subestipulante</label>
                  </div>
                </div>

              </div>
            </div> */}

            {/* Ações */}
            <div className="d-flex gap-2 mt-3">
              <button type="button" className="btn btn-salvar">
                Salvar
              </button>

              <button type="button" className="btn btn-cancelar">
                Cancelar
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}
