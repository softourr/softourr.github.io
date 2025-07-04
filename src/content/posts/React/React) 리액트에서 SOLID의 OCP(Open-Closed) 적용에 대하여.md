---
title: "React) 리액트에서 SOLID의 OCP(Open Closed) 적용에 대하여"
published: 2025-07-04
tags: [React, Study]
category: React
draft: false
---

- [리액트의 개방-폐쇄 원칙: 확장가능한 컴포넌트 만들기](https://imnotadevleoper.tistory.com/365?utm_source=substack&utm_medium=email)
KoreanFE Article을 구독 중인데요 굉장히 관심 있는 주제입니다!
개발을 배울 때 SOLID 원칙은 정말 질리도록 들었는데 프론트엔드 개발을 배워나가며 SOLID는 백엔드만 가능한 것인가? 에 대한 의문이 생기고는 했습니다. 사실 SOLID에 대해 물어보는 것도 대부분 백엔드에게만 하기도 하고요.

나중에 해당 시리즈글을 다 읽어야겠습니다.

## 개방-폐쇄 원칙에 대하여
> 소프트웨어 개체(클래스, 모듈, 함수 등등)는 확장에 대해 열려 있어야 하고, 수정에 대해서는 닫혀 있어야 한다

결국 확장성 있는 코드, 나중에 이 코드가..여기저기서 유용하게 쓰이길 바라는 부모의 마음...
정리하면
1. 기존 코드의 수정은 닫혀있어야 한다.
2. 새로운 변경사항 추가가 열려있어야 한다.

기존 코드를 수정하지 않고도 여기저기서 쓸 수 있도록
그 베이스는 최소한, 또는 여러 Props로 처리하거나 하는 정도가 떠오릅니다.
atomic 디자인 패턴도 떠오르고...저도 그렇게 짜고 싶은데 어떻게 짤지 막막합니다.

## 대표적인 안티 패턴
> if, else를 최대한 지양한다.

정리하면 이 얘기 같습니다. if문으로 분기처리를 한다는 건 결국 if(조건)  구성이 되야 한다는 것인데
이 경우 그 구체적인 조건들을 사전에 설정해줘야 하기 때문에

새로운 구현을 추가할 경우, if문을 계속 추가해줘야 합니다.

- 새로운 구현이 추가될 때마다 수정해줘야 한다.
- 해당 조건에 대해서도 알고 있어야 한다.

## 개방적인 컴포넌트 만들기
어떻게 리팩토링할 수 있을까?
```
1. const ButtonBase = ({ label, onClick, className = "", children }: ButtonBaseProps) => (
2.   <button className={`button ${className}`.trim()} onClick={onClick}>
3.     {children || label}
4.   </button>
5. );

6. // 변형된 컴포넌트가 기본 컴포넌트를 확장합니다
7. const PrimaryButton = (props: ButtonBaseProps) => <ButtonBase {...props} className="button-primary" />;
```

## 컴포넌트 컴포지션(합성) 패턴
전에 지피티가 알려줘서 했는데 내가 한 건 컴포지션 패턴이 아니였던 거 같기도
좀 더 알아보기.

### 컴포지션 패턴이란?
[Composition Pattern 을 React Component에 적용해보자](https://medium.com/@console_log/composition-pattern-%EC%9D%84-react-component%EC%97%90-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90-6bf82c564585)
OOP에서 객체 간의 관계를 구성하는 패턴 중 하나다.
상속보다 객체를 서로 조합하는 구조를 통해 유연하게 구성한다.

[React.dev : 합성 vs 상속](https://ko.legacy.reactjs.org/docs/composition-vs-inheritance.html)
리액트는 이미 합성 모델을 가지고 있습니다! 상속 대신 합성을 사용하는 것을 권장합니다.
합성 패턴을 사용해 컴포넌트를 재사용하세요!

실제 구현 과정에서 종종 발생하는 문제
#### a. 어떤 하위 컴포넌트가 들어올지 예측할 수 없어요.
Answer : children props를 사용하세요!
```js
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}    </div>
  );
}
```
children props를 사용해 중첩된 jsx를 전달하는 방법을 권장합니다.

##### 1-1. children 분기 처리
children이 필요하긴 한데 그 사이에 태그가 있어서 구분선이 있다고 칩시다.
즉 children1, children으로 섹션을 나누어주어야 하는 경우
가능합니다! 타입스크립트의 경우 모두 React.ReactNode 타입으로 해줘야겠죠

```js
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}      </div>
      <div className="SplitPane-right">
        {props.right}      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />}
      right={
        <Chat />      } />
  );
}
```

#### b. 단순 변수도(title, msg) props로 해결합니다.
**정리**
해당 글을 보니 결과적으로 컴포지션 패턴이란 
props로 children을 사용해서 컴포넌트가 중첩되는 그런 것들을 말하는 것 같습니다

결국 props로 컴포넌트를 전달할 수도 있고, 함수, 변수 등 여러가지를 전달할 수 있다. 



---
다시 돌아가서 합성을 활용한 복잡한 예제
```ts
type CardProps = {
  title: string;
  children: React.ReactNode;
  renderHeader?: (title: string) => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  className?: string;
};

const Card = ({ title, children, renderHeader, renderFooter, className = "" }: CardProps) => (
  <div className={`card ${className}`.trim()}>
    {renderHeader ? renderHeader(title) : <div className="card-header">{title}</div>}
    <div className="card-content">{children}</div>
    {renderFooter && renderFooter()}
  </div>
);

// 기존 코드를 변경하지 않고 확장하기
const ProductCard = ({ product, onAddToCart, ...props }: ProductCardProps) => (
  <Card {...props} renderFooter={() => <button onClick={onAddToCart}>Add to Cart - ${product.price}</button>} />
);
```

테일윈드를 쓴다면 className도 포함해주는 게 좋습니다. 위에서 얘기했던 children 부분을 나누어서 헤더, 푸터, children(가운데) 이런 식으로 구성해주었네요.

## HOC 컴포넌트 확장성 있게 짜기
HOC 컴포넌트(Higher-Order Component)는 고차 컴포넌트입니다. 쉽게 말하면 컴포넌트를 인자로 받아서 컴포넌트를 리턴합니다. 컴포지션 패턴을 적용한 컴포넌트라고 볼 수 있을까요?

가장 많은 예제는 로딩인데요. 리턴을 컴포넌트로 한다는 것이 특징적입니다.
- 리액트 훅 도입 이후에는 단순한 상태 로직은 커스텀 훅으로 대체됩니다. 더 직관적입니다.

제네릭 P 타입을 사용해 리턴할 컴포넌트의 props 타입을 동적으로 전달받습니다.
즉 WrappedComponent는 React.ComponentType<`P`> 타입의 제네릭 P 타입의 props 인자를 가지는 리액트 컴포넌트입니다.

+. <`P` extends object>
리액트에서 props는 항상 객체 형태입니다. {}로 감싸진 형태이기 때문에 P는 props의 타입으로 선언한 것입니다. 없다면 그냥 string나 int도 가능해집니다.

```ts
type WithLoadingProps = {
  isLoading?: boolean;
};

const withLoading = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return ({ isLoading, ...props }: P & WithLoadingProps) => {
    if (isLoading) {
      return <div className="loader">Loading...</div>;
    }

    return <WrappedComponent {...(props as P)} />;
  };
};

```

- 사용법
```ts
const UserProfileWithLoading = withLoading(UserProfile);
<UserProfileWithLoading 
	name="John" 
	age={30} 
	email="john@example.com" 
	isLoading={false} 
/>
```


## 커스텀훅도 OCP로 가능할까?
기존 useDataFetching를 건드리지 않고 확장이 가능합니다.
해당 커스텀훅은 일종의 최소한 필요한 부분을 가지고 더 필요한 정보들이 있다면 따로 추가해서 작성합니다.
```ts
const useDataFetching = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, refetch: fetchData };
};

// 기존 코드의 수정 없이 확장하기
const useUserData = (userId: string) => {
  const result = useDataFetching<User>(`/api/users/${userId}`);

  // 사용자와 관련된 기능 추가하기
  const updateUser = async (data: Partial<User>) => {
    // 업데이트 로직
  };

  return { ...result, updateUser };
};
```


# 정리
리액트가 함수형 프로그래밍으로 전환함에 따라 기존의 클래스형 컴포넌트가 지양되고 함수형 컴포넌트를 주로 사용하게 되었습니다. 이에 따라 자연스럽게 기존의 상속 기반 접근 방식에서 합성 기반 접근 방식으로 전환되었다고 보입니다. 

이러한 합성 기반 접근 방식은 OCP 원칙에 부합하며 
리액트 코드를 작성할 때, 확장성을 생각해 해당 컴포넌트/훅을 확장해나갈 때
기존 코드를 수정할 필요가 있는가?에 생각하면서 코드를 짠다면 훨씬 더 확장성 있는 좋은 코드를 쓸 수 있을 것이라 생각합니다. 타입스크립트에서는 제네릭 타입을 잘 활용하는 것도 중요해보입니다

# +. Render Props 패턴
클로드 친구에게 물어보니 해당 패턴에 대해 추가적인 작성을 피드백해주었습니다.

- [참고 : Render Props 패턴](https://patterns-dev-kr.github.io/design-patterns/render-props-pattern/)
고차 컴포넌트에서 컴포넌트 로직을 재사용할 수 있었습니다. 유사하게 render props 패턴을 통해서도 컴포넌트를 재사용할 수 있습니다.

> 함수를 prop로 전달해서 컴포넌트가 무엇을 렌더링할지 결정하게 하는 패턴입니다. 로직을 재사용하고, UI는 유연하게 구성할 수 있습니다.

음 잘모르겠습니다. 
```ts
const Title = props => props.render();
// 사용
<Title render={() => <p className="text-green-600">나는야 타이틀!</p>} />
```

함수를? 인자로 전달해서 동적으로 UI를 구성하는 느낌입니다. 일종의 Outlet 같은?
실제 JSX 부분에서 무엇을 렌더링할지 결정됩니다. (사용하는 쪽에서 제어하기)
- 컴포넌트는 "어떻게 렌더링할지"를 정의해두고
- 실제 사용할 때 "무엇을 보여줄지" 결정합니다.

전 블로그글에서 얘기해서 선언형 프로그래밍과 완벽하게 일치합니다.

```ts
const Container = ({ render }) => ( 
	<div className="p-4 border-2 border-blue-500 rounded"> 
		{render()} 
	</div> 
);
// 사용
<Container render={() => <strong>굵은 글씨!</strong>} />
```

# 또 정리
리액트의 선언형 프로그래밍, SOLID 원칙, 컴포지션 패턴, render props 패턴 등
여러가지를 살펴보았는데 공통적으로 이야기하는건 
1. 어떻게 렌더링할지
2. 무엇을 보여줄지
UI와 로직?부분을 분리해서 작성하는 것이라는 점입니다. 또 기존 코드를 수정하지 않고 확장 가능하도록 추가적인 부분을 받을수있게 props나 children 등...구멍 자리를 만들어주는 것도 중요하고요.

> "구조는 제공하되, 내용은 자유롭게"