type Aba = 'identificacao' | 'ti' | 'modelo'

type Props = {
  active: Aba
  onChange?: (value: Aba) => void
}

export default function SubmenuHeader({ active, onChange }: Props) {
  function handleChange(value: Aba) {
    if (onChange) onChange(value)
  }

  return (
    <div className="content-header">
      <div className="submenu-top">
        <button
          className={`submenu-item ${active === 'identificacao' ? 'active' : ''}`}
          onClick={() => handleChange('identificacao')}
        >
          Identificação
        </button>

        <button
          className={`submenu-item ${active === 'ti' ? 'active' : ''}`}
          onClick={() => handleChange('ti')}
        >
          TI
        </button>

        <button
          className={`submenu-item ${active === 'modelo' ? 'active' : ''}`}
          onClick={() => handleChange('modelo')}
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
