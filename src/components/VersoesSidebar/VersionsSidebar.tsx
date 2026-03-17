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
      <div
        className="d-flex justify-content-between align-items-center mb-3"
        style={{
          borderBottom: '2px solid #4e73df',
          paddingBottom: '8px'
        }}
      >
        <h3 className="me-3">Layouts</h3>
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
          className="mb-3 pb-2"
          style={{
            borderBottom: '1px solid #dee2e6'
          }}
        >
          {/* Layout */}
          <div className="d-flex justify-content-between align-items-start">
            <div
              className="fw-semibold me-2"
              onClick={() => onSelectLayout(layout.id)}
              style={{
                cursor: 'pointer',
                color:
                  layout.id === layoutSelecionadoId ? '#2563eb' : undefined,
                transition: 'color 0.2s ease',
                maxWidth: 'calc(100% - 40px)',
                whiteSpace: 'normal',
                overflowWrap: 'break-word',
                wordBreak: 'break-word'
              }}
              title={layout.nomeLayout}
            >
              {layout.nomeLayout || 'Novo Layout'}
            </div>

            {/* 🔴 Botão Layout */}
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => onRemoverLayout(layout.id)}
              title="Remover layout"
              style={{
                width: 32,
                height: 32,
                padding: 0,
                position: 'relative',
              }}
            >
              <span
                style={{
                  fontSize: '24px',
                  lineHeight: 1,
                  position: 'absolute',
                  top: '45%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                ×
              </span>
            </button>
          </div>

          {/* Massas */}
          <ul
            className="ps-2 mt-2"
            style={{ listStyle: 'none', paddingLeft: 0 }}
          >
            {layout.massas.map((massa, index) => (
              <li
                key={massa.id}
                className="d-flex justify-content-between align-items-center mb-1"
                style={{
                  borderLeft: '2px solid #dee2e6',
                  borderBottom:
                    index !== layout.massas.length - 1
                      ? '1px solid #f1f3f5'
                      : 'none',
                  paddingLeft: '8px',
                  marginLeft: '8px',
                  paddingBottom: '4px'
                }}
              >
                <span
                  className="me-2"
                  onClick={() => onSelectMassa(layout.id, massa.id)}
                  style={{
                    cursor: 'pointer',
                    color:
                      massa.id === massaSelecionadaId
                        ? '#60a5fa'
                        : undefined,
                    transition: 'color 0.2s ease',
                    maxWidth: 'calc(100% - 40px)',
                    whiteSpace: 'normal',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word'
                  }}
                  title={massa.nomeArquivo}
                >
                  {massa.nomeArquivo || 'Nova Massa'}
                </span>

                {/* ⚪ Botão Massa */}
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onRemoverMassa(layout.id, massa.id)}
                  title="Remover massa"
                  style={{
                    width: 32,
                    height: 32,
                    padding: 0,
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      fontSize: '24px',
                      lineHeight: 1,
                      position: 'absolute',
                      top: '45%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    ×
                  </span>
                </button>
              </li>
            ))}

            {/* Nova massa */}
            {layout.id === layoutSelecionadoId && (
              <li
                className="text-muted mt-1"
                style={{ marginLeft: '8px', cursor: 'pointer' }}
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