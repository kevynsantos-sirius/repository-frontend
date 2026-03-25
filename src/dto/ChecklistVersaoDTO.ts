

/* =========================
   TIPOS AUXILIARES
   ========================= */

export type UsuarioDTO = {
  id: number
  nomeUsuario: string
}

export type MassaDadosDTO = {
  id: number
  nomeMassaDados: string
  temArquivo: boolean
  observacao: string | null
}

export type LayoutDTO = {
  id: number
  nomeLayout: string
  observacao: string | null
  temArquivo: boolean
  massasDados: MassaDadosDTO[]
}

export type ModeloEnvioDTO = {
  id: string
  observacao: string
  regrasAcesso: string

  camposBusca: {
    backoffice: string
    cliente: string
    corretor: string
    estipulante: string
    subestipulante: string
    outro: string
  }

  tipoImpressao: string[]
  tipoAcabamento: string[]

  temArquivo: boolean
  arquivoImpressao: boolean

  logos: {
    id: string
    name: string
    observacao: string
    temArquivo: boolean
  }[]

  arquivosAdicionais: {
    id: string
    name: string
    observacao: string
    temArquivo: boolean
  }[]

  assinaturas: {
    id: string
    name: string
    observacao: string
    temArquivo: boolean
  }[]
}

/* =========================
   CHECKLIST VERSÃO DTO
   ========================= */

export type ChecklistVersaoDTO = {
  idChecklistVersao: number
  idChecklist: number
  nomeDocumento: string
  idRamo: number
  nomeRamo: string | null
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

  checklistDTO: any | null

  usuario: UsuarioDTO
  layouts: LayoutDTO[]

  modelos: ModeloEnvioDTO[]
}
