# 🎨 CodeShot

**Beautiful code screenshots in seconds.**

A free, open-source alternative to [shots.so](https://shots.so) — create stunning code images for social media, blog posts, and presentations.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LL19991220/codeshot)

🔗 **Live Demo**: [https://codeshot-lovat.vercel.app](https://codeshot-lovat.vercel.app)

**Other Languages**: [中文](README_CN.md) | [한국어](README_KR.md) | [日本語](README_JP.md)

## ✨ Features

- 🎯 **Real-time Preview** — See changes instantly as you type
- 🎨 **12+ Code Themes** — GitHub Dark, Dracula, One Dark Pro, Nord, and more
- 🌈 **Gradient Backgrounds** — Beautiful preset gradients or custom colors
- 🪟 **Window Styles** — macOS, Windows, Minimal, and Rounded frames
- 📐 **Customizable** — Padding, line numbers, title, and more
- 📋 **Copy to Clipboard** — One-click copy for quick sharing
- 📥 **Export PNG/SVG** — High-resolution exports for any use case
- 🚀 **Pure Frontend** — No server, no tracking, runs entirely in your browser

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/codeshot.git
cd codeshot

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start creating!

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Syntax Highlighting**: [Shiki](https://shiki.matsu.io/) (200+ themes, 100+ languages)
- **Image Export**: [html-to-image](https://github.com/bubkoo/html-to-image)

## 📖 Usage

1. **Paste your code** in the left editor panel
2. **Choose a theme** from the dropdown (GitHub Dark, Dracula, etc.)
3. **Pick a background** gradient or solid color
4. **Select a window style** (macOS dots, Windows, Minimal, etc.)
5. **Adjust padding** and toggle line numbers
6. **Export** as PNG/SVG or copy to clipboard

## 🎨 Available Themes

| Dark Themes | Light Themes |
|-------------|--------------|
| GitHub Dark | GitHub Light |
| Dracula | Solarized Light |
| One Dark Pro | Vitesse Light |
| Nord | |
| Monokai | |
| Tokyo Night | |
| Slack Dark | |

## 📁 Project Structure

```
codeshot/
├── src/
│   ├── components/
│   │   ├── Editor.tsx         # Code input editor
│   │   ├── Preview.tsx        # Real-time preview panel
│   │   ├── Toolbar.tsx        # Customization controls
│   │   └── ExportButton.tsx   # Export/copy buttons
│   ├── themes/
│   │   └── index.ts           # Theme definitions
│   ├── utils/
│   │   └── export.ts          # Export utilities
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   ├── App.tsx                # Main application
│   └── main.tsx               # Entry point
├── index.html
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shiki](https://shiki.matsu.io/) for beautiful syntax highlighting
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shots.so](https://shots.so) for inspiration

---

**Made with ❤️ by developers, for developers.**
