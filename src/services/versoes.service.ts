// services/versoes.service.ts
import { api } from './api'
import type { Versao } from '../dto/Versao'

// Tipo que vem do backend
type ChecklistVersaoResumoDTO = {
  idChecklistVersao: string
  idDemanda: string
  versao: number
  dataCadastro: string // LocalDateTime vem como string no JSON
  nomeUsuario: string
  status: number
  atual: boolean
}

// Chama o endpoint usando api (axios)
export async function buscarVersoesChecklist(idChecklist: string): Promise<Versao[]> {
  const response = await api.get<ChecklistVersaoResumoDTO[]>(`/api/Checklists/${idChecklist}/versoes`)
  const data = response.data

  // Mapear DTO do backend para tipo do front
  return data.map(v => ({
    id: v.idChecklistVersao,
    nome: `Versão ${v.versao} - ${v.nomeUsuario}`,
    data: new Date(v.dataCadastro).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }),
    ativa: v.atual
  }))
}
