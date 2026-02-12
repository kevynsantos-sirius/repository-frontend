import type { ChecklistVersaoDTO } from '../dto/ChecklistVersaoDTO'

type Props = {
  checklist: ChecklistVersaoDTO | null
  userName: string
  isNovo: boolean
  onChangeChecklist: React.Dispatch<
    React.SetStateAction<ChecklistVersaoDTO | null>
  >
}

export default function IdentificacaoForm({
  checklist,
  userName,
  isNovo,
  onChangeChecklist
}: Props) {

  // Loading somente quando estiver editando e ainda não carregou
  if (!checklist && !isNovo) {
    return (
      <div className="card p-3">
        <strong>Carregando identificação...</strong>
      </div>
    )
  }

  // Garante objeto sempre existente
  const checklistForm: ChecklistVersaoDTO = checklist as ChecklistVersaoDTO

  function atualizarCampo<K extends keyof ChecklistVersaoDTO>(
    campo: K,
    valor: ChecklistVersaoDTO[K]
  ) {
    onChangeChecklist(prev =>
      prev ? { ...prev, [campo]: valor } : prev
    )
  }

  return (
    <form
      id="formIdentificacao"
      className="card form-card p-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="card-header bg-white border-0 pb-0">
        <h5 className="mb-0">Identificação do Documento</h5>
      </div>

      <div className="card-body pt-3">

        {/* Linha 1 */}
        <div className="row m-3">
          <div className="col-md-6">
            <label className="form-label">
              Nome do documento <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              maxLength={50}
              required
              value={checklistForm?.nomeDocumento ?? ''}
              onChange={(e) =>
                atualizarCampo('nomeDocumento', e.target.value)
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Ramo <span className="text-danger">*</span>
            </label>
            <select
              className="form-control"
              required
              value={checklistForm?.idRamo ?? ''}
              onChange={(e) =>
                atualizarCampo('idRamo', Number(e.target.value))
              }
            >
              <option value="">Selecione</option>
              <option value="1">CAPITALIZAÇÃO</option>
              <option value="2">PREVIDÊNCIA</option>
              <option value="3">SEGUROS</option>
              <option value="4">FUNDO DE PENSÃO</option>
            </select>
          </div>
        </div>

        {/* Linha 2 */}
        <div className="row m-3">
          <div className="col-md-6">
            <label className="form-label">
              Status <span className="text-danger">*</span>
            </label>
            <select
              className="form-control"
              required
              value={checklistForm?.status ?? ''}
              onChange={(e) =>
                atualizarCampo('status', Number(e.target.value))
              }
            >
              <option value="">Selecione</option>
              <option value="1">1 - Ativo</option>
              <option value="2">2 - Inativo</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Centro de custo <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              maxLength={5}
              required
              value={checklistForm?.centroCusto ?? ''}
              onChange={(e) =>
                atualizarCampo('centroCusto', e.target.value)
              }
            />
          </div>
        </div>

        {/* Linha 3 */}
        <div className="row m-3">
          <div className="col-md-6">
            <label className="form-label">
              Responsável <span className="text-danger">*</span>
            </label>

            <span className="form-control">
              {checklistForm?.usuario?.nomeUsuario || userName}
            </span>
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Identificação da demanda <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              maxLength={50}
              required
              value={checklistForm?.idDemanda ?? ''}
              onChange={(e) =>
                atualizarCampo('idDemanda', e.target.value)
              }
            />
          </div>
        </div>

        {/* Linha 4 – Checkboxes */}
        <div className="row m-5">
          <div className="col-md-6">

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={checklistForm?.icatu ?? false}
                onChange={(e) =>
                  atualizarCampo('icatu', e.target.checked)
                }
              />
              <label className="form-check-label ms-2">
                Documento Icatu?
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={checklistForm?.rioGrande ?? false}
                onChange={(e) =>
                  atualizarCampo('rioGrande', e.target.checked)
                }
              />
              <label className="form-check-label ms-2">
                Documento Rio Grande?
              </label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={checklistForm?.caixa ?? false}
                onChange={(e) =>
                  atualizarCampo('caixa', e.target.checked)
                }
              />
              <label className="form-check-label ms-2">
                Documento Caixa?
              </label>
            </div>

          </div>
        </div>

        {/* Ações */}
        <div className="d-flex gap-2 m-3">
          <button type="button" className="btn btn-salvar">
            Salvar
          </button>

          <button type="button" className="btn btn-cancelar">
            Cancelar
          </button>
        </div>

      </div>
    </form>
  )
}
