---
title: "[유데미x스나이퍼팩토리] 프로젝트 캠프 : Next.js 1기 - 5일차"
published: 2024-05-30
description: "타입스크립트, 리액트, 컴포넌트"
image: "../img/NextJS.png"
tags: [Typescript, React]
category: ProjectCamp
draft: false
---

:::note[REVIEW]

1. 오늘의 이모지는 파인애플! 마트에서 어제 삼.
2. 오늘은 가지우삼겹 솥밥을 먹었다. 푸짐하고 굿
3. 제네릭이나 인터페이스, type 사용 연습이 필요할 듯;; 타입스크립트…어색한걸…화살표 함수도..
   :::

# 프로젝트 캠프 5일차

# 타입스크립트🍍

node_modules와 package-lock.json 는 npm이 관리하기 때문에 직접 변경 절대 금지. 항상 git ignore에 등록해두기

```jsx
npx tsc // tsconfig.json 수정 후 해당 명령어로 ts > js 변환(src와 dist 폴더 생성)
```

타입스크립트에서 추가된 기본 타입

```jsx
string / number / boolean / object / Array / tuple / any / null / undefined;
```

**타입 추론 : 타입스크립트가 자동으로 타입을 추론**

```tsx
// 타입스크립트에서 사용할 수 있는 타입
// 타입 연산자 - | &
const a: string = "hi";
const b: number = 30;
const c: boolean = true;
const d: null = null;
const e: undefined = undefined;
const f: symbol = Symbol("symbol");

const h: number[] = [1, 2, 3];
const i: Array<string> = ["a", "b", "c"];
const x: Array<string | number> = [10, "apple", "banana", 20];

const j: [string, number] = ["hello", 10]; // tuple
const k: { name: string; age: number } = { name: "Alice", age: 25 };
const q: (x: number, y: number) => number = (x, y) => x + y;
```

### ❇️ 옵셔널 파라미터

타입스크립트에서 함수의 매개변수를 옵션으로 설정하려면 매개변수 뒤에 **`?`**를 붙이면 됩니다. 이렇게 하면 해당 매개변수가 전달되지 않았을 때 **`undefined`**로 간주됩니다. 이를 통해 **함수 호출 시 매개변수를 생략할 수 있습니다.**

+.(a: number, b: number = 0)처럼 디폴트값을 줄 수도 있다.

```tsx
function sum(a: number, b: number): number {
  return a + b;
}
sum(10); // 오류: 2개의 인자가 필요합니다.

function sum(a: number, b?: number): number {
  return a + (b ?? 0); // b가 undefined일 경우 0을 더합니다.
}

console.log(sum(10)); // 10
console.log(sum(10, 5)); // 15
```

### ❇️ type 키워드

**`type`** 키워드를 사용하여 타입 별칭(type alias)을 정의할 수 있습니다. 타입 별칭은 기본 타입, 복합 타입, 유니언 타입, 인터섹션 타입 등을 더 간결하게 표현할 수 있게 해줍니다.

```tsx
type GreetFunction = (a: number, b: string) => string;

const greet: GreetFunction = (a, b) => {
  return `Hello, ${b}! You have ${a} new messages.`;
};

console.log(greet(5, "Alice")); // Hello, Alice! You have 5 new messages.
```

```tsx
type Person = {
  name: string;
  age: number;
  gender?: string; //옵션이므로 파라미터 생략해도 괜찮음
};

// 타입을 준수하는 객체 생성
const person1: Person = {
  name: "Alice",
  age: 30,
};
```

타입은 객체에서 속성 구분을 `;`으로 한다. `,` 를 쓰지 않는다.

```tsx
type Person = {
  name: string;
  age: number;
  gender?: string;
};

type myWorker = {
  readonly company: string;
  doWork: () => void;
};

type Employee = Person & myWorker;

// 올바른 속성을 포함하여 employee 타입의 객체 생성
const temployee: Employee = {
  name: "Alice",
  age: 25,
  company: "Example Inc.",
  doWork: () => {
    console.log("Working...");
  },
};
```

### ❇️ 인터페이스

코드의 구조를 정의하고 타입을 명시하는 역할을 합니다. 즉, 어떤 객체가 해당 인터페이스를 따르는지를 명시적으로 선언합니다.

