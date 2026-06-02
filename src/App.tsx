import { useState, useRef } from 'react'
import { Editor } from './components/Editor'
import { Preview } from './components/Preview'
import { Toolbar } from './components/Toolbar'
import { ExportButton } from './components/ExportButton'
import { defaultCode, gradientBackgrounds, windowStyles } from './themes'

// 彩蛋组件
function EasterEgg({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
      onClick={onClose}
    >
      <img
        src="/336.JPG"
        alt="336 彩蛋"
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
      />
    </div>
  )
}

function App() {
  const [code, setCode] = useState(defaultCode)
  const [language, setLanguage] = useState('typescript')
  const [theme, setTheme] = useState('github-dark')
  const [background, setBackground] = useState(gradientBackgrounds[0]) // sunset
  const [windowStyle, setWindowStyle] = useState(windowStyles[0]) // macos
  const [padding, setPadding] = useState(64)
  const [showLineNumbers, setShowLineNumbers] = useState(true)
  const [title, setTitle] = useState('fibonacci.ts')
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const previewRef = useRef<HTMLDivElement>(null)

  // 彩蛋：双击 logo
  const handleLogoDoubleClick = () => {
    const answer = prompt('请输入你的初中班级号：')
    if (answer === '336') {
      setShowEasterEgg(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg cursor-pointer select-none"
            onDoubleClick={handleLogoDoubleClick}
          >
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
      <main className="flex flex-col lg:flex-row gap-0 h-[calc(100vh-73px)] overflow-hidden">
        {/* Left Panel: Editor + Toolbar */}
        <div className="flex flex-col lg:w-1/2 border-r border-gray-800 min-h-0">
          {/* Editor */}
          <div className="flex-1 overflow-hidden min-h-0">
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
        <div className="flex-1 overflow-y-auto bg-gray-950 p-8 min-h-0">
          <div ref={previewRef} className="w-full max-w-2xl mx-auto">
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

      {/* 彩蛋 */}
      {showEasterEgg && <EasterEgg onClose={() => setShowEasterEgg(false)} />}
    </div>
  )
}

export default App
