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
}

export default function ModeloForm({
  checklist,
  modelos,
  modeloSelecionadoId,
  onNovoModelo,
  onRemoverModelo,
  onSelectModelo
}: Props) {
  console.log(checklist);
  return (
    <div className="d-flex" style={{ width: '100%', minHeight: '100%' }}>

      {/* 🟦 Sidebar de Modelos */}
      <ModelosSidebar
        modelos={modelos}
        modeloSelecionadoId={modeloSelecionadoId}
        onNovoModelo={onNovoModelo}
        onRemoverModelo={onRemoverModelo}
        onSelectModelo={onSelectModelo}
      />

      {/* 🟩 Conteúdo principal */}
      <div
        id="aba-modelo"
        className="aba flex-grow-1"
        style={{
          display: 'block',
          padding: '20px'
        }}
      >
        <div id="modelo" className="card form-card">

          <div className="card-header bg-white border-0 pb-0">
            <h5 className="mb-0">Modelo do Documento</h5>
          </div>

          <div className="card-body pt-3">
            <form id="formModelo" onSubmit={(e) => e.preventDefault()}>

              {/* Exemplo usando checklist */}
              {/* <p>ID do checklist: {checklist?.id}</p> */}

              <div className="mt-2 mb-4">
                {modeloSelecionadoId ? (
                  <p className="text-secondary">
                    Modelo selecionado: <strong>{modeloSelecionadoId}</strong>
                  </p>
                ) : (
                  <p className="text-muted">
                    Nenhum modelo selecionado
                  </p>
                )}
              </div>

              {/* Ações */}
              <div className="d-flex gap-2 mt-3">
                <p style={{ marginLeft: '10px' }}>
                  Esta funcionalidade está em desenvolvimento e será disponibilizada em breve.
                </p>
              </div>

            </form>
          </div>

        </div>
      </div>

    </div>
  )
}