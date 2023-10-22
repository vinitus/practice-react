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

6. import/export를 통해 모듈화하기 위해서는 컴포넌트 파일을 만들고 return에 `React.createElement()`를 통해 태그를 만들어준다. 그 다음 불러올 파일에서 import하고 실행시키면 된다.

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
