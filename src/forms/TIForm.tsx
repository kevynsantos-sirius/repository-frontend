import { useState } from 'react'
import type { Layout, Massa } from '../pages/Home/Home'

type Props = {
  layouts: Layout[]
  setLayouts: React.Dispatch<React.SetStateAction<Layout[]>>
}

export default function TIForm({ layouts, setLayouts }: Props) {

  const [layoutAtivoId, setLayoutAtivoId] = useState<string | null>(null)
  const [massaAtivaIndex, setMassaAtivaIndex] = useState<number | null>(null)

  const layoutAtivo = layouts.find(l => l.id === layoutAtivoId)

  /* ===============================
     ADICIONAR LAYOUT (RESET FORM)
     =============================== */
  function adicionarLayout() {
    const novoLayout: Layout = {
      id: crypto.randomUUID(),
      nomeArquivo: '',
      observacao: '',
      massas: []
    }

    setLayouts(prev => [...prev, novoLayout])

    // 🔑 RESET: troca layout ativo
    setLayoutAtivoId(novoLayout.id)
    setMassaAtivaIndex(null)
  }

  /* ===============================
     ADICIONAR MASSA (RESET FORM)
     =============================== */
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

    // 🔑 RESET: nova massa vira a ativa
    setMassaAtivaIndex(layoutAtivo.massas.length)
  }

  /* ===============================
     ATUALIZAÇÕES
     =============================== */
  function updateLayout(field: string, value: string) {
    setLayouts(prev =>
      prev.map(l =>
        l.id === layoutAtivoId ? { ...l, [field]: value } : l
      )
    )
  }

  function updateMassa(field: string, value: string) {
    if (!layoutAtivo || massaAtivaIndex === null) return

    setLayouts(prev =>
      prev.map(l =>
        l.id === layoutAtivo.id
          ? {
              ...l,
              massas: l.massas.map((m, i) =>
                i === massaAtivaIndex ? { ...m, [field]: value } : m
              )
            }
          : l
      )
    )
  }

  return (
    <form className="card form-card p-4">

      <h5 className="mb-3">TI – Layout e Forma de Envio</h5>

      {/* ===== LAYOUTS ===== */}
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
          <input className="form-control" type="file" />

          <label className="mt-3">Observação</label>
          <textarea
            className="form-control"
            rows={3}
            value={layoutAtivo.observacao || ''}
            onChange={e => updateLayout('observacao', e.target.value)}
          />

          <hr className="my-4" />

          {/* ===== MASSAS ===== */}
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

          {massaAtivaIndex !== null && layoutAtivo.massas[massaAtivaIndex] && (
            <>
              <label className="mt-3">Arquivo da Massa</label>
              <input className="form-control" type="file" />

              <label className="mt-3">Observação</label>
              <textarea
                className="form-control"
                rows={3}
                value={layoutAtivo.massas[massaAtivaIndex].observacao || ''}
                onChange={e => updateMassa('observacao', e.target.value)}
              />
            </>
          )}
        </>
      )}

      <div className="d-flex gap-2 mt-4">
        <button type="button" className="btn btn-salvar">
          Salvar
        </button>
        <button type="button" className="btn btn-cancelar">
          Cancelar
        </button>
      </div>

    </form>
  )
}
