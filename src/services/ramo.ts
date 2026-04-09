import {api} from "./api"
import { type Ramo } from "../types/types"
export async function buscarRamos(): Promise<Ramo[]> {
  const response = await api.get("/api/ramo")
  return response.data
}