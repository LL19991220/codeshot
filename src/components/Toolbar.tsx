import { codeThemes, gradientBackgrounds, windowStyles, canvasRatios } from '../themes'
import type { GradientBackground, WindowStyle, Preset } from '../types'
import { t } from '../i18n'
import { useTheme } from '../contexts/ThemeContext'

interface ToolbarProps {
  theme: string
  background: GradientBackground
  windowStyle: WindowStyle
  padding: number
  title: string
  shadow: number
  canvasRatio: string
  autoFit: boolean
  presets: Preset[]
  onThemeChange: (theme: string) => void
  onBackgroundChange: (bg: GradientBackground) => void
  onWindowStyleChange: (style: WindowStyle) => void
  onPaddingChange: (padding: number) => void
  onTitleChange: (title: string) => void
  onShadowChange: (shadow: number) => void
  onCanvasRatioChange: (ratio: string) => void
  onAutoFitChange: (auto: boolean) => void
  onRandomTheme: () => void
  onSavePreset: (name: string) => void
  onLoadPreset: (preset: Preset) => void
  onDeletePreset: (id: string) => void
}

// Template icons
const TemplateIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'macos':
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="5" cy="10" r="2" />
          <circle cx="10" cy="10" r="2" />
          <circle cx="15" cy="10" r="2" />
        </svg>
      )
    case 'windows':
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <rect x="2" y="2" width="7" height="7" rx="1" />
          <rect x="11" y="2" width="7" height="7" rx="1" />
          <rect x="2" y="11" width="7" height="7" rx="1" />
          <rect x="11" y="11" width="7" height="7" rx="1" />
        </svg>
      )
    case 'minimal':
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <rect x="2" y="2" width="16" height="2" rx="0.5" />
          <rect x="2" y="6" width="16" height="2" rx="0.5" />
          <rect x="2" y="10" width="16" height="2" rx="0.5" />
        </svg>
      )
    case 'rounded':
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <rect x="2" y="2" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <rect x="6" y="7" width="8" height="1.5" rx="0.5" />
          <rect x="6" y="11" width="5" height="1.5" rx="0.5" />
        </svg>
      )
    default:
      return null
  }
}

