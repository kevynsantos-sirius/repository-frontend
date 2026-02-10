import type { Massa } from '../pages/Home/Home'

type Props = {
  massa: Massa
  onUpdate(massa: Massa): void
  onRemove(): void
}

export default function MassaForm({
  massa,
  onUpdate,
  onRemove
}: Props) {

  return (
    <div className="border rounded p-3 mb-3">

      <div className="d-flex justify-content-between mb-2">
        <strong>Massa</strong>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={onRemove}
        >
          Remover
        </button>
      </div>

      <label>Arquivo da Massa</label>
      <input type="file" className="form-control" />

      <label className="mt-2">Observação</label>
      <textarea
        className="form-control"
        rows={2}
        value={massa.observacao || ''}
        onChange={e =>
          onUpdate({ ...massa, observacao: e.target.value })
        }
      />
    </div>
  )
}
