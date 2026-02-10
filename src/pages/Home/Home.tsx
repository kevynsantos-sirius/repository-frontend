import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import SubmenuHeader from '../../components/SubmenuHeader/SubmenuHeader'
import VersionsSidebar from '../../components/VersoesSidebar/VersionsSidebar'
import VersoesCheckListbar from '../../components/VersoesCheckList/VersoesChecklist'

import IdentificacaoForm from '../../forms/IdentificacaoForm'
import TIForm from '../../forms/TIForm'
import ModeloForm from '../../forms/ModeloForm'

import { buscarChecklistPorId } from '../../services/checklist.service'
import type { ChecklistVersaoDTO } from '../../dto/ChecklistVersaoDTO'
import type { Layout } from '../../types/types'

type AbaAtiva = 'identificacao' | 'ti' | 'modelo'

/* =========================
   MAPEADOR BACK → FRONT
   ========================= */
function mapLayoutsFromBackend(layoutsBackend: any[]): Layout[] {
  return layoutsBackend.map(layout => ({
    id: String(layout.id),
    nomeLayout: layout.nomeLayout || '',
    observacao: layout.observacao || '',
    massas: Array.isArray(layout.massasDados)
      ? layout.massasDados.map((m: any) => ({
          id: String(m.id),
          nomeArquivo: m.nomeMassaDados || '',
          observacao: m.observacao || ''
        }))
      : []
  }))
}

/* =========================
   COMPONENTE
   ========================= */
export default function Home() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const isNovo = !id || id === 'novo'

  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('identificacao')
  const [layouts, setLayouts] = useState<Layout[]>([])
  const [checklist, setChecklist] = useState<ChecklistVersaoDTO | null>(null)
  const [loading, setLoading] = useState(false)

  /* ===== CONTROLE TI ===== */
  const [layoutSelecionadoId, setLayoutSelecionadoId] = useState<string | null>(null)
  const [massaSelecionadaId, setMassaSelecionadaId] = useState<string | null>(null)
  const [modoTI, setModoTI] = useState<'layout' | 'massa' | null>(null)

  const [versoesAberto, setVersoesAberto] = useState(false)

  const layoutSelecionado =
    layouts.find(l => l.id === layoutSelecionadoId) || null

  const massaSelecionada =
    layoutSelecionado?.massas.find(m => m.id === massaSelecionadaId) || null

  /* =========================
     LOAD
     ========================= */
  useEffect(() => {
    if (isNovo) return

    async function carregarChecklist(checklistId: string) {
      try {
        setLoading(true)
        const data = await buscarChecklistPorId(checklistId)
        setChecklist(data)

        if (Array.isArray((data as any).layouts)) {
          setLayouts(mapLayoutsFromBackend((data as any).layouts))
        }
      } finally {
        setLoading(false)
      }
    }

    carregarChecklist(id!)
  }, [id, isNovo])

  /* =========================
     HANDLERS TI
     ========================= */
  function onNovoLayout() {
    const novoId = crypto.randomUUID()

    setLayouts(prev => [
      ...prev,
      { id: novoId, nomeLayout: '', observacao: '', massas: [] }
    ])

    setLayoutSelecionadoId(novoId)
    setMassaSelecionadaId(null)
    setModoTI('layout')
  }

  function onNovaMassa() {
    if (!layoutSelecionadoId) return

    const novoId = crypto.randomUUID()

    setLayouts(prev =>
      prev.map(l =>
        l.id === layoutSelecionadoId
          ? {
              ...l,
              massas: [
                ...l.massas,
                { id: novoId, nomeArquivo: '', observacao: '' }
              ]
            }
          : l
      )
    )

    setMassaSelecionadaId(novoId)
    setModoTI('massa')
  }

  function onSelectLayout(id: string) {
    setLayoutSelecionadoId(id)
    setMassaSelecionadaId(null)
    setModoTI('layout')
  }

  function onSelectMassa(layoutId: string, massaId: string) {
    setLayoutSelecionadoId(layoutId)
    setMassaSelecionadaId(massaId)
    setModoTI('massa')
  }

  /* ========================= */

  if (loading) {
    return (
      <div className="p-4">
        <strong>Carregando checklist...</strong>
      </div>
    )
  }

  return (
    <>
      <div className="px-4">
        <div className="d-flex justify-content-between align-items-center">
          <SubmenuHeader active={abaAtiva} onChange={setAbaAtiva} />
        </div>

        {/* CHECKLIST BAR (OUTRA FUNCIONALIDADE) */}
        {!isNovo && (
          <VersoesCheckListbar
            aberto={versoesAberto}
            onClose={() => setVersoesAberto(false)}
            onSelectVersao={(layoutsDaVersao) => {
              setLayouts(mapLayoutsFromBackend(layoutsDaVersao))
              setAbaAtiva('ti')
              setVersoesAberto(false)
            }}
          />
        )}

        <div className="d-flex mt-4">
          {abaAtiva === 'ti' && (
            <VersionsSidebar
              layouts={layouts}
              layoutSelecionadoId={layoutSelecionadoId}
              massaSelecionadaId={massaSelecionadaId}
              onNovoLayout={onNovoLayout}
              onNovaMassa={onNovaMassa}
              onSelectLayout={onSelectLayout}
              onSelectMassa={onSelectMassa}
            />
          )}

          <div className="flex-fill ps-4">
            {abaAtiva === 'identificacao' && (
              <IdentificacaoForm checklist={checklist} />
            )}

            {abaAtiva === 'ti' && (
              <TIForm
                modo={modoTI}
                layout={layoutSelecionado}
                massa={massaSelecionada}
              />
            )}

            {abaAtiva === 'modelo' && (
              <ModeloForm checklist={checklist} />
            )}
          </div>
        </div>
      </div>

      <button
        className="ms-5 mt-2 btn btn-outline-primary"
        onClick={() => navigate('/home')}
      >
        Voltar
      </button>
    </>
  )
}
