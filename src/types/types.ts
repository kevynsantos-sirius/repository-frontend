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

