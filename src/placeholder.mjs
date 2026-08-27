/**
 * 직군별 가상 이미지.
 *
 * 사람 얼굴을 지어내지 않는다 — 실존 인물로 오해되면 안 되고, 만들어낸 얼굴은 금세 티가 난다.
 * 대신 무대 조명 아래 선 인물의 실루엣을 그린다. 공연 포스터가 오래 써 온 방식이다.
 *
 * 아티스트 JSON 의 art 로 조정한다.
 *   "art": { "count": 5, "prop": "hat" }
 * count 는 인원수(1~6), prop 은 손에 든 것.  없으면 직군 기본값을 쓴다.
 * 같은 사람은 늘 같은 그림이 나온다 (slug 을 씨앗으로 쓴다).
 */

const PALETTE = {
  magician: { a: '#100B18', b: '#2E1E44', ac: '#C9A96A', glow: '#F0DCB0', floor: '#1A1226' },
  singer:   { a: '#1A0C11', b: '#48212D', ac: '#E29AA4', glow: '#F7D4CB', floor: '#2A1219' },
  actor:    { a: '#0E1116', b: '#28323F', ac: '#A8C4E4', glow: '#E2EDF8', floor: '#161C24' },
  band:     { a: '#0C0E0D', b: '#20291F', ac: '#D9E85C', glow: '#F2F9B4', floor: '#141914' },
  default:  { a: '#121218', b: '#2A2A36', ac: '#A8AEBC', glow: '#E4E7EE', floor: '#1A1A22' },
};

const DEFAULT_PROP = { magician: 'hat', singer: 'mic', actor: 'plain', band: 'guitar' };

/* ── 조각. 한 사람은 viewBox 0 0 100 120, 바닥이 y=120 ── */

const BUST = 'M50 46c-9 0-16 6-19 15-2 7-3 14-3 21v38h44V82c0-7-1-14-3-21-3-9-10-15-19-15z';
const head = (cy, r) => `<circle cx="50" cy="${cy}" r="${r}"/>`;

const PROP = {
  /* 실크햇 */
  hat: `<path d="M33 21h34v4H33z"/><path d="M38 3h24v18H38z"/>`,
  /* 실크햇 + 든 손에서 날아오르는 새 */
  dove: `<path d="M33 21h34v4H33z"/><path d="M38 3h24v18H38z"/>
         <path d="M64 62c5-6 11-13 16-19l6 4c-6 7-12 14-17 20z"/><circle cx="84" cy="45" r="5.5"/>
         <path d="M90 36c5-4 11-5 16-2-4 1-6 4-7 6 4 0 7 1 10 4-5 0-8 1-11 4-1-5-4-9-8-12z" fill-opacity=".92"/>
         <path d="M90 36c-4-4-4-11-1-15 1 3 3 6 5 7 0-4 3-7 6-9-2 4-1 8 0 11-4 1-7 3-10 6z" fill-opacity=".72"/>`,
  /* 부채꼴 카드 */
  cards: `<g transform="translate(70 54) rotate(-18)">
            <rect x="0" y="0" width="12" height="18" rx="1.5" transform="rotate(-16)"/>
            <rect x="5" y="-1" width="12" height="18" rx="1.5"/>
            <rect x="10" y="0" width="12" height="18" rx="1.5" transform="rotate(16 16 9)"/>
          </g><circle cx="66" cy="62" r="5"/>`,
  /* 스탠드 마이크 */
  mic: `<rect x="78" y="29" width="11" height="19" rx="5.5"/><path d="M83 48h1.4v15H83z"/>
        <path d="M75 43a8.5 8.5 0 0 0 17 0h-2.5a6 6 0 0 1-12 0z"/>`,
  /* 손에 든 마이크 (진행자) */
  handmic: `<path d="M63 63c4-5 9-11 14-16l5 4c-5 6-10 12-14 17z"/><circle cx="80" cy="48" r="5"/>
            <rect x="80" y="30" width="9" height="16" rx="4.5" transform="rotate(14 84 38)"/>`,
  /* 기타 */
  guitar: `<path d="M34 98a13 13 0 1 0 0-26 13 13 0 0 0 0 26z" fill-opacity=".85"/>
           <circle cx="34" cy="85" r="4.5" fill-opacity=".4"/>
           <path d="M44 80 72 46l4 3-28 34z"/><path d="M70 42h8v6h-8z"/>`,
  /* 든 손만 */
  hand: `<path d="M64 62c5-6 11-13 16-19l6 4c-6 7-12 14-17 20z"/><circle cx="84" cy="45" r="5.5"/>`,
  /* 필름 프레임 — 인물 뒤로 깔린다 */
  frame: `<rect x="14" y="14" width="72" height="92" fill="none" stroke="currentColor"
            stroke-width="2.2" stroke-opacity=".55"/>
          <rect x="8" y="20" width="5" height="7" fill-opacity=".5"/>
          <rect x="8" y="34" width="5" height="7" fill-opacity=".5"/>
          <rect x="8" y="48" width="5" height="7" fill-opacity=".5"/>
          <rect x="87" y="20" width="5" height="7" fill-opacity=".5"/>
          <rect x="87" y="34" width="5" height="7" fill-opacity=".5"/>
          <rect x="87" y="48" width="5" height="7" fill-opacity=".5"/>`,
  plain: '',
};

