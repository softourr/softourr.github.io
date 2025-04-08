---
title: "CORS(Cross Origin Resource Sharing)는 무엇이며 왜 필요한가"
published: 2025-04-08
tags: [FEQ, Study]
category: FEQ
draft: false
---
" 프론트엔드 매일메일 78번 문제입니다.
- 🪧 참고
	- [CORS는 왜 이렇게 우리를 힘들게 하는걸까?](https://evan-moon.github.io/2020/05/21/about-cors/)
	- [결제창에서 CORS 대응하기](https://docs.tosspayments.com/blog/payment-window-cors-error)
---
## CORS 기본 개념 정리
영어 단어 그대로 서로 다른(cross) 출처(origin)에서 제공되는 리소스에 접근할 수 있도록 공유를 허용하는 정책입니다.
브라우저는 기본적으로 보안 상의 이유로 `SOP`(Same-Origin Policy, 동일 출처 정책)가 적용됩니다. 다른 출처에서 제공되는 것이면 "브라우저"가 이를 차단합니다.
- CORS 에러는 SOP 기준에 맞춰 CORS 정책을 적용하지 않아서 발생합니다.
SOP가 없었다면, CORS가 그냥 서로 모두에게 다 공유를 허용했다면 CSRF나 XSS 공격의 우려가 발생합니다. 
- CSRF(Cross-Site Request Forgery) : 사용자의 요청을 도용해 의도치 않은 요청을 서버에 보내는 공격. 사용자의 개인정보 탈취 우려
## CORS 에러 해결하기
CORS를 설정해주는 방법입니다. 서버 측에서 Access-Control-Allow-Origin 헤더를 설정합니다. 그러면 특정 출처에서의 접근을 허용할 수 있습니다. `Access-Control-Allow-Origin: *`을 할 경우 모든 출처에 대해 허용한다는 뜻입니다. 보안에 취약한 단점이 있습니다. 따라서 특정 출처에 대해서만 허용해주는 것이 좋습니다.
프론트엔드 개발자는 서버 개발자에게 클라이언트의 도메인을 허용하도록 해야 합니다. 
## 출처(Origin)를 이루는 3요소
위의 출처가 교차한다는 표현이 어떤 뜻인지 자세히 알아야 합니다. 단순히 URL만을 의미하는게 아니라 프로토콜과 포트까지 포함하는 개념입니다.
- 출처를 구성하는 세 요소는 프로토콜, 도메인(호스트 이름), 포트로 이 중 하나라도 다르면 CORS 에러가 발생합니다.
"프로토콜 : https 또는 http
## CORS 에러 판단은 브라우저에서 한다?
출처를 비교하는 로직은 서버가 아니라 브라우저에 구현되어 있습니다.
- 만약 CORS 정책을 위반하는 리소스 요청을 했다면, 해당 서버에서 CORS를 허용해주지 않았다고 할 때 서버는 정상적으로 응답을 합니다. 그렇다면 해당 응답에는 적절한 CORS 헤더가 포함되지 않았을 것입니다.
- 이후 브라우저가 해당 응답을 분석한 후 CORS 에러일 경우 해당 응답을 버리게 됩니다.
즉 브라우저를 통하지 않고 서버 간 통신을 할 경우 CORS 정책이 적용되지 않는다. 그렇기 때문에 프록시 서버를 이용해 CORS 문제를 우회할 수 있습니다.
## 프록시 서버 사용하기
CORS 에러를 방지할 수 있는 또 다른 방법입니다. 리소스를 직접적으로 요청하는 대신, 프론트엔드에서 프록시 서버를 사용할 수 있습니다. 프록시서버는 보통 뒤에 /api 경로를 추가하는 형태로 진행되므로 둘은 같은 출처다. 즉 CORS 문제가 발생하지 않는다. 또 서버와 프록시서버 사이의 통신은 브라우저를 통해 진행되지 않으므로 CORS 에러를 회피할 수 있습니다.
## CORS의 동작 과정
3가지의 시나리오가 있습니다. 기본 시나리오는 이렇습니다.
1. 기본적으로 웹 클라이언트 어플리케이션이 다른 출처의 리소스를 요청할 때는 HTTP 프로토콜을 사용해 요청을 보내게 됩니다. 이 때 브라우저는 요청 헤더에 `Origin`이라는 필드에 요청을 보내는 출처를 함께 보냅니다.
2. 이후 서버가 해당 요청에 대한 응답을 할 때, 응답 헤더에 `Access-Control-Allow-Origin`이라는 값에 어떤 출처의 요청을 허용하는지 명시합니다.
3. 이제 응답받은 브라우저에서 `Origin` 필드와 서버 응답의 `Access-Control-Allow-Origin`을 비교해 보고 유효한 응답인지 판단합니다.
### 1) Preflight Request
프리플라이트 방식은 가장 빈번하게 마주칠 수 있는 시나리오입니다. 이 시나리오에 해당하는 상황일 때 브라우저는 요청을 `예비 요청과 본 요청`으로 나누어서 서버에 보내게 됩니다.
이 때 브라우저가 본 요청을 보내기 전에 보내는 예비 요청이 바로 `Preflight`입니다. 여기에는 HTTP 메소드 중 `OPTIONS` 메소드가 사용됩니다. 예비 요청의 역할은 본 요청을 보내기 전에 브라우저 스스로 이 요청을 보내는 것이 안전한지 확인합니다.
"[HTTP OPTIONS](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Methods/OPTIONS) : 주어진 URL 또는 서버에 대해 허용된 통신 옵션을 요청
1. OPTIONS 메소드를 사용하고 브라우저는 요청 헤더에 Origin 필드에 출처를 함께 보냅니다.
2. 서버는 응답 헤더에 ACAO를 적어 응답합니다.
3. 브라우저는 Origin 필드와 ACAO를 비교해 안전한지 판단합니다.
안전하다고 판단되었다면
4. 같은 엔드포인트로 `본 요청`을 보냅니다.
5. 서버가 본 요청에 대한 응답을 합니다.
6. 브라우저는 해당 응답을 클라이언트에게 넘겨줍니다.
### 2) Simple Request (단순 요청)
단순 요청은 예비 요청을 보내지 않고 바로 본 요청을 보냅니다. 기본 시나리오와 같습니다. 특정 조건을 만족하는 경우에만 예비 요청을 생략한 `단순요청`을 할 수 있습니다.
```
1. 요청의 메소드는 `GET`, `HEAD`, `POST` 중 하나여야 한다.
2. `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, `DPR`, `Downlink`, `Save-Data`, `Viewport-Width`, `Width`를 제외한 헤더를 사용하면 안된다.
3. 만약 `Content-Type`를 사용하는 경우에는 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`만 허용된다.
```
해당 조건을 만족하는 경우는 사실 매우 드뭅니다.
### 3) Credentialed Request
인증된 요청을 사용하는 방법입니다. (아 이 내용 미리 알았다면...삽질을 덜했을듯...)
브라우저가 제공하는 비동기 리소스 요청 API(fetch 등)에서 인증과 관련된 정보를 담는 옵션은 `credentials`입니다. 3개의 값을 사용할 수 있습니다.
|옵션 값|설명|
|---|---|
|same-origin (기본값)|같은 출처 간 요청에만 인증 정보를 담을 수 있다|
|include|모든 요청에 인증 정보를 담을 수 있다|
|omit|모든 요청에 인증 정보를 담지 않는다|
만약 `credentials: include`를 설정할 경우 서버에서 ACAO를 \*로 설정했다면 에러가 발생합니다.
:::caution
Access to fetch at ’[https://evan-moon.github.io/feed.xml](https://evan-moon.github.io/feed.xml)’ from origin ’[http://localhost:8000](http://localhost:8000/)’ has been blocked by CORS policy: The value of the ‘Access-Control-Allow-Origin’ header in the response must not be the wildcard ’\*’ when the request’s credentials mode is ‘include’.
:::
즉, 요청에 인증 정보를 추가하고 리소스를 요청할 경우 2개의 룰이 추가된다.
1.  `Access-Control-Allow-Origin`에는 `*`를 사용할 수 없으며, 명시적인 URL이어야한다.
2. 응답 헤더에는 반드시 `Access-Control-Allow-Credentials: true`가 존재해야한다.
