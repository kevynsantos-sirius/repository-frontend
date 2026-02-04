import { useState } from 'react'
import Notiflix from 'notiflix'

export default function Identificacao() {
  const [form, setForm] = useState({
    nomeDocumento: '',
    centroCusto: '',
    idRamo: '',
    status: '',
    icatu: false,
    caixa: false,
    rioGrande: false
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  function salvar() {
    if (!form.nomeDocumento || !form.idRamo) {
      Notiflix.Notify.failure('Preencha os campos obrigatórios')
      return
    }

    console.log('Identificação DTO:', form)
    Notiflix.Notify.success('Identificação salva')
  }

  return (
    <div className="container mt-4">
      <h3>Identificação</h3>

      <input
        name="nomeDocumento"
        placeholder="Nome do Documento"
        className="form-control mb-2"
        value={form.nomeDocumento}
        onChange={handleChange}
      />

      <select
        name="idRamo"
        className="form-select mb-2"
        value={form.idRamo}
        onChange={handleChange}
      >
        <option value="">Selecione</option>
        <option value="1">Vida</option>
        <option value="2">Previdência</option>
      </select>

      <button className="btn btn-primary" onClick={salvar}>
        Salvar
      </button>
    </div>
  )
}
