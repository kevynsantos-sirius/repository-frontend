export default function IdentificacaoForm() {
  return (
    <form className="card p-4">
      <h5>Identificação</h5>

      <div className="mb-3">
        <label>Nome do Documento</label>
        <input className="form-control" />
      </div>

      <div className="mb-3">
        <label>Responsável</label>
        <input className="form-control" />
      </div>

      <button className="btn btn-salvar">Salvar</button>
    </form>
  )
}
