import type { ChecklistVersaoDTO } from '../dto/ChecklistVersaoDTO'

type Props = {
  checklist: ChecklistVersaoDTO | null
}

export default function ModeloForm({ checklist }: Props) {
  console.log(checklist);
  return (
    <div id="aba-modelo" className="aba" style={{ display: 'block' }}>
      <div id="modelo" className="card form-card">

        <div className="card-header bg-white border-0 pb-0">
          <h5 className="mb-0">Modelo do Documento</h5>
        </div>

        <div className="card-body pt-3">
          <form id="formModelo" onSubmit={(e) => e.preventDefault()}>

            {/* Conteúdo futuro usando checklist */}
            {/* Exemplo:
            <p>ID do checklist: {checklist?.id}</p>
            */}

            {/* Ações */}
            <div className="d-flex gap-2 mt-3">
              <button type="button" className="btn btn-salvar">
                Salvar
              </button>

              <button type="button" className="btn btn-cancelar">
                Cancelar
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}
