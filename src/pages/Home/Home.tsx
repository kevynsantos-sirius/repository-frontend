import { useEffect, useState } from 'react'
import AppLayout from '../../layouts/AppLayout'
import SubmenuHeader from '../../components/SubmenuHeader/SubmenuHeader'
import { buscarIdentificacao } from '../../services/identificacaoService'
import { buscarTI } from '../../services/tiService'
import { buscarModelos } from '../../services/modeloService'

export default function Home() {
  const [dados, setDados] = useState<any>({
    identificacao: null,
    ti: null,
    modelo: null
  })

  useEffect(() => {
    async function carregar() {
      const [identificacao, ti, modelo] = await Promise.all([
        buscarIdentificacao(),
        buscarTI(),
        buscarModelos()
      ])

      setDados({ identificacao, ti, modelo })
    }

    carregar()
  }, [])

  return (
    <AppLayout>
      <SubmenuHeader active="identificacao" />

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Identificação</h6>
            <pre>{JSON.stringify(dados.identificacao, null, 2)}</pre>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6>TI</h6>
            <pre>{JSON.stringify(dados.ti, null, 2)}</pre>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6>Modelo</h6>
            <pre>{JSON.stringify(dados.modelo, null, 2)}</pre>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
