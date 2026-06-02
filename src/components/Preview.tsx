import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import type { GradientBackground, WindowStyle } from '../types'

interface PreviewProps {
  code: string
  language: string
  theme: string
  background: GradientBackground
  windowStyle: WindowStyle
  padding: number
  showLineNumbers: boolean
  title: string
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
}: PreviewProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    const highlight = async () => {
      try {
        const highlighted = await codeToHtml(code, {
          lang: language,
          theme: theme,
          transformers: showLineNumbers
            ? [
                {
                  line(node: any, line: number) {
                    node.properties['data-line'] = line
                  },
                },
              ]
            : undefined,
        })
        setHtml(highlighted)
      } catch (error) {
        console.error('Highlight failed:', error)
        setHtml(`<pre><code>${code}</code></pre>`)
      }
    }
    highlight()
  }, [code, language, theme, showLineNumbers])

  const gradientStyle =
    background.colors.length > 1
      ? `linear-gradient(${background.angle}deg, ${background.colors.join(', ')})`
      : background.colors[0]

  return (
    <div
      className="animate-fade-in"
      style={{
        background: gradientStyle,
        padding: `${padding}px`,
      }}
    >
      <div
        className="overflow-hidden shadow-2xl"
        style={{
          borderRadius: `${windowStyle.borderRadius}px`,
        }}
      >
        {/* Window Header */}
        {windowStyle.showTitle && (
          <div className="flex items-center px-4 py-3 bg-[#1e1e2e]">
            {windowStyle.showDots && (
              <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
            )}
            <span className="flex-1 text-center text-sm text-gray-400">
              {title || 'untitled'}
            </span>
          </div>
        )}

        {/* Code Content */}
        <div
          className="preview-code overflow-auto [&_pre]:p-4 [&_pre]:m-0 [&_pre]:overflow-x-auto [&_code]:block [&_code]:font-mono"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