export function Toolbar({
  theme,
  background,
  windowStyle,
  padding,
  shadow,
  canvasRatio,
  presets,
  onThemeChange,
  onBackgroundChange,
  onWindowStyleChange,
  onPaddingChange,
  onShadowChange,
  onCanvasRatioChange,
  onRandomTheme,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
}: ToolbarProps) {
  const { theme: appTheme } = useTheme()
  const isLight = appTheme === 'light'

  const handleSavePreset = () => {
    const name = prompt(t('toolbar.presetName'))
    if (name) onSavePreset(name)
  }

  const bgClass = isLight ? 'bg-white/85' : 'bg-[#0b1020]/80'
  const cardBgClass = isLight ? 'bg-gray-100/90' : 'bg-[#141a2d]'
  const borderClass = isLight ? 'border-gray-200' : 'border-[#27304a]'
  const textClass = isLight ? 'text-gray-700' : 'text-slate-300'
  const labelClass = isLight ? 'text-gray-600' : 'text-slate-500'
  const controlClass = `${cardBgClass} ${textClass} rounded-lg border ${borderClass} shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]`
  const selectedButtonClass = 'bg-purple-600/22 border-2 border-purple-500 text-white shadow-[0_0_0_1px_rgba(168,85,247,0.18),0_10px_26px_rgba(126,34,206,0.20)]'
  const mutedButtonClass = `${cardBgClass} border ${borderClass} ${isLight ? 'text-gray-500' : 'text-slate-400'} hover:border-purple-400`

  const updateBackgroundAngle = (angle: number) => {
    onBackgroundChange({ ...background, angle })
  }

  return (
    <div className={`flex h-full min-h-0 flex-col ${bgClass}`}>
      <section className={`shrink-0 border-b px-3 py-2 ${borderClass}`}>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-white">{t('toolbar.themeStyle')}</h2>
          <select
            value={theme}
            onChange={(e) => onThemeChange(e.target.value)}
            className={`max-w-[130px] px-2 py-1 text-[11px] ${controlClass} focus:outline-none focus:border-purple-500 cursor-pointer`}
          >
            {codeThemes.map((codeTheme) => (
              <option key={codeTheme.id} value={codeTheme.id}>
                {codeTheme.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-[1fr_0.82fr] gap-3">
          <div>
            <div className="grid grid-cols-4 gap-1.5">
              {windowStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => onWindowStyleChange(style)}
                  className={`flex h-[52px] flex-col items-center justify-center gap-1 rounded-lg transition-all ${
                    windowStyle.id === style.id ? selectedButtonClass : mutedButtonClass
                  }`}
                >
                  <TemplateIcon type={style.id} />
                  <span className="text-[10px] font-bold leading-none">{style.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={`mb-2 flex items-center justify-between text-xs font-bold ${isLight ? 'text-gray-700' : 'text-white'}`}>
              {t('toolbar.padding')}
              <span className={`${isLight ? 'text-gray-500' : 'text-slate-400'}`}>{padding}px</span>
            </label>
            <input
              type="range"
              min="16"
              max="128"
              value={padding}
              onChange={(e) => onPaddingChange(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>
        </div>
      </section>

      <section className={`shrink-0 border-b px-3 py-2 ${borderClass}`}>
        <div className="grid grid-cols-[1fr_0.82fr] gap-3">
          <div>
            <h2 className="mb-2 text-sm font-bold text-white">{t('toolbar.backgroundSettings')}</h2>
            <label className={`mb-1.5 block text-[10px] font-bold ${labelClass}`}>{t('toolbar.backgroundPreset')}</label>
            <div className="grid grid-cols-5 gap-2">
              {gradientBackgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => onBackgroundChange(bg)}
                  className={`h-7 rounded-md border transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] ${
                    background.id === bg.id
                      ? 'border-white scale-105 ring-2 ring-purple-500'
                      : 'border-transparent hover:border-white/70 hover:scale-105'
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
          <div>
            <label className={`mb-2 block text-xs font-bold ${isLight ? 'text-gray-700' : 'text-white'}`}>
              {t('toolbar.gradientAngle')}
            </label>
            <div className="mb-2 flex gap-1 rounded-lg bg-[#12182a] p-1">
              {canvasRatios.map((ratio) => (
                <button
                  key={ratio.id}
                  onClick={() => onCanvasRatioChange(ratio.id)}
                  className={`flex-1 rounded-md px-1.5 py-1 text-[10px] font-bold transition-all ${
                    canvasRatio === ratio.id
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {ratio.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="360"
                value={background.angle}
                onChange={(e) => updateBackgroundAngle(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
              <span className="w-9 text-right text-xs font-bold text-slate-400">{background.angle}°</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid shrink-0 grid-cols-2">
        <div className={`border-r px-3 py-2 ${borderClass}`}>
          <label className={`mb-2 flex items-center justify-between text-sm font-bold ${isLight ? 'text-gray-700' : 'text-white'}`}>
            {t('toolbar.shadowSettings')}
            <span className="text-xs text-slate-400">{shadow}px</span>
          </label>
          <div className="flex items-center gap-3">
            <svg className="h-4 w-4 shrink-0 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m7-9h2M3 12h2m12.95 4.95l1.41 1.41M4.64 4.64l1.41 1.41m12.02 0l1.41-1.41M4.64 19.36l1.41-1.41" />
            </svg>
            <input
              type="range"
              min="0"
              max="64"
              value={shadow}
              onChange={(e) => onShadowChange(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>
        </div>
        <div className="px-3 py-2">
          <label className={`mb-2 block text-sm font-bold ${isLight ? 'text-gray-700' : 'text-white'}`}>{t('toolbar.canvasRatio')}</label>
          <div className="flex gap-1 rounded-lg bg-[#12182a] p-1">
            {canvasRatios.map((ratio) => (
              <button
                key={ratio.id}
                onClick={() => onCanvasRatioChange(ratio.id)}
                className={`flex-1 px-1.5 py-1 text-[10px] font-semibold rounded-md transition-all ${
                  canvasRatio === ratio.id
                    ? 'bg-purple-600 text-white shadow-[0_8px_18px_rgba(126,34,206,0.24)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {ratio.name}
              </button>
            ))}
          </div>
        </div>
      </section>



      <section className={`hidden flex-wrap gap-2 border-t px-5 py-3 ${borderClass}`}>
        <button
          onClick={onRandomTheme}
          className={`px-3.5 py-2.5 ${controlClass} hover:border-purple-500 transition-colors text-xs font-semibold`}
        >
          {t('toolbar.randomTheme')}
        </button>
        <button
          onClick={handleSavePreset}
          className={`px-3.5 py-2.5 ${controlClass} hover:border-purple-500 transition-colors text-xs font-semibold`}
        >
          {t('toolbar.savePreset')}
        </button>
      </section>

      {/* Presets */}
      {presets.length > 0 && (
        <section className={`border-t p-6 ${borderClass}`}>
          <label className={`block text-xs font-semibold ${labelClass} mb-2`}>{t('toolbar.presets')}</label>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <div key={preset.id} className={`flex items-center gap-1 ${cardBgClass} rounded-lg border ${borderClass}`}>
                <button
                  onClick={() => onLoadPreset(preset)}
                  className={`px-3 py-1.5 text-xs ${textClass} hover:text-purple-300 transition-colors`}
                >
                  {preset.name}
                </button>
                <button
                  onClick={() => onDeletePreset(preset.id)}
                  className="px-2 py-1.5 text-gray-500 hover:text-red-400 transition-colors text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
