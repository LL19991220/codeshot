# 🎨 CodeShot

**数秒で美しいコードスクリーンショットを生成。**

無料のオープンソース [shots.so](https://shots.so) オルタナティブ — ソーシャルメディア、ブログ記事、プレゼンテーション用の美しいコード画像を作成。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LL19991220/codeshot)

🔗 **ライブデモ**: [https://codeshot.vercel.app](https://codeshot.vercel.app)

**他の言語バージョン**: [English](README.md) | [中文](README_CN.md) | [한국어](README_KR.md)

## ✨ 機能

- 🎯 **リアルタイムプレビュー** — コード入力で即座に結果を確認
- 🎨 **12以上のコードテーマ** — GitHub Dark、Dracula、One Dark Pro、Nordなど
- 🌈 **グラデーション背景** — 美しいプリセットまたはカスタムカラー
- 🪟 **ウィンドウスタイル** — macOS、Windows、ミニマル、ラウンドフレーム
- 📐 **カスタマイズ可能** — パディング、行番号、タイトルなど
- 📋 **クリップボードコピー** — ワンクリックで素早くコピー
- 📥 **PNG/SVGエクスポート** — あらゆる用途に高品質エクスポート
- 🚀 **フロントエンドのみ** — サーバーなし、追跡なし、完全にブラウザで実行

## 🚀 クイックスタート

```bash
# リポジトリをクローン
git clone https://github.com/LL19991220/codeshot.git
cd codeshot

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

[http://localhost:5173](http://localhost:5173) を開いて作成を始めましょう！

## 🛠️ 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **シンタックスハイライト**: [Shiki](https://shiki.matsu.io/)（200以上のテーマ、100以上の言語）
- **画像エクスポート**: [html-to-image](https://github.com/bubkoo/html-to-image)

## 📖 使い方

1. **コードを貼り付け** — 左側のエディタパネルに
2. **テーマを選択** — ドロップダウンから選択（GitHub Dark、Draculaなど）
3. **背景を選択** — グラデーションまたは単色
4. **ウィンドウスタイルを選択** — macOSドット、Windows、ミニマルなど
5. **パディングを調整** — 行番号の切り替え
6. **エクスポート** — PNG/SVGまたはクリップボードにコピー

## 🎨 利用可能なテーマ

| ダークテーマ | ライトテーマ |
|--------------|--------------|
| GitHub Dark | GitHub Light |
| Dracula | Solarized Light |
| One Dark Pro | Vitesse Light |
| Nord | |
| Monokai | |
| Tokyo Night | |
| Slack Dark | |

## 📁 プロジェクト構造

```
codeshot/
├── src/
│   ├── components/
│   │   ├── Editor.tsx         # コード入力エディタ
│   │   ├── Preview.tsx        # リアルタイムプレビューパネル
│   │   ├── Toolbar.tsx        # カスタマイズコントロール
│   │   └── ExportButton.tsx   # エクスポート/コピーボタン
│   ├── themes/
│   │   └── index.ts           # テーマ定義
│   ├── utils/
│   │   └── export.ts          # エクスポートユーティリティ
│   ├── types/
│   │   └── index.ts           # TypeScript型定義
│   ├── App.tsx                # メインアプリケーション
│   └── main.tsx               # エントリーポイント
├── index.html
└── package.json
```

## 🤝 コントリビュート

コントリビューションを歓迎します！Pull Requestを自由に提出してください。

1. リポジトリをFork
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m '素晴らしい機能を追加'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 📝 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています — 詳細は[LICENSE](LICENSE)ファイルをご覧ください

## 🙏 謝辞

- [Shiki](https://shiki.matsu.io/) — 美しいシンタックスハイライトのために
- [Tailwind CSS](https://tailwindcss.com/) — ユーティリティベースのCSSのために
- [shots.so](https://shots.so) — インスピレーションのために

---

**開発者が心を込めて作りました。開発者のために。** ❤️
