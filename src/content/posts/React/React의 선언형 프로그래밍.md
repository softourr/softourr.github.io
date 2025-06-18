---
title: "React의 선언형 프로그래밍"
published: 2025-06-19
tags: [React, Study]
category: React
draft: false
---
# 선언적 프로그래밍?
### React의 선언적 프로그래밍
**"어떻게"보다 "무엇"을 나타내는지 표현한다.**

뭔소리냐면

- 일단 어떻게 : 명령형 프로그래밍
- 무엇을 : 선언적 프로그래밍

명령형 프로그래밍은 예시로 뭐 A 기능을 구현해야 한다. 그렇다면 어떻게 구구절절~해서 구현했다치면 선언형 프로그래밍은 A 기능을 구현해야 한다면 이 템플릿 맞춰서 구현되도록 미리 선언해두는?

**일종의 추상화시킨 코드 작성법이라고 이해**

---

리액트 공식 문서에 리액트 자체가 선언적 프로그래밍 방식이라고 한다. 어떤 점이 선언적 프로그래밍인가?

**상태에 따라 UI가 어떤 모습이어야 하는지만 선언하면, 그 상태가 변경됐을 때 리액트가 알아서 어떻게 바뀌어야 할지 처리해준다.**

공식 문서에 이런 말이 있는데 예제를 생각해보자 버튼 클릭을 구현해보자

```javascript
// 바닐라 JS
const button = document.createElement('button');
button.textContent = 'Click me';
button.addEventListener('click', () => {
  button.textContent = 'You clicked me!';
});
document.body.appendChild(button);
```

이건 명령형 스타일이다. 모든 절차를 다 명시했다. 버튼 DOM도 만들고, 리스너=이벤트 핸들러도 설정하고 클릭하면 UI도 변한다.

```javascript
// 리액트
import { useState } from 'react';

function MyButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <button onClick={() => setClicked(true)}>
      {clicked ? 'You clicked me!' : 'Click me'}
    </button>
  );
}
```

리액트는 어떤가? 클릭 여부에 따른 상태값 1개와 그에 따른 UI를 설정한다. !역할 분리

명령형에서는 UI와 상태의 연결이 없고 UI를 직접 조작한다는 차이점이 있다. 즉 상태값을 변경해야 할 때 명령형은 DOM을 직접 조작해서 UI를 변경해야 한다. 코드가 점점 커져 대규모로 갈수록 유지보수 측면에서 엄청난 차이가 발생한다.

- 상태가 바뀌었네?
- 아 그럼 그에 따른 UI가 어디있지…이것도 바꿔줘야겠다
- 반복

선언형은 상태값 따로 관리, 상태값에 따른 UI를 별도로 JSX를 사용해 구현하기 때문에 상태가 바뀌면 리액트가 자동으로 DOM을 리렌더링해준다.

- 상태가 바뀌었네?
- 리액트 : UI 바꿔줄게~

---

### 선언적 프로그래밍은 그래서 왜 쓰냐

가독성이나 유지보수에 좋다. 요구사항이 바뀌어도 한 두 군데만 수정하면 돌아가도록 추상화해두었기 때문임. 이는 재사용성에도 영향있고 디버깅할 때도 좋음. 결국 알아먹기 쉬운 코드라는 얘기다.

그런데? 사실 초반부터 너무 추상화해두면 오히려 안좋을 수 있다. 규모를 보고 적당한 수준의 추상화가 중요하다.

---

## 정리

그렇다면 리액트에서 컴포넌트 설계할 때 다음의 원칙을 기억

**" 표현은 단단하게, 구조는 느슨하게 "**

### 1. 상태와 UI의 단단한 결합? 유지보수가 어렵다.

#### 나쁜 예시

```javascript
const [count, setCount] = useState(0);
const [message, setMessage] = useState('');

return (
  <div>
    <h3>❌ 나쁜 예시 (강한 결합)</h3>
    <button onClick={() => {
      setCount(count + 1);
      if (count + 1 > 5) setMessage('너무 많이 클릭했어요!');
      else if (count + 1 > 3) setMessage('조금 더!');
      else setMessage('');
    }}>
      클릭 ({count})
    </button>
    <p>{message}</p>
  </div>
);
```

