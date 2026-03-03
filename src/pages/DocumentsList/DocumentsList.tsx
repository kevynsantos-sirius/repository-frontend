import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { buscarChecklists, buscarChecklistPorId,downloadChecklistZip } from '../../services/checklist.service'
import ChecklistDocPreviewModal from "../../view/ChecklistDocPreviewModal"

import type { ChecklistVersaoDTO } from '../../dto/ChecklistVersaoDTO'

type Documento = {
  idChecklist: string
  idChecklistVersao: string
  nomeDocumento: string
  nomeRamo: string
  usuario: any
  idDemanda: string
  situacao: 'PRD' | 'DEV' | 'RASCUNHO'
}

type DocumentsProps = {
  setNovoLayout: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DocumentsList({
  setNovoLayout
}: DocumentsProps) {

  const navigate = useNavigate()

  const [docs, setDocs] = useState<Documento[]>([])
  const [loading, setLoading] = useState(true)

  // 🔹 Paginação
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [itensPorPagina, setItensPorPagina] = useState(5)
  const [totalPaginas, setTotalPaginas] = useState(0)

  // 🔹 Preview DOCX
  const [abrirPreview, setAbrirPreview] = useState(false)
  const [dadosPreview, setDadosPreview] = useState<ChecklistVersaoDTO | null>(null)
  const [loadingPreview, setLoadingPreview] = useState(false)

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

  /* ===============================
     NAVEGAR PARA EDIÇÃO
     =============================== */
  function abrirDocumento(idVersao: string, idChecklist: string) {
    navigate(`/home/${idVersao}/${idChecklist}`)
  }

  /* ===============================
     VISUALIZAR DOCX
     =============================== */
  async function visualizarDocumento(idChecklist: string) {
    try {
      setLoadingPreview(true)

      const data = await buscarChecklistPorId(idChecklist)

      setDadosPreview(data)
      setAbrirPreview(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingPreview(false)
    }
  }

  async function downloadZipChecklist(idChecklistVersao: string)
  {
    await downloadChecklistZip(idChecklistVersao);
  }

  return (
    <>
      <div className="p-4">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Meus documentos</h4>

          <button
            className="btn btn-primary"
            onClick={() => {
              setNovoLayout(true)
              navigate('/home/novo/registro')
            }}
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
                        <tr key={doc.idChecklistVersao}>
                          <td>{doc.nomeDocumento}</td>
                          <td>{doc.nomeRamo}</td>
                          <td>{doc.usuario?.nomeUsuario}</td>

                          <td
                            className="text-truncate"
                            style={{ maxWidth: 320 }}
                            title={doc.idDemanda}
                          >
                            {doc.idDemanda}
                          </td>

                          <td>
                            <span>{doc.situacao}</span>
                          </td>

                          <td className="text-end">
                            <div className="d-flex justify-content-end gap-2">

                              <button
                                className="btn btn-sm btn-outline-secondary"
                                disabled={loadingPreview}
                                onClick={() => visualizarDocumento(doc.idChecklistVersao)}
                              >
                                {loadingPreview ? (
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                  />
                                ) : (
                                  <i className="bi bi-file-earmark-word"></i>
                                )}
                                DOCX
                              </button>

                              <button className="btn btn-success"
                                onClick={()=>{
                                  downloadZipChecklist(doc.idChecklistVersao);
                                }}
                              >
                                <i className="bi bi-file-earmark-zip me-2"></i>
                                Baixar ZIP
                              </button>

                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => abrirDocumento(
                                  doc.idChecklistVersao,
                                  doc.idChecklist
                                )}
                              >
                                Abrir
                              </button>

                            </div>
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

                {/* FOOTER */}
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

      {/* 🔥 MODAL PREVIEW DOCX */}
      {dadosPreview && (
        <ChecklistDocPreviewModal
          aberto={abrirPreview}
          onClose={() => setAbrirPreview(false)}
          data={dadosPreview}
        />
      )}
    </>
  )
}