# 온스테이지 ONSTAGE

가수 · 밴드 · 트롯 · 배우 · 마술사에게 홈페이지를 만들어 주고, 목록에 올려 주는 서비스.

사이트는 JSON 한 벌에서 생성한다. HTML 을 손으로 고치지 않는다.

## 만들기

```bash
npm run build     # dist/ 생성
npm run serve     # 빌드 후 로컬에서 열어 보기
```

Node 20 이상. 외부 패키지를 쓰지 않는다.

## 구조

```
data/site.json          브랜드 이름 · 주소 · 요금
data/artists/*.json     실제 아티스트 — 한 명 = 파일 하나
data/samples.json       예시 아티스트 — 한 파일에 여러 명
data/demo.json          디자인 미리보기에 쓰는 가상 인물
public/artists/<slug>/  사진
src/theme.mjs           뼈대 CSS
src/designs.mjs         디자인 15종
src/render.mjs          아티스트 → HTML
src/pages.mjs           랜딩 · 목록 · 디자인 갤러리
src/placeholder.mjs     사진이 없는 자리를 채우는 무대 그래픽
build.mjs               전부 묶어 dist/ 로
```

## 축이 셋이다

| 축 | 정하는 것 | 값 |
|---|---|---|
| `category` | 어떤 블록이 들어가나 | magician · singer · actor · band |
| `type` | 어떤 순서로 배치하나 | A 원페이지 · B 일정중심 · C 섭외중심 |
| `design` | 색 · 글꼴 · 질감 | OS-101 ~ OS-115 |

## 아티스트 추가

1. `data/artists/<slug>.json` 을 만든다 (`hwanghwi.json` 이 본보기)
2. 사진이 있으면 `public/artists/<slug>/` 에 넣는다 — JSON 에는 파일명만 적는다
3. `npm run build`

사진이 없으면 직군에 맞는 무대 그래픽이 자동으로 들어간다.
`"art": { "count": 5, "prop": "hat" }` 로 인원수와 소품을 정할 수 있다.

## 빈 값 규칙

값이 비면 그 블록은 나오지 않는다. `"draft": true` 이면 「채울 자리」 안내가 대신 나온다.
자료가 덜 모여도 사이트를 먼저 만들어 보여줄 수 있다.

## 배포 — Cloudflare Pages

| 설정 | 값 |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` (환경변수 `NODE_VERSION`) |

`main` 에 push 하면 자동으로 다시 빌드해 올린다. `dist/` 는 저장소에 넣지 않는다.
