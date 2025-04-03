---
title: "리액트 동시성 모드(Concurrent Mode)에 관해서 설명해주세요"
published: 2025-04-03
tags: [FEQ, Study]
category: FEQ
draft: false
---
" 프론트엔드 매일메일 81번 문제입니다. [참고 React 18 Concurrent Rendering - dev_hee](https://velog.io/@heelieben/React-18-Concurrent-Rendering)

[[비동기 개념 이해하기]]
동시성 모드를 알기 위해서는 먼저 비동기 처리에 대해 알아야 합니다.

1
리액트의 동시성 모드란 비동기적으로 작업을 처리하는 와중에!
다른 작업이 들어올 때, 작업 중인 것을 멈추고 해당 더 중요한 작업을 수행하는 기능을 제공합니다.
비동기 업그레이드랄까...?

+.운영체제의 MLFQ와 유사합니다. 여기서는 태스크의 우선순위를 고려해 스케줄링하는데 비슷

2
예전 리액트(17버전 이전)는 스택 기반 렌더링을 사용했습니다.
(+. 재귀호출을 이용한 동기적인 렌더링 방식으로 컴포넌트 렌더링이 시작되면 트리의 최하위까지 한 번에 실행된다. 즉 하나의 렌더링 작업이 끝나기 전까지 사용자 입력 같은 다른 이벤트 처리할 수 없었다.)

그러나 리액트 18부터는 동시성 모드를 지원합니다. 즉 각 작업에 우선순위를 부여할 수 있게 되어 해당 작업들은 먼저 실행될 수 있도록 했습니다. (사용자 입력 등)

3
동시성은 리액트 18부터 도입되었습니다. 
## 왜 도입되었나요?
이전까지는 한 번 렌더링이 시작된다면 멈출 수 없었습니다. 이는 사용자 입력이 있는 경우 가장 눈에 띄게 문제가 발생하는데, 렌더링이 끝나지 않았을 때 사용자 입력이 될 경우 입력이 버벅이는 현상이 발생합니다.
이를 해결하기 위해 등장했던 것이 디바운스와 스로틀링입니다.
" 디바운스는 사용자의 마지막 입력이 끝나고 일정 시간이 지나서 무거운 작업을 수행합니다. 항상 일정 시간을 기다려야 한다는 것이죠
" 스로틀링은 입력 중에 주기적으로 무거운 작업을 수행합니다. 디바운스의 단점을 일부 해결했으나 여전히 특정 주기를 설정해야 하고, 해당 주기를 너무 짧게 설정하면 마찬가지로 입력이 버벅이는 현상이 발생합니다.

- 동시성은? 디바운스와 스로틀링의 한계점을 해결합니다. 일정 시간을 대기하지 않고, 특정 주기도 설정하지 않죠. 그래도 사용자 입력이 버벅이지 않습니다.
## 정리
동시성 모드는 리액트 18부터 도입된 개념입니다. 이전의 스택 구조는 모든 작업이 순차적으로 실행했으나 동시성 모드에서는 사용자 입력과 같은 상호작용을 우선적으로 처리할 수 있게 작업에 우선순위를 부여할 수  있습니다. 이전에는 디바운스와 스로틀링 같은 기법을 사용해 사용자 경험을 개선 (입력 버벅임 줄이기 등)했으나 동시성 모드를 사용하면 더 모던하게 개선할 수 있습니다.

## 사용법
동시성 모드로 설정하기 위해서는 render 대신 createRoot를 사용합니다.
<details>
```javascript
// 기존 리액트 18 이전
import ReactDOM from 'react-dom';
import App from 'App';

const container = document.getElementById('app'); 

ReactDOM.render(<App />, container);

```
```javascript
// 리액트 18
import ReactDOM from 'react-dom';
import App from 'App'; 

const container = document.getElementById('app'); 

// 루트를 생성합니다.
const root = ReactDOM.createRoot(container); 

// 루트를 통해 앱을 렌더 합니다.
root.render(<App />);
```
기본적으로 CRA(create-react-app) 으로 생성하게 되면 createRoot를 사용했습니다만 2025년 2월 14일부터 CRA의 공식 지원이 중단되었습니다.

</details>

동시성 모드에서는 startTransition, useTransition, useDeferredValue 훅을 사용할 수 있습니다.


" [[(todo) 리액트 18의 주요 업데이트 - 동시성 모드, Automatic Batching 등]]