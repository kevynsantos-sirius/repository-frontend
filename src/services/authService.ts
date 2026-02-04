import { api } from './api'

export async function login(usuario: string, senha: string) {
  const response = await api.post('/login', {
    usuario,
    senha
  })

  return response.data
}

export async function logout() {
  await api.post('/logout')
}
