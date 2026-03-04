import { useEffect, useState } from "react"
import { listarUsuarios } from "../../../services/user.service"
import type { Usuario } from "../../../services/user.service"
import { useNavigate } from "react-router-dom"


export default function UsersList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

async function carregarUsuarios() {
  try {
    const data = await listarUsuarios();
    setUsuarios(data)
  } catch (error: any) {

    if (error.response?.status === 403) {
      navigate("/NotAccess")
      return
    }

    console.error("Erro ao buscar usuários")
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    carregarUsuarios()
  }, [])

  if (loading) return <p>Carregando usuários...</p>

  return (
    <div className="container mt-4">
      <h2>Usuários</h2>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Login</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Perfil</th>
            <th>Bloqueado</th>
            <th>Excluído</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.login}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>

              {/* PERFIS */}
              <td>
                {user.perfis.map(perfil => (
                  <span
                    key={perfil}
                    className={`badge me-1 ${
                      perfil === "ADMIN"
                        ? "bg-danger"
                        : "bg-primary"
                    }`}
                  >
                    {perfil}
                  </span>
                ))}
              </td>

              <td>
                {user.bloqueado ? (
                  <span className="badge bg-danger">Sim</span>
                ) : (
                  <span className="badge bg-success">Não</span>
                )}
              </td>

              <td>
                {user.excluido ? (
                  <span className="badge bg-secondary">Sim</span>
                ) : (
                  <span className="badge bg-success">Não</span>
                )}
              </td>

              <td>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}