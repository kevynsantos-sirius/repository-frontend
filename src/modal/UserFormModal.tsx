import { useEffect, useState } from "react"
import { criarUsuario, atualizarUsuario } from "../services/user.service"
import type { Usuario, CriarUsuarioDTO } from "../services/user.service"

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  usuario?: Usuario | null
}

export default function UserFormModal({
  isOpen,
  onClose,
  onSave,
  usuario
}: Props) {

  const isEdit = !!usuario

  const [login, setLogin] = useState("")
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [bloqueado, setBloqueado] = useState(false)
  const [excluido, setExcluido] = useState(false)

  useEffect(() => {
    if (usuario) {
      setLogin(usuario.login)
      setNome(usuario.nome)
      setEmail(usuario.email)
      setSenha("")
      setBloqueado(usuario.bloqueado)
      setExcluido(usuario.excluido)
    } else {
      setLogin("")
      setNome("")
      setEmail("")
      setSenha("")
      setBloqueado(false)
      setExcluido(false)
    }
  }, [usuario])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const payload: CriarUsuarioDTO = {
        login,
        nome,
        email,
        senha: senha || undefined,
        bloqueado,
        excluido,
        perfis: ["USER"]
      }

      if (isEdit) {
        await atualizarUsuario(usuario!.id, payload)
      } else {
        await criarUsuario(payload)
      }

      onSave()
      onClose()

    } catch (error) {
      console.error("Erro ao salvar usuário")
      alert("Erro ao salvar usuário")
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              {isEdit ? "Editar Usuário" : "Novo Usuário"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Login</label>
                <input
                  type="text"
                  className="form-control"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                  required
                  disabled={isEdit}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  {isEdit ? "Nova Senha (opcional)" : "Senha"}
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  required={!isEdit}
                />
              </div>

              <div className="form-check mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={bloqueado}
                  onChange={e => setBloqueado(e.target.checked)}
                />
                <label className="form-check-label">
                  Usuário bloqueado
                </label>
              </div>

              <div className="form-check mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={excluido}
                  onChange={e => setExcluido(e.target.checked)}
                />
                <label className="form-check-label">
                  Usuário excluído
                </label>
              </div>

            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>

              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}