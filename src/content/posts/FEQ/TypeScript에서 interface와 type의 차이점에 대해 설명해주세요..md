---
title: "TypeScript에서 interface와 type의 차이점에 대해 설명해주세요."
published: 2025-04-23
tags: [FEQ, Study]
category: FEQ
draft: false
---
> 면접 질문 복기합니다.

1. 정의 방식
2. 확장
3. 선언 병합

- `interface`는 **객체 타입 정의에 특화**되어 있으며, **`extends`로 확장**하고 **선언 병합**이 가능합니다.
- `type`은 **모든 타입 정의에 유연**하며, **인터섹션(`&`)으로 확장**하고 **병합은 불가능**합니다.
> 인터페이스는 객체 타입 정의에 특화되어 있고, `extends`로 상속 및 확장이 가능합니다.  
타입 별칭(alias)은 객체 외에도 유니온, 튜플 등 다양한 타입 정의에 유리하며, `&`로 확장합니다.  
또한 인터페이스는 선언 병합이 가능하지만, 타입 별칭은 동일 이름 중복 선언 시 오류가 발생합니다.
### 선언 병합
#### ✅ `interface`는 **선언 병합 가능**
```typescript
interface User {
  name: string;
}

interface User {
  age: number;
}

// 병합됨!
const user: User = {
  name: "철수",
  age: 25,
};

```
> 동일한 이름으로 여러 번 선언해도 자동으로 **하나로 합쳐짐**.

#### ❌ `type`은 **선언 병합 불가능**
```typescript
type User = {
  name: string;
};

type User = {
  age: number;
};

// ❌ 오류: Duplicate identifier 'User'.

```
> `type`은 동일한 이름으로 또 정의하면 에러 남.


##  `interface`가 복잡한 타입 조합에 불편한 이유
### ✅ 유니온 타입(`|`), 튜플, 교차 타입(`&`) → `interface`에서는 불가능하거나 제한적
```typescript
// 복잡한 타입 예시: A | B
type ApiResponse = 
  | { status: "success"; data: string }
  | { status: "error"; errorCode: number };

// 또는 튜플
type Point = [number, number];

// 또는 유틸리티 타입 활용
type WithTimestamp<T> = T & { createdAt: Date };

```
이런 건 **모두 `type`에서만 가능**하고, `interface`에서는 못 한다.

#### ❌ `interface`는 유니온, 튜플처럼 **비객체 타입**을 정의할 수 없음
```typescript
// ❌ 이런 건 interface로 불가능
interface Something = string | number; // 🚫 안 됨
```