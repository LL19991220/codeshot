import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import type { GradientBackground, WindowStyle } from '../types'
import { canvasRatios } from '../themes'

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
}: PreviewProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    const highlight = async () => {
      try {
        const highlighted = await codeToHtml(code, {
          lang: language,
          theme: theme,
          transformers: [
            {
              line(node: any, line: number) {
                node.properties['data-line'] = line
              },
            },
          ],
        })
        setHtml(highlighted)
      } catch (error) {
        console.error('Highlight failed:', error)
        setHtml(`<pre><code>${code}</code></pre>`)
      }
    }
    highlight()
  }, [code, language, theme])

  const gradientStyle =
    background.colors.length > 1
      ? `linear-gradient(${background.angle}deg, ${background.colors.join(', ')})`
      : background.colors[0]

  const ratio = canvasRatios.find(r => r.id === canvasRatio)
  const hasFixedRatio = ratio?.value !== null && ratio?.value !== undefined
  const aspectRatio = hasFixedRatio ? ratio.value ?? undefined : undefined

  const shadowStyle = shadow > 0 ? {
    boxShadow: `0 ${shadow / 2}px ${shadow * 1.45}px rgba(2, 6, 23, 0.48)`
  } : {}

  // Auto mode: no aspect ratio, just fit content
  // Fixed ratio mode: apply aspect ratio, content scales to fit
  return (
    <div
      className="animate-fade-in w-full rounded-2xl"
      style={{
        background: gradientStyle,
        padding: hasFixedRatio ? `${padding}px` : `${padding}px`,
        aspectRatio,
        display: 'flex',
        flexDirection: 'column',
        minHeight: hasFixedRatio ? undefined : 560,
        maxWidth: autoFit ? '100%' : undefined,
      }}
    >
      <div
        className="overflow-hidden flex-1 flex flex-col bg-[#0d1320]"
        style={{
          borderRadius: `${windowStyle.borderRadius}px`,
          ...shadowStyle,
        }}
      >
        {/* Window Header */}
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

        {/* Code Content */}
        <div
          className={`preview-code flex-1 overflow-auto [&_pre]:p-8 [&_pre]:m-0 [&_pre]:overflow-x-auto [&_code]:block [&_code]:font-mono ${
            showLineNumbers ? 'show-line-numbers' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
