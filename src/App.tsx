import { useState, useRef, useEffect, useCallback } from 'react'
import { Editor } from './components/Editor'
import { Preview } from './components/Preview'
import { Toolbar } from './components/Toolbar'
import { ExportButton } from './components/ExportButton'
import { defaultCode, gradientBackgrounds, windowStyles, codeThemes, canvasRatios } from './themes'
import type { Preset, Watermark } from './types'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { t, setLocale, getLocale } from './i18n'
import { exportToPng, exportToSvg, copyToClipboard } from './utils/export'

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
  const [shadow, setShadow] = useState(24)
  const [canvasRatio, setCanvasRatio] = useState('auto')
  const [autoFit, setAutoFit] = useState(true)
  const [presets, setPresets] = useState<Preset[]>(loadPresets)
  const [locale, setLocaleState] = useState(getLocale())
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  // 新功能状态
  const [watermark, setWatermark] = useState<Watermark>({ text: '', position: 'bottom-right', opacity: 0.5, fontSize: 14 })
  const [typingAnimation, setTypingAnimation] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(30)

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
  const randomTheme = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * codeThemes.length)
    setCodeTheme(codeThemes[randomIndex].id)
    const randomBgIndex = Math.floor(Math.random() * gradientBackgrounds.length)
    setBackground(gradientBackgrounds[randomBgIndex])
  }, [])

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

  // 键盘快捷键 —— 用 ref 锁定最新回调，避免 useCallback 闭包陈旧
  const randomThemeRef = useRef(randomTheme)
  const toggleThemeRef = useRef(toggleTheme)
  useEffect(() => {
    randomThemeRef.current = randomTheme
    toggleThemeRef.current = toggleTheme
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.ctrlKey || e.metaKey
      if (!isMod) return

      // Ctrl/Cmd + S → 导出 PNG
      if (e.key === 's' && !e.shiftKey) {
        e.preventDefault()
        if (previewRef.current) exportToPng(previewRef.current, { scale: 2 })
        return
      }
      // Ctrl/Cmd + Shift + S → 导出 SVG
      if (e.key === 'S' && e.shiftKey) {
        e.preventDefault()
        if (previewRef.current) exportToSvg(previewRef.current)
        return
      }
      // Ctrl/Cmd + Shift + C → 复制到剪贴板
      if (e.key === 'C' && e.shiftKey) {
        e.preventDefault()
        if (previewRef.current) copyToClipboard(previewRef.current)
        return
      }
      // Ctrl/Cmd + Shift + R → 随机主题
      if (e.key === 'R' && e.shiftKey) {
        e.preventDefault()
        randomThemeRef.current()
        return
      }
      // Ctrl/Cmd + Shift + L → 切换行号
      if (e.key === 'L' && e.shiftKey) {
        e.preventDefault()
        setShowLineNumbers(prev => !prev)
        return
      }
      // Ctrl/Cmd + Shift + D → 切换深色/浅色模式
      if (e.key === 'D' && e.shiftKey) {
        e.preventDefault()
        toggleThemeRef.current()
        return
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const isLight = appTheme === 'light'

  const appShellClass = isLight
    ? 'bg-[#f5f7fb] text-gray-900'
    : 'bg-[radial-gradient(circle_at_top,rgba(64,56,180,0.22),transparent_32%),#070b14] text-gray-100'
  const panelClass = isLight
    ? 'border-gray-200 bg-white/84'
    : 'border-[#232c46] bg-[#0d1324]/82'

  return (
    <div className={`h-screen w-full overflow-hidden ${appShellClass}`}>
      <div className="mx-auto flex h-full w-full flex-col px-4 py-3 max-[900px]:px-3 max-[900px]:py-3">
      {/* Header */}
      <header className="shrink-0 z-20 -mx-4 mb-2 flex items-center justify-between gap-3 bg-[inherit] px-4 py-3 backdrop-blur-xl max-[900px]:-mx-3 max-[900px]:px-3 max-[720px]:gap-2">
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
          {/* GitHub 链接 */}
          <a
            href="https://github.com/LL19991220/codeshot"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                : 'bg-[#171d32] border-[#242d49] text-slate-300 hover:bg-[#1d2540]'
            }`}
            aria-label="GitHub"
            title="GitHub"
          >
            <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

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
      <main className="grid min-h-0 flex-1 w-full grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] items-stretch gap-5 max-[1100px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] max-[1100px]:gap-3 max-[720px]:grid-cols-1 max-[720px]:gap-4">
        {/* Left Panel */}
        <div className={`flex h-full min-h-0 flex-col overflow-hidden rounded-xl border backdrop-blur-xl ${panelClass}`}>
          {/* Editor */}
          <div className="min-h-0 flex-1">
            <Editor
              code={code}
              language={language}
              showLineNumbers={showLineNumbers}
              onCodeChange={setCode}
              onLanguageChange={setLanguage}
            />
          </div>

          {/* Toolbar */}
          <div className={`min-h-0 shrink overflow-y-auto border-t ${isLight ? 'border-gray-200' : 'border-[#232c46]'}`}>
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
              watermark={watermark}
              typingAnimation={typingAnimation}
              typingSpeed={typingSpeed}
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
              onWatermarkChange={setWatermark}
              onTypingAnimationChange={setTypingAnimation}
              onTypingSpeedChange={setTypingSpeed}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex h-full min-h-0 flex-col gap-2 overflow-hidden">
          <section className={`relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border backdrop-blur-xl ${panelClass}`}>
            <div className="flex items-center justify-between px-5 pt-3 max-[720px]:px-3 max-[720px]:pt-2">
              <h2 className={`pb-2 text-lg font-bold max-[720px]:text-sm ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {t('previewEffect')}
              </h2>
              <span className={`text-sm font-semibold max-[720px]:hidden ${isLight ? 'text-gray-500' : 'text-slate-500'}`}>
                {t('canvasSize')}: {(() => {
                  const r = canvasRatios.find(x => x.id === canvasRatio)
                  if (!r || r.value === null || r.value === undefined) return 'Auto'
                  return r.id
                })()}
              </span>
            </div>

            <div
              ref={previewRef}
              className={`m-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-xl max-[720px]:m-2 ${
                isLight
                  ? 'border border-slate-200/80 bg-slate-100/55'
                  : 'border border-white/[0.06] bg-[#0a0f1f]/55'
              }`}
            >
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
                watermark={watermark.text ? watermark : undefined}
                typingAnimation={typingAnimation}
                typingSpeed={typingSpeed}
              />
            </div>
          </section>

          <section className={`grid shrink-0 grid-cols-4 gap-3 rounded-xl border px-4 py-3 backdrop-blur-xl max-[1100px]:hidden ${panelClass}`}>
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
  const { theme: appTheme } = useTheme()
  const isLight = appTheme === 'light'
  const iconPath = {
    bolt: 'M13 10V3L4 14h7v7l9-11h-7z',
    export: 'M12 5v10m0 0l-4-4m4 4l4-4M5 19h14',
    hd: 'M5 8v8m0-4h6m0-4v8m4-8h2a3 3 0 010 6h-2V8z',
    theme: 'M12 3a9 9 0 100 18h.5a2.5 2.5 0 002.5-2.5c0-.7-.29-1.34-.76-1.8a2.5 2.5 0 011.76-4.27h1A6 6 0 0012 3z',
  }[icon]

  return (
    <div className="flex items-center gap-3">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
        isLight ? 'bg-purple-100 text-purple-600' : 'bg-[#201a43] text-purple-300'
      }`}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
      </div>
      <div>
        <div className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{title}</div>
        {lines.map((line) => (
          <div key={line} className={`mt-0.5 text-xs font-semibold ${isLight ? 'text-gray-500' : 'text-slate-500'}`}>{line}</div>
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
