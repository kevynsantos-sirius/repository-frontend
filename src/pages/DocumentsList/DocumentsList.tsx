import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscarChecklists } from '../../services/checklist.service'

type Documento = {
  idChecklist: string
  nomeDocumento: string
  nomeRamo: string
  usuario: any
  idDemanda: string
  situacao: 'PRD' | 'DEV' | 'RASCUNHO'
}

export default function DocumentsList() {
  const navigate = useNavigate()

  const [docs, setDocs] = useState<Documento[]>([])
  const [loading, setLoading] = useState(true)

  // 🔹 paginação (controlada pelo back-end)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [itensPorPagina, setItensPorPagina] = useState(5)
  const [totalPaginas, setTotalPaginas] = useState(0)

  /* ===============================
     BUSCA BACK-END
     =============================== */
  useEffect(() => {
    setLoading(true)

    buscarChecklists(paginaAtual - 1, itensPorPagina)
      .then(res => {
        setDocs(res.content)
        setTotalPaginas(res.totalPages)
      })
      .finally(() => setLoading(false))
  }, [paginaAtual, itensPorPagina])

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
            <>
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
                      <tr key={doc.idChecklist}>
                        <td>{doc.nomeDocumento}</td>
                        <td>{doc.nomeRamo}</td>
                        <td>{doc.usuario.nomeUsuario}</td>

                        <td
                          className="text-truncate"
                          style={{ maxWidth: 320 }}
                          title={doc.idDemanda}
                        >
                          {doc.idDemanda}
                        </td>

                        <td>
                          <span
                          >
                            PRD
                          </span>
                        </td>

                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => abrirDocumento(doc.idChecklist)}
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

              {/* FOOTER: ITENS POR PÁGINA + PAGINAÇÃO */}
              <div className="d-flex justify-content-between align-items-center p-3">

                {/* ITENS POR PÁGINA */}
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted">Itens por página:</span>
                  <select
                    className="form-select form-select-sm"
                    style={{ width: 90 }}
                    value={itensPorPagina}
                    onChange={e => {
                      setItensPorPagina(Number(e.target.value))
                      setPaginaAtual(1)
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>

                {/* PAGINAÇÃO */}
                {totalPaginas > 1 && (
                  <nav>
                    <ul className="pagination mb-0">
                      <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setPaginaAtual(p => p - 1)}
                        >
                          Anterior
                        </button>
                      </li>

                      {Array.from({ length: totalPaginas }).map((_, i) => (
                        <li
                          key={i}
                          className={`page-item ${paginaAtual === i + 1 ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setPaginaAtual(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}

                      <li className={`page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setPaginaAtual(p => p + 1)}
                        >
                          Próxima
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </>
          )}

        </div>
      </div>

    </div>
  )
}
