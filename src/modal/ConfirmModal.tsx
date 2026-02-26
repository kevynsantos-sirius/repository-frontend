type ConfirmModalProps = {
  aberto: boolean
  titulo?: string
  mensagem: string
  textoConfirmar?: string
  textoCancelar?: string
  onConfirmar: () => void
  onCancelar: () => void
}

export default function ConfirmModal({
  aberto,
  titulo = 'Confirmação',
  mensagem,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  onConfirmar,
  onCancelar
}: ConfirmModalProps) {

  if (!aberto) return null

  return (
    <div
      className="modal fade show"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancelar}
            />
          </div>

          {/* BODY */}
          <div className="modal-body">
            <p className="mb-0">{mensagem}</p>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onCancelar}
            >
              {textoCancelar}
            </button>

            <button
              className="btn btn-danger"
              onClick={onConfirmar}
            >
              {textoConfirmar}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}