import { useState } from "react";
import type { ChecklistVersaoDTO } from '../dto/ChecklistVersaoDTO'
import type { Modelo, ArquivoGerenciado } from '../types/types'
import ModelosSidebar from '../components/ModelosSidebar/ModelosSidebar'
import ModalGerenciarArquivos from "../modal/ModalGerenciarArquivos"

// 👉 novo import
import FormatoImpressaoSection from "../components/FormatoImpressaoSection/FormatoImpressaoSection";
import DisponibilizacaoSection from "../components/DisponibilizacaoSection/DisponibilizacaoSection";

type Props = {
  checklist: ChecklistVersaoDTO | null
  modelos: Modelo[]
  modeloSelecionadoId: string | null

  onNovoModelo(file: File): void
  onRemoverModelo(modeloId: string): void
  onSelectModelo(modeloId: string): void
  onEditarObservacao(modeloId: string, observacao: string): void

  onUpdateModelo(modelo: Modelo): void
}

export default function ModeloForm({
  modelos,
  modeloSelecionadoId,
  onNovoModelo,
  onRemoverModelo,
  onSelectModelo,
  onEditarObservacao,
  onUpdateModelo
}: Props) {

  

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
  file: File,
  observacao: string
) {
  if (!modeloSelecionado) return;

  const novo: ArquivoGerenciado = {
    id: crypto.randomUUID(),
    name: file.name,
    nomeArquivo: file.name,
    file,
    arquivo: file,
    observacao,
    tipo: 0,
    excluido: false
  };

  const atualizado: Modelo = {
    ...modeloSelecionado,
    [tipo]: [...modeloSelecionado[tipo], novo]
  };

  onUpdateModelo(atualizado);
}

function removerArquivo(
  tipo: "logos" | "arquivosAdicionais" | "assinaturas",
  arquivoId: string
) {
  if (!modeloSelecionado) return;

  const atualizado: Modelo = {
    ...modeloSelecionado,
    [tipo]: modeloSelecionado[tipo].map((a) =>
      a.id === arquivoId
        ? { ...a, excluido: true } // ← Marca como EXCLUIDO
        : a
    )
  };

  onUpdateModelo(atualizado);
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
            <form id="formModelo" className="p-3" onSubmit={(e) => e.preventDefault()}>

              {/* BOTÕES DE GERENCIAMENTO */}
              {modeloSelecionado && (
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
              )}

              {/* MODELO SELECIONADO */}
              <div className="mt-4 mb-4">
                {modeloSelecionado ? (
                  <>
                    <div className="mb-3">
                      <span className="label-azul">Modelo selecionado</span>
                      <p className="mt-1">{modeloSelecionado.nomeRecurso ?? modeloSelecionado.arquivo?.name}</p>
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

             

              {/* NOVA SEÇÃO — FORMATAÇÃO & IMPRESSÃO */}
              {modeloSelecionado && (
                <FormatoImpressaoSection
                  modelo={modeloSelecionado}
                  onUpdateModelo={onUpdateModelo}
                />
              )}

              {modeloSelecionado && (
                <DisponibilizacaoSection
                  modelo={modeloSelecionado}
                  onUpdateModelo={onUpdateModelo}
                />
              )}

               {/* REGRAS DE ACESSO */}
              {modeloSelecionado && (
                <div className="mb-4">
                  <h6 className="fw-bold">Acesso ao documento</h6>
                  <span className="label-azul">Regras de acesso</span>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={modeloSelecionado.regrasAcesso}
                    placeholder="Descreva regras adicionais..."
                    onChange={(e) =>
                      onUpdateModelo({
                        ...modeloSelecionado,
                        regrasAcesso: e.target.value
                      })
                    }
                  />
                </div>
              )}

              {/* TABELA CAMPOS DE BUSCA */}
              {modeloSelecionado && (
                <div className="mt-4">
                  <h6 className="mb-3 fw-bold">
                    Ao digitar o nome do documento, quais <u>CAMPOS DE BUSCA</u> deverão aparecer:
                  </h6>

                  <table className="table table-bordered">
                    <thead>
                      <tr className="table-light text-center">
                        <th><span className="label-azul">Backoffice</span></th>
                        <th><span className="label-azul">Cliente</span></th>
                        <th><span className="label-azul">Corretor</span></th>
                        <th><span className="label-azul">Estipulante</span></th>
                        <th><span className="label-azul">Subestipulante</span></th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        {Object.entries(modeloSelecionado.camposBusca).map(([key, value]) => (
                          <td key={key}>
                            <textarea
                              className="form-control"
                              rows={5}
                              value={value ?? ""}   // 👍 nunca será null
                              onChange={(e) =>
                                onUpdateModelo({
                                  ...modeloSelecionado,
                                  camposBusca: {
                                    ...modeloSelecionado.camposBusca,
                                    [key]: e.target.value
                                  }
                                })
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* MODAL */}
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
          onAddArquivo={(file, observacao) =>
            addArquivo(modalTipo, file, observacao)
          }
          onRemoveArquivo={(id) => removerArquivo(modalTipo, id)}
        />
      )}
    </div>
  )
}