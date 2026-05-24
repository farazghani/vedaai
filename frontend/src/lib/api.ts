import axios from 'axios'
import type { AssignmentResult } from '../types/paper'

const api = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API Error]', err.response?.data || err.message)
    return Promise.reject(err)
  }
)

export const assignmentsApi = {
  create: (data: FormData) =>
    api.post('/api/assignments', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  getAll: () => api.get('/api/assignments'),

  getOne: (jobId: string) => api.get(`/api/assignments/${jobId}`),

  delete: (jobId: string) => api.delete(`/api/assignments/${jobId}`)
}

export const resultsApi = {
  get: (jobId: string) =>
    api.get<{ success: boolean } & AssignmentResult>(`/api/results/${jobId}`),

  downloadPdf: (jobId: string) =>
    api.post(
      `/api/results/${jobId}/pdf`,
      {},
      { responseType: 'blob' }
    )
}

export default api
