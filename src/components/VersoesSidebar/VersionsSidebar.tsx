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
    <div className="versions-sidebar p-3 border-end">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <strong>Layouts</strong>
        <button
          type="button"
          className="btn btn-sm btn-outline-custom"
          onClick={onNovoLayout}
        >
          + Layout
        </button>
      </div>

      {/* Sem layouts */}
      {layouts.length === 0 && (
        <small className="text-muted">Nenhum layout cadastrado</small>
      )}

      {/* Lista de layouts */}
      {layouts.map(layout => (
        <div
          key={layout.id}
          className="mb-3 pb-2 border-bottom"
        >
          {/* Layout */}
          <div className="d-flex justify-content-between align-items-start">
            <div
              className={`fw-semibold cursor-pointer me-2 ${
                layout.id === layoutSelecionadoId
                  ? 'text-danger fw-bold'
                  : 'text-primary-emphasis fw-bold'
              }`}
              onClick={() => onSelectLayout(layout.id)}
              style={{
                maxWidth: 'calc(100% - 30px)',
                whiteSpace: 'normal',
                overflowWrap: 'break-word',
                wordBreak: 'break-word'
              }}
              title={layout.nomeLayout}
            >
              {layout.nomeLayout || 'Novo Layout'}
            </div>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger flex-shrink-0"
              onClick={() => onRemoverLayout(layout.id)}
            >
              x
            </button>
          </div>

          {/* Massas */}
          <ul className="ps-2 mt-2">
            {layout.massas.map(massa => (
              <li
                key={massa.id}
                className="d-flex justify-content-between align-items-center mb-1"
                style={{
                  borderLeft: '2px solid #dee2e6',
                  paddingLeft: '8px',
                  marginLeft: '8px'
                }}
              >
                <span
                  className={`cursor-pointer me-2 ${
                    massa.id === massaSelecionadaId
                      ? 'text-primary fw-semibold'
                      : ''
                  }`}
                  onClick={() => onSelectMassa(layout.id, massa.id)}
                  style={{
                    maxWidth: 'calc(100% - 30px)',
                    whiteSpace: 'normal',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word'
                  }}
                  title={massa.nomeArquivo}
                >
                  {massa.nomeArquivo || 'Nova Massa'}
                </span>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger flex-shrink-0"
                  onClick={() => onRemoverMassa(layout.id, massa.id)}
                >
                  x
                </button>
              </li>
            ))}

            {/* Nova massa */}
            {layout.id === layoutSelecionadoId && (
              <li
                className="text-muted cursor-pointer mt-1"
                style={{
                  marginLeft: '8px'
                }}
                onClick={onNovaMassa}
              >
                + Nova Massa
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  )
}