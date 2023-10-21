1. webpack으로 바닐라 js + html,css 번들링하기

웹팩은 entries를 진입점으로 하여 import를 따라가며 의존성 그래프를 그린다.

그렇게 탐색이 끝나면, module과 plugins의 설정을 적용하며 번들링을 진행한다.

output에 설정된 곳에 결과물을 저장한다.
