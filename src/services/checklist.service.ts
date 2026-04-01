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
  status: number
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
  filesMassas: File[] = [],
  filesModelos: { file: File; key: string }[] = []
) {
  console.log("LAYOUTS:", filesLayout);
  console.log("MASSAS:", filesMassas);
  console.log("MODELOS:", filesModelos);
  const formData = new FormData();

  filesLayout.forEach(f => formData.append("filesLayout", f));
  filesMassas.forEach(f => formData.append("filesMassas", f));
  filesModelos.forEach(f => formData.append("arquivosModelos", f.file));
  formData.append(
    "keysModelos",
    new Blob([JSON.stringify(filesModelos.map(f => f.key))], {
      type: "application/json"
    })
  );
  // arquivosModelos agora é um array de objetos {file, key}
  formData.append("dados", new Blob(
    [JSON.stringify(payload)],
    { type: "application/json" }
  ));

  const response = await api.post(
    "/api/Checklists/salvar",
    formData
  );

  return response.data;
}


export async function atualizarChecklist(
  idChecklist: string,
  payload: ChecklistEnvioDTO,
  filesLayout: File[] = [],
  filesMassas: File[] = [],
  filesModelos: { file: File; key: string }[] = []
) {
  console.log("LAYOUTS:", filesLayout);
  console.log("MASSAS:", filesMassas);
  console.log("MODELOS:", filesModelos);
  const formData = new FormData()

  filesLayout.forEach(f => formData.append("filesLayout", f));
  filesMassas.forEach(f => formData.append("filesMassas", f));
  filesModelos.forEach(f => formData.append("arquivosModelos", f.file));
  formData.append(
    "keysModelos",
    new Blob([JSON.stringify(filesModelos.map(f => f.key))], {
      type: "application/json"
    })
  );
  
  // arquivosModelos agora é um array de objetos {file, key}
  formData.append("dto", new Blob(
    [JSON.stringify(payload)],
    { type: "application/json" }
  ));

  const response = await api.post(
  `/api/Checklists/${idChecklist}/editar`,
  formData
);

  var res = response.data;

  return res
}

/* =========================
   DOWNLOAD ZIP CHECKLIST
   ========================= */
export async function downloadChecklistZip(
  idChecklistVersao: string
): Promise<void> {

  const response = await api.get(
    `/api/checklists/${idChecklistVersao}/export`,
    {
      responseType: "blob"
    }
  )

  const blob = new Blob([response.data], {
    type: "application/zip"
  })

  const url = window.URL.createObjectURL(blob)

  // 🔥 Pega o nome vindo do backend
  const contentDisposition = response.headers["content-disposition"]

  let fileName = "checklist.zip"

  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/)
    if (fileNameMatch?.[1]) {
      fileName = fileNameMatch[1]
    }
  }

  const link = document.createElement("a")
  link.href = url
  link.download = fileName

  document.body.appendChild(link)
  link.click()

  link.remove()
  window.URL.revokeObjectURL(url)
}
