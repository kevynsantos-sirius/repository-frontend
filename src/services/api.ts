import axios from 'axios'
import type { AxiosInstance } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

export const api: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true
})

/* ===========================
   CONTROLE DE LOADING GLOBAL
=========================== */

let activeRequests = 0

function showLoader() {
  if (activeRequests === 0) {
    (window as any).showLoading?.()
  }
  activeRequests++
}

function hideLoader() {
  activeRequests = Math.max(0, activeRequests - 1)

  if (activeRequests === 0) {
    (window as any).hideLoading?.()
  }
}

/* ===========================
   INTERCEPTORS
=========================== */

// 🔹 Antes da requisição
api.interceptors.request.use(
  config => {
    showLoader()
    return config
  },
  error => {
    hideLoader()
    return Promise.reject(error)
  }
)

// 🔹 Após resposta
api.interceptors.response.use(
  response => {
    hideLoader()
    return response
  },
  error => {
    hideLoader()

    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || ""
      // Não redireciona se for erro de login
      if (!requestUrl.includes("/auth/login")) {
        window.location.href = "/ExpiredLogin"
      }
    }

    if (error.response?.status === 500) {
      window.location.href = "/Error";
    }

    return Promise.reject(error)
  }
)