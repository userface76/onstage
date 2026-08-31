/**
 * 온스테이지 공통 디자인.
 *
 * 화면은 어두운 무대 톤 하나로 고정한다 — 무대 사진은 대개 배경이 어둡고,
 * 밝은 바탕에 얹으면 잘라낸 티가 난다.
 * 아티스트마다 바꾸는 것은 강조색(--ac) 하나뿐이다.
 */

export const ACCENTS = {
  gold:    { ac: '#C9A96A', ac2: '#8A7444' },  // 마술사 · 무대
  rose:    { ac: '#D08A96', ac2: '#8E5A63' },  // 트롯 · 행사
  ice:     { ac: '#8FB3D9', ac2: '#5C7794' },  // 배우
  amber:   { ac: '#D9A45B', ac2: '#8F6B33' },  // 밴드
  mint:    { ac: '#7FC2B4', ac2: '#4E8177' },
};

export const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap">`;

export function css(accent = 'gold') {
  const a = ACCENTS[accent] || ACCENTS.gold;
  return `
:root {
  --night:#08080A; --night-2:#101014; --night-3:#17171C; --line:#26262E;
  --ivory:#F2EFE9; --ivory-2:#B9B4AC; --ivory-3:#7C7871;
  --ac:${a.ac}; --ac-2:${a.ac2};
  --display:"Nanum Myeongjo","Gowun Batang",serif;
  --body:"Pretendard","Noto Sans KR",-apple-system,"Segoe UI",sans-serif;
  --mono:"IBM Plex Mono",Consolas,monospace;
}
*{box-sizing:border-box}
body{margin:0;background:var(--night);color:var(--ivory);font-family:var(--body);
  font-size:16px;line-height:1.8;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{color:var(--ac)}
.wrap{max-width:1080px;margin:0 auto;padding:0 clamp(20px,5vw,48px)}

/* 눈썹 라벨 — 섹션의 이름표다. 작게 두면 읽히지 않는다 */
.eye{font-family:var(--mono);font-size:12px;letter-spacing:.2em;text-transform:uppercase;
  color:var(--ac);margin:0 0 12px;font-weight:500}
h2{font-family:var(--display);font-weight:800;font-size:clamp(21px,2.9vw,29px);
  line-height:1.35;margin:0 0 8px;text-wrap:balance}
h3{font-size:16px;font-weight:700;margin:0}
p{margin:0}
.lede{color:var(--ivory-2);font-size:16px;max-width:54ch}
section{padding:clamp(46px,6.5vw,84px) 0;border-top:1px solid var(--line)}
section.first{border-top:0}

.btn{display:inline-block;font-weight:700;font-size:15px;padding:13px 26px;
  text-decoration:none;border:1px solid var(--ac);color:var(--night);background:var(--ac)}
.btn--ghost{background:transparent;color:var(--ac)}
.btn--big{font-size:16.5px;padding:15px 32px}
.btn:focus-visible{outline:2px solid var(--ivory);outline-offset:3px}

.mark{font-family:var(--display);font-weight:700;letter-spacing:.06em}

/* 사실 칸 */
.facts{display:grid;gap:1px;background:var(--line);border:1px solid var(--line)}
@media(min-width:620px){.facts{grid-template-columns:repeat(2,1fr)}}
@media(min-width:900px){.facts--4{grid-template-columns:repeat(4,1fr)}}
.facts>div{background:var(--night-2);padding:15px 17px;display:flex;flex-direction:column;gap:2px}
.facts dt{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ivory-3)}
.facts dd{margin:0;font-size:16px;font-weight:700}

/* 채울 자리 — draft 일 때만 나온다 */
.fill{border:1px dashed var(--ac-2);background:rgba(255,255,255,.03);
  padding:14px 16px;display:flex;flex-direction:column;gap:3px}
.fill span{font-family:var(--mono);font-size:11px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--ac);font-weight:500}
.fill p{color:var(--ivory-2);font-size:14px;line-height:1.65}

/* 표 */
.scroll{overflow-x:auto;border:1px solid var(--line)}
table{border-collapse:collapse;width:100%;min-width:560px;font-size:14.5px;background:var(--night-2)}
th,td{text-align:left;padding:12px 15px;border-bottom:1px solid var(--line);vertical-align:top}
thead th{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ivory-3);background:var(--night-3);white-space:nowrap;font-weight:500}
tbody tr:last-child td{border-bottom:0}
td.b{font-weight:700;font-family:var(--display);font-size:16.5px}
td.n{font-family:var(--mono);font-size:13.5px;color:var(--ac);white-space:nowrap}

/* 갤러리 */
/* 사진이 몇 장이든 받는다 — 화면 폭에 맞춰 줄이 늘어난다 */
.gal{display:grid;gap:9px;grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
@media(min-width:760px){.gal{grid-template-columns:repeat(auto-fill,minmax(200px,1fr))}}
.gal>div{aspect-ratio:3/4;border:1px solid var(--line);background:var(--night-2) center/cover no-repeat;
  display:grid;place-items:center;font-family:var(--mono);font-size:9.5px;
  letter-spacing:.16em;color:var(--ivory-3)}

/* 연락 띠 */
.cbar{border:1px solid var(--ac-2);background:rgba(255,255,255,.03);padding:clamp(20px,3.5vw,30px);
  display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between}
.cbar p{color:var(--ivory-2);font-size:14.5px}

/* 문의폼 */
.form{border:1px solid var(--line);background:var(--night-2);padding:24px;display:grid;gap:14px}
@media(min-width:640px){.form{grid-template-columns:1fr 1fr}}
.f{display:flex;flex-direction:column;gap:6px}
.f--full{grid-column:1/-1}
.f label{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ivory-3);font-weight:500}
.f input,.f textarea{font-family:var(--body);font-size:15px;color:var(--ivory);
  background:var(--night);border:1px solid var(--line);padding:12px 14px;width:100%}
.f textarea{min-height:96px;resize:vertical}
.f input::placeholder,.f textarea::placeholder{color:var(--ivory-3)}
.f input:focus-visible,.f textarea:focus-visible{outline:1px solid var(--ac);border-color:var(--ac)}

/* 목록형 (일정 · 이력) */
.rows{border-top:1px solid var(--line)}
.rows>div{display:grid;gap:2px 24px;padding:14px 2px;border-bottom:1px solid var(--line)}
@media(min-width:700px){.rows>div{grid-template-columns:150px 1fr auto;align-items:baseline}}
.rows .d{font-family:var(--mono);font-size:13.5px;color:var(--ac)}
.rows .t{font-family:var(--display);font-weight:700;font-size:18px}
.rows .p{font-size:14px;color:var(--ivory-3)}

/* 푸터 */
.sfoot{border-top:1px solid var(--line);padding:24px 0 56px;display:flex;flex-wrap:wrap;
  gap:8px 22px;justify-content:space-between;align-items:baseline;font-size:13.5px;color:var(--ivory-3)}

/* 상단 바 — 모든 페이지가 공유한다 */
.sitebar{border-bottom:1px solid var(--line);background:var(--night-2);
  position:sticky;top:0;z-index:40}
.sitebar__in{display:flex;flex-wrap:wrap;gap:8px 20px;align-items:center;padding:14px 0}
.sitebar__me{font-family:var(--display);font-weight:700;font-size:19px;letter-spacing:.05em;
  text-decoration:none;color:var(--ivory)}
.sitebar__nav{display:flex;gap:20px;margin-left:8px}
.sitebar__nav a{font-size:15px;color:var(--ivory-2);text-decoration:none}
.sitebar__nav a:hover{color:var(--ac)}
.sitebar__nav a[aria-current=page]{color:var(--ac);border-bottom:1px solid var(--ac);padding-bottom:2px}

/* 여러 페이지로 나눈 사이트의 첫 화면에서 각 갈래로 보내는 칸 */
.doors{display:grid;gap:12px;margin-top:26px}
@media(min-width:700px){.doors{grid-template-columns:repeat(var(--cols,4),1fr)}}
.doors a{display:flex;flex-direction:column;gap:5px;text-decoration:none;color:inherit;
  border:1px solid var(--line);background:var(--night-2);padding:20px 18px}
.doors a:hover{border-color:var(--ac)}
.doors a:focus-visible{outline:2px solid var(--ac);outline-offset:2px}
.doors b{font-family:var(--display);font-weight:700;font-size:18px}
.doors span{font-size:13.5px;color:var(--ivory-2);line-height:1.6}
.doors i{font-style:normal;font-family:var(--mono);font-size:11px;letter-spacing:.14em;
  color:var(--ac);margin-top:4px}
.sitebar__home{margin-left:auto;font-family:var(--mono);font-size:12px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--ivory-3);text-decoration:none;
  border:1px solid var(--line);padding:7px 12px}
.sitebar__home:hover{color:var(--ac);border-color:var(--ac-2)}
.sitebar a:focus-visible{outline:2px solid var(--ac);outline-offset:2px}
@media(max-width:640px){.sitebar__nav{width:100%;order:3;gap:16px}
  .sitebar__nav a{font-size:14.5px}}

/* 같은 직군 다른 아티스트 */
.related{display:grid;gap:12px;margin-top:22px}
@media(min-width:700px){.related{grid-template-columns:repeat(3,1fr)}}
.related a{display:flex;flex-direction:column;gap:4px;text-decoration:none;color:inherit;
  border:1px solid var(--line);background:var(--night-2);padding:15px 17px}
.related a:hover{border-color:var(--ac-2)}
.related a:focus-visible{outline:2px solid var(--ac);outline-offset:2px}
.related b{font-family:var(--display);font-weight:700;font-size:17px}
.related span{font-size:13.5px;color:var(--ivory-2)}

/* 디자인 미리보기 띠 */
.pvbar{background:var(--night-3);border-bottom:1px solid var(--line);
  position:sticky;top:0;z-index:45}
.pvbar__in{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;padding:11px 0;
  font-size:14px;color:var(--ivory-2)}
.pvbar__code{font-family:var(--mono);font-size:12.5px;letter-spacing:.14em;color:var(--ac);font-weight:500}
.pvbar__name{font-weight:700;color:var(--ivory)}
.pvbar__for{color:var(--ivory-3);font-size:13.5px}
.pvbar__acts{margin-left:auto;display:flex;gap:8px}
.pvbar__acts a{font-size:13.5px;text-decoration:none;color:var(--ivory-2);
  border:1px solid var(--line);padding:6px 12px}
.pvbar__acts a:hover{color:var(--ac);border-color:var(--ac-2)}
.pvbar__acts a.on{background:var(--ac);color:var(--night);border-color:var(--ac)}
.pvbar a:focus-visible{outline:2px solid var(--ac);outline-offset:2px}

/* 시안 띠 */
.draft{background:var(--night-2);border-bottom:1px solid var(--line);font-family:var(--mono);
  font-size:12px;letter-spacing:.03em;color:var(--ivory-3);text-align:center;padding:9px 16px}
.draft b{color:var(--ac);font-weight:400}

/* ---- 유형 A ---- */
.a-hero{padding:clamp(40px,6vw,72px) 0 clamp(30px,4vw,52px);display:grid;gap:clamp(24px,4vw,44px);align-items:center}
@media(min-width:860px){.a-hero{grid-template-columns:1fr 1fr}}
.a-name{font-family:var(--display);font-weight:800;font-size:clamp(42px,8vw,76px);
  line-height:1;letter-spacing:.03em;margin:0}
.a-role{font-family:var(--mono);font-size:12.5px;letter-spacing:.24em;text-transform:uppercase;
  color:var(--ac);margin:0 0 14px;font-weight:500}
.a-line{font-family:var(--display);font-size:clamp(17px,2.2vw,22px);line-height:1.6;
  margin:20px 0 0;max-width:24ch}
.a-shot{max-height:70vh;object-fit:contain;object-position:bottom center;width:100%}
.a-about{display:grid;gap:clamp(22px,4vw,40px)}
@media(min-width:820px){.a-about{grid-template-columns:280px 1fr}}

/* ---- 유형 B ---- */
.b-band{background:var(--night-2);border-bottom:1px solid var(--line)}
.b-band .wrap{padding-top:clamp(34px,5vw,58px);padding-bottom:clamp(34px,5vw,58px)}
.b-next{display:grid;gap:8px 32px;margin-top:14px}
@media(min-width:800px){.b-next{grid-template-columns:auto 1fr auto;align-items:center}}
.b-date{font-family:var(--display);font-weight:800;font-size:clamp(38px,6.2vw,60px);
  line-height:1;letter-spacing:-.01em}
.b-date span{display:block;font-family:var(--mono);font-size:12.5px;letter-spacing:.18em;
  color:var(--ac);margin-top:10px;font-weight:500}
.b-tit{font-family:var(--display);font-weight:700;font-size:clamp(19px,2.6vw,24px);line-height:1.4}
.b-place{color:var(--ivory-3);font-size:14.5px;margin-top:5px}
.b-two{display:grid;gap:clamp(22px,4vw,40px);align-items:center}
@media(min-width:860px){.b-two{grid-template-columns:1fr 380px}}
.b-shot{max-height:62vh;object-fit:contain;width:100%}

/* ---- 유형 C ---- */
.c-top{background:var(--night-2);border-bottom:1px solid var(--line)}
.c-top .wrap{padding-top:clamp(28px,4vw,46px);padding-bottom:clamp(28px,4vw,46px)}
.c-head{display:grid;gap:20px;align-items:center}
@media(min-width:900px){.c-head{grid-template-columns:200px 1fr auto}}
.c-shot{max-height:230px;object-fit:cover;width:100%;border:1px solid var(--line)}
.c-name{font-family:var(--display);font-weight:800;font-size:clamp(30px,4.6vw,46px);
  line-height:1.1;letter-spacing:.02em}
.c-sub{color:var(--ivory-2);font-size:15.5px;margin-top:8px;max-width:42ch}
.c-actions{display:flex;flex-wrap:wrap;gap:10px}

/* ---- 유형 D · 전시형 ---- */
/* 첫 화면이 사진 한 장으로 끝난다. 글씨는 사진 위에 얹히므로 어둠막을 깐다 */
.d-stage{position:relative;min-height:100svh;display:flex;flex-direction:column;
  justify-content:center;align-items:center;text-align:center;
  padding:clamp(90px,14vh,140px) clamp(20px,5vw,48px) clamp(70px,10vh,110px);
  background:var(--night-2) center/cover no-repeat}
.d-stage::before{content:"";position:absolute;inset:0;
  background:linear-gradient(to bottom,rgba(0,0,0,.55),rgba(0,0,0,.25) 42%,rgba(0,0,0,.75))}
.d-mid{position:relative;max-width:22ch}
.d-name{font-family:var(--display);font-weight:800;color:#fff;margin:0;
  font-size:clamp(40px,9vw,86px);line-height:1.02;letter-spacing:.05em;
  text-shadow:0 2px 24px rgba(0,0,0,.5)}
.d-role{font-family:var(--mono);font-size:clamp(11px,1.6vw,13px);letter-spacing:.3em;
  text-transform:uppercase;color:var(--ac);margin:0 0 18px;font-weight:500}
.d-line{font-family:var(--display);color:rgba(255,255,255,.88);margin:22px 0 0;
  font-size:clamp(15px,2vw,20px);line-height:1.65}
.d-down{position:absolute;left:50%;bottom:clamp(22px,4vh,38px);transform:translateX(-50%);
  text-decoration:none;display:flex;flex-direction:column;align-items:center;gap:9px}
.d-down span{font-family:var(--mono);font-size:10.5px;letter-spacing:.28em;text-transform:uppercase;
  color:rgba(255,255,255,.75)}
.d-down::after{content:"";width:1px;height:34px;background:linear-gradient(to bottom,rgba(255,255,255,.75),transparent)}
.d-down:hover span{color:var(--ac)}
.d-down:focus-visible{outline:2px solid var(--ac);outline-offset:6px}
@media(max-height:520px){.d-stage{min-height:420px}.d-down{display:none}}

/* 멤버 */
.members{display:grid;gap:14px;grid-template-columns:repeat(2,1fr)}
@media(min-width:760px){.members{grid-template-columns:repeat(4,1fr)}}
.member{display:flex;flex-direction:column;gap:8px}
.member .ph{aspect-ratio:1;border:1px solid var(--line);background:var(--night-2) center/cover no-repeat}
.member b{font-size:15px}
.member span{font-size:13px;color:var(--ivory-2)}

@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;
}
