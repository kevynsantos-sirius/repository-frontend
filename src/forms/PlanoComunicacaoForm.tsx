type Props = {
  arquivo: File | null
  observacao: string
  onChangeArquivo(file: File | null): void
  onChangeObservacao(obs: string): void
}

export default function PlanoComunicacaoForm({
  arquivo,
  observacao,
  onChangeArquivo,
  onChangeObservacao
}: Props) {
  return (
    <div className="card p-4">

      <h5 className="mb-3">Plano de Comunicação</h5>

      {/* ARQUIVO */}
      <div className="mb-3">
        <label className="form-label fw-bold">Arquivo</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => onChangeArquivo(e.target.files?.[0] || null)}
        />

        {arquivo && (
          <p className="mt-2 text-success">
            Arquivo selecionado: {arquivo.name}
          </p>
        )}
      </div>

      {/* OBSERVAÇÃO */}
      <div>
        <label className="form-label fw-bold">Observação</label>
        <textarea
          className="form-control"
          rows={4}
          value={observacao}
          onChange={(e) => onChangeObservacao(e.target.value)}
        />
      </div>
    </div>
  )
}