```tsx
// Person 인터페이스 정의
interface Person {
  name: string;
  age?: number; // readonly도 가능
}

interface Person {
  redefine: number;
}

// Person 인터페이스를 준수하는 객체 생성
const user: Person = {
  name: "Alice",
  age: 30,
};

// Person 인터페이스를 준수하지 않는 객체는 오류를 발생시킴
// const user2: Person = {
//   name: "Bob",
//   age: "30" // 'age'의 값이 문자열이기 때문에 오류 발생
// };
```

```tsx
interface Person {
  name: string;
  age?: number; // readonly도 가능
}
// Person 인터페이스를 준수하는 객체 생성
const user: Person = {
  name: "Alice",
  age: 30,
  redefine: 1,
};

interface Person {
  redefine: number;
}
```

-.인터페이스의 재정의가 객체 위치에 영향을 미치지 않습니다. 예를 들어, 인터페이스를 재정의하기 전에 이미 정의된 객체가 있더라도 해당 객체는 변경되지 않습니다. 즉, 객체가 선언된 위치와 인터페이스가 재정의된 위치는 서로 독립적입니다.

ㅤ

-.여러 인터페이스를 `| &` 를 사용해 선택적으로 속성을 사용하게 하거나 모두 필요하도록 정의할 수 있다.

ㅤ

```tsx
interface Person {
  name: string;
  age?: number;
  gender: "male" | "female" | string;
}
// Person 인터페이스를 준수하는 객체 생성
const user = {
  name: "Alice",
  age: 30,
  gender: "male",
};

const user2: Person = user;
// 오류 왜? 젠더가 현재 string로 자동추론된 상태이므로
// sol) '|string 를 추가한다.
```

```tsx
interface IUser {
  name: string;
  age: number;
}

interface IUserAddress extends IUser {
  // 부모 속성 사용 가능
  zipcode: string;
  address: string;
}
const user: IUserAddress = {
  name: "jack",
  age: 25,
  zipcode: " 12345",
  address: "seoul",
};
// 2
interface IWorker {
  company: string;
  pos: number;
}
const user: IUserAddress = {
  name: "jack",
  age: 25,
  zipcode: " 12345",
  address: "seoul",
  company: "han",
  pos: 123,
};
```

객체는 인터페이스로 다른 자료형은 타입으로 쓰는게 제일 대중적이긴 함

```tsx
interface SignupUser {
  name: string;
  age: number;
  gender: string;
  address: string;
}

interface IUser {
  name: SignupUser["name"]; // 이런 방법도 가능, 상속처럼
  age: SignupUser["age"];
}

interface IUser2 extends Pick<SignupUser, "name" | "age"> {}
type TUser = Pick<SignupUser, "name" | "age">;

interface IUserO extends Omit<SignupUser, "gender" | "address"> {}
type TUserO = Omit<SignupUser, "gender" | "address">;
```

Pick 메서드를 사용해 특정 인터페이스의 지정된 속성을 가져올 수 있다.

Omit 메서드를 이용하면 해당 속성을 제외한 나머지 속성을 가져올 수 있다.

```tsx
// 덧셈 함수 선언식
function add(a: number, b: number): number {
  return a + b;
}
type Tnn = (a: number, b: number) => number;

// 덧셈 함수 표현식
const addExp: Tnn = function (a, b) {
  return a + b;
};
// 화살표 함수
const addArr: Tnn = (a, b) => a + b;
```

함수 선언식은 타입을 생략할 수 없지만, 함수 표현식은 가능

### ❇️ 제네릭 함수

제네릭 함수를 사용하면 **함수를 호출할 때마다 다른 유형의 매개변수를 사용**할 수 있습니다.

```tsx
function getSize1(values: number[] | string[] | (number | string)[]) {
  return values.length;
}
function getSize<T>(values: T[]): number {
  return values.length;
}

getSize<number>([1, 2, 3]);
getSize(["1", "2", "3"]); // 타입 자동추론
getSize([1, 2, 3, "1", "2", "3"]);
```

```tsx
function getSize<T>(values: T[] | T): number {
  if ("string" == typeof values || Array.isArray(values)) {
    return values.length;
  }
  return 0;
}

getSize<string>("Hello, world");
```

