'use client'
import { useState } from 'react'
import { resultsApi } from '../lib/api'

export function usePdfDownload() {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadPdf = async (jobId: string, filename?: string) => {
    setIsDownloading(true)
    try {
      const res = await resultsApi.downloadPdf(jobId)
      const blob = new Blob([res.data], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename || `question-paper-${jobId.slice(0, 8)}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('[PDF] Download failed:', err)
      throw err
    } finally {
      setIsDownloading(false)
    }
  }

  return { downloadPdf, isDownloading }
}
