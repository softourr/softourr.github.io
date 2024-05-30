---
title: "[유데미x스나이퍼팩토리] 프로젝트 캠프 : Next.js 1기 - 4일차"
published: 2024-05-29
description: "DOM 처리, Promise, async, await"
image: "../img/NextJS.png"
tags: [JavaScript]
category: ProjectCamp
draft: false
---

# 프로젝트 캠프 4일차

### ❇️ 메서드 체이닝

```jsx
class Cal {
  constructor(num) {
    this.num = num;
  }
  add(num) {
    this.num += num;
    return this; // 자기 자신을 리턴
  }
  minus(num) {
    this.num -= num;
    return this;
  }
  result() {
    return this.num;
  }
}
const calc = new Cal(10).add(5).minus(2); // 메서드 체이닝 가능
const calc2 = calc.add(5);
console.dir(calc2);
```

표준 내장 객체는 메서드 체이닝을 사용 가능하다.

```jsx
number.toString().split("").reverse().join("");
```

```jsx
function findLongStr2(str) {
  return str.split(" ").sort((a, b) => b.length - a.length)[0];
} // sort 함수 내림차순 설정
```

ㅤ

## 18. 이벤트 🐣

자바스크립트 이벤트는 `웹 페이지에서 사용자와 상호 작용할 때 발생하는 사건`을 의미합니다. 이벤트는 다양한 사용자 행동(클릭, 키보드 입력, 마우스 이동 등)에 반응하여 실행될 수 있습니다.

<aside>
💡 `이벤트 타겟, 이벤트 타입, 이벤트 핸들러`는 자바스크립트 이벤트 모델에서 핵심적인 역할을 하며, 이를 통해 사용자와의 상호작용을 효율적으로 처리

</aside>

ㅤ

**이벤트 타겟**은 이벤트가 발생한 실제 DOM 요소를 의미합니다. 이벤트 타겟은 이벤트 객체의 `target` 속성을 통해 접근할 수 있다.

**이벤트 타입**은 발생한 이벤트의 종류를 나타낸다. 대표적으로 `click` 이 있다. 이벤트 객체의 `type` 속성을 통해 접근할 수 있다.

**이벤트 핸들러**는 특정 이벤트가 발생했을 때 실행되는 함수이다.

이벤트 등록은 `addEventListener()`을 사용한다.

```jsx
document.querySelector("p").addEventListener("click", function () {
  alert("클릭하셨습니다.");
});
```

```html
<!-- dom.html -->

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="dom.js" defer></script>
  </head>
  <body>
    <button id="myButton">Click Me</button>
    <p></p>
  </body>
</html>
```

script가 head에 있으므로 defer 필요

```jsx
// dom.js
const button = document.querySelector("button");
button.addEventListener("click", function () {
  console.log("버튼이 클릭되었습니다!");
  alert("click");
});
```

ㅤ

### ❇️ NodeList의 forEach()

```jsx
// NodeList 가져오기
const elements = document.querySelectorAll(".example");

// NodeList의 각 요소에 대해 반복 작업 수행
elements.forEach(function (element) {
  // 각 요소에 대해 원하는 작업 수행
  console.log(element.textContent);
});
```

## 20. 콜백함수 🐣

> 매개 변수로 함수를 전달 받아서 , 함수 내부에서 실행

```jsx
function task1() {
  console.log("task1");
}
function task2() {
  setTimeout(() => {
    console.log("task2");
  }, 1000);
}
function task3() {
  console.log("task3");
}
task1();
task2();
task3();
console.log("done");
//task1
//task3
//done
//task2
```

위와 같은 경우 순서를 보장할 수 없다. 그래서 사용하는게 콜백함수

```jsx
// callback hell
function task1(callback) {
  console.log("task1");
  callback();
}
function task2(callback) {
  setTimeout(() => {
    console.log("task2");
    callback();
  }, 1000);
}
function task3() {
  console.log("task3");
}
task1(() => {
  task2(() => {
    task3();
    console.log("done");
  });
});
// 순서대로 잘 실행됨

task1(); // TypeError: callback is not a function
```

콜백 지옥(callback hell)은 콜백 함수를 중첩하여 사용할 때 발생하는 코드의 가독성과 유지보수성을 떨어뜨리는 현상을 말한다.

ㅤ

## 20-1. Promise 🐣

<aside>
💡 자바스크립트의 **`Promise`**는 비동기 작업의 완료 또는 실패를 나타내는 객체

</aside>

**`Promise`** 객체는 보통 생성자 함수로 생성되며, 이 생성자는 두 개의 콜백 함수를 인수로 받는다.

1. **대기(pending)**: 초기 상태, 아직 완료되지 않은 상태.
2. **이행(fulfilled)**: 작업이 성공적으로 완료된 상태.
3. **거부(rejected)**: 작업이 실패한 상태.

**`Promise`** 객체는 **`then`**, **`catch`**, **`finally`** 메서드를 사용하여 비동기 작업의 결과를 처리합니다.

- **`then`**은 이행된 결과를 처리하는 데 사용됩니다.
- **`catch`**는 거부된 결과를 처리하는 데 사용됩니다.
- **`finally`**는 작업 완료 후 항상 실행됩니다.

```jsx
function task1() {
  return new Promise((resolve, reject) => {
    console.log("작업1");
    resolve();
  });
}

function task2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("작업2");
      resolve();
    }, 1000);
  });
}

function task3() {
  return new Promise((resolve, reject) => {
    console.log("작업3");
    resolve("task3 done"); // then으로 매개변수 전달 가능
    // reject("task3 fail")
  });
}

task1()
  .then(() => task2())
  .then(() => task3())
  .then(() => {
    console.log("완료");
  })
  .catch((error) => {
    // reject 처리
    console.error("오류 발생:", error);
  })
  .finally(() => {
    console.log("final");
  });
```

