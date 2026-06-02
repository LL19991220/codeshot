import type { CodeTheme, GradientBackground, WindowStyle, CanvasRatio } from '../types'

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
  { id: 'peach', name: 'Peach', colors: ['#fdba74', '#fb923c', '#f97316'], angle: 135 },
  { id: 'lavender', name: 'Lavender', colors: ['#c4b5fd', '#a78bfa', '#8b5cf6'], angle: 135 },
  { id: 'emerald', name: 'Emerald', colors: ['#34d399', '#10b981', '#059669'], angle: 135 },
  { id: 'sky', name: 'Sky', colors: ['#38bdf8', '#0ea5e9', '#0284c7'], angle: 135 },
  { id: 'crimson', name: 'Crimson', colors: ['#fb7185', '#f43f5e', '#e11d48'], angle: 135 },
]

export const windowStyles: WindowStyle[] = [
  { id: 'macos', name: 'macOS', showDots: true, showTitle: true, borderRadius: 12 },
  { id: 'windows', name: 'Windows', showDots: false, showTitle: true, borderRadius: 8 },
  { id: 'minimal', name: 'Minimal', showDots: false, showTitle: false, borderRadius: 8 },
  { id: 'rounded', name: 'Rounded', showDots: true, showTitle: true, borderRadius: 20 },
]

export const canvasRatios: CanvasRatio[] = [
  { id: 'auto', name: 'Auto', value: null },
  { id: '1:1', name: '1:1', value: 1 },
  { id: '4:3', name: '4:3', value: 4 / 3 },
  { id: '16:9', name: '16:9', value: 16 / 9 },
  { id: '9:16', name: '9:16', value: 9 / 16 },
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
console.log(result); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Memoized version for better performance
const memo = new Map<number, number>();
function fibonacciMemo(n: number): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  const value = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
  memo.set(n, value);
  return value;
}`
