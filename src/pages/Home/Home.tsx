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
   TIPOS DO FRONT
   ========================= */

export type Massa = {
  id: string
  nomeArquivo: string
  observacao: string
}

export type Layout = {
  id: string
  nomeLayout: string
  observacao: string
  massas: Massa[]
}

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

  const isNovo = id === 'novo'

  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('identificacao')
  const [layouts, setLayouts] = useState<Layout[]>([])
  const [checklist, setChecklist] = useState<ChecklistVersaoDTO | null>(null)
  const [loading, setLoading] = useState(false)

  const [versoesAberto, setVersoesAberto] = useState(false)

useEffect(() => {
  if (!id || isNovo) return

  const checklistId: string = id

  async function carregarChecklist() {
    try {
      setLoading(true)

      const data = await buscarChecklistPorId(checklistId)
      setChecklist(data)

      if (Array.isArray((data as any).layouts)) {
        setLayouts(mapLayoutsFromBackend((data as any).layouts))
      }

    } catch (error) {
      console.error('Erro ao carregar checklist', error)
    } finally {
      setLoading(false)
    }
  }

  carregarChecklist()
}, [id, isNovo])


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

          {abaAtiva === 'ti' && (
            <VersionsSidebar layouts={layouts} />
          )}

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
