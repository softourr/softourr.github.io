---
title: "Next.js 폴더/파일 구조"
published: 2024-06-22
description: "Next.js의 디렉토리 구조잡기"
image: "./img/lovelymongmong.gif"
tags: [Next.js]
category: Frontend
draft: false
---

# Next.js 폴더/파일 구조

[참고](https://miriya.net/blog/cliz752zc000lwb86y5gtxstu)

[참고](https://velog.io/@juh518/Next.js-%ED%8F%B4%EB%8D%94-%EB%B0%8F-%ED%8C%8C%EC%9D%BC-%EA%B5%AC%EC%A1%B0)

## **.eslintrc.json**

루트에 반드시 필요!!! 꼭 써라

## **.env**

루트에 위치

반드시 .gitignore에 추가

## **/public**

public는 정적 자산(static assets)로 취급된다. 빌드 과정에서 그대로 복사되어 최종 빌드된 앱에 포함

```jsx
public/
  ├── fonts/
  ├── images/
  └── svgs/
```

## **/src**

```jsx
src/
├── app/              # 라우팅 관련 파일들만 포함 (페이지 및 레이아웃 정의)
│   ├── page.tsx      # 페이지 컴포넌트 정의
│   └── layout.tsx    # 전역 레이아웃 정의
├── components/       # 여러 페이지에서 공통으로 사용되는 React 컴포넌트들
├── constants/        # 여러 페이지에서 공통으로 사용되는 상수값들
├── containers/       # 각 페이지에서 사용할 컴포넌트들과 관련된 코드 (tsx, css, state, hooks)
├── hooks/            # 여러 페이지에서 공통으로 사용되는 React 커스텀 훅들
├── libs/             # 외부 라이브러리와의 인터페이스 코드
├── services/         # 백엔드 API와 통신하는 클라이언트 서비스 로직
├── states/           # 여러 페이지에서 사용하는 상태 관리 로직
├── styles/           # 전역 스타일 시트와 CSS 모듈
├── types/            # TypeScript 타입 정의
└── utils/            # 여러 곳에서 사용되는 유틸리티 함수들
```

컨테이너는 단일 페이지에서 사용, 여러 페이지에서 사용하게 되면 컴포넌트 폴더로 옮김
