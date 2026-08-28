/**
 * 직군별 캐릭터 그림.
 *
 * 실제 인물 사진을 지어내지 않는다 — 대신 누가 봐도 그림인 캐릭터를 그린다.
 * 얼굴은 점 두 개와 웃는 입뿐이라 특정인으로 오해될 수 없고,
 * 만화라는 것이 분명해서 「사진이 없다」로 읽히지 않는다.
 *
 * 색은 디자인에서 받아 쓴다. 같은 캐릭터가 디자인마다 다른 옷을 입는다.
 *
 * 아티스트 JSON:
 *   "art": { "count": 5, "prop": "hat" }
 */

const PALETTE = {
  magician: { bg1:'#3A2555', bg2:'#150E22', ac:'#E0B964', ink:'#1A1226', glow:'#F5E3B8' },
  singer:   { bg1:'#52242F', bg2:'#1E0D13', ac:'#F0A6AE', ink:'#2A1219', glow:'#FBDCD5' },
  actor:    { bg1:'#2C3murky', bg2:'#101419', ac:'#A8C4E4', ink:'#161C24', glow:'#E6F0FA' },
  band:     { bg1:'#26301F', bg2:'#0D100C', ac:'#D9E85C', ink:'#141914', glow:'#F2F9B4' },
  default:  { bg1:'#2E2E3C', bg2:'#131318', ac:'#A8AEBC', ink:'#1A1A22', glow:'#E4E7EE' },
};
PALETTE.actor.bg1 = '#2C3745';

const SKIN = '#F2D3B4';
const SKIN_2 = '#DFB894';

const DEFAULT_PROP = { magician: 'hat', singer: 'mic', actor: 'plain', band: 'guitar' };

const RATIO = {
  hero:     [900, 1120],
  portrait: [760, 950],
  card:     [1040, 780],
  gallery:  [760, 950],
  wide:     [1280, 720],
  square:   [800, 800],
};

function seedOf(s = '') {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}

/* ── 색 다루기 — 디자인이 준 색 하나로 배경 두 단계와 빛을 만든다 ── */

const toRgb = (hex) => {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};
const toHex = (rgb) =>
  '#' + rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
/** t 가 양수면 흰쪽, 음수면 검은쪽으로 옮긴다. */
const shade = (hex, t) => {
  const target = t > 0 ? 255 : 0;
  const k = Math.abs(t);
  return toHex(toRgb(hex).map((v) => v + (target - v) * k));
};
const isLight = (hex) => {
  const [r, g, b] = toRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
};

/**
 * 디자인이 { bg, ink, ac } 만 줘도 그림에 필요한 색을 채워 준다.
 * 밝은 바탕이면 인물을 진하게, 어두운 바탕이면 옅게 잡아 어느 쪽에서도 읽힌다.
 */
function fromDesign(c) {
  if (!c || !c.bg) return c;
  const light = isLight(c.bg);
  return {
    bg1: light ? shade(c.bg, 0.35) : shade(c.bg, 0.10),
    bg2: light ? shade(c.bg, -0.04) : shade(c.bg, -0.35),
    ac: c.ac,
    ink: light ? shade(c.ink, 0.06) : shade(c.ink, -0.35),
    glow: light ? shade(c.ac, 0.45) : shade(c.ac, 0.30),
  };
}

/* ── 캐릭터 한 사람. viewBox 0 0 100 120, 발끝이 y=120 ── */

