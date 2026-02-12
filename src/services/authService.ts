import { api } from './api'

export async function login(usuario: string, senha: string) {
  const response = await api.post('/api/auth/login', {
    username: usuario,
    password: senha
  })

  return response.data
}

export async function logout() {
  await api.post('/api/auth/logout')
}

export async function getUserName() {
  const res = await api.get('/api/checklists/user/name')
  return res.data;
}
