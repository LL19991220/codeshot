export interface CodeTheme {
  id: string
  name: string
  type: 'light' | 'dark'
}

export interface GradientBackground {
  id: string
  name: string
  colors: string[]
  angle: number
}

export interface WindowStyle {
  id: string
  name: string
  showDots: boolean
  showTitle: boolean
  borderRadius: number
}

export interface ExportOptions {
  format: 'png' | 'svg'
  quality: number
  scale: number
}

export interface AppState {
  code: string
  language: string
  theme: string
  background: GradientBackground
  windowStyle: WindowStyle
  padding: number
  showLineNumbers: boolean
  title: string
}
