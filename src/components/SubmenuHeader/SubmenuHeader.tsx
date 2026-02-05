type AbaAtiva = 'identificacao' | 'ti' | 'modelo'

type Props = {
  active: AbaAtiva
  onChange: (aba: AbaAtiva) => void
}

export default function SubmenuHeader({ active, onChange }: Props) {
  return (
    <div className="content-header">
      <div className="submenu-top">

        <button
          className={`submenu-item ${active === 'identificacao' ? 'active' : ''}`}
          onClick={() => onChange('identificacao')}
        >
          Identificação do Documento
        </button>

        <button
          className={`submenu-item ${active === 'ti' ? 'active' : ''}`}
          onClick={() => onChange('ti')}
        >
          Layout e Forma de Envio
        </button>

        <button
          className={`submenu-item ${active === 'modelo' ? 'active' : ''}`}
          onClick={() => onChange('modelo')}
        >
          Modelo do Documento
        </button>

      </div>

      <button className="btn btn-outline-secondary btn-versoes">
        Versões
      </button>
    </div>
  )
}
