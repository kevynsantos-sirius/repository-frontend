import { useState } from 'react'

export default function TI() {
  const [dados, setDados] = useState({
    sistema: '',
    responsavel: ''
  })

  function handleChange(e) {
    setDados({ ...dados, [e.target.name]: e.target.value })
  }

  function salvar() {
    console.log('TI:', dados)
  }

  return (
    <div className="container mt-4">
      <h3>TI</h3>

      <input
        name="sistema"
        className="form-control mb-2"
        placeholder="Sistema"
        onChange={handleChange}
      />

      <input
        name="responsavel"
        className="form-control mb-2"
        placeholder="Responsável"
        onChange={handleChange}
      />

      <button className="btn btn-primary" onClick={salvar}>
        Salvar
      </button>
    </div>
  )
}
