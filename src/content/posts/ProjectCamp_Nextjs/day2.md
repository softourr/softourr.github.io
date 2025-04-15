---
title: "[유데미x스나이퍼팩토리] 프로젝트 캠프 : Next.js 1기 - 2일차"
published: 2024-05-27
description: "호이호이 호이스팅"
image: "../img/NextJS.png"
tags: [JavaScript]
category: ProjectCamp
draft: false
---

# 자바스크립트 기초

## 🐰 복습

async, defer

var let const

## 🐰 04 조건문

조건문은 if문, switch문

```jsx
let name = "Alice";
let age = 25;
console.log(`Name: ${name}, Age: ${age}`); // 템플릿 리터럴을 사용한 출력
```

## 🐰 05 반복문

for..in과 for..of 반복문의 차이점은 in은 배열이나 객체의 *index*를 순차적으로 반복하고 of는 배열 안의 *값*을 받는다.

```jsx
let arr = ["banana", "apple", "orange"];
for (let index in arr) {
  console.log(index); // 0,1,2
}

for (let v of arr) {
  console.log(v);
}
```

[연습문제 - 암스트롱 수 구하기]

100부터 999까지 암스트롱 수를 구하세요

암스트롱 수란?

> 암스트롱의 수는 세 자리의 정수 중에서 각 자리의 수를 세 제곱한 수의 합과 자신이 같은 수를 말합니다. 예를 들어 153 = 1 + 125 + 27 입니다. 이와 같은 수를 암스트롱의 수라고 말합니다.

```jsx
// 풀이1
for (let i = 1; i <= 9; i++) {
  for (let j = 0; j <= 9; j++) {
    for (let k = 0; k <= 9; k++) {
      const total = i * i * i + j * j * j + k * k * k;
      if (total === i * 100 + j * 10 + k) {
        console.log(total);
      }
    }
  }
}
```

```jsx
// 풀이2
for (let i = 100; i <= 999; i++) {
  let tmp = i;
  let total = 0;
  while (tmp != 0) {
    total += (tmp % 10) ** 3;
    console.log(total);
    // tmp /= 10; 소수점 포함 계산
    tmp = Math.floor(tmp / 10); // 내림, 정수계산
  }
  if (total == i) {
    console.log(i);
  }
}
```

:::tip

:::

자바스크립트의 나누기는 기본적으로 소수점을 포함한다. 몫만을 구하고 싶을 때는 내림 함수를 사용한다.

```jsx
const num = 10 / 3;
console.log(num); // 3.3333...
```

자바스크립트의 거듭제곱 방법.

```jsx
// pow는 a^2
pow === a ** 2;
pow === Math.pow(a, 2);
```

## 🐰 06 함수

함수 정의 방법에는 함수 표현식, 화살표 함수, new fuction이 있다.

### 함수 표현식

```jsx
// 익명 함수 표현식
let func = function () {};

// 네이밍 함수 표현식
let func3 = function sum() {};
```

함수 표현식은 *변수에 함수를 할당*한다. 네이밍 함수 표현식은 함수가 자신의 이름(sum)을 가지며 햄수 내부에서 자기 자신을 참조할 수 있다. 그러나 함수 외부에서는 이름으로 함수를 호출할 수 없고, 할당된 변수명을 이용해 호출한다. 네이밍 함수 표현식은 재귀 함수 호출에서 필요하다.

```jsx
let func2 = function sum() {
  console.log("Inside sum function");
  // 함수 내부에서 자기 자신을 참조
  console.log(sum); // [Function: sum]
  // 무한 재귀 호출을 방지하기 위해 조건 추가
  if (someCondition) {
    sum(); // 재귀 호출
  }
};

// 외부에서는 함수 이름(sum)을 직접 호출할 수 없음
// sum(); // ReferenceError: sum is not defined

// 변수명(func2)로 호출 가능
func2(); // "Inside sum function"
```

### 화살표 함수

```jsx
const add = (a, b) => a + b;
add();
```

### 매개변수

