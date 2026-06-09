import { useEffect, useRef, useState } from 'react'
import { codeToHtml } from 'shiki'
import type { GradientBackground, WindowStyle, Watermark } from '../types'
import { canvasRatios } from '../themes'
import { useTheme } from '../contexts/ThemeContext'

interface PreviewProps {
  code: string
  language: string
  theme: string
  background: GradientBackground
  windowStyle: WindowStyle
  padding: number
  showLineNumbers: boolean
  title: string
  shadow: number
  canvasRatio: string
  autoFit: boolean
  watermark?: Watermark
  typingAnimation?: boolean
  typingSpeed?: number
}

const POSITION_STYLES: Record<Watermark['position'], string> = {
  'top-left': 'top-3 left-4',
  'top-right': 'top-3 right-4',
  'bottom-left': 'bottom-3 left-4',
  'bottom-right': 'bottom-3 right-4',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}

export function Preview({
  code,
  language,
  theme,
  background,
  windowStyle,
  padding,
  showLineNumbers,
  title,
  shadow,
  canvasRatio,
  autoFit,
  watermark,
  typingAnimation = false,
  typingSpeed = 30,
}: PreviewProps) {
  const [html, setHtml] = useState('')
  const [displayedCode, setDisplayedCode] = useState(code)
  const typingTimerRef = useRef<number | null>(null)
  const { theme: appTheme } = useTheme()
  const isLight = appTheme === 'light'

  // 代码高亮
  useEffect(() => {
    let cancelled = false
    const highlight = async () => {
      try {
        const source = typingAnimation ? displayedCode : code
        const highlighted = await codeToHtml(source, {
          lang: language,
          theme,
          transformers: [
            {
              line(node: any, line: number) {
                node.properties['data-line'] = line
              },
            },
          ],
        })
        if (!cancelled) setHtml(highlighted)
      } catch (error) {
        console.error('Highlight failed:', error)
        if (!cancelled) setHtml(`<pre><code>${code}</code></pre>`)
      }
    }
    highlight()
    return () => {
      cancelled = true
    }
  }, [code, displayedCode, language, theme, typingAnimation])

  // 打字机动画
  useEffect(() => {
    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current)
      typingTimerRef.current = null
    }
    if (!typingAnimation) {
      setDisplayedCode(code)
      return
    }
    setDisplayedCode('')
    let i = 0
    const tick = () => {
      i += 1
      setDisplayedCode(code.slice(0, i))
      if (i < code.length) {
        typingTimerRef.current = window.setTimeout(tick, typingSpeed)
      }
    }
    typingTimerRef.current = window.setTimeout(tick, typingSpeed)
    return () => {
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current)
        typingTimerRef.current = null
      }
    }
  }, [code, typingAnimation, typingSpeed])

  const gradientStyle =
    background.colors.length > 1
      ? `linear-gradient(${background.angle}deg, ${background.colors.join(', ')})`
      : background.colors[0]

  const ratio = canvasRatios.find(r => r.id === canvasRatio)
  const hasFixedRatio = ratio?.value !== null && ratio?.value !== undefined
  const aspectRatio = hasFixedRatio ? ratio.value ?? undefined : undefined

  const shadowStyle = shadow > 0
    ? { boxShadow: `0 ${shadow / 2}px ${shadow * 1.45}px rgba(2, 6, 23, 0.48)` }
    : {}

  return (
    <div
      className={`animate-fade-in overflow-hidden ${hasFixedRatio ? 'w-full' : 'h-full w-full'}`}
      style={{
        aspectRatio,
        maxWidth: autoFit ? '100%' : undefined,
        maxHeight: hasFixedRatio ? undefined : '100%',
      }}
    >
      <div
        className={`${hasFixedRatio ? 'h-full' : 'h-full'} overflow-hidden`}
        style={{
          background: gradientStyle,
          padding: `${padding}px`,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: `${windowStyle.borderRadius}px`,
        }}
      >
        <div
          className={`relative overflow-hidden flex min-h-0 flex-1 flex-col ${isLight ? 'bg-white' : 'bg-[#0d1320]'}`}
          style={{
            borderRadius: `${windowStyle.borderRadius}px`,
            ...shadowStyle,
          }}
        >
          {windowStyle.showTitle && (
            <div className="flex items-center px-5 py-4 bg-[#111827]/96 flex-shrink-0 border-b border-white/5">
              {windowStyle.showDots && (
                <div className="flex gap-2 mr-5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
              )}
              <span className="flex-1 text-center text-sm font-medium text-slate-400">
                {title || 'untitled'}
              </span>
            </div>
          )}

          <div
            className={`preview-code min-h-0 overflow-auto ${hasFixedRatio ? '' : 'flex-1'} ${
              showLineNumbers ? 'show-line-numbers' : ''
            }`}
          >
            <pre className="p-8 m-0 overflow-x-auto">
              <code
                className="block font-mono"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </pre>
          </div>

          {/* 水印 */}
          {watermark?.text && (
            <div
              className={`absolute pointer-events-none select-none ${POSITION_STYLES[watermark.position]}`}
              style={{
                opacity: watermark.opacity,
                fontSize: `${watermark.fontSize}px`,
                color: 'rgba(255, 255, 255, 0.85)',
                textShadow: '0 1px 2px rgba(0,0,0,0.4)',
              }}
            >
              {watermark.text}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
