---
title: "React의 Error Boundary는 왜 비동기 에러를 잡지 못하나요?"
published: 2025-09-10
tags: [React, Study]
category: React
draft: false
---

[비동기 개념 이해하기](https://softourr.vercel.app/posts/javascript/%EB%B9%84%EB%8F%99%EA%B8%B0-%EA%B0%9C%EB%85%90-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0/)
## 비동기 에러와 리액트 에러 바운더리
자바스크립트는 싱글스레드다. 콜스택은 하나뿐이고 동기 코드는 여기서 순차적으로 실행된다. 근데 여러 작업이 동시에 돌아가는 것처럼 보이는 이유는 뭘까? 
:::important
👉 실제로는 브라우저(Web API)나 Node 런타임(libuv)이 멀티스레드라서 가능하다. `setTimeout`, `fetch` 같은 비동기 작업은 콜스택에서 바로 실행되는 게 아니라 Web API에 등록되고, 완료되면 콜백 큐에 들어간다. 이벤트 루프가 콜스택이 비었는지 확인하고, 비면 큐에서 콜백을 꺼내 다시 콜스택으로 올려 실행한다. 그래서 비동기처럼 보임.
:::

---

### 그렇다면 왜 비동기 에러는 못 잡을까?
React Error Boundary는 **렌더링 시점 콜스택**에서 터진 에러만 잡는다. 즉, 화면 그리기 도중 `throw`된 에러, 라이프사이클 메서드 에러 같은 것들이다.  
하지만 비동기 코드는?
- Web API에 등록됐다가 콜백 큐 → 이벤트 루프를 통해 **렌더링 콜스택이 끝난 후** 다시 실행된다.
- 따라서 그 시점의 에러는 React Error Boundary가 감지할 수 있는 범위를 벗어난다.
- 결론적으로, **비동기 에러는 Error Boundary에 안 잡힌다.**

![](https://i.imgur.com/PYqQbnw.png)

### 경험 복기
최근에 React Query를 쓸 때, `useErrorBoundary: true` 옵션을 켜서 에러를 Error Boundary로 넘겼다.  
쿼리 함수에서 터지는 에러는 잘 캐치됐다. 근데 문제는 `onSuccess` 같은 후처리 로직이었다. 여기서 `navigate`를 쓰거나 로컬 스토리지 정리를 하다가 에러가 나면… Error Boundary 페이지가 안 뜨고 그냥 404로 떨어지거나 화면이 깨졌다.

처음엔 왜 그런지 몰랐는데, 나중에 보니까 이게 바로 **비동기 에러라서 Error Boundary가 못 잡는 상황**이었다.

---

### mutate vs mutateAsync

이때 `mutate`를 쓰면 fire-and-forget이라 순차 보장이 안 돼서 더 꼬이기도 했다. 그래서 `mutateAsync`로 바꾸니까 문제가 해결됐다.

- `mutate`: 실행만 던지고 바로 리턴. 후처리 로직 꼬일 수 있음.
- `mutateAsync`: Promise 반환 → `await`로 순차 보장 가능.
    

스토리지 정리 → 네비게이트 같은 흐름을 보장하려면 `mutateAsync + try/catch`가 필요하다.


## 결론

- 비동기 에러는 **렌더링 콜스택 밖에서 발생**하기 때문에 Error Boundary에서 못 잡는다.
- React Query의 `useErrorBoundary`는 **쿼리 실행 에러만** Error Boundary로 전달해준다.
- 후처리 로직에서 발생하는 에러는 **직접 try/catch**하거나 `mutateAsync`로 제어해야 한다.
    
:::note
👉 내가 겪었던 것처럼 “화면은 안 넘어가고 404만 뜨는” 경험이 바로 이 이유였다.  
Error Boundary는 결국 “렌더링 도중 발생한 에러”만 맡고,  
비동기 후처리에서 터지는 건 개발자가 직접 관리해야 한다.
:::
참고
- [ErrorBoundary 가 포착할 수 없는 에러와 그 이론적 원리 분석 - 행복한 시지프](https://happysisyphe.tistory.com/66)
