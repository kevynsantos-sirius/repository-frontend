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
import type{ChecklistEnvioDTO} from '../../dto/ChecklistEnvioDTO'
import type { Layout,Massa } from '../../types/types'
import type { UsuarioDTO } from '../../dto/UsuarioDTO'
import ChecklistDocPreviewModal from "../../view/ChecklistDocPreviewModal"
import { toast } from 'react-toastify'
import ConfirmModal from '../../modal/ConfirmModal'
import { v4 as uuidv4 } from 'uuid';
import type { Modelo } from "../../types/types"
import PlanoComunicacaoForm from "../../forms/PlanoComunicacaoForm"
import type { AbaAtiva, ArquivoGerenciado, ArquivoGerenciadoDTO } from "../../types/types"


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

  const [planoArquivo, setPlanoArquivo] = useState<File | null>(null)
  const [planoObservacao, setPlanoObservacao] = useState("")

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

  const [btnSalvarCheckList, setBtnSalvarCheckList] = useState(false)

  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false)

   const [modelos, setModelos] = useState<Modelo[]>([])

  const [modeloSelecionadoId, setModeloSelecionadoId] = useState<string | null>(null)

  const layoutSelecionado =
    layouts.find(l => l.id === layoutSelecionadoId) || null

  const massaSelecionada =
    layoutSelecionado?.massas.find(m => m.id === massaSelecionadaId) || null

  /* =========================
     LOAD
     ========================= */
  useEffect(() => {
    if(isNovo)
      {
        setBtnSalvarCheckList(true);
        return;
      }

    async function carregarChecklist(checklistId: string) {
      try {
        setLoading(true)
        const data = await buscarChecklistPorId(checklistId)
        setChecklist(data)

        if (Array.isArray((data as any).layouts)) {
          setLayouts(mapLayoutsFromBackend((data as any).layouts))
        }

        if (Array.isArray((data as any).modelos)) {
          setModelos(data.modelos.map(parseModeloBackend))
        }
      } finally {
        setLoading(false)
      }
    }

    carregarChecklist(id!)
  }, [id, isNovo])

function confirmarCancelamento() {
  setConfirmCancelOpen(false)
  navigate('/home')
}

function validarArquivosTI(): boolean {

  // 🔎 Se não há layouts → usuário nunca entrou no TI
  if (layouts.length === 0) return true

  /* =========================
     1) ARQUIVOS NOVOS
     ========================= */
  const arquivosLayouts = Object.values(filesLayout).flat()
  const arquivosMassas = Object.values(filesMassas).flat()

  const totalArquivosNovos =
    arquivosLayouts.length + arquivosMassas.length

  /* =========================
     2) ARQUIVOS JÁ EXISTENTES
     ========================= */
  const existeArquivoAntigo = layouts.some(layout =>
    layout.nomeLayout?.trim() ||
    layout.massas.some(m => m.nomeArquivo?.trim())
  )

  /* =========================
     3) VALIDAÇÃO FINAL
     ========================= */

  if (totalArquivosNovos === 0 && !existeArquivoAntigo) {
    toast.warning('Você criou Layout/Massa mas não anexou nenhum arquivo.')
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
      toast.warning('Preencha a identificação')
      return false
    }

    if (!checklist.nomeDocumento?.trim()) {
      toast.warning('Informe o nome do documento')
      return false
    }

    if (!checklist.idRamo) {
      toast.warning('Selecione o ramo')
      return false
    }

    if (!checklist.status) {
      toast.warning('Selecione o status')
      return false
    }

    if (!checklist.centroCusto?.trim()) {
      toast.warning('Informe o centro de custo')
      return false
    }

    if (!checklist.idDemanda?.trim()) {
      toast.warning('Informe a identificação da demanda')
      return false
    }

    if(!checklist.icatu && !checklist.caixa && !checklist.rioGrande)
    {
      toast.warning('Informe um tipo de documento')
      return false
    }

    return true
  }

  /* =========================
     HANDLERS TI
     ========================= */
