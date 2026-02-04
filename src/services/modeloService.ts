import { api } from './api'

export async function buscarModelos() {
  const { data } = await api.get('/modelos')
  return data
}

export async function salvarModelo(payload: any) {
  return api.post('/modelos', payload)
}
