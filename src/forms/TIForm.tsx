import type { Layout } from '../pages/Home/Home'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  layouts: Layout[]
  setLayouts: Dispatch<SetStateAction<Layout[]>>
}

export default function TIForm({ layouts, setLayouts }: Props) {

  function adicionarLayout() {
    setLayouts(prev => [
      ...prev,
      {
        id: Date.now(),
        nomeArquivo: `Layout ${prev.length + 1}`,
        massas: []
      }
    ])
  }

  return (
    <form className="card form-card p-3">

      <div className="card-header bg-white border-0 pb-0">
        <h5 className="mb-0">TI – Layout e Forma de Envio</h5>
      </div>

      <div className="card-body pt-3">

        {/* TEM LAYOUT */}
        <div className="form-switch m-3">
          <input className="form-check-input" type="checkbox" defaultChecked />
          <label className="form-check-label">Tem layout?</label>
        </div>

        {/* LISTA DE LAYOUTS */}
        <div className="m-3">

          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">Layouts</h6>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={adicionarLayout}
            >
              + Adicionar Layout
            </button>
          </div>

          {layouts.length === 0 && (
            <div className="border rounded p-3 text-muted">
              Nenhum layout adicionado
            </div>
          )}

          {layouts.map(layout => (
            <div key={layout.id} className="border rounded p-3 mb-2">
              <strong>{layout.nomeArquivo}</strong>
              <small className="d-block text-muted">
                {layout.massas.length} massas
              </small>
            </div>
          ))}

        </div>

        <hr className="my-4" />

        {/* FORMA DE ENVIO */}
        <div className="m-3">
          <label className="fw-semibold mb-2">Forma de envio</label>

          <div className="d-flex gap-4 mt-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Via serviço</label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Arquivo .txt</label>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 m-3">
          <button type="button" className="btn btn-salvar">Salvar</button>
          <button type="button" className="btn btn-cancelar">Cancelar</button>
        </div>

      </div>
    </form>
  )
}
