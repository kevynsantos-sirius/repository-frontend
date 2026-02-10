import type { Layout } from '../../types/types'

type Props = {
  layouts: Layout[]

  layoutSelecionadoId: string | null
  massaSelecionadaId: string | null

  onNovoLayout(): void
  onNovaMassa(): void

  onSelectLayout(layoutId: string): void
  onSelectMassa(layoutId: string, massaId: string): void
}

export default function VersionsSidebar({
  layouts,
  layoutSelecionadoId,
  massaSelecionadaId,
  onNovoLayout,
  onNovaMassa,
  onSelectLayout,
  onSelectMassa
}: Props) {
  return (
    <div
      className="versions-sidebar p-3 border-end"
      style={{ width: 280 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <strong>Layouts</strong>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={onNovoLayout}
        >
          + Layout
        </button>
      </div>

      {layouts.length === 0 && (
        <small className="text-muted">
          Nenhum layout cadastrado
        </small>
      )}

      {layouts.map(layout => (
        <div key={layout.id} className="mb-3">
          <div
            className={`fw-semibold cursor-pointer ${
              layout.id === layoutSelecionadoId
                ? 'text-primary'
                : ''
            }`}
            onClick={() => onSelectLayout(layout.id)}
          >
            {layout.nomeLayout || 'Novo Layout'}
          </div>

          <ul className="ps-3 mt-1">
            {layout.massas.map(massa => (
              <li
                key={massa.id}
                className={`cursor-pointer ${
                  massa.id === massaSelecionadaId
                    ? 'text-primary fw-semibold'
                    : ''
                }`}
                onClick={() =>
                  onSelectMassa(layout.id, massa.id)
                }
              >
                {massa.nomeArquivo || 'Nova Massa'}
              </li>
            ))}

            {layout.id === layoutSelecionadoId && (
              <li
                className="text-muted cursor-pointer"
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
