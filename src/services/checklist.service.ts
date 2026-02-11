import { api } from './api'
import type { ChecklistVersaoDTO } from '../dto/ChecklistVersaoDTO'
import type { ChecklistEnvioDTO } from '../dto/ChecklistEnvioDTO'

/* =========================
   TIPOS
   ========================= */

export type Checklist = {
  idChecklist: string
  idChecklistVersao: string
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
      params: { page, size }
    }
  )

  return response.data
}

export async function buscarChecklistPorId(
  idStr: string
): Promise<ChecklistVersaoDTO> {
  const response = await api.get(`/api/Checklists/${idStr}`)
  return response.data
}

/* =========================
   SALVAR NOVO CHECKLIST
   ========================= */
export async function salvarChecklist(
  payload: ChecklistEnvioDTO,
  filesLayout: File[] = [],
  filesMassas: File[] = []
) {
  const formData = new FormData()

  // 🔹 JSON como string (porque backend recebe String dadosJson)
  formData.append("dados", JSON.stringify(payload))

  // 🔹 Arquivos de Layout
  filesLayout.forEach((file) => {
    formData.append("filesLayout", file)
  })

  // 🔹 Arquivos de Massa
  filesMassas.forEach((file) => {
    formData.append("filesMassas", file)
  })

  const response = await api.post(
    "/api/Checklists/salvar",
    formData
  )

  return response.data
}


export async function atualizarChecklist(
  idChecklist: string,
  payload: ChecklistEnvioDTO,
  filesLayout: File[] = [],
  filesMassas: File[] = []
) {
  const formData = new FormData()

  formData.append(
    "dto",
    new Blob([JSON.stringify(payload)], {
      type: "application/json"
    })
  )

  filesLayout.forEach((file) => {
    formData.append("filesLayout", file)
  })

  filesMassas.forEach((file) => {
    formData.append("filesMassas", file)
  })

  const response = await api.post(
    `/api/Checklists/${idChecklist}/editar`,
    formData
  )

  return response.data
}