중간에 에러 발생해도 끝까지 수행하도록 하려면 에러가 발생할 것 같은 작업 바로 뒤에 `.catch` 를 붙인다.

```jsx
task1()
  .then(() =>
    task2().catch((error) => {
      console.error("task2 에서 오류 발생:", error);
    })
  )
  .then(() =>
    task3().catch((error) => {
      console.error("task3 에서 오류 발생:", error);
    })
  )
  .then((result) => {
    console.log("완료");
  })
  .catch((error) => {
    console.error("오류 발생:", error);
  })
  .finally(() => {
    console.log("final");
  });
```

ㅤ

## 20-3. async, await 🐣

<aside>
💡 **`async`** 함수는 항상 **`Promise`**를 반환하며, **`await`** 키워드는 **`Promise`**가 해결될 때까지 함수를 일시 정지한다. 비동기 코드의 가독성과 사용성을 개선했다.

</aside>

### **`*async` 키워드\***

**`async`** 키워드는 **함수 선언 앞에 사용**되어 해당 함수가 비동기 함수임을 나타냅니다. 비동기 함수는 항상 **`Promise`**를 반환하며, 이 함수 내부에서 **`await`** 키워드를 사용할 수 있습니다.

### **`*await` 키워드\***

**`await`** 키워드는 **`async`** 함수 내부에서만 사용할 수 있습니다. **`await`**는 **`Promise`**가 해결될 때까지 기다렸다가 그 결과를 반환합니다. **`await`**는 **`Promise`**가 해결되거나 거부될 때까지 함수 실행을 일시 중지하고, 그 후에 실행을 재개합니다.

```jsx
// async function getY() {
//   return new Promise((resolve, reject) => {
//     return "🐣";
//   });
// }
async function getY() {
  throw new Error("error");
  return "🐣";
}

getY()
  .then((bb) => {
    console.log(bb);
  })
  .catch((error) => {
    console.error("오류 발생:", error);
  });
```

```jsx
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function applePicking() {
  await delay(1000); // 1초 지연
  console.log("사과를 땄습니다.");
  return "🍎";
}

async function bananaPicking() {
  await delay(4000); // 1초 지연
  console.log("바나나를 땄습니다.");
  // throw new Error("바나나 따다가 놓침");
  return "🍌";
}

async function pickFruits() {
  try {
    const apple = await applePicking(); // 사과 따기
    console.log(apple); // 🍎 출력

    const banana = await bananaPicking(); // 바나나 따기
    console.log(banana); // 🍌 출력

    console.log("모든 과일을 다 땄습니다."); // 모든 과일 따기 완료
  } catch (error) {
    console.error("과일 따기 중 오류 발생:", error); // 오류 처리
  } finally {
    console.log("과일 따기 작업이 완료되었습니다."); // 항상 실행
  }
}

pickFruits();
```

병렬로 처리하기

```jsx
async function pickFruits() {
  try {
    // applePicking과 bananaPicking을 병렬로 실행
    const [apple, banana] = await Promise.all([
      applePicking(),
      bananaPicking(),
    ]);

    console.log(apple, banana); // 🍎 🍌 출력
    console.log("모든 과일을 다 땄습니다."); // 모든 과일 따기 완료
  } catch (error) {
    console.error("과일 따기 중 오류 발생:", error); // 오류 처리
  } finally {
    console.log("과일 따기 작업이 완료되었습니다."); // 항상 실행
  }
}

pickFruits();
```

`Promise.all`은 편리하지만 서버 성능이 좋아야 함. 자원 소모가 심한 편이다. 그런데 Promise.all로 받아오는 것들 중 하나라도 에러나면 모두 가져오지 않는다. 이럴 때는 `Promise.allSettled` 를 사용해 정상적으로 가져온 것만 가져온다.

ㅤ

## -. 비구조화 할당 🐣

배열이나 객체에서 원하는 값을 추출하여 **변수에 할당**하는 것을 말합니다.

```jsx
const numbers = [1, 2, 3, 4, 5];

// 배열에서 값을 추출하여 변수에 할당
const [first, second, ...rest] = numbers;

console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]
```

```jsx
const person = {
  name: "John",
  age: 30,
  country: "USA",
};

// 객체에서 값을 추출하여 변수에 할당
const { name, age, country } = person;

console.log(name); // 'John'
console.log(age); // 30
console.log(country); // 'USA'
```

## -. 타입스크립트 찍먹🐣

<aside>
💡 타입스크립트는 데이터 타입 명시가 필요함!

</aside>

```jsx
// ts 예제
function sum(a: number, b: number) {
  return a + b; // 리턴 타입도 정의 가능
}
const a = sum(10, 20);
console.log(a);
```

VS코드 폴더 열기

```jsx
 npm init -y // 기본 값으로 npm 초기화
 npm install typescript --save-dev // 개발모드로 설치
 node ./node_modules/typescript/bin/tsc --init  # 타입스크립트 초기화
```

TS > JS 변환 명령어

```jsx
node ./node_modules/typescript/bin/tsc index.ts
```

ㅤ
본 후기는 본 후기는 [유데미x스나이퍼팩토리] 프로젝트 캠프 : Next.js 1기 과정(B-log) 리뷰로 작성 되었습니다.
