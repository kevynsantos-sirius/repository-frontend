import { api } from "./api"

export interface Usuario {
  id: string
  login: string
  nome: string
  email: string
  bloqueado: boolean
  excluido: boolean
  perfis: Perfil[]
}

export type Perfil = "ADMIN" | "USER"

export interface CriarUsuarioDTO {
  login: string
  nome: string
  email: string
  senha?: string
  bloqueado: boolean
  excluido: boolean
  perfis: Perfil[]
}

export async function listarUsuarios(): Promise<Usuario[]> {
  const response = await api.get("/api/admin/users")
  return response.data;
}

export async function criarUsuario(data: CriarUsuarioDTO) {
  await api.post("/api/admin/users", data)
}

export async function atualizarUsuario(id: string, data: CriarUsuarioDTO) {
  await api.put(`/api/admin/users/${id}`, data)
}

export async function deletarUsuario(id: string) {
  await api.delete(`/api/admin/users/${id}`)
}