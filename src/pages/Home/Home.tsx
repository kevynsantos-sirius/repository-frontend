import AppLayout from '../../layouts/AppLayout'
import SubmenuHeader from '../../components/SubmenuHeader/SubmenuHeader'

export default function Home() {
  return (
    <AppLayout>

      <SubmenuHeader active="identificacao" />

      <div className="card p-4">
        <h5>Selecione uma opção no menu</h5>
      </div>

    </AppLayout>
  )
}
