/**
 * 디자인 갤러리.
 *
 * theme.mjs 가 뼈대(간격 · 격자 · 컴포넌트)를 만들고,
 * 여기 있는 각 디자인이 그 위에 색 · 글꼴 · 질감을 덮어쓴다.
 * 그래서 디자인 코드만 바꾸면 화면이 통째로 달라지되 구조는 그대로다.
 *
 * 아티스트 JSON 에서  "design": "OS-104"  한 줄로 고른다.
 *
 * 새 디자인을 추가할 때는 아래 배열에 항목 하나만 넣으면
 * 갤러리 페이지와 미리보기가 자동으로 생긴다.
 */

export const FONT_HREF =
  'https://fonts.googleapis.com/css2' +
  '?family=Black+Han+Sans' +
  '&family=Gowun+Batang:wght@400;700' +
  '&family=Gowun+Dodum' +
  '&family=IBM+Plex+Mono:wght@400;500' +
  '&family=Nanum+Myeongjo:wght@400;700;800' +
  '&family=Noto+Sans+KR:wght@100;300;400;500;700;900' +
  '&family=Noto+Serif+KR:wght@400;700;900' +
  '&family=Song+Myung' +
  '&display=swap';

/** 밝은 바탕 디자인이 공통으로 쓰는 토큰 뒤집기. */
const LIGHT = (o) => `
:root{
  --night:${o.bg}; --night-2:${o.bg2}; --night-3:${o.bg3}; --line:${o.line};
  --ivory:${o.ink}; --ivory-2:${o.ink2}; --ivory-3:${o.ink3};
  --ac:${o.ac}; --ac-2:${o.ac2};
}
.draft{background:${o.bg2};color:${o.ink3}}
.fill{background:rgba(0,0,0,.03)}
.cbar{background:rgba(0,0,0,.03)}
.btn{color:${o.bg}}
.gal>div{background-color:${o.bg3}}
`;

