import { useState } from "react";
import type { ChecklistVersaoDTO } from '../dto/ChecklistVersaoDTO'
import type { Modelo, ArquivoGerenciado } from '../types/types'
import ModelosSidebar from '../components/ModelosSidebar/ModelosSidebar'
import ModalGerenciarArquivos from "../modal/ModalGerenciarArquivos"

type Props = {
  checklist: ChecklistVersaoDTO | null
  modelos: Modelo[]
  modeloSelecionadoId: string | null

  onNovoModelo(file: File): void
  onRemoverModelo(modeloId: string): void
  onSelectModelo(modeloId: string): void
  onEditarObservacao(modeloId: string, observacao: string): void

  // NOVAS FUNÇÕES
  onUpdateModelo(modelo: Modelo): void
}

export default function ModeloForm({
  checklist,
  modelos,
  modeloSelecionadoId,
  onNovoModelo,
  onRemoverModelo,
  onSelectModelo,
  onEditarObservacao,
  onUpdateModelo
}: Props) {
  console.log(checklist);
  const modeloSelecionado = modelos.find(m => m.id === modeloSelecionadoId) || null

const [modalTipo, setModalTipo] = useState<
  "logos" | "arquivosAdicionais" | "assinaturas" | null
>(null)

  function abrirModal(tipo: typeof modalTipo) {
    setModalTipo(tipo)
  }

  function fecharModal() {
    setModalTipo(null)
  }

function addArquivo(
  tipo: "logos" | "arquivosAdicionais" | "assinaturas",
  file: File
) {
  if (!modeloSelecionado) return

  const novo: ArquivoGerenciado = {
    id: crypto.randomUUID(),
    name: file.name,
    file
  }

  const atualizado: Modelo = {
    ...modeloSelecionado,
    [tipo]: [...modeloSelecionado[tipo], novo]
  }

  onUpdateModelo(atualizado)
}

function removerArquivo(
  tipo: "logos" | "arquivosAdicionais" | "assinaturas",
  arquivoId: string
) {
  if (!modeloSelecionado) return

  const atualizado: Modelo = {
    ...modeloSelecionado,
    [tipo]: modeloSelecionado[tipo].filter((a) => a.id !== arquivoId)
  }

  onUpdateModelo(atualizado)
}

  return (
    <div className="d-flex" style={{ width: '100%', minHeight: '100%' }}>

      <ModelosSidebar
        modelos={modelos}
        modeloSelecionadoId={modeloSelecionadoId}
        onNovoModelo={onNovoModelo}
        onRemoverModelo={onRemoverModelo}
        onSelectModelo={onSelectModelo}
        onEditarObservacao={onEditarObservacao}
      />

      <div className="aba flex-grow-1" style={{ padding: '20px' }}>
        <div className="card form-card">
          <div className="card-header bg-white border-0 pb-0">
            <h5 className="mb-0">Modelo do Documento</h5>
          </div>

          <div className="card-body pt-3">
            <form id="formModelo" onSubmit={(e) => e.preventDefault()}>

              {/* GRID DE BOTÕES */}
              {modeloSelecionado && (
                <div className="d-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                  <div
                    className="d-grid"
                    style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}
                  >
                    <button className="btn btn-outline-primary" onClick={() => abrirModal("logos")}>
                      Logos
                    </button>

                    <button className="btn btn-outline-primary" onClick={() => abrirModal("arquivosAdicionais")}>
                      Arquivos adicionais
                    </button>

                    <button className="btn btn-outline-primary" onClick={() => abrirModal("assinaturas")}>
                      Assinaturas
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-4 mb-4">
                {modeloSelecionado ? (
                  <>
                    <div className="mb-3">
                      <span className="label-azul">Modelo selecionado</span>
                      <p className="mt-1">{modeloSelecionado.arquivo?.name}</p>
                    </div>

                    <div className="mb-3">
                      <span className="label-azul">Observação</span>
                      <p className="mt-1">{modeloSelecionado.observacao || "(Nenhuma observação cadastrada)"}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-muted">Nenhum modelo selecionado</p>
                )}
              </div>
                {/* TABELA CAMPOS DE BUSCA */}
                 <strong><h5>Acesso ao documento</h5></strong>
                {modeloSelecionado && (
                  <div className="mt-4">
                    <h6 className="mb-3 fw-bold">
                      Ao digitar o nome do documento, quais <u>CAMPOS DE BUSCA</u> deverão aparecer por usuário:
                    </h6>

                    <table className="table table-bordered">
                      <thead>
                        <tr className="table-light text-center">
                          <th style={{ width: "16%" }}>Backoffice</th>
                          <th style={{ width: "16%" }}>Cliente</th>
                          <th style={{ width: "16%" }}>Corretor</th>
                          <th style={{ width: "16%" }}>Estipulante</th>
                          <th style={{ width: "16%" }}>Subestipulante</th>
                          <th style={{ width: "20%" }}>Outro</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          {/* BACKOFFICE */}
                          <td>
                            <textarea
                              className="form-control"
                              rows={5}
                              value={modeloSelecionado.camposBusca.backoffice}
                              onChange={(e) =>
                                onUpdateModelo({
                                  ...modeloSelecionado,
                                  camposBusca: {
                                    ...modeloSelecionado.camposBusca,
                                    backoffice: e.target.value
                                  }
                                })
                              }
                            ></textarea>
                          </td>

                          {/* CLIENTE */}
                          <td>
                            <textarea
                              className="form-control"
                              rows={5}
                              value={modeloSelecionado.camposBusca.cliente}
                              onChange={(e) =>
                                onUpdateModelo({
                                  ...modeloSelecionado,
                                  camposBusca: {
                                    ...modeloSelecionado.camposBusca,
                                    cliente: e.target.value
                                  }
                                })
                              }
                            ></textarea>
                          </td>

                          {/* CORRETOR */}
                          <td>
                            <textarea
                              className="form-control"
                              rows={5}
                              value={modeloSelecionado.camposBusca.corretor}
                              onChange={(e) =>
                                onUpdateModelo({
                                  ...modeloSelecionado,
                                  camposBusca: {
                                    ...modeloSelecionado.camposBusca,
                                    corretor: e.target.value
                                  }
                                })
                              }
                            ></textarea>
                          </td>

                          {/* ESTIPULANTE */}
                          <td>
                            <textarea
                              className="form-control"
                              rows={5}
                              value={modeloSelecionado.camposBusca.estipulante}
                              onChange={(e) =>
                                onUpdateModelo({
                                  ...modeloSelecionado,
                                  camposBusca: {
                                    ...modeloSelecionado.camposBusca,
                                    estipulante: e.target.value
                                  }
                                })
                              }
                            ></textarea>
                          </td>

                          {/* SUBESTIPULANTE */}
                          <td>
                            <textarea
                              className="form-control"
                              rows={5}
                              value={modeloSelecionado.camposBusca.subestipulante}
                              onChange={(e) =>
                                onUpdateModelo({
                                  ...modeloSelecionado,
                                  camposBusca: {
                                    ...modeloSelecionado.camposBusca,
                                    subestipulante: e.target.value
                                  }
                                })
                              }
                            ></textarea>
                          </td>

                          {/* OUTRO */}
                          <td>
                            <textarea
                              className="form-control"
                              rows={5}
                              value={modeloSelecionado.camposBusca.outro}
                              onChange={(e) =>
                                onUpdateModelo({
                                  ...modeloSelecionado,
                                  camposBusca: {
                                    ...modeloSelecionado.camposBusca,
                                    outro: e.target.value
                                  }
                                })
                              }
                            ></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
            </form>
          </div>
        </div>
      </div>

      {/* MODAIS */}
      {modalTipo && modeloSelecionado && (
        <ModalGerenciarArquivos
          titulo={
            modalTipo === "logos"
              ? "Logos"
              : modalTipo === "arquivosAdicionais"
              ? "Arquivos Adicionais"
              : "Assinaturas"
          }
          arquivos={modeloSelecionado[modalTipo]}
          onClose={fecharModal}
          onAddArquivo={(file) => addArquivo(modalTipo, file)}
          onRemoveArquivo={(id) => removerArquivo(modalTipo, id)}
        />
      )}
    </div>
  )
}