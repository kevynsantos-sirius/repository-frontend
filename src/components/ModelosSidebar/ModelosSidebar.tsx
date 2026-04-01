import { useRef, useState } from 'react'
import type { Modelo } from '../../types/types'

type Props = {
  modelos: Modelo[]
  modeloSelecionadoId: string | null

  onNovoModelo(arquivo: File): void
  onRemoverModelo(modeloId: string): void
  onSelectModelo(modeloId: string): void
  onEditarObservacao(modeloId: string, texto: string): void
}

export default function ModelosSidebar({
  modelos,
  modeloSelecionadoId,
  onNovoModelo,
  onRemoverModelo,
  onSelectModelo,
  onEditarObservacao
}: Props) {

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // ID do modelo que está sendo editado no lado esquerdo
  const [editandoId, setEditandoId] = useState<string | null>(null)

  // Texto temporário da edição (para só aplicar ao clicar em "Atualizar")
  const [textoTemp, setTextoTemp] = useState<string>('')

  function abrirFileInput() {
    fileInputRef.current?.click()
  }

  function handleNovoArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    onNovoModelo(file)
    e.target.value = ''
  }

  function iniciarEdicao(modelo: Modelo) {
    setEditandoId(modelo.id)
    setTextoTemp(modelo.observacao ?? '')
  }

  function salvarEdicao(modeloId: string) {
    onEditarObservacao(modeloId, textoTemp.trim())
    setEditandoId(null)
    setTextoTemp('')
  }

  return (
    <div className="modelos-sidebar p-3 border-end" style={{ width: 260 }}>

      {/* Input invisível */}
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

      {/* Lista de modelos */}
      {modelos.map(modelo => (
        <div
          key={modelo.id}
          className="mb-3 pb-2"
          style={{ borderBottom: '1px solid #dee2e6' }}
        >

          {/* Linha principal */}
          <div className="d-flex justify-content-between align-items-start">

            {/* Nome */}
            <div
              className="fw-semibold me-2"
              onClick={() => onSelectModelo(modelo.id)}
              style={{
                cursor: 'pointer',
                color: modelo.id === modeloSelecionadoId ? '#2563eb' : undefined,
                transition: 'color 0.2s ease',
                maxWidth: 'calc(100% - 40px)',
                whiteSpace: 'normal',
                overflowWrap: 'break-word',
                wordBreak: 'break-word'
              }}
              title={modelo.arquivo?.name ?? 'Arquivo não definido'}
            >
              {modelo.arquivo?.name 
                ?? modelo.nomeRecurso 
                ?? (modelo.temArquivo ? 'Arquivo enviado' : 'Arquivo não enviado')}
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

          {/* Observação */}
          <div className="mt-1">

            {editandoId === modelo.id ? (
              <div>
                <textarea
                  className="form-control form-control-sm mb-1"
                  value={textoTemp}
                  onChange={(e) => setTextoTemp(e.target.value)}
                  autoFocus
                  rows={2}
                />

                <div className="d-flex gap-1">
                  <button
                    className="btn btn-sm btn-primary flex-grow-1"
                    onClick={() => salvarEdicao(modelo.id)}
                  >
                    Atualizar
                  </button>

                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setEditandoId(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>

            ) : (
              <small
                className="text-muted d-block"
                style={{ cursor: 'pointer', paddingLeft: '4px' }}
                onClick={() => iniciarEdicao(modelo)}
              >
                {modelo.observacao?.trim()
                  ? modelo.observacao
                  : 'Clique para adicionar observação'}
              </small>
            )}

          </div>

        </div>
      ))}
    </div>
  )
}