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