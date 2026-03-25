import { useRef, useState } from "react";
import type { ArquivoGerenciado } from "../types/types";

type Props = {
  titulo: string;
  arquivos: ArquivoGerenciado[];
  onClose(): void;
  onAddArquivo(file: File, observacao: string): void;
  onRemoveArquivo(id: string): void;
};

export default function ModalGerenciarArquivos({
  titulo,
  arquivos,
  onClose,
  onAddArquivo,
  onRemoveArquivo
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [observacao, setObservacao] = useState("");

  function handleUpload() {
    if (!file) return;

    onAddArquivo(file, observacao);

    // limpar campos
    setFile(null);
    setObservacao("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div
      className="modal-backdrop-custom"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}
    >
      <div
        className="modal-content p-4"
        style={{
          width: "450px",
          maxHeight: "90vh",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,0.2)",
          overflowY: "auto"
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">{titulo}</h4>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            X
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Adicionar arquivo</label>
          <input
            type="file"
            ref={fileInputRef}
            className="form-control"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          {/* campo de observação */}
          <label className="form-label mt-2">Observação</label>
          <textarea
            className="form-control"
            rows={3}
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Digite uma observação sobre este arquivo"
          />

          <button
            className="btn btn-primary mt-2 w-100"
            onClick={handleUpload}
            disabled={!file}
          >
            Enviar
          </button>
        </div>

        <hr />

        <h6 className="mb-2">Arquivos cadastrados</h6>

        {arquivos.length === 0 && (
          <p className="text-muted">Nenhum arquivo enviado.</p>
        )}

        {arquivos.map((a) => (
          <div
            key={a.id}
            className="d-flex flex-column border rounded p-2 mb-2"
          >
            <div className="d-flex justify-content-between align-items-center">
              <strong>{a.name}</strong>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => onRemoveArquivo(a.id)}
              >
                Remover
              </button>
            </div>

            {a.observacao && (
              <small className="text-muted mt-1">
                Observação: {a.observacao}
              </small>
            )}
          </div>
        ))}

        <button className="btn btn-secondary mt-3 w-100" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}