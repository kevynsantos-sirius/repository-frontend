import type { Layout } from '../../pages/Home/Home'

type Props = {
  layouts: Layout[]
}

export default function VersionsSidebar({ layouts }: Props) {
  return (
    <div className="versions-sidebar p-3 border-end" style={{ width: 260 }}>

      <h6 className="mb-3">Versões</h6>

      {layouts.length === 0 && (
        <small className="text-muted">Nenhuma versão</small>
      )}

      {layouts.map(layout => (
        <div key={layout.id} className="mb-3">

          <strong className="d-block">
            {layout.nomeArquivo || 'Layout'}
          </strong>

          <ul className="ps-3 mb-0">
            {layout.massas.map(m => (
              <li key={m.id}>
                {m.nomeArquivo || 'Massa'}
              </li>
            ))}
          </ul>

        </div>
      ))}
    </div>
  )
}
