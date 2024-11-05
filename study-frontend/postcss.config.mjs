/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-import": {}, // CSS 파일에서 @import 문 지원
    tailwindcss: {},      // Tailwind CSS 플러그인
    autoprefixer: {},     // 벤더 프리픽스 자동 추가
  },
};

export default config;
