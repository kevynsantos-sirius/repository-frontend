export type ChecklistVersaoResumoDTO = {
  idChecklistVersao: string
  idDemanda: string
  versao: number
  dataCadastro: string // LocalDateTime vem como string no JSON
  nomeUsuario: string
  status: number
  atual: boolean
}