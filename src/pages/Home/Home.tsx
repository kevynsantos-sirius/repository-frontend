import { useState } from 'react'
import AppLayout from '../../layouts/AppLayout'
import SubmenuHeader from '../../components/SubmenuHeader/SubmenuHeader'
import IdentificacaoForm from '../../forms/IdentificacaoForm'
import TIForm from '../../forms/TIForm'
import ModeloForm from '../../forms/ModeloForm'

type Aba = 'identificacao' | 'ti' | 'modelo'

export default function Home() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>('identificacao')

  function renderFormulario() {
    switch (abaAtiva) {
      case 'identificacao':
        return <IdentificacaoForm />
      case 'ti':
        return <TIForm />
      case 'modelo':
        return <ModeloForm />
    }
  }

  return (
    <AppLayout>
      <SubmenuHeader
        active={abaAtiva}
        onChange={setAbaAtiva}
      />

      {renderFormulario()}
    </AppLayout>
  )
}
