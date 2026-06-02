import type { CodeTheme, GradientBackground, WindowStyle } from '../types'

export const codeThemes: CodeTheme[] = [
  { id: 'github-dark', name: 'GitHub Dark', type: 'dark' },
  { id: 'github-light', name: 'GitHub Light', type: 'light' },
  { id: 'dracula', name: 'Dracula', type: 'dark' },
  { id: 'one-dark-pro', name: 'One Dark Pro', type: 'dark' },
  { id: 'nord', name: 'Nord', type: 'dark' },
  { id: 'monokai', name: 'Monokai', type: 'dark' },
  { id: 'solarized-dark', name: 'Solarized Dark', type: 'dark' },
  { id: 'solarized-light', name: 'Solarized Light', type: 'light' },
  { id: 'tokyo-night', name: 'Tokyo Night', type: 'dark' },
  { id: 'vitesse-dark', name: 'Vitesse Dark', type: 'dark' },
  { id: 'vitesse-light', name: 'Vitesse Light', type: 'light' },
  { id: 'slack-dark', name: 'Slack Dark', type: 'dark' },
]

export const gradientBackgrounds: GradientBackground[] = [
  { id: 'sunset', name: 'Sunset', colors: ['#f97316', '#ec4899', '#8b5cf6'], angle: 135 },
  { id: 'ocean', name: 'Ocean', colors: ['#0ea5e9', '#3b82f6', '#6366f1'], angle: 135 },
  { id: 'forest', name: 'Forest', colors: ['#10b981', '#059669', '#047857'], angle: 135 },
  { id: 'midnight', name: 'Midnight', colors: ['#1e1b4b', '#312e81', '#4c1d95'], angle: 135 },
  { id: 'candy', name: 'Candy', colors: ['#f472b6', '#c084fc', '#818cf8'], angle: 135 },
  { id: 'aurora', name: 'Aurora', colors: ['#06b6d4', '#8b5cf6', '#ec4899'], angle: 135 },
  { id: 'warm', name: 'Warm', colors: ['#f59e0b', '#ef4444', '#dc2626'], angle: 135 },
  { id: 'cool', name: 'Cool', colors: ['#06b6d4', '#3b82f6', '#6366f1'], angle: 135 },
  { id: 'lime', name: 'Lime', colors: ['#84cc16', '#22c55e', '#14b8a6'], angle: 135 },
  { id: 'rose', name: 'Rose', colors: ['#f43f5e', '#e11d48', '#be123c'], angle: 135 },
  { id: 'transparent', name: 'Transparent', colors: ['transparent'], angle: 0 },
  { id: 'solid-dark', name: 'Solid Dark', colors: ['#1a1a2e'], angle: 0 },
  { id: 'solid-light', name: 'Solid Light', colors: ['#f8fafc'], angle: 0 },
]

export const windowStyles: WindowStyle[] = [
  { id: 'macos', name: 'macOS', showDots: true, showTitle: true, borderRadius: 12 },
  { id: 'windows', name: 'Windows', showDots: false, showTitle: true, borderRadius: 8 },
  { id: 'minimal', name: 'Minimal', showDots: false, showTitle: false, borderRadius: 8 },
  { id: 'rounded', name: 'Rounded', showDots: true, showTitle: true, borderRadius: 20 },
]

export const languages = [
  'javascript',
  'typescript',
  'python',
  'java',
  'rust',
  'go',
  'html',
  'css',
  'json',
  'yaml',
  'markdown',
  'bash',
  'sql',
  'php',
  'ruby',
  'swift',
  'kotlin',
  'c',
  'cpp',
  'csharp',
]

export const defaultCode = `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Generate first 10 Fibonacci numbers
const result = Array.from({ length: 10 }, (_, i) => fibonacci(i));
console.log(result); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`