function character({ ac, ink, prop, v }) {
  const hairStyle = v % 3;

  const hair = [
    // 단정한 머리
    `<path d="M27 38c0-14 10-24 23-24s23 10 23 24c0-6-4-9-8-10-3 4-9 6-15 6s-12-2-15-6c-4 1-8 4-8 10z" fill="${ink}"/>`,
    // 옆으로 넘긴 머리
    `<path d="M27 38c0-14 10-24 23-24 12 0 20 6 22 16-4-3-11-6-19-6-9 0-15 3-19 8-3 2-5 4-7 6z" fill="${ink}"/>`,
    // 짧은 머리
    `<path d="M28 36c1-13 10-22 22-22s21 9 22 22c-3-5-7-8-12-9-3 2-6 3-10 3s-7-1-10-3c-5 1-9 4-12 9z" fill="${ink}"/>`,
  ][hairStyle];

  const props = {
    hat: `<g><ellipse cx="50" cy="19" rx="27" ry="5" fill="${ink}"/>
            <path d="M33 19V6c0-2 1-3 3-3h28c2 0 3 1 3 3v13z" fill="${ink}"/>
            <rect x="33" y="12" width="34" height="4" fill="${ac}"/></g>`,
    dove: `<g><ellipse cx="50" cy="19" rx="27" ry="5" fill="${ink}"/>
             <path d="M33 19V6c0-2 1-3 3-3h28c2 0 3 1 3 3v13z" fill="${ink}"/>
             <rect x="33" y="12" width="34" height="4" fill="${ac}"/></g>
           <g transform="translate(2 -4)">
             <ellipse cx="88" cy="52" rx="9" ry="6" fill="#FFFFFF"/>
             <path d="M86 48c5-6 13-8 19-5-4 2-6 5-6 8 4-1 8 0 11 3-5 0-9 2-12 5-2-5-6-9-12-11z" fill="#FFFFFF"/>
             <circle cx="94" cy="50" r="1.4" fill="${ink}"/>
             <path d="M97 51l4 1-4 1z" fill="${ac}"/></g>`,
    cards: `<g transform="translate(74 56) rotate(-14)">
              <rect x="-6" y="0" width="13" height="19" rx="2" fill="#FFFFFF" stroke="${ink}" stroke-width="1" transform="rotate(-18)"/>
              <rect x="0" y="-2" width="13" height="19" rx="2" fill="#FFFFFF" stroke="${ink}" stroke-width="1"/>
              <rect x="6" y="0" width="13" height="19" rx="2" fill="#FFFFFF" stroke="${ink}" stroke-width="1" transform="rotate(18 12 9)"/>
              <path d="M4 6l2-2 2 2-2 3z" fill="${ac}"/></g>`,
    mic: `<g><rect x="80" y="30" width="12" height="21" rx="6" fill="${ink}"/>
            <rect x="82" y="33" width="8" height="15" rx="4" fill="${ac}" opacity=".6"/>
            <path d="M85.5 51h2v18h-2z" fill="${ink}"/>
            <path d="M77 45a9 9 0 0 0 18 0h-3a6 6 0 0 1-12 0z" fill="${ink}"/></g>`,
    handmic: `<g transform="rotate(16 78 52)">
                <rect x="74" y="34" width="10" height="17" rx="5" fill="${ink}"/>
                <rect x="76" y="36" width="6" height="12" rx="3" fill="${ac}" opacity=".6"/>
                <rect x="77" y="50" width="4" height="9" rx="2" fill="${ink}"/></g>`,
    guitar: `<g><path d="M30 104c8 0 14-6 14-13s-6-13-14-13-14 6-14 13 6 13 14 13z" fill="${ac}"/>
               <circle cx="30" cy="91" r="5" fill="${ink}" opacity=".55"/>
               <path d="M40 84 70 50l5 4-30 34z" fill="${ink}"/>
               <rect x="68" y="45" width="10" height="8" rx="1.5" fill="${ink}"/></g>`,
    frame: `<rect x="10" y="10" width="80" height="104" rx="2" fill="none" stroke="${ac}"
              stroke-width="2.5" opacity=".55"/>`,
    hand: '',
    plain: '',
  };

  const backProp = prop === 'frame' ? props.frame : '';
  const frontProp = prop === 'frame' ? '' : (props[prop] || '');

  return `
    ${backProp}
    <!-- 몸 -->
    <path d="M50 68c-13 0-22 8-24 20-1 7-2 14-2 22v10h52v-10c0-8-1-15-2-22-2-12-11-20-24-20z" fill="${ac}"/>
    <!-- 셔츠 -->
    <path d="M42 69h16l-3 16h-10z" fill="#FFFFFF"/>
    <!-- 보타이 -->
    <path d="M50 74l-7-4v8zM50 74l7-4v8z" fill="${ink}"/>
    <circle cx="50" cy="74" r="2.2" fill="${ink}"/>
    <!-- 목 -->
    <path d="M45 58h10v12h-10z" fill="${SKIN_2}"/>
    <!-- 머리 -->
    <circle cx="50" cy="40" r="22" fill="${SKIN}"/>
    ${hair}
    <!-- 눈 · 입 -->
    <circle cx="42" cy="42" r="2.6" fill="${ink}"/>
    <circle cx="58" cy="42" r="2.6" fill="${ink}"/>
    <path d="M45 49c1.6 2.4 3.2 3.4 5 3.4s3.4-1 5-3.4" fill="none" stroke="${ink}"
      stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="36" cy="47" r="3" fill="#E8A08C" opacity=".45"/>
    <circle cx="64" cy="47" r="3" fill="#E8A08C" opacity=".45"/>
    ${frontProp}`;
}

