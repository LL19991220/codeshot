import { useState } from 'react'
import { exportToPng, exportToSvg, copyToClipboard } from '../utils/export'

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
    <div className="flex gap-2">
      <button
        onClick={handleCopy}
        disabled={exporting}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {copied ? (
          <>
            <CheckIcon />
            Copied!
          </>
        ) : (
          <>
            <CopyIcon />
            Copy
          </>
        )}
      </button>
      <button
        onClick={handleExportPng}
        disabled={exporting}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
      >
        <DownloadIcon />
        PNG
      </button>
      <button
        onClick={handleExportSvg}
        disabled={exporting}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
      >
        <DownloadIcon />
        SVG
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
