import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import SubmenuHeader from '../../components/SubmenuHeader/SubmenuHeader'
import VersionsSidebar from '../../components/VersoesSidebar/VersionsSidebar'
import VersoesCheckListbar from '../../components/VersoesCheckList/VersoesChecklist'

import IdentificacaoForm from '../../forms/IdentificacaoForm'
import TIForm from '../../forms/TIForm'
import ModeloForm from '../../forms/ModeloForm'

import { buscarChecklistPorId, atualizarChecklist, salvarChecklist } from '../../services/checklist.service'
import type { ChecklistVersaoDTO } from '../../dto/ChecklistVersaoDTO'
import type { Layout,Massa } from '../../types/types'
import type { UsuarioDTO } from '../../dto/UsuarioDTO'

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
type HomeProps = {
  novoLayout: boolean
  user: UsuarioDTO | null
  setNovoLayout: React.Dispatch<React.SetStateAction<boolean>>
}
/* =========================
   COMPONENTE
   ========================= */
export default function Home({
  novoLayout,
  user,
  setNovoLayout
}: HomeProps) {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const {idVersao} = useParams<{idVersao: string}>()

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

  const [filesLayout, setFilesLayout] = useState<File[]>([])
  const [filesMassas, setFilesMassas] = useState<File[]>([])


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
    setNovoLayout(true);
  }

  function montarPayloadEnvio(
  checklist: ChecklistVersaoDTO,
  layouts: Layout[]
) {
  return {
    idChecklist: checklist.idChecklist?.toString(),
    idChecklistVersao: checklist.idChecklistVersao?.toString(),

    nomeDocumento: checklist.nomeDocumento,
    idRamo: checklist.idRamo,
    centroCusto: checklist.centroCusto,
    status: checklist.status,
    idUsuario: checklist.idUsuario,

    icatu: checklist.icatu,
    caixa: checklist.caixa,
    rioGrande: checklist.rioGrande,

    idDemanda: checklist.idDemanda,

    temLayout: checklist.temLayout,
    viaServico: checklist.viaServico,
    viaTxt: checklist.viaTxt,

    layouts: layouts.map(l => ({
      id: l.id,
      nomeLayout: l.nomeLayout,
      observacao: l.observacao,
      massasDados: l.massas.map(m => ({
        id: m.id,
        nomeMassaDados: m.nomeArquivo,
        observacao: m.observacao
      }))
    }))
  }
}

async function onSalvarChecklist() {
  if (!checklist) return

  try {
    const payload = montarPayloadEnvio(checklist, layouts)

    if (novoLayout) {
      payload.idUsuario = Number(user?.id);
      await salvarChecklist(
        payload,
        filesLayout,
        filesMassas
      )
      alert('Checklist salvo com sucesso!')
    } else {
      await atualizarChecklist(
        checklist.idChecklistVersao.toString(),
        payload,
        filesLayout,
        filesMassas
      )
      alert('Checklist atualizado com sucesso!')
    }

  } catch (error) {
    console.error(error)
    alert('Erro ao salvar checklist')
  }
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
    setNovoLayout(false)
  }

  function onSelectMassa(layoutId: string, massaId: string) {
    setLayoutSelecionadoId(layoutId)
    setMassaSelecionadaId(massaId)
    setModoTI('massa')
    setNovoLayout(false)
  }

  function onRemoverLayout(layoutId: string) {
  setLayouts(prev => prev.filter(l => l.id !== layoutId))
  if (layoutSelecionadoId === layoutId) {
    setLayoutSelecionadoId(null)
    setMassaSelecionadaId(null)
    setModoTI(null)
  }
}

function atualizarLayout(updated: Layout) {
  setLayouts(prev =>
    prev.map(l => l.id === updated.id ? updated : l)
  )
}

function atualizarMassa(layoutId: string, updated: Massa) {
  setLayouts(prev =>
    prev.map(l =>
      l.id === layoutId
        ? {
            ...l,
            massas: l.massas.map(m =>
              m.id === updated.id ? updated : m
            )
          }
        : l
    )
  )
}


function onRemoverMassa(layoutId: string, massaId: string) {
  setLayouts(prev =>
    prev.map(l =>
      l.id === layoutId
        ? { ...l, massas: l.massas.filter(m => m.id !== massaId) }
        : l
    )
  )
  if (massaSelecionadaId === massaId) {
    setMassaSelecionadaId(null)
    setModoTI(null)
  }
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
          {!isNovo && (
            <button
              className="btn btn-outline-primary"
              onClick={() => setVersoesAberto(true)}
            >
              Versões
            </button>
          )}
        </div>

        {/* CHECKLIST BAR (OUTRA FUNCIONALIDADE) */}
        {!isNovo && idVersao && (
          <VersoesCheckListbar
            aberto={versoesAberto}
            onClose={() => setVersoesAberto(false)}
            onSelectVersao={(layoutsDaVersao) => {
              setLayouts(mapLayoutsFromBackend(layoutsDaVersao))
              setAbaAtiva('ti')
              setVersoesAberto(false)
            }}
            idVersao={idVersao}
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
              onRemoverLayout={onRemoverLayout}       // <- aqui
              onRemoverMassa={onRemoverMassa}         // <- e aqui
              onSelectLayout={onSelectLayout}
              onSelectMassa={onSelectMassa}
            />

          )}

          <div className="flex-fill ps-4">
            {abaAtiva === 'identificacao' && (
              <IdentificacaoForm
                checklist={checklist}
                layout={layoutSelecionado}
                isNovo={isNovo}
                onChangeChecklist={setChecklist}
                user={user}
                 onSalvarLayout={onSalvarChecklist}
              />

            )}

            {abaAtiva === 'ti' && (
              <TIForm
                modo={modoTI}
                layout={layoutSelecionado}
                massa={massaSelecionada}
                onChangeLayout={atualizarLayout}
                onChangeMassa={atualizarMassa}
                onRemoverLayout={onRemoverLayout}
                onRemoverMassa={onRemoverMassa}
                onSalvarLayout={onSalvarChecklist}
                setFilesLayout={setFilesLayout}
                setFilesMassas={setFilesMassas}
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
