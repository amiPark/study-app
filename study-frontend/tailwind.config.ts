import type { Config } from "tailwindcss";

// Tailwind CSS 구성 파일
const config: Config = {
  // Tailwind CSS가 스타일을 적용할 파일 경로 설정
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",  // src/pages 디렉토리 내의 모든 JS/TS/MDX 파일 포함
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",  // src/components 디렉토리 내의 모든 JS/TS/MDX 파일 포함
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  // src/app 디렉토리 내의 모든 JS/TS/MDX 파일 포함
  ],
  theme: {
    extend: {
      // 색상 설정 - 사용자 정의 색상을 CSS 변수로 설정
      colors: {
        background: "var(--background)",  // CSS 변수(--background)로 배경 색상 정의
        foreground: "var(--foreground)",  // CSS 변수(--foreground)로 전경 색상 정의
      },
      // 글꼴 설정 - 사용자 정의 글꼴 지정
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],  // Inter 폰트, 기본 sans-serif
        nacelle: ["var(--font-nacelle)", "sans-serif"],  // Nacelle 폰트, 기본 sans-serif
      },
      // 글꼴 크기 설정 - 사용자 정의 글꼴 크기와 관련 속성 정의
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.5384" }],  // 작은 폰트 크기 설정
        sm: ["0.875rem", { lineHeight: "1.5715" }],  // 소형 폰트 크기 설정
        base: ["0.9375rem", { lineHeight: "1.5333", letterSpacing: "-0.0125em" }],  // 기본 폰트 크기
        lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.0125em" }],  // 큰 폰트 크기
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.0125em" }],  // 더 큰 폰트 크기
        "2xl": ["1.5rem", { lineHeight: "1.415", letterSpacing: "-0.0268em" }],  // 폰트 크기 2단계
        "3xl": ["1.75rem", { lineHeight: "1.3571", letterSpacing: "-0.0268em" }],  // 폰트 크기 3단계
        "4xl": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.0268em" }],  // 폰트 크기 4단계
        "5xl": ["3.5rem", { lineHeight: "1", letterSpacing: "-0.0268em" }],  // 폰트 크기 5단계
        "6xl": ["4rem", { lineHeight: "1", letterSpacing: "-0.0268em" }],  // 폰트 크기 6단계
        "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.0268em" }],  // 폰트 크기 7단계
      },
      // 애니메이션 설정
      animation: {
        shine: "shine 5s ease-in-out 500ms infinite",  // 'shine' 애니메이션, 5초 지속 반복
      },
      // 애니메이션 키프레임 설정
      keyframes: {
        shine: {  // 'shine' 애니메이션의 키프레임
          "0%": { top: "0", transform: "scaleY(5)", opacity: "0" },
          "10%": { opacity: ".8" },
          "20%": { top: "100%", transform: "scaleY(10)", opacity: "0" },
          "100%": { top: "100%", transform: "scaleY(1)", opacity: "0" },
        },
        gradient: {  // 'gradient' 애니메이션의 키프레임
          to: { "background-position": "200% center" },
        },
      },
    },
  },
  // Tailwind CSS 플러그인 설정
  plugins: [require("@tailwindcss/forms")],  // @tailwindcss/forms 플러그인 추가 - 폼 스타일링 지원
};

export default config;
