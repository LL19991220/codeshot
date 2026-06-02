import { codeThemes, gradientBackgrounds, windowStyles } from '../themes'
import type { GradientBackground, WindowStyle } from '../types'

interface ToolbarProps {
  theme: string
  background: GradientBackground
  windowStyle: WindowStyle
  padding: number
  showLineNumbers: boolean
  title: string
  onThemeChange: (theme: string) => void
  onBackgroundChange: (bg: GradientBackground) => void
  onWindowStyleChange: (style: WindowStyle) => void
  onPaddingChange: (padding: number) => void
  onShowLineNumbersChange: (show: boolean) => void
  onTitleChange: (title: string) => void
}

export function Toolbar({
  theme,
  background,
  windowStyle,
  padding,
  showLineNumbers,
  title,
  onThemeChange,
  onBackgroundChange,
  onWindowStyleChange,
  onPaddingChange,
  onShowLineNumbersChange,
  onTitleChange,
}: ToolbarProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
      {/* Title */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="untitled"
          className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Theme */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Theme</label>
        <select
          value={theme}
          onChange={(e) => onThemeChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
        >
          {codeThemes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* Background */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Background</label>
        <div className="grid grid-cols-4 gap-2">
          {gradientBackgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => onBackgroundChange(bg)}
              className={`w-full h-8 rounded-md border-2 transition-all ${
                background.id === bg.id
                  ? 'border-blue-500 scale-105'
                  : 'border-transparent hover:border-gray-500'
              }`}
              style={{
                background:
                  bg.colors.length > 1
                    ? `linear-gradient(${bg.angle}deg, ${bg.colors.join(', ')})`
                    : bg.colors[0],
              }}
              title={bg.name}
            />
          ))}
        </div>
      </div>

      {/* Window Style */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Window Style</label>
        <div className="flex gap-2">
          {windowStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => onWindowStyleChange(style)}
              className={`flex-1 px-3 py-2 text-sm rounded transition-all ${
                windowStyle.id === style.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>

      {/* Padding */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Padding: {padding}px
        </label>
        <input
          type="range"
          min="16"
          max="128"
          value={padding}
          onChange={(e) => onPaddingChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Line Numbers */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="lineNumbers"
          checked={showLineNumbers}
          onChange={(e) => onShowLineNumbersChange(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="lineNumbers" className="text-sm text-gray-400">
          Show Line Numbers
        </label>
      </div>
    </div>
  )
}
