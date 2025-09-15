---
title: "Next.js의 SSR와 React 19의 RSC 정리"
published: 2025-09-15
tags: [Next, Study]
category: Next
draft: false
---

- 참고 :  [Next.js의 SSR과 React의 RSC(React Server Components) 완벽 이해](https://mycodings.fly.dev/blog/2024-01-28-complete-understanding-nextjs-ssr-and-react-rsc#nextjs%EC%9D%98-ssr%EA%B3%BC-react%EC%9D%98-rscreact-server-components-%EC%99%84%EB%B2%BD-%EC%9D%B4%ED%95%B4)

해당 글은 리액트 18로 말씀하시는데 현재는 리액트 19가 나온 상태이긴 하다
고려해서 읽어보자

## 리액트 (React)
리액트 애플리케이션은 기본적으로 **SPA(싱글 페이지 애플리케이션)**.  
말 그대로 "하나의 큰 페이지"라고 보면 된다. 다른 페이지로 이동할 때 실제 새 HTML을 불러오는 게 아니라, 이미 받은 자바스크립트 코드 안에서 **가상 DOM을 활용해 필요한 부분만 갈아끼운다**. 그래서 전환은 빠르다.

근데 단점이 있다.  
처음 들어올 때는 전체 앱 코드를 한 번에 들고 와야 하니 **첫 로딩이 느리다**.  
이를 보완하려고 `코드 스플리팅`이나 `서스펜스` 같은 기법으로 "우선 필요한 부분만" 보여주고 나머지는 나중에 불러오는 방식을 쓴다.

즉, **리액트 = CSR(클라이언트 사이드 렌더링)이 기본**이고, 초기 로딩은 느리지만 이후 전환이 빠르다는 장단점이 있다.

결국 첫 페이지의 긴 로딩시간은 spa의 풀리지 않는 숙제다.
그러면서 넥스트의 시대가 왔다. 서버 사이드 렌더링의 시대~

## 넥스트 (Next.js)
초기 로딩이 느리다고?  
👉 그럼 **서버에서 HTML을 만들어서 바로 내려주자!** → 이게 SSR(Server-Side Rendering).
- 넥스트는 서버에서 완성된 HTML을 내려주고, 클라이언트에서는 거기에 하이드레이션(hydration)을 입힌다.
- 하이드레이션이란? 서버에서 내려준 HTML에 자바스크립트 이벤트, 상태 관리 같은 걸 "물 주듯" 붙여 최종 완성하는 단계.
    
장점은 두 가지:
1. 초기 화면이 빠르게 보인다
2. **SEO에 강하다.** 크롤러가 서버에서 만든 HTML과 메타 정보를 그대로 가져갈 수 있기 때문. CSR에서는 첫 요청 시 HTML이 텅 비어 있으니 SEO에 불리하다.

:::note
첫페이지 로딩이 오래 걸리면? 서버에서 html을 만들어서 주겠다. (1차 완성본 제공합니다~)
거기에 클라이언트에서 처리해야 하는 것들만 처리해서 붙여라 (하이드레이션)
:::

## 넥스트의 렌더링 4종 세트
1. **CSR**: 일반 리액트처럼 클라에서만 렌더링
2. **SSR**: 요청 올 때마다 서버가 HTML 생성
3. **SSG (Static Site Generation)**: 빌드 시점에 HTML을 만들어 정적 파일로 배포 (CDN에 올려두면 제일 빠름)
4. **ISR (Incremental Static Regeneration)**: SSG + 업데이트 보완.
    - 첫 요청은 기존 정적 페이지를 보여주고,
    - 백그라운드에서 새로 렌더링해 교체.
    - 일종의 “낙관적 업데이트” 느낌.

## RSC (React Server Components)
여기서부터 조금 더 헷갈리는 파트.  
RSC는 **컴포넌트 단위로 서버에서 렌더링할지, 클라이언트에서 렌더링할지 나누는 개념**이다.
- 서버 컴포넌트: 서버에서 실행 → DB 호출 등 서버 전용 로직 가능
- 클라이언트 컴포넌트: 브라우저에서 실행 → 상태 관리, 이벤트 핸들링 가능
    
넥스트 앱 라우터에서는 `page.tsx`, `layout.tsx` 같은 건 기본이 서버 컴포넌트.  
만약 브라우저 이벤트가 필요한 컴포넌트라면 상단에 `"use client"` 선언을 붙여야 한다.

## 리액트 18~19 업데이트
리액트 18에서 SSR 관련 큰 변화가 있었다.
- **스트리밍 SSR**: 페이지 전체가 렌더링 완료될 때까지 기다리는 대신, 일부 준비된 HTML부터 순차적으로 내려보낼 수 있음.
- **선택적 하이드레이션**: 필요한 부분부터 우선 하이드레이션 가능.
    
즉, 예전에는 "서버 렌더링 = 전체가 끝날 때까지 멍 때리기"였는데, 이제는 "조각 단위로 점진적 렌더링"이 가능하다.  
리액트 19에서는 이 방향이 더 보강됐다.

## use client를 붙이면 클라이언트 컴포넌트가 된다는 오해
많은 사람들이 `"use client"` = “이 컴포넌트를 클라에서 실행하겠다”라고 단순하게만 이해한다.  
맞긴 한데, 더 정확히는 “이 파일 단위가 서버/클라 경계”라는 선언이다.
- 부모 컴포넌트에 이미 `"use client"`를 붙였다면, 그 안에서 import하는 자식 컴포넌트도 자동으로 클라이언트 컴포넌트로 취급된다.
- `따라서 자식에서 또 `"use client"`를 붙이면 경계가 중복돼서 직렬화 에러 같은 게 발생할 수 있다.`

:::tip
여기에 직렬화 규칙이 겹친다.
- 서버 ↔ 클라이언트 사이에는 JSON으로 표현 가능한 데이터만 props로 전달할 수 있다. (숫자, 문자열, 객체, 배열 등)
- 하지만 **함수 같은 건 직렬화 불가능**하다.
- 그래서 서버 컴포넌트에 `"use client"` 없이 함수 props를 전달하려 하면 오류가 발생한다.
:::

예시에서 `setMessages` 같은 함수는 직렬화 불가능한 데이터라, 서버 경계를 넘길 수 없다. 그런데 부모가 이미 `"use client"`라면 props로 내려줄 수 있다. 자식에 또 `"use client"`를 붙이면 Next.js가 “어? 여기 또 경계가 있네?” 하면서 헷갈려 에러를 띄우는 것.
👉 정리: **경계는 한 번만. 부모에서 `"use client"`를 선언했다면 자식에서는 굳이 붙이지 않아도 된다.**


## 토론 예시
- [토론장 구경](https://github.com/vercel/next.js/discussions/46795)
토론의 예에서는, MessageInput에 use client를 선언하고 있어서 "Props must be serializable for components in the 'use client' entry file, 'setMessages' is invalid."라는 오류가 발생합니다.

```js
// parent.tsx

"use client";
import { Message } from "@prisma/client";
import React, { useState, useEffect } from "react";
import MessageInput from "./MessageInput";

type Props = {
  initialMessages: Message[];
};

export default function MessagesContainer({ initialMessages }: Props) {
  const [messages, setMessages] = useState(initialMessages);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <MessageInput messages={messages} setMessages={setMessages} conversationId={""} />
    </div>
  );
}
```

```js
// child.tsx

"use client";
import { ConversationRole, Message } from "@prisma/client";
import React, { useState } from "react";

type Props = {
  messages: Message[];
  setMessages: (message: Message[]) => void;
  conversationId: string;
};

// The error exists on `setMessages` here
export default function MessageInput({ messages, setMessages, conversationId }: Props) {
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            setMessages(newMessage);
            setInput("");
          }
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
```

## React 19 업데이트
- **릴리즈 날짜**: 2024년 12월 5일 (React 공식 블로그 발표 기준)
- React 18 이후 약 2년 만의 메이저 업데이트

- **Actions & 새 훅**
    - `useActionState`, `useFormStatus`, `useOptimistic` 등
    - 비동기 작업, 폼 제출, 낙관적 UI 업데이트가 훨씬 간단해짐
- **`use()` API**
    - 컴포넌트 내부에서 Promise나 context를 직접 사용할 수 있게 됨
- **서버 컴포넌트/액션 강화**
    - `<form action={fn}>` 같은 패턴 지원 → 서버와의 연결 더 자연스러움
- **Head/메타데이터 관리**
    - `<title>`, `<meta>` 등을 컴포넌트에서 정의 → SEO 개선
- **Ref 전달 단순화**
    - `forwardRef` 없이 함수형 컴포넌트에서 `ref` 직접 사용 가능
- **하이드레이션/렌더링 개선**
    - mismatch 에러 메시지 강화
    - 우선순위 낮은 렌더링(`useDeferredValue`) 안정화
- **리소스 로딩 최적화**
    - `preload`, `preinit` API
    - async script, stylesheet 지원

정리하면서 겸사겸사 19 업데이트 한번 봐보자
👉 요약하면:  
**React 18 = 스트리밍 SSR 기반 다지기**  
**React 19 = DX(개발 경험) + 서버 액션 & 비동기 데이터 활용성 강화**


---
