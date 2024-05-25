---
title: "[유데미x스나이퍼팩토리] 프로젝트 캠프 : Next.js 1기 - 사전직무교육 1일차"
published: 2024-05-25
description: "시작된 9-6 life..."
image: "../img/NextJS.png"
tags: [ProjectCamp]
category: JavaScript
draft: false
---

:::note[REVIEW]

프론트엔드 배우려고 신청함. 혼자하니 게을러서 안되겠다.

덕분에 미루고 미뤘던 기술 블로그 구축했다 우하하. 잔디 열심히 깔아야지

오랜만에 9-6하려니 굉장히 피곤했지만 열심히 사는 느낌~
:::

.

.

# ☁️ JavaScript 기초 ☁️

# 🦅 script 위치, async, defer

- js 파일은 script 사이에 작성한다.

script 위치는 크게 2가지로 사용

1. head 사이 : 첫 화면 로딩에 시간 걸리는 문제
2. body 사이 : 위의 문제 대책
   - 바디 태그에 스크립트 작성시 단점 : interaction 실행이 나중에 된다.

.

- \<script> 태그는 html을 파싱하다가 스크립트를 만나면 해당 스크립트를 다운로드하고 실행할 때까지 html 파싱을 멈춘다.
  - 스크립트 파일이 클 경우 **P.첫 화면 로딩에 시간 걸림**

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="./index.js"></script>
  </head>
  <body></body>
</html>
```

sol1 ) async 사용 : html 파싱과 병렬로 진행

- async 속성을 사용하면 스크립트는 

  html 파싱과 병렬

  로 다운로드

  - 다운로드가 완료되면 즉시 실행

- 단점 : 여러 async 스크립트일 경우 실행 순서가 보장되지 않는다.

```javascript
// async 사용 - body 태그 사이
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script async src="./index1.js"></script>
    <script async src="./index2.js"></script>
    <script async src="./index3.js"></script>
  </body>
</html>

```

.

```javascript
// async 사용 - head 태그 사이
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script async src="./index1.js"></script>
    <script async src="./index2.js"></script>
    <script async src="./index3.js"></script>
  </head>
  <body>
  </body>
</html>

```

sol2) defer : 병렬진행 + 실행은 파싱 이후

- 스크립트는 html 파싱과 병렬로 다운로드
- 실행은 html 파싱이 완료된 후 스크립트 실행
  - 즉 스크립트의 실행 순서 보장됨
  - 단점 : interaction=DOM 조작이 느려진다.

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script defer src="./index.js"></script>
  </head>
  <body></body>
</html>

```

# 🦅 var let const

예약어/키워드

- 변수 선언별 차이
  - var - 변수명 중복, 재할당 가능
  - let - 변수명 중복 불가, 재할당 가능
  - const - 변수명 중복 불가, 재할당 불가능

# 🦅 **자료형(DataType)**

```
-기본자료형
						숫자,문자열,논리,특수자료(undefined/null),심볼
참조 자료형
						객체,배열, 함수

```

```javascript
let f1 = ["apple","banana"];
let f2 = f1;
console.log(f1 === f2); // true
console.log(type of f2); // object, 사실은 배열인데 버그임

```

# 연산자

“==”과 “===”

- 동등(==) : 피연산자들의 데이터가 같으면 참을 반환합니다. (자료형 검사 x)
  - 암시적 형변환
- 일치(===) : 피연산자들의 데이터가 같으면 참을 반환합니다. (자료형 검사 o)

```javascript
//삼항연산자
const a = "10" ? "hi" : "bye";
console.log(a);
// "hi"
// true, 0/undefined/null이 아니면 참으로 봄

```

- &&(and) : 앞expr1이 거짓이면 뒤는 안본다.
  - 뒤에 문법 오류여도 정상작동
  - expr1 && expr2

.

본 후기는 본 후기는 [유데미x스나이퍼팩토리] 프로젝트 캠프 : Next.js 1기 과정(B-log) 리뷰로 작성 되었습니다.