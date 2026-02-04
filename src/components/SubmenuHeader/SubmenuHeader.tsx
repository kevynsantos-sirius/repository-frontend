type SubmenuHeaderProps = {
  active: 'identificacao' | 'ti' | 'modelo'
}

export default function SubmenuHeader({ active }: SubmenuHeaderProps) {
  return (
    <div className="content-header">
      <div className="submenu-top">
        <button className={`submenu-item ${active === 'identificacao' ? 'active' : ''}`}>
          Identificação
        </button>

        <button className={`submenu-item ${active === 'ti' ? 'active' : ''}`}>
          TI
        </button>

        <button className={`submenu-item ${active === 'modelo' ? 'active' : ''}`}>
          Modelo
        </button>
      </div>

      <button className="btn btn-outline-secondary btn-versoes">
        Versões
      </button>
    </div>
  )
}
