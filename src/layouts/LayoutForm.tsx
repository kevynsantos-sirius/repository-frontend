import type { Layout, Massa } from '../pages/Home/Home'
import MassaForm from './MassaForm'

type Props = {
  layout: Layout
  onUpdate(layout: Layout): void
  onRemove(): void
}

export default function LayoutForm({
  layout,
  onUpdate,
  onRemove
}: Props) {

  const massas: Massa[] = Array.isArray(layout.massas)
    ? layout.massas
    : []

  function atualizarObservacao(value: string) {
    onUpdate({ ...layout, observacao: value })
  }

  function adicionarMassa() {
    const novaMassa: Massa = {
      id: crypto.randomUUID(),
      nomeArquivo: '',
      observacao: ''
    }

    onUpdate({
      ...layout,
      massas: [...massas, novaMassa]
    })
  }

  function atualizarMassa(index: number, massa: Massa) {
    onUpdate({
      ...layout,
      massas: massas.map((m, i) =>
        i === index ? massa : m
      )
    })
  }

  function removerMassa(index: number) {
    onUpdate({
      ...layout,
      massas: massas.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="border rounded p-3 mb-4">

      <div className="d-flex justify-content-between mb-2">
        <strong>Layout</strong>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={onRemove}
        >
          Remover
        </button>
      </div>

      <label className="d-block fw-semibold">
        {layout.nomeLayout}
      </label>

      <label>Arquivo Layout</label>
      <input type="file" className="form-control" />

      <label className="mt-2">Observação</label>
      <textarea
        className="form-control"
        rows={3}
        value={layout.observacao}
        onChange={e => atualizarObservacao(e.target.value)}
      />

      <hr />

      <div className="d-flex justify-content-between mb-2">
        <strong>Massas</strong>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={adicionarMassa}
        >
          + Massa
        </button>
      </div>

      {massas.length === 0 && (
        <div className="text-muted">
          Nenhuma massa adicionada
        </div>
      )}

      {massas.map((massa, index) => (
        <MassaForm
          key={massa.id}
          massa={massa}
          onUpdate={m => atualizarMassa(index, m)}
          onRemove={() => removerMassa(index)}
        />
      ))}

    </div>
  )
}
