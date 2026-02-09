import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Documento = {
  id: string
  nome: string
  unidade: string
  responsavel: string
  demanda: string
  situacao: 'PRD' | 'DEV' | 'RASCUNHO'
}

export default function DocumentsList() {
  const navigate = useNavigate()
  const [docs, setDocs] = useState<Documento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 🔹 simula chamada de API
    new Promise<Documento[]>(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            nome: 'Carta Premiados aderente',
            unidade: 'CAPITALIZAÇÃO',
            responsavel: 'Carlos Alves',
            demanda: 'Doc 00778555 Desenvolvimento',
            situacao: 'PRD'
          },
          {
            id: '2',
            nome: 'Carta Premiados',
            unidade: 'CAPITALIZAÇÃO',
            responsavel: 'Administrador',
            demanda: 'Doc 4951 - exclusão massa',
            situacao: 'PRD'
          },
          {
            id: '3',
            nome: 'Carta de Cosseguro de Sinistro',
            unidade: 'SEGUROS',
            responsavel: 'Administrador',
            demanda: 'DOC - 5552 Inclusão Layout',
            situacao: 'DEV'
          }
        ])
      }, 600)
    }).then(data => {
      setDocs(data)
      setLoading(false)
    })
  }, [])

  function abrirDocumento(id: string) {
    navigate(`/home/${id}`)
  }

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Meus documentos</h4>

        <button
          className="btn btn-primary"
          onClick={() => navigate('/home/novo')}
        >
          Novo documento
        </button>
      </div>

      {/* TABELA */}
      <div className="card">
        <div className="card-body p-0">

          {loading && (
            <div className="p-4 text-muted">
              Carregando documentos...
            </div>
          )}

          {!loading && (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Nome</th>
                    <th>Unidade de Negócio</th>
                    <th>Responsável</th>
                    <th>Identificação da Demanda</th>
                    <th>Situação</th>
                    <th className="text-end">Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {docs.map(doc => (
                    <tr key={doc.id}>
                      <td>{doc.nome}</td>
                      <td>{doc.unidade}</td>
                      <td>{doc.responsavel}</td>

                      <td
                        className="text-truncate"
                        style={{ maxWidth: 320 }}
                        title={doc.demanda}
                      >
                        {doc.demanda}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            doc.situacao === 'PRD'
                              ? 'bg-success'
                              : doc.situacao === 'DEV'
                              ? 'bg-warning text-dark'
                              : 'bg-secondary'
                          }`}
                        >
                          {doc.situacao}
                        </span>
                      </td>

                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => abrirDocumento(doc.id)}
                        >
                          Abrir
                        </button>
                      </td>
                    </tr>
                  ))}

                  {docs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-muted p-4">
                        Nenhum documento encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}
