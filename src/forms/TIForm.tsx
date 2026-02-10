import type { Layout, Massa } from '../types/types'

type Props = {
  modo: 'layout' | 'massa' | null
  layout: Layout | null
  massa: Massa | null
}

export default function TIForm({
  modo,
  layout,
  massa
}: Props) {

  if (!modo) {
    return (
      <div className="card p-4 text-muted">
        Selecione um layout ou uma massa ao lado
      </div>
    )
  }

  /* =========================
     FORM LAYOUT
     ========================= */
  if (modo === 'layout' && layout) {
    return (
      <form className="card p-4">
        <h5 className="mb-3">Layout</h5>

        <label className="form-label">
          Nome do Layout
        </label>
        <input
          type="text"
          className="form-control mb-3"
          value={layout.nomeLayout}
          onChange={() => {}}
        />

        <label className="form-label">
          Arquivo do Layout
        </label>
        <input
          type="file"
          className="form-control mb-3"
        />

        <label className="form-label">
          Observação
        </label>
        <textarea
          className="form-control"
          rows={4}
          value={layout.observacao}
          onChange={() => {}}
        />

        <div className="mt-3">
          <button
            type="button"
            className="btn btn-primary"
          >
            Salvar Layout
          </button>
        </div>
      </form>
    )
  }

  /* =========================
     FORM MASSA
     ========================= */
  if (modo === 'massa' && massa) {
    return (
      <form className="card p-4">
        <h5 className="mb-3">Massa</h5>

        <label className="form-label">
          Arquivo da Massa
        </label>
        <input
          type="file"
          className="form-control mb-3"
        />

        <label className="form-label">
          Observação
        </label>
        <textarea
          className="form-control"
          rows={4}
          value={massa.observacao}
          onChange={() => {}}
        />

        <div className="mt-3">
          <button
            type="button"
            className="btn btn-primary"
          >
            Salvar Massa
          </button>
        </div>
      </form>
    )
  }

  return null
}