**왜 나쁜가 어디가 나쁜가?**

1. 핸들러 안에서 상태 여러개 동시 조작
2. 핸들러 안에서 상태를 직접 조작
3. UI 로직이 핸들러와 구분 안됨, 클릭했을 때 무엇을 하는가 + 어떤 메시지 보여주는가가 섞임 분리해야함.

#### 좋은 예시, 느슨한 결합

```javascript
const [count, setCount] = useState(0);

const getMessage = (count) => {
  if (count > 5) return '너무 많이 클릭했어요!';
  if (count > 3) return '조금 더!';
  return '';
};

return (
  <div>
    <h3>✅ 좋은 예시 (느슨한 결합)</h3>
    <button onClick={() => setCount(count + 1)}>
      클릭 ({count})
    </button>
    <p>{getMessage(count)}</p>
  </div>
);
```

**왜 좋은가?**

1. 이벤트 핸들러가 순수성 보장됨 > 순수성은? 입력이 같다면 항상 같은 결과 출력. 더 직관적으로 하면 한 가지 일만 해야 함 (사이드 이펙트 발생하지 않게)
2. UI 로직 함수로 따로 분리.

### 2. 선언적 사용법으로 추상화 (hook으로 분리, 컴포넌트로 분리 등)

UI는 이 경우에는 이거 보여준다 선언, 복잡한 상태는 훅에 구겨넣어 숨기자

#### 기존 명령형

```javascript
const [isOpen, setIsOpen] = useState(false);
<button onClick={() => setIsOpen(true)}>모달 열기</button>
{isOpen && <Modal onClose={() => setIsOpen(false)} />}
```

#### 선언적 방식

```javascript
const modal = useModal();
<button onClick={() => modal.open(<MyComponent />)}>모달 열기</button>

const counter = useCounter(); 
<button onClick={counter.increment}>클릭 ({counter.count})</button> 
<p>{counter.message}</p>
```

**코드 뭐가 좋냐?**

- 모달을 열면 보여줄 컴포넌트, UI만 설정
- 상태 관리 로직을 훅에 넣고, 컴포넌트는 무엇을 할지 = 어떤 UI 보여줄지만 설정.

---

## 대표적 선언적 프로그래밍 : Error Boundary

```javascript
// 에러 바운더리
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) return <p>에러 발생!</p>;
    return this.props.children;
  }
}

// 에러 발생 컴포넌트
function BuggyButton() {
  const [count, setCount] = useState(0);
  
  if (count >= 3) throw new Error('에러!');
  
  return <button onClick={() => setCount(count + 1)}>클릭 ({count})</button>;
}

// 사용
<ErrorBoundary>
  <BuggyButton />
</ErrorBoundary>
```

**에러 바운더리가 선언적 프로그래밍?**

- 컴포넌트: 에러 상태 감지 + 에러 던지기 액션만 수행
- 에러 바운더리: 에러 신호를 받아 해당 UI만 결정
- 상태와 UI 완전 분리: 에러 발생(상태)과 에러 화면(UI)이 독립적
- 역할 분리: 각자 하나의 책임만 담당

---

## 요약

**SRP로 역할 분리**

1. 어떤 UI 보여줄지
2. 이벤트 핸들러 순수성 유지
3. 상태 변화 관리



참고
- [선언적 프로그래밍 ? 리액트 ?](https://velog.io/@yeonbot/%EC%84%A0%EC%96%B8%EC%A0%81-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EB%A6%AC%EC%95%A1%ED%8A%B8) 
- [선언적인 코드 작성하기](https://toss.tech/article/frontend-declarative-code)
- [리액트의 선언현 에러 처리(에러 바운더리)](https://velog.io/@bnb8419/ErrorBoundary-%EA%B8%B0%EB%B3%B8)
