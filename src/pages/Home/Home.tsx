import { useState } from 'react'
import { useParams } from 'react-router-dom'

import SubmenuHeader from '../../components/SubmenuHeader/SubmenuHeader'
import VersionsSidebar from '../../components/VersoesSidebar/VersionsSidebar'
import VersoesCheckListbar from '../../components/VersoesCheckList/VersoesChecklist'

import IdentificacaoForm from '../../forms/IdentificacaoForm'
import TIForm from '../../forms/TIForm'
import ModeloForm from '../../forms/ModeloForm'

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
  massas: Massa[]
}

type AbaAtiva = 'identificacao' | 'ti' | 'modelo'

export default function Home() {
  const { id } = useParams()

  const isNovo = id === 'novo'

  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('identificacao')
  const [layouts, setLayouts] = useState<Layout[]>([])

  // 🔥 sidebar direita (versões)
  const [versoesAberto, setVersoesAberto] = useState(false)

  return (
    <div className="p-4">

      {/* SUBMENU */}
      <div className="d-flex justify-content-between align-items-center">
        <SubmenuHeader
          active={abaAtiva}
          onChange={setAbaAtiva}
        />

        {/* BOTÃO VERSÕES */}
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

        {/* SIDEBAR ESQUERDA – somente TI */}
        {abaAtiva === 'ti' && (
          <VersionsSidebar layouts={layouts} />
        )}

        {/* CONTEÚDO */}
        <div className="flex-fill ps-4">

          {abaAtiva === 'identificacao' && (
            <IdentificacaoForm />
          )}

          {abaAtiva === 'ti' && (
            <TIForm
              layouts={layouts}
              setLayouts={setLayouts}
            />
          )}

          {abaAtiva === 'modelo' && (
            <ModeloForm />
          )}

        </div>
      </div>

      {/* SIDEBAR DIREITA – VERSÕES (SÓ SE NÃO FOR NOVO) */}
      {!isNovo && (
        <VersoesCheckListbar
          aberto={versoesAberto}
          onClose={() => setVersoesAberto(false)}
          onSelectVersao={(layoutsDaVersao) => {
            // 🔑 carrega layouts da versão
            setLayouts(layoutsDaVersao)

            // 🔑 vai direto para TI
            setAbaAtiva('ti')

            // 🔑 fecha sidebar
            setVersoesAberto(false)
          }}
        />
      )}
    </div>
  )
}
