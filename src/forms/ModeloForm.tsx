export default function ModeloForm() {
  return (
    <form className="card p-4">
      <h5>Modelo</h5>

      <div className="mb-3">
        <label>Nome do Modelo</label>
        <input className="form-control" />
      </div>

      <textarea className="form-control mb-3" rows={4} />

      <button className="btn btn-salvar">Salvar</button>
    </form>
  )
}