```tsx
// 화살표 함수

type getSize2<T> = (values: T[] | T) => number;

const arrFunc: getSize2<T> = (values) => {
  return "string" === typeof values || Array.isArray(values)
    ? values.length
    : 0;
};
```

```tsx
type Tuser<T> = {
  name: string;
  age: number;
  likeFood: T;
};

interface IUser<T> {
  name: string;
  age: number;
  likeFood: T;
}
const person1: Tuser<string[]> = {
  name: "hoo",
  age: 23,
  likeFood: ["banana", "apple"],
};
```

### ❇️기타 유틸리티

```tsx
// Partial
type Person{
    name : string;
    age:number;
    address : string;
}
const person1 : Partial<Person> = {
    name : "kk",
    age : 22,
    address : "NY",
}
```

```tsx
interface User {
  id?: number;
  name?: string;
  email?: string;
}

type RequiredUser = Required<User>;

function printUser(user: RequiredUser) {
  console.log(`ID: ${user.id}`);
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
}

const user: RequiredUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

printUser(user); // 모든 프로퍼티가 존재하므로 오류 없음

// 다음 객체는 오류를 발생시킵니다.
const incompleteUser: RequiredUs;
```

```tsx
// Pick
type TUser = Pick<Person, "name">;
// Omit
type TUsername = Omit<Person, "address">;
// Record
const person2: Record<string, string | number> = {
  name: "ja",
  age: 22,
  address: "seoul",
};
type Scores = Record<string, number>; // 키가 문자열이고 값이 숫자인 객체 타입
```

`Pick` 는 기존 타입에서 특정 속성만 선택해 새로운 타입을 생성한다.

`Omit` 는 기존 타입에서 특정 속성을 제외한 새로운 타입을 생성한다.

`Record` 는 특정 키 타입과 값 타입을 가지는 객체 타입을 생성한다. 주로 매핑 타입을 정의

```tsx
// 실습 정답
interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}
// todos 배열 정의
const todos: ITodo[] = [];

const addTodo = (text: string) => {
  const todo = {
    id: todos.length + 1,
    text,
    completed: false,
  };
  todos.push(todo);
};

const removeTodo = (id: number) => {
  const findIndex = todos.findIndex((todo) => todo.id === id);
  todos.splice(findIndex, 1);
};

const toggleTodo = (id: number) => {
  const find = todos.find((todo) => todo.id === id);
  if (find) find.completed = !find.completed;
};
```

# REACT

## **NPM, NPX, YARN** 🍍

### ❇️ **NPM(Node Package Manager)**

Node.js의 기본 패키지 관리자입니다. Node.js 패키지 생태계를 관리하고, JavaScript 라이브러리 및 모듈을 설치, 업데이트, 삭제하는 데 사용됩니다. 로컬 또는 전역(-g)으로 설치할 수 있습니다.

```jsx
npm install <package-name>  # 로컬 설치
npm install -g <package-name>  # 전역 설치

npm run <script-name> # package.json 파일에 정의된 스크립트 실행

```

**`package.json`** 및 **`package-lock.json`** 파일을 통해 프로젝트의 의존성을 관리합니다.

### ❇️ **NPX (Node Package Executor)**

NPM 5.2.0 이후에 포함된 도구로, **패키지를 설치하지 않고도 일시적으로 실행**할 수 있게 해줍니다. Node.js를 설치하면 자동으로 설치됩니다. 주로 전역 설치 없이 특정 패키지를 실행하고자 할 때 유용합니다.

```jsx
npx <package-name> # 패키지를 일회성으로 실행
npx <package-name>@<version> # 특정 버전의 패키지 실행

```

### ❇️ **Yarn**

Yarn은 Facebook에서 개발한 JavaScript 패키지 관리자입니다. NPM과 유사한 기능을 제공하면서 성능과 보안, 신뢰성을 개선한 도구입니다.

```jsx
yarn add <package-name>  # 로컬 설치
yarn global add <package-name>  # 전역 설치
yarn run <script-name> # package.json에 정의된 스크립트를 실행

```

## Node.js 패키지 버전 🍍

![1](./imgDay5.png "day5-1")

순서대로 주요 릴리즈 / 새로운 기능 추가 / 버그 수정 / 옵셔널

## 리액트 프로젝트 생성하기 🍍

```jsx
npm create vite@latest
npm create vite@latest my-vue-app -- --template react // react-ts
```

