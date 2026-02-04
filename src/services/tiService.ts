import { api } from './api'

export async function buscarTI() {
  const { data } = await api.get('/ti')
  return data
}

export async function salvarTI(payload: any) {
  return api.post('/ti', payload)
}
