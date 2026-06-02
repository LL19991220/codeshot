import { useState, useRef } from 'react'
import { Editor } from './components/Editor'
import { Preview } from './components/Preview'
import { Toolbar } from './components/Toolbar'
import { ExportButton } from './components/ExportButton'
import { defaultCode, gradientBackgrounds, windowStyles, codeThemes } from './themes'
import type { Preset } from './types'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { t, setLocale, getLocale } from './i18n'

// 从 localStorage 读取预设
const loadPresets = (): Preset[] => {
  try {
    const saved = localStorage.getItem('codeshot-presets')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

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

function AppContent() {
  const [code, setCode] = useState(defaultCode)
  const [language, setLanguage] = useState('typescript')
  const [codeTheme, setCodeTheme] = useState('github-dark')
  const [background, setBackground] = useState(gradientBackgrounds[0])
  const [windowStyle, setWindowStyle] = useState(windowStyles[0])
  const [padding, setPadding] = useState(64)
  const [showLineNumbers, setShowLineNumbers] = useState(true)
  const [title, setTitle] = useState('fibonacci.ts')
  const [activeTab, setActiveTab] = useState<'preview' | 'canvas'>('preview')
  const [shadow, setShadow] = useState(24)
  const [canvasRatio, setCanvasRatio] = useState('auto')
  const [autoFit, setAutoFit] = useState(true)
  const [presets, setPresets] = useState<Preset[]>(loadPresets)
  const [locale, setLocaleState] = useState(getLocale())
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const previewRef = useRef<HTMLDivElement>(null)
  const { theme: appTheme, toggleTheme } = useTheme()

  // 彩蛋：双击 logo
  const handleLogoDoubleClick = () => {
    const answer = prompt('请输入你的初中班级号：')
    if (answer === '336' || answer === '1211') {
      setShowEasterEgg(true)
    }
  }

  // 随机主题
  const randomTheme = () => {
    const randomIndex = Math.floor(Math.random() * codeThemes.length)
    setCodeTheme(codeThemes[randomIndex].id)
    const randomBgIndex = Math.floor(Math.random() * gradientBackgrounds.length)
    setBackground(gradientBackgrounds[randomBgIndex])
  }

  // 保存预设
  const savePreset = (name: string) => {
    const newPreset: Preset = {
      id: Date.now().toString(),
      name,
      theme: codeTheme,
      background,
      windowStyle,
      padding,
      showLineNumbers,
      shadow,
      canvasRatio,
    }
    const updated = [...presets, newPreset]
    setPresets(updated)
    localStorage.setItem('codeshot-presets', JSON.stringify(updated))
  }

  // 加载预设
  const loadPreset = (preset: Preset) => {
    setCodeTheme(preset.theme)
    setBackground(preset.background)
    setWindowStyle(preset.windowStyle)
    setPadding(preset.padding)
    setShowLineNumbers(preset.showLineNumbers ?? true)
    setShadow(preset.shadow)
    setCanvasRatio(preset.canvasRatio)
  }

  // 删除预设
  const deletePreset = (id: string) => {
    const updated = presets.filter(p => p.id !== id)
    setPresets(updated)
    localStorage.setItem('codeshot-presets', JSON.stringify(updated))
  }

  // 切换语言
  const handleLocaleChange = (newLocale: 'en' | 'zh-CN') => {
    setLocale(newLocale)
    setLocaleState(newLocale)
  }

  const toggleLocale = () => {
    handleLocaleChange(locale === 'zh-CN' ? 'en' : 'zh-CN')
  }

  const isLight = appTheme === 'light'

  const appShellClass = isLight
    ? 'bg-[#f5f7fb] text-gray-900'
    : 'bg-[radial-gradient(circle_at_top,rgba(64,56,180,0.22),transparent_32%),#070b14] text-gray-100'
  const panelClass = isLight
    ? 'border-gray-200 bg-white/84'
    : 'border-[#232c46] bg-[#0d1324]/82'

  return (
    <div className={`h-screen overflow-hidden ${appShellClass}`}>
      <div className="flex h-full flex-col overflow-hidden px-6 py-2 max-[900px]:px-2 max-[900px]:py-2">
      {/* Header */}
      <header className="flex items-center justify-between gap-3 pb-2 max-[720px]:gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className="flex h-8 w-8 shrink-0 cursor-pointer select-none items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 shadow-[0_10px_24px_rgba(99,102,241,0.32)]"
            onDoubleClick={handleLogoDoubleClick}
          >
            <svg className="h-[18px] w-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div className="flex items-center">
            <h1 className={`truncate text-base font-bold tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {t('app.name')}
            </h1>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2.5 max-[720px]:gap-1.5">
          {/* 语言切换 */}
          <button
            type="button"
            onClick={toggleLocale}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                : 'bg-[#171d32] border-[#242d49] text-slate-300 hover:bg-[#1d2540]'
            }`}
            aria-label={locale === 'zh-CN' ? 'Switch to English' : '切换为简体中文'}
            title={locale === 'zh-CN' ? 'English' : '简体中文'}
          >
            <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016 7m3 0a18.022 18.022 0 01-3.048 7.5M5 19h10M11 19l4-9 4 9m-1.5-3.5h-5" />
            </svg>
          </button>

          {/* 深色/浅色模式切换 */}
          <button
            onClick={toggleTheme}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-amber-500 hover:bg-gray-50'
                : 'bg-[#171d32] border-[#242d49] text-slate-300 hover:bg-[#1d2540]'
            }`}
            aria-label={isLight ? '切换深色模式' : '切换浅色模式'}
          >
            {isLight ? (
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          <ExportButton previewRef={previewRef} />
        </div>
      </header>

      {/* Main Content */}
      <main className="grid min-h-0 flex-1 grid-cols-[0.39fr_0.61fr] gap-5 overflow-hidden max-[1100px]:grid-cols-[minmax(300px,0.92fr)_minmax(360px,1fr)] max-[1100px]:gap-3 max-[720px]:grid-cols-[minmax(236px,0.95fr)_minmax(236px,1fr)] max-[720px]:gap-2">
        {/* Left Panel */}
        <div className={`flex min-h-0 flex-col overflow-hidden rounded-xl border backdrop-blur-xl ${panelClass}`}>
          {/* Editor */}
          <div className="h-[clamp(190px,40vh,400px)] shrink-0 overflow-hidden">
            <Editor
              code={code}
              language={language}
              showLineNumbers={showLineNumbers}
              onCodeChange={setCode}
              onLanguageChange={setLanguage}
            />
          </div>

          {/* Toolbar */}
          <div className={`min-h-0 flex-1 overflow-hidden border-t ${isLight ? 'border-gray-200' : 'border-[#232c46]'}`}>
            <Toolbar
              theme={codeTheme}
              background={background}
              windowStyle={windowStyle}
              padding={padding}
              title={title}
              shadow={shadow}
              canvasRatio={canvasRatio}
              autoFit={autoFit}
              presets={presets}
              onThemeChange={setCodeTheme}
              onBackgroundChange={setBackground}
              onWindowStyleChange={setWindowStyle}
              onPaddingChange={setPadding}
              onTitleChange={setTitle}
              onShadowChange={setShadow}
              onCanvasRatioChange={setCanvasRatio}
              onAutoFitChange={setAutoFit}
              onRandomTheme={randomTheme}
              onSavePreset={savePreset}
              onLoadPreset={loadPreset}
              onDeletePreset={deletePreset}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex min-h-0 flex-col gap-3 overflow-hidden">
          <section className={`relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border backdrop-blur-xl ${panelClass}`}>
            <div className="flex items-start justify-between px-7 pt-5 max-[720px]:px-3 max-[720px]:pt-3">
              <div>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`pb-2 text-lg font-bold transition-colors max-[720px]:text-sm ${
                    activeTab === 'preview'
                      ? isLight ? 'text-gray-900' : 'text-white'
                      : isLight ? 'text-gray-500 hover:text-gray-700' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {t('previewEffect')}
                </button>
              </div>
              <span className={`text-sm font-semibold max-[720px]:hidden ${isLight ? 'text-gray-500' : 'text-slate-500'}`}>
                {t('canvasSize')}: 1200 × 800
              </span>
            </div>

            <div ref={previewRef} className={`flex flex-1 items-center justify-center overflow-hidden px-4 py-1 max-[720px]:px-2 max-[720px]:py-0.5 ${isLight ? 'bg-slate-50/40' : 'bg-[radial-gradient(circle_at_center,rgba(48,42,110,0.34),transparent_62%)]'}`}>
              <div className="w-full max-w-[1240px]">
                <Preview
                  code={code}
                  language={language}
                  theme={codeTheme}
                  background={background}
                  windowStyle={windowStyle}
                  padding={padding}
                  showLineNumbers={showLineNumbers}
                  title={title}
                  shadow={shadow}
                  canvasRatio={canvasRatio}
                  autoFit={autoFit}
                />
              </div>
            </div>
          </section>

          <section className={`grid shrink-0 grid-cols-4 gap-4 rounded-xl border p-5 backdrop-blur-xl max-[1100px]:hidden ${panelClass}`}>
            <Feature icon="bolt" title={t('feature.realtime')} lines={[t('feature.realtime.line1'), t('feature.realtime.line2')]} />
            <Feature icon="export" title={t('feature.export')} lines={[t('feature.export.line1'), t('feature.export.line2')]} />
            <Feature icon="hd" title={t('feature.hd')} lines={[t('feature.hd.line1'), t('feature.hd.line2')]} />
            <Feature icon="theme" title={t('feature.theme')} lines={[t('feature.theme.line1'), t('feature.theme.line2')]} />
          </section>
        </div>
      </main>

      {/* 彩蛋 */}
      {showEasterEgg && <EasterEgg onClose={() => setShowEasterEgg(false)} />}
      </div>
    </div>
  )
}

function Feature({ icon, title, lines }: { icon: 'bolt' | 'export' | 'hd' | 'theme', title: string, lines: string[] }) {
  const iconPath = {
    bolt: 'M13 10V3L4 14h7v7l9-11h-7z',
    export: 'M12 5v10m0 0l-4-4m4 4l4-4M5 19h14',
    hd: 'M5 8v8m0-4h6m0-4v8m4-8h2a3 3 0 010 6h-2V8z',
    theme: 'M12 3a9 9 0 100 18h.5a2.5 2.5 0 002.5-2.5c0-.7-.29-1.34-.76-1.8a2.5 2.5 0 011.76-4.27h1A6 6 0 0012 3z',
  }[icon]

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#201a43] text-purple-300">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
      </div>
      <div>
        <div className="text-base font-bold text-white">{title}</div>
        {lines.map((line) => (
          <div key={line} className="mt-1 text-sm font-semibold text-slate-500">{line}</div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
