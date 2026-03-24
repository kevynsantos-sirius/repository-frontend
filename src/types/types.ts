export type Massa = {
  id: string
  nomeArquivo: string
  observacao: string
  arquivo?: File | null
}

export type Layout = {
  id: string
  nomeLayout: string
  massas: Massa[]
  observacao: string
  arquivo?: File | null
}

export type ArquivoGerenciado = {
  id: string
  name: string
  file?: File
}

export type Modelo = {
  id: string
  arquivo: File | null
  observacao: string

  logos: ArquivoGerenciado[]
  arquivosAdicionais: ArquivoGerenciado[]
  assinaturas: ArquivoGerenciado[]

  regrasAcesso: string

  camposBusca: {
    backoffice: string
    cliente: string
    corretor: string
    estipulante: string
    subestipulante: string
    outro: string
  }

  // FORMATAÇÃO & IMPRESSÃO
  tipoImpressao: string[]
  tipoAcabamento: string[]
  arquivoImpressao: File | null

  // DISPONIBILIZAÇÃO
  disponibilizacao: string[]
  emailOpcoes: string[]
}

