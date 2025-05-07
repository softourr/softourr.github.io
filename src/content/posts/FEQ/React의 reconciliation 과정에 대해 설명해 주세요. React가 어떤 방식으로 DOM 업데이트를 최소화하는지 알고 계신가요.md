---
title: "React의 reconciliation 과정에 대해 설명해 주세요. React가 어떤 방식으로 DOM 업데이트를 최소화하는지 알고 계신가요"
published: 2025-05-08
tags: [FEQ, Study]
category: FEQ
draft: false
---
"하루에 하나씩 FE 면접 문제 5월 4일입니다."

## 🔷 React Reconciliation이란?
Reconciliation은 컴포넌트의 상태(state)나 props가 변경되었을 때, React가 이전 Virtual DOM과 새로운 Virtual DOM을 비교(diff)하여 **최소한의 실제 DOM 변경을 수행하는 과정**입니다.

---

## 🔷 DOM 업데이트 최소화 전략 (동작 방식)
### 1. **Virtual DOM 생성**

- React는 `render()` 함수 호출 시 새로운 **Virtual DOM 트리**를 생성합니다.
- 이는 실제 DOM의 메모리 상 복제본으로, 변경 여부를 빠르게 확인할 수 있는 객체입니다.
    

### 2. **Diff 알고리즘 수행**

React는 두 개의 Virtual DOM을 비교하며 효율적인 diffing을 합니다. 이 때 다음과 같은 가정을 통해 성능을 높입니다:

#### 1) 같은 타입의 노드는 그대로 비교
```jsx
<div> → <div>      ✅ OK (속성 비교만)
<div> → <span>     ❌ 완전히 새로 교체

```
#### 2) key를 이용한 자식 요소 비교 최적화
- 리스트 렌더링에서 `key`가 중요합니다.
    
- `key`가 같으면 이전 노드를 재사용하고, 다르면 새로 만들고 이전 것은 제거합니다.
    
```jsx
<ul>
  <li key="a">A</li>
  <li key="b">B</li>
</ul>

```
→ 만약 순서만 바뀌면 `key`를 통해 React는 실제 DOM을 건드리지 않고 가상 노드만 교환합니다.

### 3. **Batched Update 수행**

- 변경된 최소 단위만 실제 DOM에 적용합니다.
    
- React는 변경사항을 모아서 한 번에 처리(= batching)함으로써 렌더링 횟수를 줄입니다.
    

---

## 🔷 실제 DOM 변경 예시
```jsx
return (
  <div>
    <h1>Hello</h1>
    <p>{this.state.text}</p>
  </div>
)
```
- `this.state.text`가 바뀌면,
    
    - React는 이전 Virtual DOM과 비교하여 `<p>` 태그만 다시 그리면 된다는 걸 알아냄
        
    - `<h1>`이나 `<div>`는 건드리지 않음 → **최소 DOM 조작**

---

## 🔷 요약

|단계|설명|
|---|---|
|1. 상태 변경|상태(state)나 props가 바뀌면 render 호출|
|2. Virtual DOM 생성|새로운 Virtual DOM 트리 생성|
|3. Diff 알고리즘|이전과 비교하여 변경점 계산|
|4. 최소 DOM 업데이트|실제 DOM에 최소한의 변경 수행|