/** 한 사람. v 로 머리 크기와 자세가 조금씩 달라진다. */
function person(prop, v) {
  const r = 12 + (v % 3);
  const cy = 30 + (v % 3);
  // 프레임은 인물 뒤로 깔리므로 먼저 그린다
  const back = prop === 'frame' ? PROP.frame : '';
  const front = prop === 'frame' ? '' : (PROP[prop] || '');
  return `${back}${head(cy, r)}<path d="${BUST}"/>${front}`;
}

const RATIO = {
  hero:     [900, 1120],
  portrait: [760, 950],
  card:     [1040, 780],
  gallery:  [760, 950],
  wide:     [1280, 720],
};

function seedOf(s = '') {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}

/** 여러 명을 무대에 세운다. 가운데가 가장 크고 앞에 선다. */
function crowd({ count, prop, n, w, h, kind }) {
  const solo = count <= 1;
  const baseH = kind === 'card' || kind === 'wide' ? h * 0.88 : h * 0.82;

  if (solo) {
    const fh = baseH;
    const fw = fh * (100 / 120);
    return [{ x: (w - fw) / 2, y: h - fh, s: fw / 100, dim: 1, v: n % 3, prop }];
  }

  // 가운데부터 바깥으로 배치 순서를 만든다
  const order = [];
  const mid = (count - 1) / 2;
  for (let i = 0; i < count; i++) order.push(i);
  order.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));

  const spread = w * (count <= 3 ? 0.62 : 0.78);
  const step = spread / Math.max(count - 1, 1);
  const startX = (w - spread) / 2;

  return order.map((i, rank) => {
    const off = Math.abs(i - mid) / Math.max(mid, 1);   // 0(가운데) ~ 1(끝)
    const s = 1 - off * 0.16;
    const fh = baseH * s * 0.94;
    const fw = fh * (100 / 120);
    return {
      x: startX + step * i - fw / 2,
      y: h - fh - off * h * 0.015,
      s: fw / 100,
      dim: 1 - off * 0.30,
      v: (n + i * 7) % 3,
      // 소품은 가운데 한 사람만 크게, 나머지는 담백하게
      prop: rank === 0 ? prop : (prop === 'guitar' && i % 2 === 0 ? 'guitar' : 'plain'),
      back: rank !== 0,
    };
  }).sort((a, b) => (b.back ? 1 : 0) - (a.back ? 1 : 0));  // 뒷사람 먼저 그린다
}

/**
 * @param {object} o
 * @param {string} o.category  magician | singer | actor | band
 * @param {string} o.kind      hero | portrait | card | gallery | wide
 * @param {string} o.seed      아티스트 slug 등
 * @param {number} [o.count]   인원수 (1~6)
 * @param {string} [o.prop]    hat | dove | cards | mic | handmic | guitar | hand | plain
 * @returns {string} data: URI (SVG)
 */
