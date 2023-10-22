1. webpack으로 바닐라 js + html,css 번들링하기

웹팩은 entries를 진입점으로 하여 import를 따라가며 의존성 그래프를 그린다.

그렇게 탐색이 끝나면, module과 plugins의 설정을 적용하며 번들링을 진행한다.

output에 설정된 곳에 결과물을 저장한다.

2. package.json에서 `npx webpack`을 대신 실행하기

원래 `npx webpack`을 통해서 번들링을 진행할 수 있다.

package.json의 scripts는 `npm run` 뒤에 scripts의 key에 해당하는 단어를 입력하면, 그 뒤의 명령어를 실행해준다.

```json
{
  "scripts": {
    "build": "npx webpack"
  }
}
```

으로 설정해주면 `npm run build`를 통해 vite나 CRA를 통해 만든 리액트 프로젝트를 빌드할 때처럼 번들링을 진행할 수 있다.

3. webpack의 설정으로 경로가 변경한 것에 대한 오류 처리

`Refused to apply style from 'http://127.0.0.1:5500/dist/index.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.`

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

이로 인해서, 개발자 도구의 콘솔 창에서 위와 같은 에러가 뜬 것이었다. 네트워크 탭에서도 index.css의 파일 불러오기는 실패했고, style.css 불러오기에는 성공했다.

웹팩에 대해서 잘 이해 못했던 것 같다. `<script>`와 `<link>`를 통해서 import할 필요가 없던 것이다.

개발 단계에서는 개발 서버를 켜서 진행해야하며, 직접 가져오는 것은 지양해야하는 것이다.

기존의 html에서 파일을 불러오는 태그를 제거했고, 개발 서버 설치를 위한 `webpack-dev-server`를 설치했다.

그리고 `npm run dev`나 `npx webpack serve --mode=development`를 통해 개발서버를 켤 수 있다,
