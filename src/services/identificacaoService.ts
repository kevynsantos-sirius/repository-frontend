import { api } from './api'

export async function buscarIdentificacao() {
  const { data } = await api.get('/identificacao')
  return data
}

export async function salvarIdentificacao(payload: any) {
  return api.post('/identificacao', payload)
}
