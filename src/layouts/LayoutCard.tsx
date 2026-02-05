import MassaCard from './MassaCard'

type Props = {
  layout: any
  onRemove: () => void
  onAddMassa: () => void
  onRemoveMassa: (index: number) => void
}

export default function LayoutCard({
  layout,
  onRemove,
  onAddMassa,
  onRemoveMassa
}: Props) {
  return (
    <div className="card p-4 mb-3 layout-card">

      {/* ID oculto (edição) */}
      {layout.id && (
        <input type="hidden" className="layoutIdHidden" value={layout.id} />
      )}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        {layout.nomeArquivo ? (
          <span className="text-primary">
            {layout.nomeArquivo}
          </span>
        ) : (
          <span className="text-muted">Novo layout</span>
        )}

        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={onRemove}
        >
          - Remover
        </button>
      </div>

      {/* Upload */}
      <label>Arquivo Layout</label>
      <input type="file" className="form-control fileLayout" />

      {/* Observação (placeholder do Quill) */}
      <label className="form-label mt-2">Observação</label>
      <div className="border rounded p-2 bg-white" style={{ height: 120 }}>
        Editor de observação (Quill entra aqui)
      </div>

      <input type="hidden" className="obsLayoutHidden" />

      <hr />

      {/* Massas */}
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Massas de Dados</h6>
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={onAddMassa}
        >
          + Adicionar Massa
        </button>
      </div>

      <div className="mt-2">
        {layout.massas.length === 0 && (
          <div className="text-muted small">
            Nenhuma massa adicionada
          </div>
        )}

        {layout.massas.map((massa: any, index: number) => (
          <MassaCard
            key={index}
            massa={massa}
            onRemove={() => onRemoveMassa(index)}
          />
        ))}
      </div>

    </div>
  )
}