```jsx
function sum(a, b) {
  console.log(a + b);
}
sum(10, 20, 30, 40); // 놀랍게도 오류 발생하지 않는다.
```

```jsx
function sum() {
  console.log(arguments[0] + arguments[1]);
}
sum(10); // NaN, not a number, 실행은 된다, "10 + undefined"
```

### 나머지 매개변수 Rest parameters

```jsx
function sum(num1, ...args) {
  let total = 0;
  for (let num of args) {
    total += num;
  }
  console.log(total);
}
sum(10, 20, 30, 40); // 20 + 30 + 40
```

---

## 🐰 07 호이스팅

호이스팅은 자바스크립트 문법에서 선언과 할당으로 구문을 분리해 *선언 부분을 최상위로 끌어올려서 실행*하는 특징이다. 선언이 끌어올려진 var 변수는 undefined가 되어 할당 이전에 참조되면 에러는 발생하지 않지만 undefined가 사용된다. 함수도 호이스팅 가능하다. let과 const는 호이스팅 되지 않는다. (엄밀히 말하면 호이스팅은 되지만 초기화 되지 않는다. 실행 컨텍스트 참고)

함수에서도 호이스팅이 가능한데 함수 선언식은 에러 없이 정상적으로 작동한다. 그러나 함수 표현식은 var, let 둘 다 에러가 난다. 변수 선언은 호이스팅된다.

```jsx
// 함수선언식
printName(); // 윤희

function printName() {
  console.log("윤희");
}
```

```jsx
printName(); // TypeError : printName is not a function

var printName = () => {
  console.log("윤희");
};

// 실제 동작에서 var printName; 호이스팅
```

변수 선언 var printName은 호이스팅되지만 할당되는 이후 부분은 호이스팅되지 않는다. 즉 1번 줄에서 함수는 undefined 상태이다. (선언만 된 상태) 아직 함수가 아니고 변수 선언만 된 상태이므로 함수가 아니라는 typeError이 난다.

```jsx
printName(); // Uncaught ReferenceError: printName is not defined

let printName = function () {
  console.log("윤희");
};
// 실제 동작 let printName; 호이스팅
```

let 키워드로 선언한 경우 마찬가지로 변수 선언은 호이스팅된다. let은 초기화되지 않은 상태에서는 참조할 수 없기 때문에 함수는 아직 초기화되지 않았다는 참조 오류가 발생한다. 초기화되지 않고 선언만 된 let 변수는 `Temporal Dead Zone(TDZ)`에 들어간다.

---

## 🐰 07 컨텍스트

### 실행 컨텍스트 Execution Context

실행 컨텍스트는 자바스크립트가 실행되기 위해 필요한 환경을 제공하는 객체이다.

1. 변수 환경 : 현재 컨텍스트에서 사용 가능한 변수들과 그 값
2. 렉시컬 환경 : 스코프 체인 형성에 사용되는 참조, 변수 환경

> 자바스크립트에서 함수는 각각 독립적인 실행 컨텍스트를 가지며, 이는 함수의 로컬 스코프를 형성한다.

> 함수가 정의된 위치에 따라 함수의 스코프가 결정되며, 이를 렉시컬 스코프(Lexical Scope)라고 합니다.

---

실행 컨텍스트는 내부적으로 **레코드와 아우터로 구성**되어 있다. *레코드는 환경 레코드이고 자바스크립트 코드의 선언문을 기록해두는 공간을 가리키는 객체*이다.

1. 변수 생성 단계
   1. 변수, 함수 선언, 함수 매개변수 생성
   2. 변수가 undefined로 초기화
2. 변수 초기화 단계
   1. 변수가 실제 값으로 초기화
   2. 함수 표현식이나 화살표 함수의 경우 변수 선언만 호이스팅되고 초기화는 런타임=실행에서 이루어진다.
3. 코드 실행 단계
   1. 순차적으로 코드 실행

### 환경 레코드

