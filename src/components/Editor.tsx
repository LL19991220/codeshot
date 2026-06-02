import { languages } from '../themes'

interface EditorProps {
  code: string
  language: string
  onCodeChange: (code: string) => void
  onLanguageChange: (language: string) => void
}

export function Editor({ code, language, onCodeChange, onLanguageChange }: EditorProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm text-gray-400">Code Input</span>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="px-2 py-1 text-sm bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        className="editor-textarea flex-1 w-full p-4 bg-gray-900 text-gray-100 resize-none focus:outline-none"
        placeholder="Paste your code here..."
        spellCheck={false}
      />
    </div>
  )
}
