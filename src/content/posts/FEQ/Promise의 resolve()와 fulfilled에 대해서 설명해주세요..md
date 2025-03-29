---
title: "Promise의 resolve()와 fulfilled에 대해서 설명해주세요."
published: 2025-03-29
tags: [FEQ, Study]
category: FEQ
draft: false
---
" 프론트엔드 매일메일 73번 질문입니다.

둘 다 Promise에서 비동기 처리시 사용되는 값입니다. resoslve는 프로미스를 완료시키는 함수이고, fulfilled는 해당 프로미스가 완료된 상태를 의미합니다.

```javascript
const successPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('🎉 작업 성공!');
  }, 1000); // 1초 후에 resolve 호출
});

successPromise
  .then(result => {
    console.log('✅ then:', result); // 🎉 작업 성공!
  })
  .catch(error => {
    console.log('❌ catch:', error);
  });

```
비동기 작업인 setTimeout이 끝나고 resolve()가 호출됩니다. 호출되면 해당 프로미스는 fulfilled 상태가 됩니다. 이후 .then() 안의 콜백함수가 실행됩니다.