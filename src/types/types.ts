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
    outro: string
  }

  // FORMATAÇÃO & IMPRESSÃO
  tipoImpressao: string[]
  tipoAcabamento: string[]

  // 🔥 Aqui mantém o File real, diferente do DTO
  arquivoImpressao: File | null

  // DISPONIBILIZAÇÃO
  disponibilizacao: string[]
  emailOpcoes: string[]

  // ARQUIVOS GERENCIADOS
  logos: ArquivoGerenciado[]        // cada item contém File|null
  arquivosAdicionais: ArquivoGerenciado[]
  assinaturas: ArquivoGerenciado[]

  // 🔥 arquivo do modelo principal (não existe no DTO)
  arquivo: File | null
}

export type AbaAtiva = 'identificacao' | 'ti' | 'modelo' | 'planoComunicacao'

