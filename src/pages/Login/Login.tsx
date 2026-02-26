import { useState } from 'react'
import { login } from '../../services/authService'
import { toast } from 'react-toastify'
import logo from '../../assets/images/checklist_docs_logo.png'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    try {
      setLoading(true)
      await login(usuario, senha)
      window.location.href = '/home'
    } catch {
      toast.warning('Usuário ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 text-center" style={{ width: 360 }}>

        {/* 🔹 Logo */}
        <img
          src={logo}
          alt="Checklist Docs"
          style={{ width: 180, margin: '0 auto 16px auto' }}
        />

        <h5 className="mb-3">Login</h5>

        <input
          className="form-control mb-2"
          placeholder="Usuário"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
          disabled={loading}
        >
          Entrar
        </button>
      </div>
    </div>
  )
}
