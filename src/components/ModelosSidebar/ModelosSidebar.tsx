import { useRef } from 'react'
import type { Modelo } from '../../types/types'

type Props = {
  modelos: Modelo[]
  modeloSelecionadoId: string | null

  onNovoModelo(arquivo: File): void
  onRemoverModelo(modeloId: string): void
  onSelectModelo(modeloId: string): void
}

export default function ModelosSidebar({
  modelos,
  modeloSelecionadoId,
  onNovoModelo,
  onRemoverModelo,
  onSelectModelo
}: Props) {

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function abrirFileInput() {
    fileInputRef.current?.click()
  }

  function handleNovoArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    onNovoModelo(file)
    e.target.value = '' // limpa input
  }

  return (
    <div className="modelos-sidebar p-3 border-end">

      {/* Input real invisível */}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleNovoArquivo}
      />

      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center mb-3"
        style={{
          borderBottom: '2px solid #4e73df',
          paddingBottom: '8px'
        }}
      >
        <h3 className="me-3">Modelos</h3>

        <button
          type="button"
          className="btn btn-sm btn-outline-custom"
          onClick={abrirFileInput}
        >
          + Modelo
        </button>
      </div>

      {/* Sem modelos */}
      {modelos.length === 0 && (
        <small className="text-muted">Nenhum modelo enviado</small>
      )}

      {/* Lista */}
      {modelos.map(modelo => (
        <div
          key={modelo.id}
          className="d-flex justify-content-between align-items-start mb-3 pb-2"
          style={{ borderBottom: '1px solid #dee2e6' }}
        >
          {/* Nome do arquivo */}
          <div
            className="fw-semibold me-2"
            onClick={() => onSelectModelo(modelo.id)}
            style={{
              cursor: 'pointer',
              color:
                modelo.id === modeloSelecionadoId ? '#2563eb' : undefined,
              transition: 'color 0.2s ease',
              maxWidth: 'calc(100% - 40px)',
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
            title={modelo.arquivo?.name ?? 'Arquivo não definido'}
          >
            {modelo.arquivo?.name ?? 'Arquivo não enviado'}
          </div>

          {/* Remover */}
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => onRemoverModelo(modelo.id)}
            title="Remover modelo"
            style={{
              width: 32,
              height: 32,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ))}
    </div>
  )
}