환경 레코드는 내부적으로 생성 단계와 실행 단계라는 두 가지 단계를 거쳐서 실행된다. 생성 단계에서는 현재 컨텍스트의 선언문을 환경 레코드에 기록한다. 실행 단계는 생성 단계에서 기록된 환경 레코드를 참조해 코드를 실행하거나 업데이트한다.

```jsx
function speak() {
  console.log("12");
}
speak();
console.log("fin");
```

코드의 전체적인 흐름을 보면 코드가 실행되고 자바스크립트 엔진은 “**전역 실행 컨텍스트 Global Execution Context**”를 생성하고 스택에 추가한다. 전역 실행 컨텍스트에는 전역 변수와 함수가 저장된다.

speak 함수가 호출되면 새로운 “**함수 실행 컨텍스트**”가 생성되고 스택에 추가된다. 스택 구조이므로 기본적으로 위에 쌓인다. 여기에는 함수의 변수와 코드가 저장된다.

함수 실행이 완료되면 함수 실행 컨텍스트난 스택에서 제거된다.

전역 실행 컨텍스트의 모든 작업이 완료되면 이도 스택에서 제거된다.

스택이 비어있으므로 자바스크립트 프로그램을 종료한다.

---

```jsx
let hello = "hi";
function speak() {
  let hello = "bye";
  console.log("12");
}
speak();
console.log("fin");
```

let이 변수 중복되는 것처럼 보이지만 그렇지 않다.

<aside>
💡  컨텍스트가 다르기 때문. c언어의 스코프와 유사하다. (일종의 지역변수, 로컬 변수 느낌인듯) 실행 컨텍스트 영역이 다르기 때문에 speak 함수가 실행될 때 콜스택에 새로운 컨텍스트가 생성되고 거기서 hello가 쓰인 후 speak 함수가 끝나면 hello 변수도 사라진다. 전역 컨텍스트에는 여전히 hello가 계속 있다.

</aside>

### 아우터

현재 함수가 블록의 외부 렉시컬 스코프를 참조하는 객체를 가리킨다. 이를 통해 현재 스코프에서 외부에 있는 변수나 함수에 접근할 수 있다.

*스코프 체인*은 변수나 함수를 참조할 때 현재 스코프부터 시작하여 아우터를 따라 외부 스코프로 이동하며 해당 식별자를 찾는 것이다.

```jsx
function outer() {
  let x = 10;

  function inner() {
    console.log(x); // 아우터를 통해 외부 스코프인 outer의 변수 x에 접근
  }

  inner();
}

outer(); // 출력: 10
```

즉 아우터는 스코프 체이닝을 통해 외부 스코프의 변수에 접근 가능하다 == 전역 변수나 로컬 변수에 접근 가능하다.

아우터 객체의 접근 방향은 바깥이기 때문에 모든 변수에 접근 가능하지 않다.

```jsx
function outerFunction() {
  let outerVar = "I'm from outer scope";

  function innerFunction() {
    let innerVar = "I'm from inner scope";
    console.log(outerVar); // 외부 스코프의 변수에 접근 가능
  }

  innerFunction();
  console.log(innerVar); // 오류: innerVar is not defined
}

outerFunction();
```

### callback() 함수

다른 함수에 인수로 전달되는 함수이다. 콜백 함수는 비동기 작업, 이벤트 처리, 배열 작업 등에 사용된다. 코드의 실행 순서를 제어하고 특정 작업이 완료되었을 때 실행할 코드를 정의할 수 있다.

```jsx
function greeting(name) {
  console.log("Hello, " + name);
}

function processUserInput(callback) {
  const name = "Alice";
  callback(name);
}

processUserInput(greeting);
// Hello, Alice 출력
```

```jsx
// 비동기 작업에서의 콜백
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "Alice", age: 25 };
    callback(data);
  }, 1000);
}

function displayData(data) {
  console.log("Data received:", data);
}

fetchData(displayData);
// Data received: { name: 'Alice', age: 25 }
```

**`fetchData`** 함수가 `setTimeout`을 사용하여 1초 후에 데이터를 가져오고 **`callback`** 함수를 호출한다. **`fetchData`** 함수가 호출될 때 **`displayData`** 함수가 콜백으로 전달되어, 1초 후에 데이터를 받아서 출력한다.

