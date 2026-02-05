export default function TIForm() {
  return (
    <form className="card p-4">
      <h5>TI</h5>

      <div className="mb-3">
        <label>Sistema</label>
        <input className="form-control" />
      </div>

      <div className="mb-3">
        <label>Acesso</label>
        <select className="form-select">
          <option>Sim</option>
          <option>Não</option>
        </select>
      </div>

      <button className="btn btn-salvar">Salvar</button>
    </form>
  )
}
