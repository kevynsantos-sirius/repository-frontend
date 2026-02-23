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

  filesLayout: Record<string, File[]>
  filesMassas: Record<string, File[]>

  setFilesLayout: Dispatch<SetStateAction<Record<string, File[]>>>
  setFilesMassas: Dispatch<SetStateAction<Record<string, File[]>>>
}

export default function TIForm({
  modo,
  layout,
  massa,
  onChangeLayout,
  onChangeMassa,
  onSalvarLayout,
  onRemoverLayout,
  onRemoverMassa,
  filesLayout,
  filesMassas,
  setFilesLayout,
  setFilesMassas
}: Props) {

  if (!modo) {
    return (
      <div className="card p-4 text-muted">
        Selecione um layout ou uma massa ao lado
      </div>
    )
  }

  /* ========================= LAYOUT ========================= */
  if (modo === 'layout' && layout) {

    const arquivos = filesLayout[layout.id] || []

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
          className="form-control mb-2"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            setFilesLayout(prev => ({
              ...prev,
              [layout.id]: [...(prev[layout.id] || []), file]
            }))

            // 🔥 RESET DO INPUT
            e.target.value = ''
          }}
        />

        {/* 🔥 LISTA DE ARQUIVOS ANEXADOS */}
        {arquivos.length > 0 && (
          <div className="mb-3">
            <strong>Arquivos anexados:</strong>
            <ul className="mt-2">
              {arquivos.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          </div>
        )}

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
            onClick={() => {

              if (arquivos.length === 0) {
                alert('Anexe um arquivo para o layout.')
                return
              }

              onSalvarLayout && onSalvarLayout(layout)
            }}
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

  /* ========================= MASSA ========================= */
  if (modo === 'massa' && massa && layout) {

    const arquivos = filesMassas[massa.id] || []

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
          className="form-control mb-2"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            setFilesMassas(prev => ({
              ...prev,
              [massa.id]: [...(prev[massa.id] || []), file]
            }))

            // 🔥 RESET DO INPUT
            e.target.value = ''
          }}
        />

        {/* 🔥 LISTA DE ARQUIVOS ANEXADOS */}
        {arquivos.length > 0 && (
          <div className="mb-3">
            <strong>Arquivos anexados:</strong>
            <ul className="mt-2">
              {arquivos.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          </div>
        )}

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

              if (arquivos.length === 0) {
                alert('Anexe um arquivo para a massa.')
                return
              }

              onSalvarLayout && onSalvarLayout(layout)
            }}
          >
            Salvar Massa
          </button>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => onRemoverMassa(layout.id, massa.id)}
          >
            Remover Massa
          </button>
        </div>
      </form>
    )
  }

  return null
}
