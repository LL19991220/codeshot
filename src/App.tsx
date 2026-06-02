import { useState, useRef } from 'react'
import { Editor } from './components/Editor'
import { Preview } from './components/Preview'
import { Toolbar } from './components/Toolbar'
import { ExportButton } from './components/ExportButton'
import { defaultCode, gradientBackgrounds, windowStyles } from './themes'

function App() {
  const [code, setCode] = useState(defaultCode)
  const [language, setLanguage] = useState('typescript')
  const [theme, setTheme] = useState('github-dark')
  const [background, setBackground] = useState(gradientBackgrounds[0]) // sunset
  const [windowStyle, setWindowStyle] = useState(windowStyles[0]) // macos
  const [padding, setPadding] = useState(64)
  const [showLineNumbers, setShowLineNumbers] = useState(true)
  const [title, setTitle] = useState('fibonacci.ts')

  const previewRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              CodeShot
            </h1>
            <p className="text-xs text-gray-500">Beautiful code screenshots</p>
          </div>
        </div>
        <ExportButton previewRef={previewRef} />
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row gap-0 h-[calc(100vh-73px)]">
        {/* Left Panel: Editor + Toolbar */}
        <div className="flex flex-col lg:w-1/2 border-r border-gray-800">
          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              code={code}
              language={language}
              onCodeChange={setCode}
              onLanguageChange={setLanguage}
            />
          </div>

          {/* Toolbar */}
          <div className="border-t border-gray-800 overflow-auto max-h-[40vh]">
            <Toolbar
              theme={theme}
              background={background}
              windowStyle={windowStyle}
              padding={padding}
              showLineNumbers={showLineNumbers}
              title={title}
              onThemeChange={setTheme}
              onBackgroundChange={setBackground}
              onWindowStyleChange={setWindowStyle}
              onPaddingChange={setPadding}
              onShowLineNumbersChange={setShowLineNumbers}
              onTitleChange={setTitle}
            />
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="flex-1 overflow-auto bg-gray-950 flex items-center justify-center p-8">
          <div ref={previewRef} className="w-full max-w-2xl">
            <Preview
              code={code}
              language={language}
              theme={theme}
              background={background}
              windowStyle={windowStyle}
              padding={padding}
              showLineNumbers={showLineNumbers}
              title={title}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
