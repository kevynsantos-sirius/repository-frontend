import LayoutForm from '../layouts/LayoutForm'
import type { Layout } from '../pages/Home/Home'
import type { ChecklistVersaoDTO } from '../dto/ChecklistVersaoDTO'

type Props = {
  checklist: ChecklistVersaoDTO | null
  layouts: Layout[]
  setLayouts: React.Dispatch<React.SetStateAction<Layout[]>>
}

export default function TIForm({
  checklist,
  layouts,
  setLayouts
}: Props) {

  if (!checklist) {
    return (
      <div className="card p-3">
        <strong>Carregando dados de TI...</strong>
      </div>
    )
  }

  function adicionarLayout() {
    const novoLayout: Layout = {
      id: crypto.randomUUID(),
      nomeArquivo: '',
      observacao: '',
      massas: []
    }

    setLayouts(prev => [...prev, novoLayout])
  }

  function atualizarLayout(index: number, layout: Layout) {
    setLayouts(prev =>
      prev.map((l, i) => (i === index ? layout : l))
    )
  }

  function removerLayout(index: number) {
    setLayouts(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <form className="card p-4">

      <h5 className="mb-3">
        TI – Layout e Forma de Envio
      </h5>

      <div className="d-flex justify-content-between mb-3">
        <strong>Layouts</strong>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={adicionarLayout}
        >
          + Layout
        </button>
      </div>

      {layouts.length === 0 && (
        <div className="border rounded p-3 text-muted">
          Nenhum layout cadastrado
        </div>
      )}

      {layouts.map((layout, index) => (
        <LayoutForm
          key={layout.id}
          layout={layout}
          onUpdate={l => atualizarLayout(index, l)}
          onRemove={() => removerLayout(index)}
        />
      ))}

      <div className="d-flex gap-2 mt-3">
        <button type="button" className="btn btn-salvar">
          Salvar
        </button>
      </div>

    </form>
  )
}