/** 여러 명을 무대에 세운다. 가운데가 가장 크고 앞에 선다. */
function crowd({ count, prop, n, w, h, kind }) {
  const baseH = (kind === 'card' || kind === 'wide') ? h * 0.84 : h * 0.78;

  if (count <= 1) {
    const fh = baseH;
    const fw = fh * (100 / 120);
    return [{ x: (w - fw) / 2, y: h - fh, s: fw / 100, dim: 1, v: n % 3, prop, back: false }];
  }

  const mid = (count - 1) / 2;
  const order = Array.from({ length: count }, (_, i) => i)
    .sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));

  const spread = w * (count <= 3 ? 0.60 : 0.76);
  const step = spread / Math.max(count - 1, 1);
  const startX = (w - spread) / 2;

  return order.map((i, rank) => {
    const off = Math.abs(i - mid) / Math.max(mid, 1);
    const fh = baseH * (1 - off * 0.15) * 0.92;
    const fw = fh * (100 / 120);
    return {
      x: startX + step * i - fw / 2,
      y: h - fh - off * h * 0.012,
      s: fw / 100,
      dim: 1 - off * 0.22,
      v: (n + i * 5) % 3,
      prop: rank === 0 ? prop : (prop === 'guitar' && i % 2 === 0 ? 'guitar' : 'plain'),
      back: rank !== 0,
    };
  }).sort((a, b) => (b.back ? 1 : 0) - (a.back ? 1 : 0));
}

/**
 * @param {object} o
 * @param {string} o.category  magician | singer | actor | band
 * @param {string} o.kind      hero | portrait | card | gallery | wide | square
 * @param {string} o.seed
 * @param {number} [o.count]   인원수 (1~6)
 * @param {string} [o.prop]    hat | dove | cards | mic | handmic | guitar | frame | plain
 * @param {object} [o.colors]  { bg1, bg2, ac, ink, glow } — 디자인 색을 입힐 때
 * @returns {string} data: URI (SVG)
 */
export function placeholder({
  category = 'default', kind = 'hero', seed = '', count, prop, colors,
} = {}) {
  const p = { ...(PALETTE[category] || PALETTE.default), ...(fromDesign(colors) || colors || {}) };
  const [w, h] = RATIO[kind] || RATIO.hero;

  const n = seedOf(seed + kind);
  const people = Math.min(Math.max(count || 1, 1), 6);
  const useProp = prop || DEFAULT_PROP[category] || 'plain';

  const beamX = 38 + (n % 26);
  const tilt = -9 + ((n >> 2) % 18);
  const ringY = 28 + ((n >> 4) % 14);

  const figures = crowd({ count: people, prop: useProp, n, w, h, kind });

  const drawn = figures.map((f) => `<g transform="translate(${f.x.toFixed(1)} ${f.y.toFixed(1)}) scale(${f.s.toFixed(3)})" opacity="${f.dim.toFixed(2)}">
      ${character({ ac: p.ac, ink: p.ink, prop: f.prop, v: f.v })}
    </g>`).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="무대 위 캐릭터 그림">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0" stop-color="${p.bg1}"/><stop offset="1" stop-color="${p.bg2}"/>
    </linearGradient>
    <radialGradient id="spot" cx="${beamX}%" cy="12%" r="74%">
      <stop offset="0" stop-color="${p.glow}" stop-opacity=".30"/>
      <stop offset="0.45" stop-color="${p.ac}" stop-opacity=".10"/>
      <stop offset="1" stop-color="${p.bg2}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.glow}" stop-opacity=".22"/>
      <stop offset="1" stop-color="${p.glow}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="floor" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${p.glow}" stop-opacity=".24"/>
      <stop offset="1" stop-color="${p.glow}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="c"><rect width="${w}" height="${h}"/></clipPath>
  </defs>

  <g clip-path="url(#c)">
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <circle cx="${w * 0.5}" cy="${h * (ringY / 100)}" r="${w * 0.36}"
            fill="none" stroke="${p.ac}" stroke-opacity=".22" stroke-width="1.6"/>
    <circle cx="${w * 0.5}" cy="${h * (ringY / 100)}" r="${w * 0.24}"
            fill="none" stroke="${p.ac}" stroke-opacity=".12" stroke-width="1"/>
    <g transform="translate(${w * (beamX / 100)} ${-h * 0.05}) rotate(${tilt})">
      <path d="M0 0 L${-w * 0.32} ${h * 1.05} L${w * 0.32} ${h * 1.05} Z" fill="url(#beam)"/>
    </g>
    <rect width="${w}" height="${h}" fill="url(#spot)"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.955}" rx="${w * 0.34}" ry="${h * 0.04}" fill="url(#floor)"/>
    ${drawn}
  </g>
</svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg.replace(/\n\s*/g, ' '));
}
