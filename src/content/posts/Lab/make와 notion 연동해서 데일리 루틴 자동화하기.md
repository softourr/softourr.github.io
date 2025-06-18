---
title: "make와 notion 연동해서 데일리 루틴 자동화하기"
published: 2025-06-18
tags: [Lab, Study]
category: Lab
draft: false
---

## 🧰Make
Notion, Slack, Gmail, Google Sheets와 연동 가능
자동화 가능, 시나리오 기반으로 동작

---
1. **Scheduler 트리거**  
   - ex) 매일 오전 8시
1. **Notion: Create Database Item**  
   - 내 데일리 업무 템플릿 DB에 새로운 row 추가
   - 각 필드에 텍스트/시간 프리셋 입력
## 에러 발생
Module references non-existing module '1'.

🧩 왜 발생?
- Make 시나리오 내에서 **모듈 간 연결(의존성)**을 설정한 후 발생한 문제
- 처음엔 A 모듈(예: 스케줄러)을 만들고 그 아래 B 모듈(예: Notion 작업)을 연결했음
- 이후 A 모듈(A)을 **삭제**했는데,  B 모듈은 여전히 A에 **의존하고 있었기 때문에** 문제가 생김

Make 내부적으로 B 모듈이 `module: 1` (A 모듈) 을 참조하고 있는데, 그게 사라져서:
> **"존재하지 않는 모듈 '1'을 참조하고 있다"**  
> 라는 에러가 발생한 것.

🛠 해결
- 의존성 점검해서 새로 저장
[참고 - make 커뮤니티](https://community.make.com/t/what-does-this-error-mean-module-references-non-existing-module-1/2751)

- 좀 더 자동화하면 좋을 듯 