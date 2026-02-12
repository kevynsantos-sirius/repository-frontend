import type { Layout, Massa } from '../types/types'
import type { Dispatch, SetStateAction } from 'react'


type Props = {
  modo: 'layout' | 'massa' | null
  layout: Layout | null
  massa: Massa | null
  onSalvarLayout?(layout: Layout): void
  onChangeLayout(layout: Layout): void
  onChangeMassa(layoutId: string, massa: Massa): void
  onRemoverLayout(layoutId: string): void
  onRemoverMassa(layoutId: string, massaId: string): void
  setFilesLayout: Dispatch<SetStateAction<File[]>>
  setFilesMassas: Dispatch<SetStateAction<File[]>>
}

export default function TIForm({ modo,
   layout,
    massa,
    onChangeLayout,
  onChangeMassa,
     onSalvarLayout,
      onRemoverLayout,
       onRemoverMassa,
      setFilesLayout,
                setFilesMassas }: Props) {
  if (!modo) {
    return (
      <div className="card p-4 text-muted">
        Selecione um layout ou uma massa ao lado
      </div>
    )
  }

  /* ========================= FORM LAYOUT ========================= */
  if (modo === 'layout' && layout) {
    return (
      <form className="card p-4">
        <h5 className="mb-3">Layout</h5>

        <label className="form-label">Nome do Layout</label>
        <input
          type="text"
          className="form-control mb-3"
          value={layout.nomeLayout}
          disabled
        />

        <label className="form-label">Arquivo do Layout</label>
        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            setFilesLayout(prev => [...prev, file])
          }}
        />


        <label className="form-label">Observação</label>
        <textarea
          className="form-control"
          rows={4}
          value={layout.observacao}
          onChange={(e) =>
            onChangeLayout({
              ...layout,
              observacao: e.target.value
            })
          }
        />

        <div className="mt-3 d-flex gap-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSalvarLayout && onSalvarLayout(layout)}
          >
            Salvar Layout
          </button>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => onRemoverLayout(layout.id)}
          >
            Remover Layout
          </button>
        </div>
      </form>
    )
  }

  /* ========================= FORM MASSA ========================= */
  if (modo === 'massa' && massa && layout) {
    return (
      <form className="card p-4">
        <h5 className="mb-3">Massa</h5>
        <label className="form-label">Nome da Massa</label>
        <input
          type="text"
          className="form-control mb-3"
          value={massa.nomeArquivo}
          disabled
        />
        <label className="form-label">Arquivo da Massa</label>
        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            setFilesMassas(prev => [...prev, file])
          }}
        />

        <label className="form-label">Observação</label>
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (layout) {
                onSalvarLayout && onSalvarLayout(layout)
              }
            }}
          >
            Salvar Massa
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => {
              if (layout) {
                onRemoverMassa(layout.id, massa.id)
              }
            }}
          >
            Remover Massa
          </button>
        </div>
      </form>
    )
  }

  return null
}
