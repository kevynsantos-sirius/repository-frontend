

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

  nomeRecurso?: string | null

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

  logos: ItemArquivoDTO[]
  arquivosAdicionais: ItemArquivoDTO[]
  assinaturas: ItemArquivoDTO[]
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

  checklistDTO?: any | null   // <-- ADICIONE ESTA LINHA

  usuario: UsuarioDTO
  layouts: LayoutDTO[]
  modelos: ModeloEnvioDTO[]
}

export type ItemArquivoDTO = {
  id: string
  name: string
  observacao: string
  temArquivo: boolean
  codigo: number | null

  // Tipo (tabela CL_Logomodelotipo)
  tipo: number | null          // 1 = Logo, 2 = Arquivo Adicional, 3 = Assinatura
  descricaoTipo: string | null

  // Arquivo
  arquivo: Uint8Array | null   // bytes do arquivo
  mimeType: string | null      // ex: "image/png", "application/pdf"
  nomeArquivo: string | null   // nome original do arquivo
}
