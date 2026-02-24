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
import ChecklistDocPreviewModal from "../../view/ChecklistDocPreviewModal"

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

export default function Home({
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

  // 🔹 ADICIONE ESTES ESTADOS junto aos outros

  const [draftLayout, setDraftLayout] = useState<Layout | null>(null)
  const [draftMassa, setDraftMassa] = useState<Massa | null>(null)


  const [layoutSelecionadoId, setLayoutSelecionadoId] = useState<string | null>(null)
  const [massaSelecionadaId, setMassaSelecionadaId] = useState<string | null>(null)
  const [modoTI, setModoTI] = useState<'layout' | 'massa' | null>(null)

  const [versoesAberto, setVersoesAberto] = useState(false)

  const [filesLayout, setFilesLayout] = useState<Record<string, File[]>>({})
  const [filesMassas, setFilesMassas] = useState<Record<string, File[]>>({})

  const [abrirPreview, setAbrirPreview] = useState(false)
  const [dadosPreview, setDadosPreview] = useState<ChecklistVersaoDTO | null>(null)

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

  function validarArquivosTI(): boolean {

  // 🔎 Se não há layouts → usuário nunca entrou no TI
  if (layouts.length === 0) return true

  const arquivosLayouts = Object.values(filesLayout).flat()
  const arquivosMassas = Object.values(filesMassas).flat()

  // 🔎 Verifica se algum layout/massa exige arquivo
  const existeAlgumFormularioTI =
    layouts.length > 0 ||
    layouts.some(l => l.massas.length > 0)

  if (!existeAlgumFormularioTI) return true

  const totalArquivos = arquivosLayouts.length + arquivosMassas.length

  if (totalArquivos === 0) {
    alert('Você criou Layout/Massa mas não anexou nenhum arquivo.')
    setAbaAtiva('ti')
    return false
  }

  return true
}


  /* =========================
     🔥 VALIDAÇÃO IDENTIFICAÇÃO
     ========================= */
  function validarIdentificacao(checklist: ChecklistVersaoDTO | null): boolean {
    if (!checklist) {
      alert('Preencha a identificação')
      return false
    }

    if (!checklist.nomeDocumento?.trim()) {
      alert('Informe o nome do documento')
      return false
    }

    if (!checklist.idRamo) {
      alert('Selecione o ramo')
      return false
    }

    if (!checklist.status) {
      alert('Selecione o status')
      return false
    }

    if (!checklist.centroCusto?.trim()) {
      alert('Informe o centro de custo')
      return false
    }

    if (!checklist.idDemanda?.trim()) {
      alert('Informe a identificação da demanda')
      return false
    }

    return true
  }

  /* =========================
     HANDLERS TI
     ========================= */
function onNovoLayout() {
  setDraftLayout({
    id: crypto.randomUUID(),
    nomeLayout: '',
    observacao: '',
    massas: []
  })

  setLayoutSelecionadoId(null)
  setMassaSelecionadaId(null)
  setModoTI('layout')
  setNovoLayout(true)
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

  // 🔥 Validação Identificação
  if (!validarIdentificacao(checklist)) return

  if (!checklist) return

  // 🔥 Validação TI (somente se abriu)
  if (!validarArquivosTI()) return

  try {
    const payload = montarPayloadEnvio(checklist, layouts)

    const arquivosLayouts = Object.values(filesLayout).flat()
    const arquivosMassas = Object.values(filesMassas).flat()

    if (isNovo) {
      payload.idUsuario = Number(user?.id)

      await salvarChecklist(
        payload,
        arquivosLayouts,
        arquivosMassas
      )

      alert('Checklist salvo com sucesso!')
      navigate('/home')
    } else {
      await atualizarChecklist(
        checklist.idChecklistVersao.toString(),
        payload,
        arquivosLayouts,
        arquivosMassas
      )

      alert('Checklist atualizado com sucesso!')
      navigate('/home')
    }

  } catch (error) {
    console.error(error)
    alert('Erro ao salvar checklist')
  }
}


function onNovaMassa() {
  if (!layoutSelecionadoId) return

  setDraftMassa({
    id: crypto.randomUUID(),
    nomeArquivo: '',
    observacao: ''
  })

  setModoTI('massa')
}

function adicionarLayout(layout: Layout) {
  setLayouts(prev => [...prev, layout])
  setDraftLayout(null)
  setLayoutSelecionadoId(layout.id)
  setModoTI('layout')
}

function adicionarMassa(layoutId: string, massa: Massa) {
  setLayouts(prev =>
    prev.map(l =>
      l.id === layoutId
        ? { ...l, massas: [...l.massas, massa] }
        : l
    )
  )

  setDraftMassa(null)
  setMassaSelecionadaId(massa.id)
  setModoTI('massa')
}



  function visualizarDocumento(checklist: ChecklistVersaoDTO) {
    setDadosPreview(checklist)
    setAbrirPreview(true)
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

  // 🔹 Se for layout ainda não adicionado → atualizar draft
  if (draftLayout && draftLayout.id === updated.id) {
    setDraftLayout(updated)
    return
  }

  // 🔹 Layout já existente
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

          {/* 🔵 SIDEBAR LAYOUT → MASSA */}
          {abaAtiva === 'ti' && (
            <VersionsSidebar
              layouts={layouts}
              layoutSelecionadoId={layoutSelecionadoId}
              massaSelecionadaId={massaSelecionadaId}

              onNovoLayout={onNovoLayout}
              onNovaMassa={onNovaMassa}
              onRemoverLayout={onRemoverLayout}
              onRemoverMassa={onRemoverMassa}

              onSelectLayout={onSelectLayout}
              onSelectMassa={onSelectMassa}
            />
          )}

          <div className="flex-fill ps-4">
            {abaAtiva === 'identificacao' && (
              <IdentificacaoForm
                checklist={checklist}
                isNovo={isNovo}
                onChangeChecklist={setChecklist}
                user={user}
              />
            )}

            {abaAtiva === 'ti' && (
              <TIForm
                modo={modoTI}
                layout={draftLayout || layoutSelecionado}
                massa={draftMassa || massaSelecionada}

                // ✅ NOVAS FLAGS (ESSENCIAL)
                isDraftLayout={!!draftLayout}
                isDraftMassa={!!draftMassa}

                onAddLayout={adicionarLayout}
                onAddMassa={adicionarMassa}
                onChangeLayout={atualizarLayout}
                onChangeMassa={atualizarMassa}
                onRemoverLayout={onRemoverLayout}
                onRemoverMassa={onRemoverMassa}
                filesLayout={filesLayout}
                filesMassas={filesMassas}
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
      <div className="container-fluid mt-3">
        <div className="row justify-content-center g-2">

          <div className="col-auto">
            <button
              className="btn btn-outline-primary px-4"
              disabled={!checklist}
              onClick={() => checklist && visualizarDocumento(checklist)}
            >
              Visualizar Documento
            </button>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-primary px-5"
              onClick={onSalvarChecklist}
            >
              Salvar
            </button>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-outline-primary px-4"
              onClick={() => navigate('/home')}
            >
              Voltar
            </button>
          </div>

        </div>
      </div>


      {dadosPreview && (
        <ChecklistDocPreviewModal
          aberto={abrirPreview}
          onClose={() => setAbrirPreview(false)}
          data={dadosPreview}
        />
      )}
    </>
  )
}
