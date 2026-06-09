type Locale = 'en' | 'zh-CN'

const translations: Record<Locale, Record<string, string>> = {
  'en': {
    // Header
    'app.name': 'CodeShot',
    'export.copy': 'Copy',
    'export.copied': 'Copied',
    'export.png': 'PNG',
    'export.svg': 'SVG',

    // Editor
    'editor.title': 'Code Editor',
    'editor.placeholder': 'Paste your code here...',

    // Toolbar
    'toolbar.randomTheme': 'Random Theme',
    'toolbar.savePreset': 'Save Preset',
    'toolbar.autoFit': 'Auto Fit',
    'toolbar.title': 'TITLE',
    'toolbar.themeStyle': 'Theme & Style',
    'toolbar.backgroundSettings': 'Background',
    'toolbar.backgroundPreset': 'Background Preset',
    'toolbar.gradientAngle': 'Gradient Angle',
    'toolbar.shadowSettings': 'Shadow',
    'toolbar.template': 'TEMPLATE',
    'toolbar.theme': 'THEME',
    'toolbar.padding': 'PADDING',
    'toolbar.shadow': 'SHADOW',
    'toolbar.canvasRatio': 'CANVAS RATIO',
    'toolbar.background': 'BACKGROUND',
    'toolbar.lineNumbers': 'Line Numbers',
    'toolbar.presets': 'PRESETS',
    'toolbar.presetName': 'Enter preset name:',
    'preview': 'Preview',
    'canvas': 'Canvas',
    'size': 'Size',
    'zoom': 'Zoom',
    'downloadCanvas': 'Download Canvas',
    'previewEffect': 'Preview',
    'canvasSize': 'Canvas Size',
    'feature.realtime': 'Live Preview',
    'feature.realtime.line1': 'Update settings',
    'feature.realtime.line2': 'and see changes instantly',
    'feature.export': 'Multi Export',
    'feature.export.line1': 'PNG and SVG',
    'feature.export.line2': 'format support',
    'feature.hd': 'HD Output',
    'feature.hd.line1': 'Generate crisp images',
    'feature.hd.line2': 'for every scenario',
    'feature.theme': 'Rich Themes',
    'feature.theme.line1': 'Multiple styles',
    'feature.theme.line2': 'for different needs',

    // Typing Animation
    'typing.play': 'Typing Animation',
    'typing.pause': 'Pause',
    'typing.reset': 'Reset',
    'typing.speed': 'Speed',

    // Watermark
    'toolbar.watermark': 'Watermark',
    'toolbar.watermark.text': 'Text',
    'toolbar.watermark.placeholder': 'Enter watermark text...',
    'toolbar.watermark.position': 'Position',
    'toolbar.watermark.opacity': 'Opacity',
    'toolbar.watermark.size': 'Size',

    // Drag & Drop
    'editor.dropHere': 'Drop your code file here',

    // Shortcuts
    'shortcut.title': 'Keyboard Shortcuts',
    'shortcut.exportPng': 'Export PNG',
    'shortcut.exportSvg': 'Export SVG',
    'shortcut.copy': 'Copy to Clipboard',
    'shortcut.randomTheme': 'Random Theme',
    'shortcut.lineNumbers': 'Toggle Line Numbers',
    'shortcut.darkMode': 'Toggle Dark Mode',
  },
  'zh-CN': {
    // Header
    'app.name': 'CodeShot',
    'export.copy': '复制',
    'export.copied': '已复制',
    'export.png': 'PNG',
    'export.svg': 'SVG',

    // Editor
    'editor.title': '代码编辑',
    'editor.placeholder': '在此粘贴代码...',

    // Toolbar
    'toolbar.randomTheme': '随机主题',
    'toolbar.savePreset': '保存预设',
    'toolbar.autoFit': '自动适配',
    'toolbar.title': '标题',
    'toolbar.themeStyle': '主题 & 样式',
    'toolbar.backgroundSettings': '背景设置',
    'toolbar.backgroundPreset': '背景预设',
    'toolbar.gradientAngle': '渐变角度',
    'toolbar.shadowSettings': '阴影设置',
    'toolbar.template': '模板',
    'toolbar.theme': '主题',
    'toolbar.padding': '内边距',
    'toolbar.shadow': '阴影',
    'toolbar.canvasRatio': '画布比例',
    'toolbar.background': '背景',
    'toolbar.lineNumbers': '显示行号',
    'toolbar.presets': '预设',
    'toolbar.presetName': '输入预设名称：',
    'preview': '预览',
    'canvas': '画布',
    'size': '尺寸',
    'zoom': '缩放',
    'downloadCanvas': '下载画布',
    'previewEffect': '预览效果',
    'canvasSize': '画布尺寸',
    'feature.realtime': '实时预览',
    'feature.realtime.line1': '修改左侧设置',
    'feature.realtime.line2': '即时查看效果',
    'feature.export': '多种导出',
    'feature.export.line1': '支持 PNG、SVG',
    'feature.export.line2': '多种格式导出',
    'feature.hd': '高清输出',
    'feature.hd.line1': '生成高清图片',
    'feature.hd.line2': '适合各种场景',
    'feature.theme': '主题丰富',
    'feature.theme.line1': '多种主题风格',
    'feature.theme.line2': '满足不同需求',

    // 打字机动画
    'typing.play': '打字机动画',
    'typing.pause': '暂停',
    'typing.reset': '重置',
    'typing.speed': '速度',

    // 水印
    'toolbar.watermark': '水印',
    'toolbar.watermark.text': '文字',
    'toolbar.watermark.placeholder': '输入水印文字...',
    'toolbar.watermark.position': '位置',
    'toolbar.watermark.opacity': '透明度',
    'toolbar.watermark.size': '大小',

    // 拖拽
    'editor.dropHere': '拖放代码文件到这里',

    // 快捷键
    'shortcut.title': '键盘快捷键',
    'shortcut.exportPng': '导出 PNG',
    'shortcut.exportSvg': '导出 SVG',
    'shortcut.copy': '复制到剪贴板',
    'shortcut.randomTheme': '随机主题',
    'shortcut.lineNumbers': '切换行号',
    'shortcut.darkMode': '切换深色模式',
  },
}

let currentLocale: Locale = (localStorage.getItem('codeshot-locale') as Locale) || 'zh-CN'

export const t = (key: string): string => {
  return translations[currentLocale]?.[key] || translations['en']?.[key] || key
}

export const setLocale = (locale: Locale) => {
  currentLocale = locale
  localStorage.setItem('codeshot-locale', locale)
}

export const getLocale = (): Locale => currentLocale

export const locales: { id: Locale; name: string }[] = [
  { id: 'en', name: 'English' },
  { id: 'zh-CN', name: '简体中文' },
]
