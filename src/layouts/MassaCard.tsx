type Props = {
  massa: any
  onRemove: () => void
}

export default function MassaCard({ massa, onRemove }: Props) {
  return (
    <div className="card p-2 mb-2 massa-card">

      {massa.id && (
        <input type="hidden" className="massaIdHidden" value={massa.id} />
      )}

      <div className="d-flex justify-content-between align-items-center mb-2">
        {massa.nomeArquivo ? (
          <span className="text-primary">
            {massa.nomeArquivo}
          </span>
        ) : (
          <span className="text-muted">Nova massa</span>
        )}

        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={onRemove}
        >
          - Remover
        </button>
      </div>

      <label>Arquivo da Massa</label>
      <input type="file" className="form-control fileMassa" />

      <label className="form-label mt-2">Observação</label>
      <div className="border rounded p-2 bg-white" style={{ height: 120 }}>
        Editor de observação (Quill entra aqui)
      </div>

      <input type="hidden" className="obsMassaHidden" />
    </div>
  )
}