export const DESIGNS = [
  /* ─────────── 공연 ─────────── */
  {
    code: 'OS-101', name: '미니멀 화이트', for: '배우 · 모델 · 성우', concept: '심플한',
    light: true,
    css: LIGHT({ bg:'#FBFBFC', bg2:'#F3F3F5', bg3:'#ECECEF', line:'#E2E2E7',
                 ink:'#15151A', ink2:'#5A5A65', ink3:'#95959F', ac:'#15151A', ac2:'#B9B9C2' }) + `
body{font-family:"Noto Sans KR",sans-serif;font-weight:300}
.a-name,.c-name,.b-date{font-family:"Noto Sans KR",sans-serif;font-weight:100;letter-spacing:-.03em}
h2{font-family:"Noto Sans KR",sans-serif;font-weight:200;letter-spacing:-.02em}
.eye{letter-spacing:.3em;font-weight:400}
td.b{font-family:"Noto Sans KR",sans-serif;font-weight:400}
.gal>div{filter:grayscale(1) contrast(1.05)}
.btn{border-radius:0;letter-spacing:.06em;font-weight:400}
`,
  },
  {
    code: 'OS-102', name: '다크 스테이지', for: '마술사 · 밴드 · 공연팀', concept: '고급스러운',
    light: false,
    css: `/* 기본 톤 그대로 — 무대 조명 느낌 */
.a-name,.c-name,.b-date{font-family:"Nanum Myeongjo",serif}
`,
  },
  {
    code: 'OS-103', name: '매거진 세리프', for: '전 직군 · 인터뷰형', concept: '화려한',
    light: true,
    css: LIGHT({ bg:'#F0EDE6', bg2:'#E7E2D6', bg3:'#DDD7C7', line:'#C9C2B4',
                 ink:'#1A1815', ink2:'#544E44', ink3:'#8B8375', ac:'#8C2E2E', ac2:'#C08A8A' }) + `
.a-name,.c-name,.b-date{font-family:"Song Myung",serif;font-weight:400;letter-spacing:-.03em;line-height:.9}
h2{font-family:"Song Myung",serif;font-weight:400}
td.b{font-family:"Song Myung",serif;font-weight:400}
.rows .t{font-family:"Song Myung",serif;font-weight:400}
thead th{border-bottom:2px solid #1A1815}
.gal>div{filter:grayscale(1) contrast(1.15)}
.lede{font-size:16.5px;line-height:2}
`,
  },
  {
    code: 'OS-104', name: '한지 클래식', for: '트롯 · 국악 · 시니어', concept: '고급스러운',
    light: true,
    css: LIGHT({ bg:'#F6F1E4', bg2:'#EDE5D2', bg3:'#E4DAC3', line:'#D8CDB4',
                 ink:'#221E17', ink2:'#5B5245', ink3:'#8C8371', ac:'#A32B23', ac2:'#C99089' }) + `
body{font-family:"Noto Sans KR",sans-serif}
.a-name,.c-name,.b-date,h2,td.b,.rows .t,.mark{font-family:"Gowun Batang",serif;font-weight:700}
.a-line{font-family:"Gowun Batang",serif}
.facts>div,.gal>div{border-radius:2px}
.btn{border-radius:2px}
.gal>div{box-shadow:5px 5px 0 #E7DEC7}
.lede{font-size:16.5px;line-height:1.95}
`,
  },
  {
    code: 'OS-105', name: '포스터 볼드', for: '밴드 · 페스티벌 · 젊은 팀', concept: '역동적인',
    light: false,
    css: `
:root{--night:#101010;--night-2:#1B1B1B;--night-3:#242422;--line:#2E2E2C;
  --ivory:#F5F5F0;--ivory-2:#B8B8B0;--ivory-3:#8E8E88;--ac:#E8FF52;--ac-2:#8E9B33}
.a-name,.c-name,.b-date,h2,td.b,.mark{font-family:"Black Han Sans",sans-serif;
  font-weight:400;letter-spacing:-.03em}
.a-name{line-height:.86}
thead th{background:#E8FF52;color:#101010;font-weight:700}
.btn{color:#101010;font-family:"Black Han Sans",sans-serif;letter-spacing:0;border-radius:0}
.facts dd{font-family:"Black Han Sans",sans-serif;font-size:18px}
.eye{font-weight:500}
`,
  },

  /* ─────────── 비주얼 아트 ─────────── */
  {
    code: 'OS-106', name: '갤러리 화이트', for: '화가 · 사진작가 · 전시', concept: '심플한',
    light: true,
    css: LIGHT({ bg:'#FFFFFF', bg2:'#FAFAFA', bg3:'#F2F2F2', line:'#E8E8E8',
                 ink:'#111111', ink2:'#666666', ink3:'#A6A6A6', ac:'#111111', ac2:'#CCCCCC' }) + `
body{font-family:"Noto Sans KR",sans-serif;font-weight:300}
section{padding:clamp(64px,9vw,120px) 0;border-top:0}
.a-name,.c-name{font-family:"Noto Sans KR",sans-serif;font-weight:300;letter-spacing:.12em;
  font-size:clamp(26px,3.2vw,38px)}
h2{font-weight:300;letter-spacing:.04em}
.eye{letter-spacing:.36em;color:#A6A6A6}
.gal{gap:2px}
.facts{border:0;background:transparent;gap:0}
.facts>div{border-top:1px solid #E8E8E8;padding:18px 0 18px 0}
.btn{background:transparent;color:#111;border:1px solid #111;font-weight:400;letter-spacing:.1em}
`,
  },
  {
    code: 'OS-107', name: '아방가르드', for: '디지털 아티스트 · 그래픽 디자이너', concept: '독특한',
    light: false,
    css: `
:root{--night:#0A0A0A;--night-2:#151515;--night-3:#1F1F1F;--line:#2C2C2C;
  --ivory:#F4F4F4;--ivory-2:#A8A8A8;--ivory-3:#6E6E6E;--ac:#FF3B1F;--ac-2:#8E2415}
.a-name,.c-name{font-family:"Noto Sans KR",sans-serif;font-weight:900;
  letter-spacing:-.06em;text-transform:uppercase;line-height:.82}
h2{font-family:"Noto Sans KR",sans-serif;font-weight:900;letter-spacing:-.04em}
.eye{font-weight:500;letter-spacing:.4em}
.a-hero{align-items:start}
.a-shot,.b-shot{mix-blend-mode:luminosity;opacity:.9}
.gal>div{filter:grayscale(1) contrast(1.3)}
.gal>div:nth-child(2){transform:translateY(18px)}
.gal>div:nth-child(4){transform:translateY(-14px)}
.btn{border-radius:0;transform:skewX(-8deg);font-weight:700}
.btn>*{display:inline-block;transform:skewX(8deg)}
thead th{color:#FF3B1F}
`,
  },
  {
    code: 'OS-108', name: '에디토리얼 그리드', for: '디자이너 · 기획자 · 스튜디오', concept: '심플한',
    light: true,
    css: LIGHT({ bg:'#F4F4F1', bg2:'#EDEDE9', bg3:'#E4E4DF', line:'#D3D3CD',
                 ink:'#1C1C1A', ink2:'#575753', ink3:'#8D8D87', ac:'#1C1C1A', ac2:'#B0B0A9' }) + `
body{font-family:"IBM Plex Mono",monospace;font-size:15px}
.lede,.week__body p,.plan__d{font-family:"Noto Sans KR",sans-serif}
.a-name,.c-name,h2{font-family:"IBM Plex Mono",monospace;font-weight:500;letter-spacing:-.02em}
.a-name{font-size:clamp(34px,5vw,58px)}
.eye{letter-spacing:.2em}
.facts{border-radius:0}
.gal{gap:1px}
.btn{border-radius:0;font-family:"IBM Plex Mono",monospace;font-weight:500;letter-spacing:.04em}
section{border-top:1px dashed #D3D3CD}
`,
  },
  {
    code: 'OS-109', name: '다크 럭셔리', for: '클래식 연주자 · 타투 · 공예', concept: '고급스러운',
    light: false,
    css: `
:root{--night:#0B0A09;--night-2:#141210;--night-3:#1C1916;--line:#2A2622;
  --ivory:#EFE9DF;--ivory-2:#B0A797;--ivory-3:#7A7264;--ac:#B08D57;--ac-2:#6E5836}
body{font-family:"Noto Sans KR",sans-serif}
.a-name,.c-name,.b-date,h2,td.b,.mark,.rows .t{font-family:"Noto Serif KR",serif;font-weight:700}
.a-name{letter-spacing:.06em;font-weight:900}
.eye{letter-spacing:.34em}
.facts>div{border-top:1px solid rgba(176,141,87,.22)}
.btn{border-radius:0;letter-spacing:.08em}
.gal>div{border-color:rgba(176,141,87,.28)}
.lede{line-height:1.95}
`,
  },
  {
    code: 'OS-110', name: '소프트 파스텔', for: '일러스트레이터 · 동화작가 · 어린이 공연', concept: '귀여운',
    light: true,
    css: LIGHT({ bg:'#FDF8F4', bg2:'#F8EFE8', bg3:'#F2E5DA', line:'#EADACD',
                 ink:'#3A2E2A', ink2:'#71605A', ink3:'#A6928A', ac:'#E38B6D', ac2:'#EFC2AF' }) + `
body{font-family:"Gowun Dodum",sans-serif}
.a-name,.c-name,h2,td.b{font-family:"Gowun Dodum",sans-serif;font-weight:400;letter-spacing:-.01em}
.facts>div,.gal>div,.fill,.cbar,.form{border-radius:14px}
.facts{border-radius:14px;overflow:hidden}
.btn{border-radius:999px;font-weight:700}
.chip{border-radius:999px}
.eye{letter-spacing:.18em}
.lede{line-height:1.95}
`,
  },
  {
    code: 'OS-111', name: '필름 느와르', for: '배우 · 영상 · 프로덕션', concept: '고급스러운',
    light: false,
    css: `
:root{--night:#060607;--night-2:#0F0F11;--night-3:#17171A;--line:#26262A;
  --ivory:#EDEDEF;--ivory-2:#9E9EA6;--ivory-3:#66666E;--ac:#D8D8DC;--ac-2:#5A5A62}
body{font-family:"Noto Sans KR",sans-serif;font-weight:300}
.a-name,.c-name{font-family:"Noto Sans KR",sans-serif;font-weight:200;letter-spacing:.24em;
  text-transform:uppercase;font-size:clamp(24px,3vw,36px)}
h2{font-weight:200;letter-spacing:.1em}
.eye{letter-spacing:.42em;color:#9E9EA6}
.a-shot,.b-shot,.c-shot{filter:grayscale(1) contrast(1.25) brightness(.92)}
.gal>div{filter:grayscale(1) contrast(1.3) brightness(.88)}
.btn{background:transparent;color:#EDEDEF;border:1px solid #EDEDEF;letter-spacing:.16em;
  font-weight:400;border-radius:0}
section{border-top:1px solid #17171A}
`,
  },
  {
    code: 'OS-112', name: '무대 커튼', for: '국악 · 무용 · 뮤지컬', concept: '화려한',
    light: false,
    css: `
:root{--night:#170A0D;--night-2:#221014;--night-3:#2C161B;--line:#3D2027;
  --ivory:#F4E9E4;--ivory-2:#C3A8A2;--ivory-3:#8E7570;--ac:#D9A441;--ac-2:#8A6A2A}
body{font-family:"Noto Sans KR",sans-serif}
.a-name,.c-name,.b-date,h2,td.b,.mark,.rows .t{font-family:"Gowun Batang",serif;font-weight:700}
.a-name{letter-spacing:.05em}
.eye{letter-spacing:.3em}
.facts>div{background:#221014}
.btn{border-radius:2px;letter-spacing:.05em}
.gal>div{border-color:#3D2027}
.lede{line-height:1.95}
`,
  },
  {
    code: 'OS-113', name: '인디 라이브', for: '인디 밴드 · 클럽 · 버스킹', concept: '역동적인',
    light: false,
    css: `
:root{--night:#121214;--night-2:#1A1A1E;--night-3:#232328;--line:#33333A;
  --ivory:#F0F0F2;--ivory-2:#A5A5AE;--ivory-3:#71717B;--ac:#5CE1C4;--ac-2:#2E7A6A}
body{font-family:"Noto Sans KR",sans-serif}
.a-name,.c-name,.b-date,h2,td.b{font-family:"Black Han Sans",sans-serif;font-weight:400;letter-spacing:-.025em}
.eye{font-family:"IBM Plex Mono",monospace;letter-spacing:.28em;font-weight:500}
.rows>div{border-bottom:1px dashed #33333A}
.gal>div{border-radius:0;filter:saturate(1.15) contrast(1.08)}
.btn{border-radius:0;color:#121214;font-weight:700}
.chip{border-radius:0}
thead th{letter-spacing:.16em}
`,
  },

  /* ─────────── 문학 ─────────── */
  {
    code: 'OS-114', name: '문학 세리프', for: '작가 · 시인 · 평론가 · 강연자', concept: '심플한',
    light: true,
    css: LIGHT({ bg:'#FCFBF7', bg2:'#F5F3EC', bg3:'#EDEAE0', line:'#E0DCCF',
                 ink:'#1F1D18', ink2:'#57534A', ink3:'#8C8779', ac:'#3E5C48', ac2:'#9FB3A6' }) + `
body{font-family:"Noto Serif KR",serif;font-weight:400;line-height:1.95}
.a-name,.c-name,h2,td.b,.rows .t,.mark{font-family:"Noto Serif KR",serif;font-weight:900}
.a-name{font-size:clamp(34px,5.4vw,58px);letter-spacing:-.01em}
.eye{font-family:"IBM Plex Mono",monospace;letter-spacing:.24em}
.lede{font-size:17px;line-height:2.05;max-width:44ch}
.btn{border-radius:2px;font-family:"Noto Sans KR",sans-serif}
.gal>div{aspect-ratio:4/5}
`,
  },
  {
    code: 'OS-115', name: '컬러 블록', for: '아이돌 · 댄서 · 크루 · MC', concept: '역동적인',
    light: false,
    css: `
:root{--night:#141018;--night-2:#1D1724;--night-3:#261E2F;--line:#382B45;
  --ivory:#F3EFF7;--ivory-2:#B2A6C0;--ivory-3:#7E7189;--ac:#FF5DA2;--ac-2:#9B3563}
body{font-family:"Noto Sans KR",sans-serif}
.a-name,.c-name,.b-date,h2,td.b{font-family:"Noto Sans KR",sans-serif;font-weight:900;letter-spacing:-.035em}
.eye{font-weight:700;letter-spacing:.22em}
.facts>div:nth-child(2n){background:#261E2F}
.facts dd{color:#FF5DA2}
.gal>div{border-radius:10px;filter:saturate(1.2)}
.btn{border-radius:999px;color:#141018;font-weight:900}
.chip{border-radius:999px}
.cbar{border-color:#9B3563}
`,
  },
];

export const DESIGN_MAP = Object.fromEntries(DESIGNS.map((d) => [d.code, d]));

/** 직군이 정해지면 기본으로 붙는 디자인. JSON 에서 design 을 적으면 그쪽이 이긴다. */
export const DEFAULT_DESIGN = {
  magician: 'OS-102',
  singer:   'OS-104',
  actor:    'OS-101',
  band:     'OS-105',
};

export function designFor(artist) {
  return DESIGN_MAP[artist.design]
      || DESIGN_MAP[DEFAULT_DESIGN[artist.category]]
      || DESIGN_MAP['OS-102'];
}
