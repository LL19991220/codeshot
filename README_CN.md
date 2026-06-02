# 🎨 CodeShot

**几秒钟生成精美的代码截图。**

一个免费、开源的 [shots.so](https://shots.so) 替代品 — 为社交媒体、博客文章和演示文稿创建精美的代码图片。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LL19991220/codeshot)

**其他语言版本**: [English](README.md) | [한국어](README_KR.md) | [日本語](README_JP.md)

## ✨ 功能特性

- 🎯 **实时预览** — 输入代码即时看到效果
- 🎨 **12+ 代码主题** — GitHub Dark、Dracula、One Dark Pro、Nord 等
- 🌈 **渐变背景** — 精美的预设渐变或自定义颜色
- 🪟 **窗口样式** — macOS、Windows、简约、圆角边框
- 📐 **高度自定义** — 内边距、行号、标题等
- 📋 **一键复制** — 快速复制到剪贴板
- 📥 **导出 PNG/SVG** — 高分辨率导出，适用于任何场景
- 🚀 **纯前端** — 无服务器、无追踪，完全在浏览器中运行

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/LL19991220/codeshot.git
cd codeshot

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:5173](http://localhost:5173) 开始创建！

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **语法高亮**: [Shiki](https://shiki.matsu.io/)（200+ 主题，100+ 语言）
- **图片导出**: [html-to-image](https://github.com/bubkoo/html-to-image)

## 📖 使用方法

1. **粘贴代码** 到左侧编辑器面板
2. **选择主题** 从下拉菜单中选择（GitHub Dark、Dracula 等）
3. **选择背景** 渐变色或纯色
4. **选择窗口样式**（macOS 圆点、Windows、简约等）
5. **调整内边距** 和切换行号显示
6. **导出** PNG/SVG 或复制到剪贴板

## 🎨 可用主题

| 深色主题 | 浅色主题 |
|----------|----------|
| GitHub Dark | GitHub Light |
| Dracula | Solarized Light |
| One Dark Pro | Vitesse Light |
| Nord | |
| Monokai | |
| Tokyo Night | |
| Slack Dark | |

## 📁 项目结构

```
codeshot/
├── src/
│   ├── components/
│   │   ├── Editor.tsx         # 代码输入编辑器
│   │   ├── Preview.tsx        # 实时预览面板
│   │   ├── Toolbar.tsx        # 自定义控制栏
│   │   └── ExportButton.tsx   # 导出/复制按钮
│   ├── themes/
│   │   └── index.ts           # 主题定义
│   ├── utils/
│   │   └── export.ts          # 导出工具函数
│   ├── types/
│   │   └── index.ts           # TypeScript 类型
│   ├── App.tsx                # 主应用
│   └── main.tsx               # 入口文件
├── index.html
└── package.json
```

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m '添加某个功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📝 许可证

本项目基于 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Shiki](https://shiki.matsu.io/) 提供精美的语法高亮
- [Tailwind CSS](https://tailwindcss.com/) 提供实用的 CSS 工具类
- [shots.so](https://shots.so) 提供灵感

---

**由开发者用心制作，为开发者服务。** ❤️
