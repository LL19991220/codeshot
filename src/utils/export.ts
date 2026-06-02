import { toPng, toSvg } from 'html-to-image'

export async function exportToPng(
  element: HTMLElement,
  options: { scale?: number; quality?: number } = {}
): Promise<void> {
  const { scale = 2, quality = 1 } = options

  try {
    const dataUrl = await toPng(element, {
      pixelRatio: scale,
      quality,
      cacheBust: true,
    })

    const link = document.createElement('a')
    link.download = `codeshot-${Date.now()}.png`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Export failed:', error)
    throw new Error('Failed to export image')
  }
}

export async function exportToSvg(element: HTMLElement): Promise<void> {
  try {
    const dataUrl = await toSvg(element, {
      cacheBust: true,
    })

    const link = document.createElement('a')
    link.download = `codeshot-${Date.now()}.svg`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Export failed:', error)
    throw new Error('Failed to export SVG')
  }
}

export async function copyToClipboard(element: HTMLElement): Promise<boolean> {
  try {
    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
    })

    const response = await fetch(dataUrl)
    const blob = await response.blob()

    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ])

    return true
  } catch (error) {
    console.error('Copy failed:', error)
    return false
  }
}
