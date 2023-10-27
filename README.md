# practice-react

순수 HTML, CSS, JavaScript로 이뤄진 프로젝트를 webpack, react, babel, typescript, esbuild, next.js까지 계속 마이그레이션하며 완성해나갈 프로젝트

## 1. webpack 적용하기 - [웹팩 번들링 브랜치](https://github.com/vinitus/practice-react/tree/bundling-with-webpack)

### 1. webpack으로 바닐라 js + html,css 번들링하기

웹팩은 `entries`를 진입점으로 하여 import를 따라가며 의존성 그래프를 그린다.

그렇게 탐색이 끝나면, `module`과 `plugins`의 설정을 적용하며 번들링을 진행한다.

`output`에 설정된 곳에 결과물을 저장한다.

### 2. package.json에서 `npx webpack`을 대신 실행하기

원래 `npx webpack`을 통해서 번들링을 진행할 수 있다.

package.json의 scripts`는 `npm run` 뒤에 scripts의 key에 해당하는 단어를 입력하면, 그 뒤의 명령어를 실행해준다.

```json
{
  "scripts": {
    "build": "npx webpack"
  }
}
```

으로 설정해주면 `npm run build`를 통해 vite나 CRA를 통해 만든 리액트 프로젝트를 빌드할 때처럼 번들링을 진행할 수 있다.

### 3. webpack의 설정으로 경로가 변경한 것에 대한 오류 처리

> Refused to apply style from 'http://127.0.0.1:5500/dist/index.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.

이거 해결하려고 한건데, `index.css`의 파일명을 번들링을 진행하며 `style.css`로 바꾸고 이렇게 진행하니까 html이 다음과 같이 변경되는 문제가 발생했다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="index.css" />
    <title>React</title>
    <script defer="defer" src="bundle.js"></script>
    <link href="style.css" rel="stylesheet" />
  </head>
  <body>
    <button type="button">Button!</button>
    <script src="index.js"></script>
  </body>
</html>
```

이로 인해서, 개발자 도구의 콘솔 창에서 위와 같은 에러가 뜬 것이었다. 네트워크 탭에서도 `index.css`의 파일 불러오기는 실패했고, `style.css` 불러오기에는 성공했다.

웹팩에 대해서 잘 이해 못했던 것 같다. `<script>`와 `<link>`를 통해서 import할 필요가 없던 것이다.

개발 단계에서는 개발 서버를 켜서 진행해야하며, 직접 가져오는 것은 지양해야하는 것이다.

기존의 html에서 파일을 불러오는 태그를 제거했고, 개발 서버 설치를 위한 `webpack-dev-server`를 설치했다.

그리고 `npm run dev`나 `npx webpack serve --mode=development`를 통해 개발서버를 켤 수 있다,

<br/>

## 2. React 적용하기 - [리액트 적용한 브랜치](https://github.com/vinitus/practice-react/tree/apply-react-with-babel)

### 1. React 적용하기

1. 이를 위해선 가상 돔의 루트가 될 태그 하나를 가져와야한다.
   보통 `<div id="root"></div>`라는 태그를 html에 생성하고, html에서 이 태그를 가져와서 뿌리 노드로 삼는다.

2. ReactDOM 라이브러리를 통해 가상 돔을 생성하기 위한 `ReactDOM` 자체를 끌고와서, export 중인 `createRoot` 메서드를 가져온 루트 노드를 인자로 넘기며 실행시킨다.

3. 함수 체이닝을 통해 `createRoot`의 결과인 `Root`라는 interface에서 실행할 수 있는 `render`를 실행한다.

4. 이 `render` 메서드의 인자로 `children`이 요구되는데, 이는 리액트 노드이며 컴포넌트이자 props 같은 것들에 해당한다.

5. 이를 루트에서 만들기 위해서는 `React.createElement`를 실행해야한다. 인자로 3개가 들어가는데, `React.createElement(태그,children,태그에 들어갈 text)`이다.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(React.createElement('div', null, 'Hi, React!'));
```

6. import/export를 통해 모듈화하기 위해서는 컴포넌트 파일을 만들고 `return`에 `React.createElement()`를 통해 태그를 만들어준다. 그 다음 불러올 파일에서 import하고 실행시키면 된다.

```javascript
// main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(App());

// App.js
import React from 'react';