## JSX, TSX 등 🍍

JSX는 리액트 애플리케이션에서 UI를 작성할 때 사용되는 JavaScript와 XML을 결합한 문법이며, TSX는 TypeScript와 JSX를 결합하여 정적 타입 검사를 포함한 리액트 애플리케이션을 개발할 때 사용됩니다.

<aside>
💡 SWC(Speedy Web Compiler)란?
자바스크립트 프로젝트의 컴파일과 번들링에 모두 사용될 수 있는, Rust라는 언어로 제작된 빌드 툴입니다. 기존에 사용하던 Babel을 대체할 수 있으며, 최근 Next.js 팀에서도 권장하고 있어 주목 받고 있는 빌드 툴입니다.
Next.js 공식 팀에서는 SWC를 사용하면 리프래시는 최소 3배, 빌드는 최소 5배 더 빠른 속도로 할 수 있다고 공식 발표

</aside>

### ❇️ package.json

_"scripts"_

npm 스크립트 명령어들을 정의

_"dependencies”_

프로젝트가 의존하는 라이브러리들

“_devDependencies"_

개발 시에만 필요한 라이브러리들

## 리액트 장점

### ❇️ DOM과 가상돔

기존의 DOM은 하나를 수정하면 그와 연결된 모든 DOM을 업데이트해야 했다. 그래서 DOM 트리가 깊을수록 작업 비용이 커진다.

이를 대비하기 위해 `가상돔` 을 만든다. 가상돔은 기존의 DOM을 복사해 리액트 내부 메모리에 저장한다. 변경사항이 생기면 가상돔에서 변경 사항을 처리 후 실제 DOM과 비교해 변경된 부분만 업데이트한다. 기존 방법보다 작업 비용이 낮아진다.

변경 사항이 일어날 때마다 전체 DOM을 다시 그리는 대신, 이 가상 DOM에서 변경 사항을 먼저 처리하고, 그 후에 실제 DOM에 적용하는 방법을 쓴다.

![1](./imgDay5-2.png "day5-2")

- `디핑(diffing)`은 가상 DOM과 실제 DOM 간의 변경 사항을 비교하고 식별하는 프로세스를 말합니다. 이 과정에서 가상 DOM에서 발생한 변경 사항을 찾아내고, 해당 변경 사항을 반영하여 실제 DOM을 업데이트
- `배치 업데이트`는 변경 사항을 실제 DOM에 적용하는 과정을 말합니다. 디핑을 통해 변경된 부분을 식별한 후, 이를 반영하여 DOM을 업데이트하는 과정을 의미

### ❇️ CSR VS SSR ⭐

**CSR (Client-Side Rendering - 클라이언트 사이드 렌더링)**

초기 페이지 요청 시 서버는 빈 HTML 파일을 반환하고, 클라이언트에서 JavaScript를 사용하여 동적으로 데이터를 가져와 렌더링

**SSR (Server-Side Rendering - 서버 사이드 렌더링)**

초기 페이지 요청 시 서버는 완전한 HTML 페이지를 생성하여 반환하므로, 클라이언트는 별도의 렌더링 작업이 필요하지 않습니다.

## 컴포넌트🍍

### ❇️ HMR

```tsx
[vite] hmr update /src/App.tsx // 자동 업데이트, 페이지 새로고침 필요없
```

HMR은 "Hot Module Replacement"의 약자로, 개발자가 애플리케이션을 개발하는 동안 코드 변경을 실시간으로 반영할 수 있는 기술입니다. 이는 코드를 수정할 때마다 전체 페이지를 **새로고침할 필요 없이** 변경된 모듈만 업데이트하여 빠르게 반영할 수 있도록 합니다.

### ❇️ JSX 규칙

> JSX는 Javascript XML의 약자로 자바스크립트를 확장한 문법

-. 컴포넌트의 첫글자는 항상 대문자로 한다.

-. React Fragment는 **`<></>`** 구문으로도 사용할 수 있다.

-. 카멜케이스를 사용한다.

```tsx
<button onClick={handleClick}>Click me</button>
```

본 후기는 본 후기는 [유데미x스나이퍼팩토리] 프로젝트 캠프 : Next.js 1기 과정(B-log) 리뷰로 작성 되었습니다.
