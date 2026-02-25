import type { Layout, Massa } from '../types/types'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  modo: 'layout' | 'massa' | null
  layout: Layout | null
  massa: Massa | null

  isDraftLayout: boolean
  isDraftMassa: boolean

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

  onCancelar(): void
}

export default function TIForm({
  modo,
  layout,
  massa,
  isDraftLayout,
  isDraftMassa,
  onAddLayout,
  onAddMassa,
  onChangeLayout,
  onChangeMassa,
  onRemoverLayout,
  onRemoverMassa,
  filesLayout,
  filesMassas,
  setFilesLayout,
  setFilesMassas,
  onCancelar
}: Props) {

  if (!modo) {
    return <div className="card p-4 text-muted">Selecione um layout ou uma massa</div>
  }

  /* ================= LAYOUT ================= */

  if (modo === 'layout' && layout) {

    const arquivo = filesLayout[layout.id]?.[0]
    const isNovo = isDraftLayout

    const inputId = `layout-file-${layout.id}`

    return (
      <form className="card p-4">
        <h5>Layout</h5>

        <label htmlFor={inputId}>Arquivo do Layout</label>

        {arquivo ? (
          <div className="mb-2 text-primary fw-semibold">
            📄 {arquivo.name}
          </div>
        ) : layout.nomeLayout ? (
          <div className="mb-2 text-muted">
            📄 {layout.nomeLayout} (arquivo já enviado)
          </div>
        ) : null}


        <input
          key={`layout-${layout.id}`}
          id={inputId}
          type="file"
          className="form-control mb-3"

          onClick={(e) => {
            const input = e.currentTarget as HTMLInputElement
            input.value = ''

            // 🔥 limpa o state ANTES da seleção
            setFilesLayout(prev => {
              const copy = { ...prev }
              delete copy[layout.id]
              return copy
            })

            onChangeLayout({
              ...layout,
              nomeLayout: ''
            })
          }}

          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            setFilesLayout(prev => ({
              ...prev,
              [layout.id]: [file]
            }))

            onChangeLayout({
              ...layout,
              nomeLayout: file.name
            })
          }}
        />



        <label>Observação</label>
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

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={onCancelar}
          >
            Cancelar
          </button>

        </div>
      </form>
    )
  }

  /* ================= MASSA ================= */

  if (modo === 'massa' && massa && layout) {

    const arquivo = filesMassas[massa.id]?.[0]
    const isNovo = isDraftMassa

    const inputId = `massa-file-${massa.id}`

    return (
      <form className="card p-4">
        <h5>Massa</h5>

        <label htmlFor={inputId}>Arquivo da Massa</label>

        {arquivo ? (
          <div className="mb-2 text-primary fw-semibold">
            📄 {arquivo.name}
          </div>
        ) : massa.nomeArquivo ? (
          <div className="mb-2 text-muted">
            📄 {massa.nomeArquivo} (arquivo já enviado)
          </div>
        ) : null}


        <input
          key={`massa-${massa.id}`}
          id={inputId}
          type="file"
          className="form-control mb-3"

          onClick={(e) => {
            const input = e.currentTarget as HTMLInputElement
            input.value = ''

            setFilesMassas(prev => {
              const copy = { ...prev }
              delete copy[massa.id]
              return copy
            })

            onChangeMassa(layout.id, {
              ...massa,
              nomeArquivo: ''
            })
          }}

          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            setFilesMassas(prev => ({
              ...prev,
              [massa.id]: [file]
            }))

            onChangeMassa(layout.id, {
              ...massa,
              nomeArquivo: file.name
            })
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

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    )
  }

  return null
}
