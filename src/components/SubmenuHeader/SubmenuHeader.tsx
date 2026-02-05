type Aba = 'identificacao' | 'ti' | 'modelo'

interface Props {
  active: Aba
  onChange: (aba: Aba) => void
}

export default function SubmenuHeader({ active, onChange }: Props) {
  return (
    <div className="content-header">
      <div className="submenu-top">
        <button
          className={`submenu-item ${active === 'identificacao' ? 'active' : ''}`}
          onClick={() => onChange('identificacao')}
        >
          Identificação
        </button>

        <button
          className={`submenu-item ${active === 'ti' ? 'active' : ''}`}
          onClick={() => onChange('ti')}
        >
          TI
        </button>

        <button
          className={`submenu-item ${active === 'modelo' ? 'active' : ''}`}
          onClick={() => onChange('modelo')}
        >
          Modelo
        </button>
      </div>

      <button className="btn btn-outline-secondary btn-versoes">
        Versões
      </button>
    </div>
  )
}
