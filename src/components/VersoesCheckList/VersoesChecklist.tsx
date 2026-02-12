import { useEffect, useState } from 'react'
import { buscarVersoesChecklist } from '../../services/versoes.service'
import type { Versao } from '../../dto/Versao'
import type { Layout } from '../../types/types'

type Props = {
  aberto: boolean
  idVersao: string
  onClose: () => void
  onSelectVersao: (layouts: Layout[]) => void
}

export default function VersoesCheckListbar({ aberto, idVersao, onClose }: Props) {
  const [versoes, setVersoes] = useState<Versao[]>([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!aberto) return

    setLoading(true)
    setErro('')
    buscarVersoesChecklist(idVersao)
      .then(data => {
        setVersoes(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setErro('Falha ao carregar versões')
        setLoading(false)
      })
  }, [aberto, idVersao])

  return (
    <>
      {aberto && <div className="versoes-backdrop" onClick={onClose} />}

      <aside className={`versoes-sidebar ${aberto ? 'open' : ''}`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong>Versões</strong>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            ✕
          </button>
        </div>

        {loading && <div className="text-muted">Carregando versões...</div>}
        {erro && <div className="text-danger">{erro}</div>}

        {!loading && !erro && (
          <ul className="list-group list-group-flush">
            {versoes.map(v => (
              <li
                key={v.id}
                className={`list-group-item d-flex flex-column ${v.ativa ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                <strong>{v.nome}</strong>
                <small className="text-muted">Criada em {v.data}</small>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  )
}
