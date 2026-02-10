import { useState } from 'react'
import type { Layout, Massa } from '../pages/Home/Home'
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

  const [layoutAtivoId, setLayoutAtivoId] = useState<string | null>(null)
  const [massaAtivaIndex, setMassaAtivaIndex] = useState<number | null>(null)

  const [layoutFileKey, setLayoutFileKey] = useState(0)
  const [massaFileKey, setMassaFileKey] = useState(0)

  const layoutAtivo = layouts.find(l => l.id === layoutAtivoId)

  function adicionarLayout() {
    const novoLayout: Layout = {
      id: crypto.randomUUID(),
      nomeArquivo: '',
      observacao: '',
      massas: []
    }

    setLayouts(prev => [...prev, novoLayout])
    setLayoutAtivoId(novoLayout.id)
    setMassaAtivaIndex(null)

    setLayoutFileKey(prev => prev + 1)
    setMassaFileKey(prev => prev + 1)
  }

  function adicionarMassa() {
    if (!layoutAtivo) return

    const novaMassa: Massa = {
      id: crypto.randomUUID(),
      nomeArquivo: '',
      observacao: ''
    }

    setLayouts(prev =>
      prev.map(l =>
        l.id === layoutAtivo.id
          ? { ...l, massas: [...l.massas, novaMassa] }
          : l
      )
    )

    setMassaAtivaIndex(layoutAtivo.massas.length)
    setMassaFileKey(prev => prev + 1)
  }

  function updateLayoutObservacao(value: string) {
    if (!layoutAtivo) return

    setLayouts(prev =>
      prev.map(l =>
        l.id === layoutAtivo.id
          ? { ...l, observacao: value }
          : l
      )
    )
  }

  function updateMassaObservacao(value: string) {
    if (!layoutAtivo || massaAtivaIndex === null) return

    setLayouts(prev =>
      prev.map(l =>
        l.id === layoutAtivo.id
          ? {
              ...l,
              massas: l.massas.map((m, i) =>
                i === massaAtivaIndex
                  ? { ...m, observacao: value }
                  : m
              )
            }
          : l
      )
    )
  }

  function salvar() {
    setLayoutAtivoId(null)
    setMassaAtivaIndex(null)
    setLayoutFileKey(prev => prev + 1)
    setMassaFileKey(prev => prev + 1)
  }

  return (
    <form className="card form-card p-4">

      <h5 className="mb-3">
        TI – Layout e Forma de Envio
      </h5>

      <div className="d-flex justify-content-between mb-2">
        <strong>Layouts</strong>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={adicionarLayout}
        >
          + Adicionar Layout
        </button>
      </div>

      {!layoutAtivo && (
        <div className="border rounded p-3 text-muted">
          Nenhum layout selecionado
        </div>
      )}

      {layoutAtivo && (
        <>
          <label className="mt-3">Arquivo Layout</label>
          <input
            key={`layout-file-${layoutFileKey}`}
            className="form-control"
            type="file"
          />

          <label className="mt-3">Observação</label>
          <textarea
            className="form-control"
            rows={3}
            value={layoutAtivo.observacao || ''}
            onChange={e => updateLayoutObservacao(e.target.value)}
          />

          <hr className="my-4" />

          <div className="d-flex justify-content-between mb-2">
            <strong>Massas de Dados</strong>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={adicionarMassa}
            >
              + Adicionar Massa
            </button>
          </div>

          {massaAtivaIndex === null && (
            <div className="border rounded p-3 text-muted">
              Nenhuma massa selecionada
            </div>
          )}

          {massaAtivaIndex !== null &&
            layoutAtivo.massas[massaAtivaIndex] && (
              <>
                <label className="mt-3">Arquivo da Massa</label>
                <input
                  key={`massa-file-${massaFileKey}`}
                  className="form-control"
                  type="file"
                />

                <label className="mt-3">Observação</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={
                    layoutAtivo.massas[massaAtivaIndex].observacao || ''
                  }
                  onChange={e =>
                    updateMassaObservacao(e.target.value)
                  }
                />
              </>
            )}
        </>
      )}

      <div className="d-flex gap-2 mt-4">
        <button
          type="button"
          className="btn btn-salvar"
          onClick={salvar}
        >
          Salvar
        </button>

        <button
          type="button"
          className="btn btn-cancelar"
          onClick={() => {
            setLayoutAtivoId(null)
            setMassaAtivaIndex(null)
            setLayoutFileKey(prev => prev + 1)
            setMassaFileKey(prev => prev + 1)
          }}
        >
          Cancelar
        </button>
      </div>

    </form>
  )
}
