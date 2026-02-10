import { api } from './api'

/* =========================
   TIPOS
   ========================= */

export type Checklist = {
  idChecklist: string
  nomeDocumento: string
  nomeRamo: string
  usuario: any
  idDemanda: string
  situacao: 'PRD' | 'DEV' | 'RASCUNHO'
}

export type ChecklistPaginadoResponse = {
  content: Checklist[]
  page: number
  totalPages: number
  totalElements: number
}

/* =========================
   SERVICE
   ========================= */

export async function buscarChecklists(
  page = 0,
  size = 10
): Promise<ChecklistPaginadoResponse> {

  const response = await api.get<ChecklistPaginadoResponse>(
    '/api/checklists/list',
    {
      params: {
        page,
        size
      }
    }
  )

  return response.data
}
