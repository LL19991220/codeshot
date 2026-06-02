import { useState } from 'react'
import { exportToPng, exportToSvg, copyToClipboard } from '../utils/export'
import { t } from '../i18n'

interface ExportButtonProps {
  previewRef: React.RefObject<HTMLElement | null>
}

export function ExportButton({ previewRef }: ExportButtonProps) {
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleCopy = async () => {
    if (!previewRef.current) return

    setExporting(true)
    try {
      const success = await copyToClipboard(previewRef.current)
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } finally {
      setExporting(false)
    }
  }

  const handleExportPng = async () => {
    if (!previewRef.current) return

    setExporting(true)
    try {
      await exportToPng(previewRef.current, { scale: 2 })
    } finally {
      setExporting(false)
    }
  }

  const handleExportSvg = async () => {
    if (!previewRef.current) return

    setExporting(true)
    try {
      await exportToSvg(previewRef.current)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex min-w-0 gap-2">
      <button
        onClick={handleCopy}
        disabled={exporting}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(37,99,235,0.26)] transition-colors hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 max-[720px]:px-3"
      >
        {copied ? (
          <>
            <CheckIcon />
            <span className="max-[620px]:hidden">{t('export.copied')}</span>
          </>
        ) : (
          <>
            <CopyIcon />
            <span className="max-[620px]:hidden">{t('export.copy')}</span>
          </>
        )}
      </button>
      <button
        onClick={handleExportPng}
        disabled={exporting}
        className="flex items-center gap-2 rounded-lg border border-[#242d49] bg-[#151b30] px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:bg-[#1b2440] disabled:opacity-50 max-[720px]:px-3"
      >
        <DownloadIcon />
        <span className="max-[620px]:hidden">{t('export.png')}</span>
      </button>
      <button
        onClick={handleExportSvg}
        disabled={exporting}
        className="flex items-center gap-2 rounded-lg border border-[#242d49] bg-[#151b30] px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:bg-[#1b2440] disabled:opacity-50 max-[720px]:px-3"
      >
        <DownloadIcon />
        <span className="max-[620px]:hidden">{t('export.svg')}</span>
      </button>
    </div>
  )
}

function CopyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  )
}