export function placeholder({ category = 'default', kind = 'hero', seed = '', count, prop } = {}) {
  const p = PALETTE[category] || PALETTE.default;
  const [w, h] = RATIO[kind] || RATIO.hero;

  const n = seedOf(seed + kind);
  const people = Math.min(Math.max(count || 1, 1), 6);
  const useProp = prop || DEFAULT_PROP[category] || 'plain';

  const beamX = 38 + (n % 26);
  const tilt = -10 + ((n >> 2) % 20);
  const ringY = 30 + ((n >> 4) % 14);
  const grain = 0.04 + ((n >> 6) % 4) / 220;
  const curtains = (n >> 8) % 2 === 0;

  const figures = crowd({ count: people, prop: useProp, n, w, h, kind });

  const curtainLines = curtains
    ? Array.from({ length: 9 }, (_, i) => {
        const x = (w / 9) * i + (n % 17);
        return `<path d="M${x} 0 Q${x + 12} ${h * 0.5} ${x} ${h}" stroke="${p.ac}" stroke-opacity=".05" stroke-width="${8 + (i % 3) * 5}" fill="none"/>`;
      }).join('')
    : '';

  const drawn = figures.map((f) => {
    const body = person(f.prop, f.v);
    return `<g transform="translate(${f.x.toFixed(1)} ${f.y.toFixed(1)}) scale(${f.s.toFixed(3)})" opacity="${f.dim.toFixed(2)}">
      <g fill="${p.a}" fill-opacity=".95">${body}</g>
      <g fill="none" stroke="${p.ac}" stroke-opacity=".32" stroke-width=".7">${body}</g>
    </g>`;
  }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="무대 위 인물 그래픽">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0" stop-color="${p.b}"/><stop offset="1" stop-color="${p.a}"/>
    </linearGradient>
    <radialGradient id="spot" cx="${beamX}%" cy="14%" r="76%">
      <stop offset="0" stop-color="${p.glow}" stop-opacity=".34"/>
      <stop offset="0.42" stop-color="${p.ac}" stop-opacity=".12"/>
      <stop offset="1" stop-color="${p.a}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.glow}" stop-opacity=".24"/>
      <stop offset="1" stop-color="${p.glow}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="floor" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${p.glow}" stop-opacity=".22"/>
      <stop offset="1" stop-color="${p.glow}" stop-opacity="0"/>
    </radialGradient>
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3"/>
      <feColorMatrix type="saturate" values="0"/></filter>
    <clipPath id="c"><rect width="${w}" height="${h}"/></clipPath>
  </defs>

  <g clip-path="url(#c)">
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    ${curtainLines}
    <circle cx="${w * 0.5}" cy="${h * (ringY / 100)}" r="${w * 0.38}"
            fill="none" stroke="${p.ac}" stroke-opacity=".14" stroke-width="1.4"/>
    <circle cx="${w * 0.5}" cy="${h * (ringY / 100)}" r="${w * 0.26}"
            fill="none" stroke="${p.ac}" stroke-opacity=".09" stroke-width="1"/>
    <g transform="translate(${w * (beamX / 100)} ${-h * 0.06}) rotate(${tilt})">
      <path d="M0 0 L${-w * 0.34} ${h * 1.06} L${w * 0.34} ${h * 1.06} Z" fill="url(#beam)"/>
    </g>
    <rect width="${w}" height="${h}" fill="url(#spot)"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.965}" rx="${w * 0.36}" ry="${h * 0.045}" fill="url(#floor)"/>
    ${drawn}
    <rect y="${h * 0.88}" width="${w}" height="${h * 0.12}" fill="${p.floor}" fill-opacity=".5"/>
    <rect width="${w}" height="${h}" filter="url(#n)" opacity="${grain}"/>
  </g>
</svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg.replace(/\n\s*/g, ' '));
}
