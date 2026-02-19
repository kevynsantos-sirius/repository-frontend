import type { Layout } from '../../types/types'

type Props = {
  layouts: Layout[]
  layoutSelecionadoId: string | null
  massaSelecionadaId: string | null

  onNovoLayout(): void
  onNovaMassa(): void
  onRemoverLayout(layoutId: string): void
  onRemoverMassa(layoutId: string, massaId: string): void

  onSelectLayout(layoutId: string): void
  onSelectMassa(layoutId: string, massaId: string): void
}

export default function VersionsSidebar({
  layouts,
  layoutSelecionadoId,
  massaSelecionadaId,
  onNovoLayout,
  onNovaMassa,
  onRemoverLayout,
  onRemoverMassa,
  onSelectLayout,
  onSelectMassa
}: Props) {
  return (
    <div className="versions-sidebar p-3 border-end" style={{ width: 280 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <strong>Layouts</strong>
        <a href='#'>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={onNovoLayout}
          >
            + Layout
          </button>
        </a>
      </div>

      {layouts.length === 0 && (
        <small className="text-muted">Nenhum layout cadastrado</small>
      )}

      {layouts.map(layout => (
        <div key={layout.id} className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <a href='#'>
              <div
                className={`fw-semibold cursor-pointer text-truncate me-2 ${
                  layout.id === layoutSelecionadoId ? 'text-primary' : ''
                }`}
                onClick={() => onSelectLayout(layout.id)}
                style={{ maxWidth: 'calc(100% - 30px)', wordBreak: 'break-word' }}
                title={layout.nomeLayout}
              >
                {layout.nomeLayout || 'Novo Layout'}
              </div>
            </a>
            <a href='#'>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger flex-shrink-0"
                onClick={() => onRemoverLayout(layout.id)}
              >
                x
              </button>
            </a>
          </div>

          <ul className="ps-3 mt-1">
            {layout.massas.map(massa => (
              <li
                key={massa.id}
                className="d-flex justify-content-between align-items-center"
              >
                <a href='#'>
                  <span
                    className={`cursor-pointer text-truncate me-2 ${
                      massa.id === massaSelecionadaId
                        ? 'text-primary fw-semibold'
                        : ''
                    }`}
                    onClick={() => onSelectMassa(layout.id, massa.id)}
                    style={{ maxWidth: 'calc(100% - 30px)', wordBreak: 'break-word' }}
                    title={massa.nomeArquivo}
                  >
                    {massa.nomeArquivo || 'Nova Massa'}
                  </span>
                </a>
                <a href='#'>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger flex-shrink-0"
                    onClick={() => onRemoverMassa(layout.id, massa.id)}
                  >
                    x
                  </button>
                </a>
              </li>
            ))}

            {layout.id === layoutSelecionadoId && (
              <a href='#'>
                <li
                  className="text-muted cursor-pointer"
                  onClick={onNovaMassa}
                >
                  + Nova Massa
                </li>
              </a>
            )}
          </ul>
        </div>
      ))}
    </div>
  )
}
