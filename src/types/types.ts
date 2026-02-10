export type Massa = {
  id: string
  nomeArquivo: string
  observacao: string
}

export type Layout = {
  id: string
  nomeLayout: string
  massas: Massa[]
  observacao: string
}
