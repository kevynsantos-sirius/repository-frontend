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
  planosComunicacao: ArquivoGerenciado[]
}

