import type { Layout, Massa } from '../types/types'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  modo: 'layout' | 'massa' | null
  layout: Layout | null
  massa: Massa | null

  onAddLayout(layout: Layout): void
  onAddMassa(layoutId: string, massa: Massa): void

  onChangeLayout(layout: Layout): void
  onChangeMassa(layoutId: string, massa: Massa): void

  onRemoverLayout(layoutId: string): void
  onRemoverMassa(layoutId: string, massaId: string): void

  filesLayout: Record<string, File[]>
  filesMassas: Record<string, File[]>

  setFilesLayout: Dispatch<SetStateAction<Record<string, File[]>>>
  setFilesMassas: Dispatch<SetStateAction<Record<string, File[]>>>
}

export default function TIForm({
  modo,
  layout,
  massa,
  onAddLayout,
  onAddMassa,
  onChangeLayout,
  onChangeMassa,
  onRemoverLayout,
  onRemoverMassa,
  filesLayout,
  filesMassas,
  setFilesLayout,
  setFilesMassas
}: Props) {

  if (!modo) {
    return <div className="card p-4 text-muted">Selecione um layout ou uma massa</div>
  }

  /* ================= LAYOUT ================= */

  if (modo === 'layout' && layout) {

    const arquivo = filesLayout[layout.id]?.[0]

    const isNovo = !layout.nomeLayout

    return (
      <form className="card p-4">
        <h5>Layout</h5>

        <label>Arquivo do Layout</label>

        {arquivo && (
          <div className="mb-2 text-primary fw-semibold">
            {arquivo.name}
          </div>
        )}

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            // 🔥 SOBRESCREVE — apenas 1 arquivo
            setFilesLayout(prev => ({
              ...prev,
              [layout.id]: [file]
            }))

            if (isNovo) {
              onChangeLayout({
                ...layout,
                nomeLayout: file.name
              })
            }
          }}
        />

        <label>Observação</label>
        <textarea
          className="form-control"
          rows={4}
          value={layout.observacao}
          onChange={(e) =>
            onChangeLayout({ ...layout, observacao: e.target.value })
          }
        />

        <div className="mt-3 d-flex gap-2">

          {isNovo ? (
            <button
              type="button"
              className="btn btn-primary"
              disabled={!arquivo}
              onClick={() => onAddLayout(layout)}
            >
              Adicionar Layout
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => onRemoverLayout(layout.id)}
            >
              Remover Layout
            </button>
          )}

        </div>
      </form>
    )
  }

  /* ================= MASSA ================= */

  if (modo === 'massa' && massa && layout) {

    const arquivo = filesMassas[massa.id]?.[0]
    const isNovo = !massa.nomeArquivo

    return (
      <form className="card p-4">
        <h5>Massa</h5>

        <label>Arquivo da Massa</label>

        {arquivo && (
          <div className="mb-2 text-primary fw-semibold">
            {arquivo.name}
          </div>
        )}

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            setFilesMassas(prev => ({
              ...prev,
              [massa.id]: [file]
            }))

            if (isNovo) {
              onChangeMassa(layout.id, {
                ...massa,
                nomeArquivo: file.name
              })
            }
          }}
        />

        <label>Observação</label>
        <textarea
          className="form-control"
          rows={4}
          value={massa.observacao}
          onChange={(e) =>
            onChangeMassa(layout.id, {
              ...massa,
              observacao: e.target.value
            })
          }
        />

        <div className="mt-3 d-flex gap-2">

          {isNovo ? (
            <button
              type="button"
              className="btn btn-primary"
              disabled={!arquivo}
              onClick={() => onAddMassa(layout.id, massa)}
            >
              Adicionar Massa
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => onRemoverMassa(layout.id, massa.id)}
            >
              Remover Massa
            </button>
          )}

        </div>
      </form>
    )
  }

  return null
}
