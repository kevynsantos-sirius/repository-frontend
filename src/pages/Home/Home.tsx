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

/* =========================
   TIPOS
   ========================= */

export type Massa = {
  id: string
  nomeArquivo?: string
  arquivo?: File | null
  observacao?: string
}

export type Layout = {
  id: string
  nomeArquivo?: string
  arquivo?: File | null
  observacao?: string
  nomeLayout?: string
  massas: Massa[]
}

type AbaAtiva = 'identificacao' | 'ti' | 'modelo'

/* =========================
   COMPONENTE
   ========================= */

export default function Home() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const isNovo = id === 'novo'

  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('identificacao')
  const [layouts, setLayouts] = useState<Layout[]>([])

  const [checklist, setChecklist] = useState<ChecklistVersaoDTO | null>(null)
  const [loading, setLoading] = useState(false)

  // sidebar direita (versões)
  const [versoesAberto, setVersoesAberto] = useState(false)

  /* =========================
     BUSCA CHECKLIST
     ========================= */
  useEffect(() => {
    if (!id || isNovo) return

    async function carregarChecklist() {
      try {
        setLoading(true)

        const data: ChecklistVersaoDTO = await buscarChecklistPorId(id!)
        setChecklist(data)

        if ((data as any).layouts) {
          setLayouts((data as any).layouts)
        }

      } catch (error) {
        console.error('Erro ao carregar checklist', error)
      } finally {
        setLoading(false)
      }
    }

    carregarChecklist()
  }, [id, isNovo])

  /* =========================
     LOADING
     ========================= */
  if (loading) {
    return (
      <div className="p-4">
        <strong>Carregando checklist...</strong>
      </div>
    )
  }

  /* =========================
     RENDER
     ========================= */
  return (
    <>
      <div className="px-4">

        {/* SUBMENU */}
        <div className="d-flex justify-content-between align-items-center">
          <SubmenuHeader
            active={abaAtiva}
            onChange={setAbaAtiva}
          />

          {!isNovo && (
            <button
              className="btn btn-outline-primary"
              onClick={() => setVersoesAberto(true)}
            >
              Versões
            </button>
          )}
        </div>

        <div className="d-flex mt-4">

          {/* SIDEBAR ESQUERDA */}
          {abaAtiva === 'ti' && (
            <VersionsSidebar layouts={layouts} />
          )}

          {/* CONTEÚDO */}
          <div className="flex-fill ps-4">

            {abaAtiva === 'identificacao' && (
              <IdentificacaoForm checklist={checklist} />
            )}

            {abaAtiva === 'ti' && (
              <TIForm
                checklist={checklist}
                layouts={layouts}
                setLayouts={setLayouts}
              />
            )}

            {abaAtiva === 'modelo' && (
              <ModeloForm checklist={checklist} />
            )}

          </div>
        </div>

        {/* SIDEBAR DIREITA */}
        {!isNovo && (
          <VersoesCheckListbar
            aberto={versoesAberto}
            onClose={() => setVersoesAberto(false)}
            onSelectVersao={(layoutsDaVersao) => {
              setLayouts(layoutsDaVersao)
              setAbaAtiva('ti')
              setVersoesAberto(false)
            }}
          />
        )}
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
