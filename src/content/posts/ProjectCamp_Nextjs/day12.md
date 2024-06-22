---
title: "[유데미x스나이퍼팩토리] 프로젝트 캠프 : Next.js 1기 - 12일차"
published: 2024-06-12
description: "Promise.all"
image: "../img/NextJS.png"
tags: [Next.js, React]
category: ProjectCamp
draft: true
---

# 프로젝트 캠프 12일차

6/22

## Promise.all

여러 api 동시에 병렬적으로 호출하기

```jsx
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import MovieArea from "@/components/MovieArea";

const getMovies = async (type: string) => {
  const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWRhNTczZDk3NTc2ZDUxNGM3NTYyZjNjMjI3NzgxYiIsInN1YiI6IjY1N2MxMjQwZTkzZTk1MjE4ZjZkMjM5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HkyRzjy-li0pLAqbjEVApq9hBDG6TlLdtJ56YuttHeU",
    },
  };
  return await (await fetch(url, options)).json();
};

export default async function Home() {
  // 병렬처리해서 받도록 수정하기 전
  const now_playing = await getMovies("now_playing");
  const popular = await getMovies("popular");
  const top_rated = await getMovies("top_rated");
  const upcoming = await getMovies("upcoming");
  return (
    <>
      <Header />
      <Banner />
      <MovieArea />
    </>
  );
}
```

1. Promise.all 사용하기

```jsx
const [now_playing, popular, top_rated, upcoming] = await Promise.all([
  getMovies("now_playing"),
  getMovies("popular"),
  getMovies("top_rated"),
  getMovies("upcoming"),
]);
```

1. 객체 구조 분해로 results 필드를 받고 이 부분을 각각 앨리어스=네이밍하기

```jsx
const [
  { results: now_playing },
  { results: popular },
  { results: now_platop_ratedying },
  { results: upcoming },
] = await Promise.all([
  getMovies("now_playing"),
  getMovies("popular"),
  getMovies("top_rated"),
  getMovies("upcoming"),
]);
```

## Next.js의 Caching

별도 포스팅

[👋 Next.js의 Caching 자세히 알아보기](https://hhzzzk.github.io/posts/nextjs_caching/)

---

본 후기는 본 후기는 [유데미x스나이퍼팩토리] 프로젝트 캠프 : Next.js 1기 과정(B-log) 리뷰로 작성 되었습니다.
