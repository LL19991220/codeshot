import { useState, useCallback } from 'react'
import { languages } from '../themes'
import { t } from '../i18n'
import { useTheme } from '../contexts/ThemeContext'

interface EditorProps {
  code: string
  language: string
  showLineNumbers: boolean
  onCodeChange: (code: string) => void
  onLanguageChange: (language: string) => void
}

// File extension to language mapping
const extensionToLanguage: Record<string, string> = {
  '.ts': 'typescript',
  '.tsx': 'typescript',
  '.js': 'javascript',
  '.jsx': 'javascript',
  '.py': 'python',
  '.java': 'java',
  '.rs': 'rust',
  '.go': 'go',
  '.html': 'html',
  '.htm': 'html',
  '.css': 'css',
  '.json': 'json',
  '.yaml': 'yaml',
  '.yml': 'yaml',
  '.md': 'markdown',
  '.sh': 'bash',
  '.bash': 'bash',
  '.sql': 'sql',
  '.php': 'php',
  '.rb': 'ruby',
  '.swift': 'swift',
  '.kt': 'kotlin',
  '.c': 'c',
  '.h': 'c',
  '.cpp': 'cpp',
  '.cc': 'cpp',
  '.cs': 'csharp',
}

function getLanguageFromFilename(filename: string): string | null {
  const dotIndex = filename.lastIndexOf('.')
  if (dotIndex === -1) return null
  const ext = filename.slice(dotIndex).toLowerCase()
  return extensionToLanguage[ext] || null
}

const langBadgeColors: Record<string, string> = {
  typescript: 'bg-blue-600',
  javascript: 'bg-yellow-500',
  python: 'bg-green-600',
  java: 'bg-orange-600',
  go: 'bg-cyan-600',
  rust: 'bg-orange-700',
}

export function Editor({ code, language, showLineNumbers, onCodeChange, onLanguageChange }: EditorProps) {
  const { theme: appTheme } = useTheme()
  const isLight = appTheme === 'light'
  const [isDragging, setIsDragging] = useState(false)

  const lines = code.split('\n')
  const badgeColor = langBadgeColors[language] || 'bg-gray-600'
  const shortLang = language.slice(0, 2).toUpperCase()

  const headerBg = isLight ? 'bg-white/80' : 'bg-[#151b30]'
  const headerBorder = isLight ? 'border-gray-200' : 'border-[#27304a]'
  const selectBg = isLight ? 'bg-gray-50' : 'bg-[#202742]'
  const selectBorder = isLight ? 'border-gray-200' : 'border-[#323d60]'
  const codeBg = isLight ? 'bg-white' : 'bg-[#070b14]'
  const lineBorder = isLight ? 'border-gray-200' : 'border-[#1c243a]'
  const lineNumberColor = isLight ? 'text-gray-400' : 'text-gray-600'
  const codeColor = isLight ? 'text-gray-800' : 'text-slate-300'

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length === 0) return

    const file = files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const content = event.target?.result
      if (typeof content === 'string') {
        onCodeChange(content)

        // Auto-detect language from file extension
        const detectedLang = getLanguageFromFilename(file.name)
        if (detectedLang && languages.includes(detectedLang)) {
          onLanguageChange(detectedLang)
        }
      }
    }

    reader.readAsText(file)
  }, [onCodeChange, onLanguageChange])

  return (
    <div
      className="flex flex-col h-full relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-3 py-1.5 ${headerBg} border-b ${headerBorder}`}>
        <span className={`text-xs font-semibold ${isLight ? 'text-gray-600' : 'text-slate-300'}`}>{t('editor.title')}</span>
        <div className="flex items-center gap-1.5">
          <span className={`${badgeColor} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-[0_8px_16px_rgba(37,99,235,0.18)]`}>
            {shortLang}
          </span>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className={`max-w-[112px] px-2 py-1 text-[11px] font-medium ${selectBg} ${isLight ? 'text-gray-700' : 'text-slate-300'} rounded-lg border ${selectBorder} focus:outline-none focus:border-blue-500 cursor-pointer`}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Code */}
      <div className={`min-h-0 flex-1 overflow-auto ${codeBg}`}>
        <div className="flex min-h-full">
          {showLineNumbers && (
            <div className={`flex-shrink-0 select-none border-r py-3 pl-3 pr-2 text-right ${lineBorder}`}>
              {lines.map((_, i) => (
                <div key={i} className={`font-mono text-[11px] leading-6 ${lineNumberColor}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          )}

          {/* Code textarea —— 关闭内部滚动，统一由外层 flex 容器处理 */}
          <textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className={`flex-1 min-h-0 p-3 bg-transparent ${codeColor} resize-none overflow-hidden focus:outline-none font-mono text-[11px] leading-6`}
            placeholder={t('editor.placeholder')}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-purple-500/10 border-2 border-dashed border-purple-500 rounded-lg z-10 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm font-semibold text-purple-300">{t('editor.dropHere')}</span>
          </div>
        </div>
      )}
    </div>
  )
}