export default function App() {
  return React.createElement('div', null, 'Hi, React!');
}
```

### 2. JSX 구문 사용하기

`React.createElement` 메서드를 사용해도 복잡한 UI 까지 구현할 수 있지만 문제가 있다.

```js
React.createElement('div', null, 'Hi, React!');
```

이 코드에서 children에 무언가를 추가하려면,

```js
const buttonTag = React.createElement('button', null, 'This is Button');
React.createElement('div', buttonTag, 'Hi, React!');
```

여기서 자꾸 중첩되는 태그들이 많이 생기면? 컴포넌트 함수가 너무 복잡해질 것이다.

이를 해결하고 좀 더 직관적으로 만들기 위해 jsx가 있다. jsx는 html같이 태그들을 적어두면 이를 `React.createElement`로 변환해주는 것이다.

jsx는 JavaScript 파일에 적지만, 자바스크립트는 스크립트 언어이면서도 html 태그를 이런식으로 만들 수는 없기에 이런 jsx문을 해석할 수 없다.

그래서 jsx를 javascript 코드로 변환하기 위한 **transpiler**인 `babel`을 주로 사용한다.

babel은 플러그인을 통해 react에 맞는 플러그인을 만들었으며, 프리셋은 플러그인들을 묶은 것이다. 리액트에 맞는 `preset-react`이라는 프리셋을 사용하여 jsx를 `React.createElement`로 변환할 수 있다.

1. `@babel/preset-react`를 사용하기 위한 모듈들 설치

   ```json
   {
     "devDependencies": {
       "@babel/cli": "^7.23.0",
       "@babel/core": "^7.23.2",
       "@babel/preset-env": "^7.23.2",
       "@babel/preset-react": "^7.22.15"
     }
   }
   ```

   - `@babel/core`: 바벨의 핵심 로직이 들어있는 모듈
   - `@babel/cli`: CLI로 이를 확인하고 조작하기 위한 모듈
   - `@babel/preset-env`: ES6 이상의 문법을 낮은 버전의 문법으로 변환해주는 프리셋
   - `@babel/preset-react`: JSX 해석을 위한 트랜스파일러 프리셋

2. `babel.config.json`을 통한 바벨 설정

   json 뿐만이 아니라 다양한 확장자를 통해 바벨 설정을 할 수 있다. 하지만 바벨에서는 `babel.config.json`을 권장한다.

   > We recommend using the `babel.config.json` format.

   해당 설정 중에서 presets에 프리셋을 추가한다.

   ```json
   // babel.config.json
   {
     "presets": ["@babel/preset-react", "@babel/preset-env"]
   }
   ```

3. 바벨 실행하기

   바벨 실행 자체는 `npx babel 파일명`으로 할 수 있다.

   ```
   npx babel src/main.js
   ```

   이렇게 하면 콘솔창에 출력만되는데,

   ```
   npx babel src/main.js --out-file ./dist/main.js
   ```

   이렇게 하면 dist폴더에 main.js로 트랜스파일된 자바스크립트를 확인할 수 있다.

   ```javascript
   // src/main.js
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from './App';
   import './index.css';

   const rootNode = document.getElementById('root');

   ReactDOM.createRoot(rootNode).render(<App />);

   // dist/main.js
   ('use strict');

   var _react = _interopRequireDefault(require('react'));
   var _client = _interopRequireDefault(require('react-dom/client'));
   var _App = _interopRequireDefault(require('./App'));
   require('./index.css');
   function _interopRequireDefault(obj) {
     return obj && obj.__esModule ? obj : { default: obj };
   }
   var rootNode = document.getElementById('root');
   _client['default'].createRoot(rootNode).render(/*#__PURE__*/ _react['default'].createElement(_App['default'], null));
   ```

4. webpack에서 loader로 사용하기

   하지만 3번의 경우로만 실행하면, 문제가 생긴다. 바벨은 해당 파일을 트랜스파일하면 되지만 **웹팩은 바벨로 트랜스파일한다는 사실 자체를 모른다.**

   이를 위해서는 `babel-loader`를 웹팩 module에 추가해야한다.

   ```javascript
   // webpack.config.mjs
   const config = {
     ...,
     module: {
       rules: [
         {
           loader: 'babel-loader',
           exclude: '/node_modules',
           test: /\.(js|jsx|ts|tsx)$/,
           options: {
             rootMode: 'upward',
           },
         },
         ...
       ],
     },
     ...
   }
   ```

   이렇게 추가하면 바벨로 트랜스파일을 진행한 다음의 자바스크립트 파일을 번들링을 진행한다.

<br/>

## 3. TypeScript 적용하기 with esbuild - [타입스크립트 브랜치](https://github.com/vinitus/practice-react/tree/typescript-with-esbuild/src)

### 1. typescript 적용하기

타입스크립트는 자바스크립트의 **슈퍼셋 언어**이다. 슈퍼셋(superset)은 수학적 용어로 보면 **상위 집합**이라는 의미인데, B가 A의 부분집합이라는 것은 A가 B의 슈퍼셋이라는 것과 같은 의미이다.

때문에, 자바스크립트의 코드는 타입스크립트에서는 그대로 동작가능하다. 여기서 **타입**에 대한 검사와 제한을 거는 언어가 타입스크립트이다.

반대로 말해서, 타입스크립트로 쓰여진 코드는 자바스크립트에서 그대로 실행이 될 수도, 안될수도 있다. 때문에 타입스크립트를 자바스크립트 언어로 번역해줄 트랜스파일러가 필요하다.

리액트에서 적용된 것처럼, **babel**이 주로 쓰인다. 자주 쓰이는 만큼, `@babel/preset-typescript`라는 모듈이 존재하며, 이를 설치하고 바벨 설정 파일에서 `preset`에 등록하면 쉽게 사용할 수 있다.

```json
// babel.config.json
{
  "presets": ["@babel/preset-react", "@babel/preset-env", "@babel/preset-typescript"]
}
```

### 2. typescript와 webpack 연동하기

웹팩으로 개발서버를 열기 때문에, typescript를 웹팩이 해석해야한다. 웹팩은 기본적으로 자바스크립트로 작동하기 때문에, 타입스크립트를 위해서 loader를 따로 설치해줘야한다.

`ts-loader`를 사용하면 쉽게 할 수 있다. `module.rules` 배열에 추가하면 된다.

```js
// webpack.config.mjs
const config = {
  ...,
  module: {
    ...,
    rules: {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  },
  ...
}
```

이렇게 하면 된다.

### 3. babel과 webpack을 같이 쓰는 환경에서는?

둘 중 하나만 하면 된다. `babel-loader`를 통해서 `@babel/preset-typescript`를 이미 불러왔기 때문이다.

그러면 둘의 차이는 무엇일까?

[toast UI 기술블로그 - 바벨과 ](https://ui.toast.com/weekly-pick/ko_20181220)

요약하자면,

1. ts-loader는 엄격한 타입 검사를 진행한다.

타입 체크를 엄격하게 진행하며 타입스크립트 에러시 빌드가 불가능하고 **빌드 시간이 길다**.

2. babel-loader는 소프트한 타입 검사를 진행한다.

**빌드 시간이 짧지만** 타입스크립트의 장점이 사라진다.

그래서 동적으로 활용하려고 했다.

```js
// webpack.config.mjs
const config = (_, args) => {
  const { mode } = args;
  const isDevelopment = mode === 'development';

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          loader: 'babel-loader',
          exclude: '/node_modules',
          test: /\.(js|jsx|ts|tsx)$/,
          options: {
            rootMode: 'upward',
            presets: isDevelopment ? ['@babel/preset-typescript'] : [],
          },
        },
        !isDevelopment && {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
};
```

결국 웹팩 설정 파일은 js 파일이며, export해야하는 것은 웹팩 설정이 담긴 `object` 형태이기만 하면 된다.

밑의 코드를 기준으로 빌드를 시도하면 에러가 나서 빌드가 안된다.

```typescript
// App.tsx
import React from 'react';
import { test } from './tmp';

export default function App() {
  test(123);
  return <div>Hi, React with JSX!</div>;
}

// tmp.ts
export function test(str: string) {
  console.log(str);
}
```

이는 [https://github.com/vinitus/practice-react/tree/webpack-dynamic-config-test](https://github.com/vinitus/practice-react/tree/webpack-dynamic-config-test)

여기서 테스트해볼 수 있다.

`isDevelopment`의 `mode === 'development'`를 `mode !== 'development'`로 바꾸면 빌드가 된다.

그런데 개발 단계에서는 `ts-loader`가 적용되어도 의미가 없다. 타입 에러는 IDE 상에서만 존재하기 때문이다. 그래서 Vite가 esbuild를 선택하나 보다..

### 4. esbuild-loader로 전환하기

[esbuild-loader의 공식문서](https://github.com/privatenumber/esbuild-loader)를 따라하면 쉽게 할 수 있다. 잘 만든 라이브러리는 깃허브만 따라해도 되게끔 해놓은 것이 본받을 점인 것 같다.

3번의 코드를 다음과 같이 다시 바꾸면 된다.

```javascript
const config = {
  ...,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
        },
      },
    ],
  },
  ...
};
```

약 3.1초 걸리던 것이 2.2초로 줄어들긴 했다. 하지만 역시 타입스크립트 에러를 잡지 못하는 모습이다.

[cks3066 님의 velog - babel, tsc, esbuild for Typescipt](https://velog.io/@cks3066/babel-loader-vs-ts-loader-vs-esbuild-loader)

이 글에 따르면, esbuild는 tsconfig 옵션은 참고하긴 하지만 이를 기반으로 트랜스파일을 진행하는 것은 아니다.

[esbuild 공식문서 - content/types/#typescript](https://esbuild.github.io/content-types/#typescript)

esbuild 공식문서에서

> This loader is enabled by default for .ts, .tsx, .mts, and .cts files, which means esbuild has built-in support for parsing TypeScript syntax and discarding the type annotations. However, esbuild does not do any type checking so you will still need to run tsc -noEmit in parallel with esbuild to check types. This is not something esbuild does itself.

esbuild는 유형 검사를 수행하지 않으므로 유형을 확인하려면 esbuild와 함께 `tsc -noEmit`을 병렬로 실행해야 합니다.

라고 한다. 때문에, package.json 파일의 `scripts.build`를 다음과 같이 수정해야한다.

```json
//package.json
{
  "scripts": {
    "build": "npx tsc --noEmit && npx webpack --mode=production"
  }
}
```

이로써 Go 언어로 작성되어 빠른 속도로 진행되는 esbuild를 기반으로 개발 서버와 빌드를 진행할 수 있다.

