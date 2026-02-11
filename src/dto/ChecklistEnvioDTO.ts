export type MassaEnvioDTO = {
  id?: string
  nomeMassaDados: string
  observacao: string | null
}

export type LayoutEnvioDTO = {
  id?: string
  nomeLayout: string
  observacao: string | null
  massasDados: MassaEnvioDTO[]
}

export type ChecklistEnvioDTO = {
  idChecklist?: string
  idChecklistVersao?: string

  nomeDocumento: string
  idRamo: number
  centroCusto: string
  status: number
  idUsuario: number

  icatu: boolean
  caixa: boolean
  rioGrande: boolean

  idDemanda: string

  temLayout: boolean
  viaServico: boolean
  viaTxt: boolean

  layouts: LayoutEnvioDTO[]
}