<aside>
💡 `setTimeout`은 JavaScript의 내장 함수로, 지정한 시간(밀리초 단위) 후에 코드를 실행한다. 여기서는 1000밀리초(1초) 후에 콜백 함수를 실행

전체적인 흐름은 fetchData가 호출되고, 해당 함수 내부에서 타임아웃이 설정되어 1초 후에 내부 함수를 실행한다. 1초 후 내부 함수가 실행되고 data 객체가 생성된다. 생성된 객체가 콜백으로 전달되고 콘솔에 출력된다.

</aside>

## 🐰 09 객체

const도 이미 할당된 값을 변경하는 건 가능하다

```jsx
const user = {};
user.name = "abc"; // 동적으로 객체에 속성 추가 가능
user.name = "1";

console.log(user.name); // 1

delete user.name;
user.name = "3";

console.log(user.name); // 3

user = {}; // TypeError: Assignment to constant variable.
```

user의 주소값이 변하는 것이 아니기 때문에 가능하다. const는 재할당을 할 수 없다. const 객체의 속성값은 변할 수 있다. 집은 못 바꾸는데 가구는 바꾸는 느낌…

### this

자신을 호출한 객체를 가리키는 키워드.

```jsx
const person = {
  name: "Alice",
  age: 25,
  greet: function () {
    console.log("Hello, my name is " + this.name);
  },
};

person.greet(); // 출력: Hello, my name is Alice
```

**화살표 함수**

화살표 함수는 this 바인딩을 가지지 않는다.

```jsx
const person = {
  name: "Alice",
  age: 25,
  greet: function () {
    const innerFunc = () => {
      console.log("Hello, my name is " + this.name);
    };
    innerFunc();
  },
};

person.greet(); // 출력: Hello, my name is Alice
//
```

---

## 🐰 10 생성자 함수

변수의 생성 키워드 var, let, const를 사용하지 않고 this를 사용한다.

호출할 때는 `new` 를 쓴다.

```jsx
function MakeAnimalObj(
  animalName,
  animalType,
  animalAge,
  animalGender,
  lastVisit
) {
  this.name = animalName;
  this.animalType = animalType;
  this.animalAge = animalAge;
  this.animalGender = animalGender;
  this.lastVisit = lastVisit;
  this.getLastMedical = function () {
    return this.animalName + "는 3달 후 재방문 해야합니다."; // undefined
    // return this.name + "는 3달 후 재방문 해야합니다."; // 곰
  };
}

let animal1 = new MakeAnimalObj("곰", "고양이", 8, "male", "2021-07-09");
console.log(animal1);
console.log(animal1.getLastMedical());

let animal2 = new MakeAnimalObj("나리", "고양이", 12, "female", "2021-07-09");
console.log(animal2);
```

`getLastMedical` 에서 this.animalName은 `undefined`, this.name은 `곰` 이 출력된다.

- 객체를 생성할 때 인자로 animalName을 받는 것이지 현재 객체에는 해당 속성이 없다. name에는 animalName을 인자로 받아 할당된 값이 들어있다.

```jsx
// 함수 연습문제+
function comp(str) {
  let ans = "";
  if (str.length < 1) {
    return "";
  }
  let tmp = str[0];
  let cnt = 1;

  for (let i = 1; i < str.length; i++) {
    if (str[i] === tmp) {
      cnt++;
    } else {
      ans += tmp + cnt;
      tmp = str[i];
      cnt = 1;
    }
  }
  ans += tmp + cnt;
  return ans;
}

const i = "aaabbbccc";
console.log(comp(i)); // 출력: "a3b3c3"

const i2 = "aabbaa";
console.log(comp(i2)); // 출력: "a2b2a2"
```

본 후기는 본 후기는 [유데미x스나이퍼팩토리] 프로젝트 캠프 : Next.js 1기 과정(B-log) 리뷰로 작성 되었습니다.
