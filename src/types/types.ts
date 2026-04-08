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
  observacao: string
  file?: File
  nomeArquivo: string
  arquivo: File | null
  tipo: number
  excluido: boolean
}

export type ArquivoGerenciadoDTO = {
  id: string
  name: string | null
  observacao: string | null
  temArquivo: boolean
  codigo: number
  tipo: number
  descricaoTipo: string
  arquivo: string | null
  mimeType: string | null
  nomeArquivo: string | null
  excluido: boolean
}

export type Modelo = {
  id: string
  observacao: string
  regrasAcesso: string
  nomeRecurso?: string | null
  temArquivo?: boolean

  camposBusca: {
    backoffice: string
    cliente: string
    corretor: string
    estipulante: string
    subestipulante: string
  }

  // Arrays usados na UI
  tipoImpressao: string[]
  tipoAcabamento: string[]
  disponibilizacao: string[]
  emailOpcoes: string[]

  // Booleans vindos do Backend
  duplex: boolean
  isImpresso: boolean

  acabamentoAutoEnvelope: boolean
  acabamentoManuseio: boolean
  acabamentoInsercao: boolean

  disponibilizacaoCorreioSimples: boolean
  disponibilizacaoCorreioSimplesAR: boolean
  crc: boolean
  disponibilizacaoMeusDocumentosPDF: boolean
  disponibilizacaoSMS: boolean

  emailComDocumentoAnexo: boolean
  emailComDocumentoAnexoEarmazenamento: boolean
  emailComDocumentoAnexoEcorpoEmail: boolean
  emailComDocumentoAnexoEarmazenamentoEemail: boolean
  emailComDocumentoAnexoECarimbo: boolean

  // Arquivos
  logos: ArquivoGerenciado[]
  arquivosAdicionais: ArquivoGerenciado[]
  assinaturas: ArquivoGerenciado[]
  arquivosImpressao: ArquivoGerenciado[]

  arquivo: File | null
}

export type AbaAtiva = 'identificacao' | 'ti' | 'modelo' | 'planoComunicacao'

