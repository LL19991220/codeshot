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

  return (
    <div className="flex flex-col h-full">
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
      <div className={`flex-1 overflow-auto ${codeBg}`}>
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

          {/* Code textarea */}
          <textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className={`flex-1 p-3 bg-transparent ${codeColor} resize-none focus:outline-none font-mono text-[11px] leading-6`}
            placeholder={t('editor.placeholder')}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}
