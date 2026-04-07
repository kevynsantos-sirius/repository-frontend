
export type MassaEnvioDTO = {
  id?: string
  nomeMassaDados: string
  observacao: string | null
  temArquivo: boolean
}

export type LayoutEnvioDTO = {
  id?: string
  nomeLayout: string
  observacao: string | null
  massasDados: MassaEnvioDTO[]
  temArquivo: boolean
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

  modelos: {
    id: string
    observacao: string
    regrasAcesso: string
    camposBusca: {
      backoffice: string
      cliente: string
      corretor: string
      estipulante: string
      subestipulante: string
    }
    tipoImpressao: string[]
    tipoAcabamento: string[]
    temArquivo: boolean
    arquivoImpressao: boolean

    logos: { id: string; name: string; observacao: string; temArquivo: boolean }[]
    arquivosAdicionais: { id: string; name: string; observacao: string; temArquivo: boolean }[]
    assinaturas: { id: string; name: string; observacao: string; temArquivo: boolean }[]
}[]
}