function onNovoLayout() {
  setDraftLayout({
    id: uuidv4(),
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
  layouts: Layout[],
  modelos: Modelo[]
): ChecklistEnvioDTO {

  function layoutTemArquivoNovo(layoutId: string): boolean {
    return !!filesLayout[layoutId]?.length;
  }

  function massaTemArquivoNovo(massaId: string): boolean {
    return !!filesMassas[massaId]?.length;
  }



  function modeloTemArquivoNovo(mod: Modelo): boolean {
    return (
      mod.logos.some(l => !!l.file) ||
      mod.arquivosAdicionais.some(a => !!a.file) ||
      mod.assinaturas.some(s => !!s.file) ||
      !!mod.arquivosImpressao
    );
  }

  // 🔹 MODELOS
  const modelosPayload = modelos.map(mod => ({
    id: mod.id,
    observacao: mod.observacao,
    regrasAcesso: mod.regrasAcesso,

    camposBusca: { ...mod.camposBusca },

    tipoImpressao: mod.tipoImpressao,
    tipoAcabamento: mod.tipoAcabamento,
    disponibilizacao: mod.disponibilizacao,
    emailOpcoes: mod.emailOpcoes,

    temArquivo: modeloTemArquivoNovo(mod),
    arquivosImpressao: mod.arquivosImpressao
      ?.filter(a => a)
      .map(a => a) ?? [],

    logos: mod.logos.map(l => ({
      id: l.id,
      name: l.name,
      observacao: l.observacao,
      temArquivo: !!l.file
    })),

    arquivosAdicionais: mod.arquivosAdicionais.map(a => ({
      id: a.id,
      name: a.name,
      observacao: a.observacao,
      temArquivo: !!a.file
    })),

    assinaturas: mod.assinaturas.map(s => ({
      id: s.id,
      name: s.name,
      observacao: s.observacao,
      temArquivo: !!s.file
    }))
  }));

  // 🔥 AQUI ESTÁ O RETORNO CERTO
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

    // Layouts
    layouts: layouts.map(l => ({
      id: l.id,
      nomeLayout: l.nomeLayout,
      observacao: l.observacao,
      temArquivo: layoutTemArquivoNovo(l.id),

      massasDados: l.massas.map(m => ({
        id: m.id,
        nomeMassaDados: m.nomeArquivo,
        observacao: m.observacao,
        temArquivo: massaTemArquivoNovo(m.id)
      }))
    })),

    // 🔥 ADICIONAR FINALMENTE OS MODELOS
    modelos: modelosPayload
  };
}

function parseArquivoGerenciado(dto: ArquivoGerenciadoDTO): ArquivoGerenciado {
  return {
    id: dto.id ?? crypto.randomUUID(),
    name: dto.name ?? dto.nomeArquivo ?? "arquivo",
    nomeArquivo: dto.nomeArquivo ?? dto.name ?? "arquivo",
    observacao: dto.observacao ?? "",
    arquivo: null,   // backend não envia o File real
    file: undefined,   // usado somente no front quando o usuário envia
    tipo: dto.tipo
  }
}

function parseModeloBackend(m: any): Modelo {
  return {
    id: m.id ?? crypto.randomUUID(),
    observacao: m.observacao ?? "",
    regrasAcesso: m.regrasAcesso ?? "",
    nomeRecurso: m.nomeRecurso ?? null,
    temArquivo: m.temArquivo ?? false,

    camposBusca: {
      backoffice: m.camposBusca?.backoffice ?? "",
      cliente: m.camposBusca?.cliente ?? "",
      corretor: m.camposBusca?.corretor ?? "",
      estipulante: m.camposBusca?.estipulante ?? "",
      subestipulante: m.camposBusca?.subestipulante ?? ""
    },

    tipoImpressao: m.tipoImpressao ?? [],
    tipoAcabamento: m.tipoAcabamento ?? [],
    disponibilizacao: m.disponibilizacao ?? [],
    emailOpcoes: m.emailOpcoes ?? [],
    arquivo: null, // nunca vem do back
    arquivosImpressao: (m.arquivosImpressao ?? []).map(parseArquivoGerenciado),

    logos: (m.logos ?? []).map(parseArquivoGerenciado),
    arquivosAdicionais: (m.arquivosAdicionais ?? []).map(parseArquivoGerenciado),
    assinaturas: (m.assinaturas ?? []).map(parseArquivoGerenciado)
  }
}


async function onSalvarChecklist() {

  // 🔥 Validação Identificação
  if (!validarIdentificacao(checklist)) return

  if (!checklist) return

  // 🔥 Validação TI (somente se abriu)
  if (!validarArquivosTI()) return

  try {
    const payload = montarPayloadEnvio(checklist, layouts, modelos)

    const arquivosLayouts = Object.values(filesLayout).flat()
    const arquivosMassas = Object.values(filesMassas).flat()
    const arquivosModelos: { file: File, key: string }[] = [];

    modelos.forEach((m, i) => {

      if (m.arquivo) {
        arquivosModelos.push({
          file: m.arquivo,
          key: `modelo-${i}-principal`
        });
      }

      m.logos.forEach((l, j) => {
        if (l.file) {
          arquivosModelos.push({
            file: l.file,
            key: `modelo-${i}-logo-${j}`
          });
        }
      });

      m.assinaturas.forEach((s, j) => {
        if (s.file) {
          arquivosModelos.push({
            file: s.file,
            key: `modelo-${i}-assinatura-${j}`
          });
        }
      });

      m.arquivosAdicionais.forEach((a, j) => {
        if (a.file) {
          arquivosModelos.push({
            file: a.file,
            key: `modelo-${i}-adicional-${j}`
          });
        }
      });

      m.arquivosImpressao.forEach((i , j) => {
        if(i)
        {
          arquivosModelos.push({
            file: i,
            key: `modelo-${i}-impressao-${j}`
          });
        }
      });
    });
    payload.idUsuario = Number(user?.id)
    if (isNovo) {

      await salvarChecklist(
        payload,
        arquivosLayouts.filter(f => f && f.name && f.size > 0),
        arquivosMassas.filter(f => f && f.name && f.size > 0),
        arquivosModelos
      )

      toast.success('Checklist salvo com sucesso!')
      navigate('/home')
    } else {
      await atualizarChecklist(
        checklist.idChecklistVersao.toString(),
        payload,
        arquivosLayouts.filter(f => f && f.name && f.size > 0),
        arquivosMassas.filter(f => f && f.name && f.size > 0),
        arquivosModelos
      )

      toast.success('Checklist atualizado com sucesso!')
      navigate('/home')
    }

  } catch (error) {
    console.error(error)
    toast.error('Erro ao salvar checklist')
  }
}

function onCancelarTI() {
  setModoTI(null)
  setDraftLayout(null)
  setDraftMassa(null)
  setLayoutSelecionadoId(null)
  setMassaSelecionadaId(null)
}



function onNovaMassa() {
  if (!layoutSelecionadoId) return

  setMassaSelecionadaId(null)   // ⭐ ESSENCIAL

  setDraftMassa({
    id: uuidv4(),
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
    setDraftLayout(null)      // ⭐ LIMPA NOVO LAYOUT
    setDraftMassa(null)       // ⭐ LIMPA NOVA MASSA

    setLayoutSelecionadoId(id)
    setMassaSelecionadaId(null)
    setModoTI('layout')
    setNovoLayout(false)
  }


  function onSelectMassa(layoutId: string, massaId: string) {
    setDraftMassa(null)        // ⭐ LIMPA NOVA MASSA
    setDraftLayout(null)       // ⭐ segurança extra

    setLayoutSelecionadoId(layoutId)
    setMassaSelecionadaId(massaId)
    setModoTI('massa')
    setNovoLayout(false)
  }


  function onRemoverLayout(layoutId: string) {

  // 🔥 Remove layout da lista
  setLayouts(prev => prev.filter(l => l.id !== layoutId))

  // 🔥 Remove arquivos do layout
  setFilesLayout(prev => {
    const novo = { ...prev }
    delete novo[layoutId]
    return novo
  })

  // 🔥 Remove arquivos das massas desse layout
  setFilesMassas(prev => {
    const novo = { ...prev }

    const layout = layouts.find(l => l.id === layoutId)

    layout?.massas.forEach(m => {
      delete novo[m.id]
    })

    return novo
  })

  if (layoutSelecionadoId === layoutId) {
    setLayoutSelecionadoId(null)
    setMassaSelecionadaId(null)
    setModoTI(null)
  }
  setBtnSalvarCheckList(true);
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

  // 🔹 Se for massa draft → atualizar draft
  if (draftMassa && draftMassa.id === updated.id) {
    setDraftMassa(updated)
    return
  }

  // 🔹 Massa existente
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

  // 🔥 Remove arquivos da massa
  setFilesMassas(prev => {
    const novo = { ...prev }
    delete novo[massaId]
    return novo
  })

  if (massaSelecionadaId === massaId) {
    setMassaSelecionadaId(null)
    setModoTI(null)
  }

  setBtnSalvarCheckList(true);
}



  // ➕ Criar novo modelo
function onNovoModelo(file: File) {
  const novo: Modelo = {
    id: crypto.randomUUID(),
    arquivo: file,
    observacao: "",

    logos: [],
    arquivosAdicionais: [],
    assinaturas: [],

    regrasAcesso: "",

    camposBusca: {
      backoffice: "",
      cliente: "",
      corretor: "",
      estipulante: "",
      subestipulante: ""
    },

    tipoImpressao: [],
    tipoAcabamento: [],
    arquivosImpressao: [],

    disponibilizacao: [],
    emailOpcoes: []
  }

  setModelos(prev => [...prev, novo])
  setModeloSelecionadoId(novo.id)
  setBtnSalvarCheckList(true);
}

  // 🗑 Remover modelo
  function onRemoverModelo(modeloId: string) {
    setModelos(prev => prev.filter(m => m.id !== modeloId))

    // Se o removido era o selecionado -> deseleciona
    if (modeloSelecionadoId === modeloId) {
      setModeloSelecionadoId(null)
    }
    setBtnSalvarCheckList(true);
  }

  // ✔ Selecionar modelo
  function onSelectModelo(modeloId: string) {
    setModeloSelecionadoId(modeloId);
  }

  function onEditarObservacao(modeloId: string, novaObs: string) {
  setModelos(prev =>
    prev.map(m =>
      m.id === modeloId ? { ...m, observacao: novaObs } : m
    )
  )
  setBtnSalvarCheckList(true);
}

function onUpdateModelo(modeloAtualizado: Modelo) {
  setModelos(prev =>
    prev.map(m => m.id === modeloAtualizado.id ? modeloAtualizado : m)
  )
  setBtnSalvarCheckList(true);
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
            visualizarDocumento={visualizarDocumento}
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
                setBtnSalvarCheckList={setBtnSalvarCheckList}
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
                filesLayout={filesLayout}
                filesMassas={filesMassas}
                setFilesLayout={setFilesLayout}
                setFilesMassas={setFilesMassas}
                onCancelar={onCancelarTI}
                setBtnSalvarCheckList={setBtnSalvarCheckList}
              />
            )}

            {abaAtiva === 'modelo' && (
              <ModeloForm
                checklist={checklist}
                modelos={modelos}
                modeloSelecionadoId={modeloSelecionadoId}
                onNovoModelo={onNovoModelo}
                onRemoverModelo={onRemoverModelo}
                onSelectModelo={onSelectModelo}
                onEditarObservacao={onEditarObservacao}
                onUpdateModelo={onUpdateModelo}   // ⬅️ ADICIONAR ESTA LINHA
              />
            )}

            {abaAtiva === 'planoComunicacao' && (
              <PlanoComunicacaoForm
                arquivo={planoArquivo}
                observacao={planoObservacao}
                onChangeArquivo={setPlanoArquivo}
                onChangeObservacao={setPlanoObservacao}
              />
            )}
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3">
        <div className="row justify-content-center g-2">

          <div className="col-auto">
            <button
              disabled={!btnSalvarCheckList}
              className="btn btn-primary px-5"
              onClick={onSalvarChecklist}
            >
              Salvar
            </button>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-outline-secondary px-4"
              onClick={() => {
                if(btnSalvarCheckList)
                {
                  setConfirmCancelOpen(true);
                }
                else
                {
                  navigate('/home');
                }

              }}
            >
              Cancelar
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


      <ConfirmModal
        aberto={confirmCancelOpen}
        titulo="Cancelar edição"
        mensagem="Tem certeza que deseja cancelar? Todas as alterações não salvas serão perdidas."
        textoConfirmar="Sim, cancelar"
        textoCancelar="Continuar editando"
        onConfirmar={confirmarCancelamento}
        onCancelar={() => setConfirmCancelOpen(false)}
      />
    </>
  )
}
