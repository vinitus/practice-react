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
