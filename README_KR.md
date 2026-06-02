# 🎨 CodeShot

**몇 초 만에 아름다운 코드 스크린샷을 생성하세요.**

무료 오픈소스 [shots.so](https://shots.so) 대안 — 소셜 미디어, 블로그 게시물, 프레젠테이션을 위한 아름다운 코드 이미지를 만드세요.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LL19991220/codeshot)

🔗 **라이브 데모**: [https://codeshot-lovat.vercel.app](https://codeshot-lovat.vercel.app)

**다른 언어 버전**: [English](README.md) | [中文](README_CN.md) | [日本語](README_JP.md)

## ✨ 기능

- 🎯 **실시간 미리보기** — 코드를 입력하면 즉시 결과 확인
- 🎨 **12개 이상의 코드 테마** — GitHub Dark, Dracula, One Dark Pro, Nord 등
- 🌈 **그라데이션 배경** — 아름다운 프리셋 그라데이션 또는 사용자 정의 색상
- 🪟 **윈도우 스타일** — macOS, Windows, 미니멀, 라운드 프레임
- 📐 **커스터마이즈 가능** — 패딩, 줄 번호, 제목 등
- 📋 **클립보드 복사** — 원클릭으로 빠르게 복사
- 📥 **PNG/SVG 내보내기** — 어떤 용도든 고품질 내보내기
- 🚀 **프론트엔드 전용** — 서버 없음, 추적 없음, 완전히 브라우저에서 실행

## 🚀 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/LL19991220/codeshot.git
cd codeshot

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

[http://localhost:5173](http://localhost:5173)을 열고 만들기를 시작하세요!

## 🛠️ 기술 스택

- **프레임워크**: React 18 + TypeScript
- **빌드 도구**: Vite
- **스타일링**: Tailwind CSS
- **구문 강조**: [Shiki](https://shiki.matsu.io/) (200개 이상의 테마, 100개 이상의 언어)
- **이미지 내보내기**: [html-to-image](https://github.com/bubkoo/html-to-image)

## 📖 사용 방법

1. **코드를 붙여넣기** — 왼쪽 편집기 패널에
2. **테마 선택** — 드롭다운에서 선택 (GitHub Dark, Dracula 등)
3. **배경 선택** — 그라데이션 또는 단색
4. **윈도우 스타일 선택** — macOS 점, Windows, 미니멀 등
5. **패딩 조정** — 줄 번호 토글
6. **내보내기** — PNG/SVG 또는 클립보드에 복사

## 🎨 사용 가능한 테마

| 다크 테마 | 라이트 테마 |
|-----------|-------------|
| GitHub Dark | GitHub Light |
| Dracula | Solarized Light |
| One Dark Pro | Vitesse Light |
| Nord | |
| Monokai | |
| Tokyo Night | |
| Slack Dark | |

## 📁 프로젝트 구조

```
codeshot/
├── src/
│   ├── components/
│   │   ├── Editor.tsx         # 코드 입력 편집기
│   │   ├── Preview.tsx        # 실시간 미리보기 패널
│   │   ├── Toolbar.tsx        # 커스터마이즈 컨트롤
│   │   └── ExportButton.tsx   # 내보내기/복사 버튼
│   ├── themes/
│   │   └── index.ts           # 테마 정의
│   ├── utils/
│   │   └── export.ts          # 내보내기 유틸리티
│   ├── types/
│   │   └── index.ts           # TypeScript 타입
│   ├── App.tsx                # 메인 애플리케이션
│   └── main.tsx               # 진입점
├── index.html
└── package.json
```

## 🤝 기여

기여를 환영합니다! Pull Request를 자유롭게 제출해 주세요.

1. 저장소를 Fork하세요
2. 기능 브랜치를 만드세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m '어떤 기능 추가'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다 — 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요

## 🙏 감사의 말

- [Shiki](https://shiki.matsu.io/) — 아름다운 구문 강조를 위해
- [Tailwind CSS](https://tailwindcss.com/) — 유틸리티 기반 CSS를 위해
- [shots.so](https://shots.so) — 영감을 위해

---

**개발자가 마음을 담아 만들었습니다. 개발자를 위해.** ❤️
