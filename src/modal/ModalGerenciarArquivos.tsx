import { useState } from "react";
import type { ArquivoGerenciado } from "../types/types";

type Props = {
  titulo: string
  arquivos: ArquivoGerenciado[]
  onClose(): void
  onAddArquivo(file: File): void
  onRemoveArquivo(id: string): void
}

export default function ModalGerenciarArquivos({
  titulo,
  arquivos,
  onClose,
  onAddArquivo,
  onRemoveArquivo
}: Props) {

  const [novoArquivo, setNovoArquivo] = useState<File | null>(null)

  function enviar() {
    if (novoArquivo) {
      onAddArquivo(novoArquivo)
      setNovoArquivo(null)
    }
  }

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-custom">

        <div className="modal-header">
          <h5>{titulo}</h5>
          <button onClick={onClose} className="btn btn-light">X</button>
        </div>

        <div className="modal-body">
          {/* Input para adicionar arquivo */}
          <div className="mb-3">
            <label className="form-label">Adicionar arquivo</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setNovoArquivo(e.target.files?.[0] || null)}
            />
            <button className="btn btn-primary mt-2" onClick={enviar}>
              Enviar
            </button>
          </div>

          {/* Lista */}
          <h6 className="mb-2">Arquivos cadastrados</h6>

          {arquivos.length === 0 ? (
            <p className="text-muted">Nenhum arquivo adicionado</p>
          ) : (
            <ul className="list-group">
              {arquivos.map(arq => (
                <li key={arq.id} className="list-group-item d-flex justify-content-between">
                  <span>{arq.name}</span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onRemoveArquivo(arq.id)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}

        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>

      </div>
    </div>
  )
}