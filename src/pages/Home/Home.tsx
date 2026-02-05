import { useState } from 'react'
import SubmenuHeader from '../../components/SubmenuHeader/SubmenuHeader'
import VersionsSidebar from '../../components/VersoesSidebar/VersionsSidebar'
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
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('identificacao')
  const [layouts, setLayouts] = useState<Layout[]>([])

  return (
    <div className="p-4">

      <SubmenuHeader
        active={abaAtiva}
        onChange={setAbaAtiva}
      />

      <div className="d-flex mt-4">

        {abaAtiva === 'ti' && (
          <VersionsSidebar layouts={layouts} />
        )}

        <div className="flex-fill ps-4">

          {abaAtiva === 'identificacao' && <IdentificacaoForm />}

          {abaAtiva === 'ti' && (
            <TIForm
              layouts={layouts}
              setLayouts={setLayouts}
            />
          )}

          {abaAtiva === 'modelo' && <ModeloForm />}

        </div>
      </div>
    </div>
  )
}
