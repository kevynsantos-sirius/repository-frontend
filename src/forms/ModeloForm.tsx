import type { ChecklistVersaoDTO } from '../dto/ChecklistVersaoDTO'
import type { Modelo } from '../types/types'
import ModelosSidebar from '../components/ModelosSidebar/ModelosSidebar'

type Props = {
  checklist: ChecklistVersaoDTO | null
  modelos: Modelo[]
  modeloSelecionadoId: string | null

  onNovoModelo(file: File): void
  onRemoverModelo(modeloId: string): void
  onSelectModelo(modeloId: string): void
  onEditarObservacao(modeloId: string, observacao: string): void
}

export default function ModeloForm({
  checklist,
  modelos,
  modeloSelecionadoId,
  onNovoModelo,
  onRemoverModelo,
  onSelectModelo,
  onEditarObservacao
}: Props) {

  console.log(checklist);

  // Pegamos o modelo selecionado
  const modeloSelecionado = modelos.find(m => m.id === modeloSelecionadoId) || null

  return (
    <div className="d-flex" style={{ width: '100%', minHeight: '100%' }}>

      {/* Sidebar */}
      <ModelosSidebar
        modelos={modelos}
        modeloSelecionadoId={modeloSelecionadoId}
        onNovoModelo={onNovoModelo}
        onRemoverModelo={onRemoverModelo}
        onSelectModelo={onSelectModelo}
        onEditarObservacao={onEditarObservacao}
      />

      {/* Conteúdo principal */}
      <div
        id="aba-modelo"
        className="aba flex-grow-1"
        style={{
          display: 'block',
          padding: '20px'
        }}
      >
        <div className="card form-card">

          <div className="card-header bg-white border-0 pb-0">
            <h5 className="mb-0">Modelo do Documento</h5>
          </div>

          <div className="card-body pt-3">
            <form id="formModelo" onSubmit={(e) => e.preventDefault()}>

              <div className="mt-2 mb-4">
                {modeloSelecionado ? (
                  <div>
                    <p className="text-secondary">
                      Modelo selecionado: <strong>{modeloSelecionado.arquivo?.name}</strong>
                    </p>

                    <p className="text-muted" style={{ whiteSpace: 'pre-wrap' }}>
                      <strong>Observação:</strong>{' '}
                      {modeloSelecionado.observacao?.trim()
                        ? modeloSelecionado.observacao
                        : '(Nenhuma observação cadastrada)'}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted">Nenhum modelo selecionado</p>
                )}
              </div>

            </form>
          </div>

        </div>
      </div>

    </div>
  )
}