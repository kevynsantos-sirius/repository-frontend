export type Versao = {
  id: string
  nome: string
  data: string
  ativa?: boolean
}

export function buscarVersoes(): Promise<Versao[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          nome: 'Versão 3',
          data: '02/02/2026',
          ativa: true
        },
        {
          id: '2',
          nome: 'Versão 2',
          data: '28/01/2026'
        },
        {
          id: '3',
          nome: 'Versão 1',
          data: '20/01/2026'
        }
      ])
    }, 800)
  })
}
