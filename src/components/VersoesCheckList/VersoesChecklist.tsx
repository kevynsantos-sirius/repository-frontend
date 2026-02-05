import { useEffect, useState } from 'react'
import { buscarVersoes } from '../../services/versoes.service'
import type { Versao } from '../../services/versoes.service'
import type { Layout } from '../../pages/Home/Home'

type Props = {
  aberto: boolean
  onClose: () => void
  onSelectVersao: (layouts: Layout[]) => void
}


export default function VersoesCheckListbar({ aberto, onClose }: Props) {
  const [versoes, setVersoes] = useState<Versao[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!aberto) return

    setLoading(true)
    buscarVersoes().then(data => {
      setVersoes(data)
      setLoading(false)
    })
  }, [aberto])

  return (
    <>
      {aberto && (
        <div
          className="versoes-backdrop"
          onClick={onClose}
        />
      )}

      <aside className={`versoes-sidebar ${aberto ? 'open' : ''}`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong>Versões</strong>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {loading && (
          <div className="text-muted">Carregando versões...</div>
        )}

        {!loading && (
          <ul className="list-group list-group-flush">
            {versoes.map(v => (
              <li
                key={v.id}
                className={`list-group-item d-flex flex-column ${
                  v.ativa ? 'active' : ''
                }`}
                style={{ cursor: 'pointer' }}
              >
                <strong>{v.nome}</strong>
                <small className="text-muted">
                  Criada em {v.data}
                </small>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  )
}
