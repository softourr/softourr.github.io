---
title: "Nginx와 웹서버, WAS"
published: 2025-04-28
tags: [FEQ, Study]
category: FEQ
draft: false
---
> 궁금했다

## 웹서버란?
**웹서버(Web Server)**는 사용자가 브라우저를 통해 보내는 요청을 받아서,  
HTML, CSS, JavaScript, 이미지 같은 **정적 파일**을 응답해주는 프로그램입니다.

대표적인 웹서버로는 **Nginx**, **Apache**가 있습니다.

옛날에는 단순히 정적 파일을 주는 게 웹서버의 주요 역할이었지만,  
요즘은 SSL 인증서 처리나, 복잡한 요청을 백엔드 서버로 넘기는 등 다양한 역할까지 맡고 있습니다.

---

## WAS란?

**WAS(Web Application Server)**는  
**사용자 요청에 따라 서버 코드(비즈니스 로직)를 실행하고**,  
DB 조회, 인증 처리 등 **동적 작업**을 수행한 뒤 그 결과를 돌려주는 서버입니다.

대표적인 WAS로는 **Spring Boot**, **Node.js**, **Django** 등이 있습니다.

**웹서버가 단순한 파일 응답**을 담당한다면,  
**WAS는 복잡한 로직 실행**을 담당합니다.

---

## 웹서버와 WAS는 왜 분리할까?

웹서버와 WAS를 분리하는 이유는 다음과 같습니다:

- **속도 최적화**: 정적 파일은 웹서버가 빠르게 처리하고, 무거운 작업만 WAS로 넘깁니다.
    
- **서버 부하 분산**: WAS가 불필요한 파일 서빙을 안 하고 로직에만 집중할 수 있습니다.
    
- **보안 강화**: 외부 요청을 웹서버가 먼저 받고 필터링합니다.
    
- **유지보수 편리성**: 역할이 나뉘어 관리가 쉬워집니다.
    

---

## 리버스 프록시란?

**리버스 프록시(Reverse Proxy)**는  
사용자가 서버에 직접 요청을 보내는 것이 아니라,  
**중간에 있는 프록시 서버가 대신 요청을 받아서** 진짜 서버로 전달하는 방식입니다.

리버스 프록시는 다음과 같은 장점을 가집니다:

- **보안 강화**: 실제 서버의 IP 주소를 숨겨 외부 공격을 방어합니다.
    
- **로드 밸런싱**: 여러 서버로 트래픽을 분산시킬 수 있습니다.
    
- **속도 향상**: 정적 파일 캐싱을 통해 빠른 응답이 가능합니다.
    
- **SSL 종료 처리**: HTTPS 암호화 처리를 프록시 서버가 대신 합니다.
    

---

## Nginx란 무엇인가?

**Nginx(엔진엑스)**는 대표적인 고성능 웹서버이면서,  
**리버스 프록시 서버** 기능도 함께 제공하는 도구입니다.

Nginx는 다음과 같은 역할을 합니다:

- 사용자 요청을 받아 적절한 서버로 **리버스 프록싱**합니다.
    
- **정적 파일(HTML, CSS, JS, 이미지)**을 직접 서빙합니다.
    
- **SSL 인증서(HTTPS)를 관리**하고 암호화/복호화를 처리합니다.
    
- 트래픽을 여러 서버로 **부하 분산(로드 밸런싱)**할 수 있습니다.
    

특히, **HTTPS(SSL/TLS)**를 적용할 때는  
복잡한 인증서 관리와 암호화 처리를 Nginx가 맡아주기 때문에,  
프론트엔드 서버(Next.js 등)는 별다른 SSL 설정 없이 HTTP 통신만 신경 쓰면 됩니다.

**→ 그래서 프로젝트에서 HTTPS를 적용할 때, 프론트 앞단에 Nginx를 붙이는 것이 사실상 "국룰"이 되었습니다.**

---

# ✏️ 한 문장 정리

> **Nginx는 웹서버 기능뿐만 아니라, 보안(SSL 처리)과 리버스 프록시 역할까지 함께 해주는 아주 편리하고 강력한 도구다.**

---

# 📌 전체 흐름 요약

- 웹서버는 **정적 파일을 제공**하는 서버
    
- WAS는 **비즈니스 로직을 처리**하는 서버
    
- 리버스 프록시는 **요청을 중계하고 보안을 강화**하는 역할
    
- Nginx는 **웹서버 + 리버스 프록시 + SSL 처리**까지 다 해주는 도구
    

> "웹 요청을 효율적으로 받고, 보안을 강화하며, 시스템을 더 빠르고 안전하게 만드는 핵심 미들웨어가 바로 Nginx다."