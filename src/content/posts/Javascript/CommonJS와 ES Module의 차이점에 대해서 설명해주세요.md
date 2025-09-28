---
title: "CommonJS와 ES Module의 차이점에 대해서 설명해주세요"
published: 2025-09-25
tags: [Javascript, Study]
category: Javascript
draft: false
---

둘 다 자바스크립트에서 모듈을 관리하고 불러오는 방식이다. CJS는 노드 초창기부터 사용해온 방식으로 require 키워드로 불러오고 module.exports로 내보낸다. 모듈을 동기적으로 로딩한다. 
- 모듈을 동기적으로 로딩한다는 건 해당 모듈을 다 가지고 오고 난 다음에야 다음 코드가 실행된다는 의미다. 서버 환경에서는 파일 접근이 빠르기 때문에 동기적 방식이 괜찮다. 그러나 브라우저는 네트워크 환경이기 때문에 다소 느릴 수 있다.

ESM은 ES6에서 표준으로 도입된 방식으로 가장 익숙한 import, export를 쓴다. 브라우저 환경에서 비동기적으로 모듈을 로드할 수 있어 좋고 정적 분석이 가능하다. 트리 쉐이킹 가능하다.
- 정적분석은 코드를 실행안해도 소스코드만 보고도 전체 흐름 파악이 가능한 것. 왜? 보통 import, export는 파일 최상단에 위치하기 때문에 이게 가능하다.
- 같은 흐름으로 트리쉐이킹도 import, export가 파일 최상단에 위치하기 때문에 사용하지 않는 코드를 번들러가 빌드과정에서 제거해버릴 수 있음 > 트리 쉐이킹 가능
	- 엥 그럼 CJS는 그게 안되나?
		- ㅇㅇ

CJS는 정적분석이 안됨
- require는 런타임 함수 호출이라는 점. 이는 함수처럼 함수 내부나 코드 여기저기서 사용이 가능하다. import처럼 최상단에 박혀있지 않다는 점.
- export도 마찬가지.
	```js
	if (useMath) {
		const math = require('./math.js');  // 조건문 안에서도 가능
	}
	function loadModule(name) {
	  return require(name);  // 동적으로 문자열 받아서 로딩 가능
	}
	
	if (process.env.NODE_ENV === 'production') {
		module.exports = require('./prod-config.js');
	}
	```
	- 그니까 둘다 동적으로 결정된다. 런타임에서야 확정된다.
		- 이러면 번들러가 트리쉐이킹할 때 판단이 어려움


- **CJS**는 런타임에 `require`로 모듈을 동적으로 불러온다.
- **ESM**은 `import/export`가 정적 구조라서 실행 전에 의존성을 분석할 수 있고, 그 덕분에 정적 분석·트리 쉐이킹이 가능하다.
최근에는 노드에서도 ESM을 지원하며 서버 환경에서도 ESM 방식으로 확장하는 추세다.

### +ES6란?
- ES6(ECMAScript 2015)는 자바스크립트의 **큰 업데이트 버전**이야.
- 이전 버전(ES5)에서는 없던 기능들이 많이 들어왔고, 그중 하나가 **모듈 시스템(ESM)**.
- 주요 변화: `let`, `const`, 화살표 함수, 클래스, 프로미스, `import/export` 등.  
    👉 즉, ES6는 “현대 자바스크립트의 기초”라고 할 수 있음.