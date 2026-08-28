/**
 * 아티스트 한 명 → HTML 한 장.
 *
 * 축이 두 개다.
 *   category (직군)  — 어떤 블록이 들어가나  (마술사=레퍼토리, 배우=필모그래피 …)
 *   type     (유형)  — 어떤 순서로 배치하나  (A 원페이지 / B 일정중심 / C 섭외중심)
 *
 * 값이 비어 있으면 그 블록은 나오지 않는다.
 * 다만 artist.draft 가 true 이면 「채울 자리」 안내가 대신 나온다 — 시안 단계용.
 */

import { css } from './theme.mjs';
import { placeholder } from './placeholder.mjs';
import { designFor, FONT_HREF } from './designs.mjs';
import { INQUIRY_JS } from './inquiry.mjs';
import { LIGHTBOX_CSS, LIGHTBOX_JS } from './lightbox.mjs';

/* ---------- 도구 ---------- */

export const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const has = (v) => Array.isArray(v) ? v.length > 0 : (v !== undefined && v !== null && String(v).trim() !== '');
const nl = (s = '') => esc(s).replace(/\n/g, '<br>');

/** 값이 있으면 블록을, 없고 draft면 안내를, 없으면 아무것도 내지 않는다. */
function slot(artist, value, label, hint, build) {
  if (has(value)) return build();
  if (!artist.draft) return '';
  return `<div class="fill"><span>채울 자리 — ${esc(label)}</span><p>${esc(hint)}</p></div>`;
}

const img = (src, alt, cls = '') =>
  src ? `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : '';

/**
 * 사진 자리 하나를 채운다.
 * 진짜 사진이 있으면 그것을, 없으면 직군에 맞는 무대 그래픽을 돌려준다.
 * 빈 회색 상자를 남기지 않는 것이 목적이다 — 사람 사진을 지어내지는 않는다.
 */
function pic(a, kind, i = 0) {
  const ph = a.photos || {};
  const direct = kind === 'gallery' ? (ph.gallery || [])[i] : ph[kind];
  if (direct) return direct;
  const art = a.art || {};
  return placeholder({
    category: a.category, kind, seed: `${a.slug}-${kind}-${i}`,
    count: art.count, prop: art.prop,
  });
}

/* ---------- 공통 블록 ---------- */

function factGrid(artist) {
  const keys = Object.keys(artist.facts || {});
  if (!keys.length) return '';
  const cells = keys.map((k) => {
    const v = artist.facts[k];
    if (has(v)) return `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`;
    if (!artist.draft) return '';
    return `<div class="fill"><span>${esc(k)}</span><p>채우기</p></div>`;
  }).filter(Boolean).join('');
  return cells ? `<dl class="facts facts--4">${cells}</dl>` : '';
}

function profileBlock(artist) {
  const paras = (artist.intro || []).map((t) => `<p class="lede" style="margin-top:12px">${nl(t)}</p>`).join('');
  const bio = slot(artist, artist.intro, '약력',
    '데뷔 · 소속 · 주요 활동을 두세 문장으로. 프로필 자료에서 옮겨 넣습니다.',
    () => paras);
  const portrait = `<div>${img(pic(artist, 'portrait'), `${artist.name} 프로필`)}</div>`;
  return `<div class="wrap"><section id="about">
    <p class="eye">Profile</p>
    <h2>${esc(artist.profileTitle || '소개')}</h2>
    <div class="a-about" style="margin-top:26px">
      ${portrait}
      <div>${bio}${factGrid(artist)}</div>
    </div>
  </section></div>`;
}

function galleryBlock(artist) {
  // 사진이 있으면 있는 만큼 전부 건다 — 개수 제한이 없다.
  // 한 장도 없으면 캐릭터 그림 넉 장으로 채운다.
  // 단추로 만들어야 눌러서 크게 볼 수 있고 키보드로도 넘어간다.
  const shots = artist.photos?.gallery || [];
  const cells = (shots.length ? shots : [0, 1, 2, 3]).map((_, i) => {
    const src = pic(artist, 'gallery', i);
    const alt = `${artist.name} 사진 ${i + 1}`;
    return `<button type="button" data-src="${esc(src)}" data-alt="${esc(alt)}"
      aria-label="${esc(alt)} 크게 보기" style="background-image:url(&quot;${esc(src)}&quot;)"></button>`;
  });
  return `<div class="wrap"><section id="gallery">
    <p class="eye">Gallery</p>
    <h2>${esc(artist.galleryTitle || '무대에서')}</h2>
    <div class="gal" style="margin-top:24px">${cells.join('')}</div>
  </section></div>`;
}

function scheduleBlock(artist, { first = false } = {}) {
  const rows = (artist.shows || []).map((s) => `<div>
      <span class="d">${esc(s.date)}</span>
      <span class="t">${esc(s.title)}</span>
      <span class="p">${esc(s.place || '')}</span>
    </div>`).join('');
  const body = slot(artist, artist.shows, '일정',
    '다가오는 일정과 지난 기록. 본인이 직접 고치는 곳입니다 — 휴대폰에서 추가할 수 있게 만듭니다.',
    () => `<div class="rows" style="margin-top:22px">${rows}</div>`);
  if (!body) return '';
  return `<div class="wrap"><section id="schedule" class="${first ? 'first' : ''}">
    <p class="eye">Schedule</p><h2>${esc(artist.scheduleTitle || '일정')}</h2>${body}
  </section></div>`;
}

function historyBlock(artist) {
  const rows = (artist.history || []).map((h) => `<div>
      <span class="d">${esc(h.year)}</span>
      <span class="t" style="font-size:15px;font-family:var(--body);font-weight:400">${esc(h.text)}</span>
      <span class="p"></span>
    </div>`).join('');
  const body = slot(artist, artist.history, '이력',
    '연도 · 무대 또는 작품 · 규모. 수상이 있으면 맨 위에 따로 한 줄 넣습니다 — 섭외에 가장 강한 근거입니다.',
    () => `<div class="rows" style="margin-top:22px">${rows}</div>`);
  if (!body) return '';
  return `<div class="wrap"><section>
    <p class="eye">History</p><h2>${esc(artist.historyTitle || '활동 이력')}</h2>${body}
  </section></div>`;
}

function contactBlock(artist, { form = false } = {}) {
  const c = artist.contact || {};
  const links = ['instagram', 'youtube', 'kakao'].filter((k) => has(c[k]))
    .map((k) => `<a href="${esc(c[k])}">${k[0].toUpperCase() + k.slice(1)}</a>`).join(' · ');
  const formHtml = form ? `<form class="form js-inquiry" style="margin-top:20px"
      data-artist="${esc(artist.name)}">
      <div class="f"><label for="name">단체 · 담당자</label>
        <input id="name" name="name" type="text" required placeholder="예) ○○문화재단 김○○"></div>
      <div class="f"><label for="contact">연락처</label>
        <input id="contact" name="contact" type="text" required placeholder="전화 또는 이메일"></div>
      <div class="f f--full"><label for="when">행사일 · 장소</label>
        <input id="when" name="when" type="text" placeholder="예) 12월 14일, 성남아트센터"></div>
      <div class="f f--full"><label for="message">문의 내용</label>
        <textarea id="message" name="message" placeholder="예상 인원, 원하시는 구성 시간 등"></textarea></div>
      <div class="f f--full" aria-hidden="true" style="position:absolute;left:-9999px">
        <label for="company">회사</label><input id="company" name="company" type="text" tabindex="-1" autocomplete="off"></div>
      <div class="f f--full"><button class="btn" type="submit">문의 보내기</button>
        <p class="js-msg" hidden style="font-size:14.5px;margin-top:10px"></p></div>
    </form>` : '';
  return `<div class="wrap"><section id="contact">
    <div class="cbar">
      <div><h3>${esc(artist.contactTitle || '섭외 문의')}</h3>
        <p style="margin-top:4px">${esc(artist.contactNote || '일정과 장소만 알려주시면 가능 여부를 먼저 답해 드립니다.')}</p></div>
      ${has(c.phone) || has(c.email)
        ? `<a class="btn btn--big" href="${has(c.email) ? 'mailto:' + esc(c.email) : 'tel:' + esc(c.phone)}">문의 보내기</a>`
        : (artist.draft ? '<div class="fill"><span>연락처</span><p>전화 · 이메일 · 카카오</p></div>' : '')}
    </div>
    ${formHtml}
    <div class="sfoot"><span class="mark">${esc(artist.nameMark || artist.name)}</span><span>${links}</span></div>
  </section></div>`;
}

/* ---------- 직군 블록 ---------- */

function repertoire(artist) {
  const rows = (artist.acts || []).map((a) => `<tr>
      <td class="b">${esc(a.name)}</td><td class="n">${esc(a.time || '—')}</td>
      <td>${esc(a.stage || '—')}</td><td>${esc(a.note || '—')}</td></tr>`).join('');
  const body = slot(artist, artist.acts, '레퍼토리',
    '액트 이름 · 소요 시간 · 필요한 무대 크기 · 조명과 음향 조건. 담당자가 매번 전화로 묻는 것을 화면이 대신 답합니다.',
    () => `<div class="scroll" style="margin-top:22px"><table>
        <thead><tr><th>구성</th><th>소요 시간</th><th>필요 무대</th><th>비고</th></tr></thead>
        <tbody>${rows}</tbody></table></div>`);
  if (!body) return '';
  return `<div class="wrap"><section><p class="eye">Repertoire</p>
    <h2>${esc(artist.actsTitle || '무대 구성')}</h2>${body}</section></div>`;
}

function songs(artist) {
  const rows = (artist.songs || []).map((s) => `<tr>
      <td class="b">${esc(s.title)}</td><td class="n">${esc(s.year || '—')}</td>
      <td>${has(s.link) ? `<a href="${esc(s.link)}">듣기</a>` : '—'}</td>
      <td>${esc(s.note || '—')}</td></tr>`).join('');
  const body = slot(artist, artist.songs, '대표곡',
    '곡명 · 발표 연도 · 음원 링크(유튜브 · 멜론). 행사 담당자는 대개 한 곡만 듣고 결정합니다.',
    () => `<div class="scroll" style="margin-top:22px"><table>
        <thead><tr><th>곡</th><th>연도</th><th>듣기</th><th>비고</th></tr></thead>
        <tbody>${rows}</tbody></table></div>`);
  if (!body) return '';
  return `<div class="wrap"><section><p class="eye">Songs</p>
    <h2>${esc(artist.songsTitle || '대표곡')}</h2>${body}</section></div>`;
}

function filmography(artist) {
  const rows = (artist.works || []).map((w) => `<tr>
      <td class="n">${esc(w.year || '—')}</td><td class="b">${esc(w.title)}</td>
      <td>${esc(w.role || '—')}</td><td>${esc(w.medium || '—')}</td></tr>`).join('');
  const body = slot(artist, artist.works, '필모그래피',
    '연도 · 작품명 · 역할 · 매체(영화 · 드라마 · 연극 · 광고). 캐스팅 담당자가 가장 먼저 보는 표입니다.',
    () => `<div class="scroll" style="margin-top:22px"><table>
        <thead><tr><th>연도</th><th>작품</th><th>역할</th><th>매체</th></tr></thead>
        <tbody>${rows}</tbody></table></div>`);
  if (!body) return '';
  return `<div class="wrap"><section><p class="eye">Filmography</p>
    <h2>${esc(artist.worksTitle || '출연 작품')}</h2>${body}</section></div>`;
}

function members(artist) {
  const cards = (artist.members || []).map((m, i) => {
    const src = m.photo || placeholder({ category: artist.category, kind: 'card', seed: `${artist.slug}-m${i}` });
    return `<div class="member">
      <div class="ph" style="background-image:url(&quot;${esc(src)}&quot;)"></div>
      <b>${esc(m.name)}</b><span>${esc(m.part || '')}</span></div>`;
  }).join('');
  const body = slot(artist, artist.members, '멤버',
    '이름과 파트. 사진은 정사각형이 가장 잘 맞습니다.',
    () => `<div class="members" style="margin-top:22px">${cards}</div>`);
  if (!body) return '';
  return `<div class="wrap"><section><p class="eye">Members</p>
    <h2>${esc(artist.membersTitle || '멤버')}</h2>${body}</section></div>`;
}

/** 직군이 정하는 블록 묶음. 없는 직군은 공통 블록만 나온다. */
const CATEGORY_BLOCKS = {
  magician: [repertoire],
  singer:   [songs, repertoire],
  actor:    [filmography],
  band:     [members, songs],
};

export const CATEGORY_LABEL = {
  magician: '마술사',
  singer:   '트롯 · 행사 가수',
  actor:    '배우',
  band:     '밴드 · 싱어송라이터',
};

const catBlocks = (artist) => {
  const parts = (CATEGORY_BLOCKS[artist.category] || []).map((fn) => fn(artist)).filter(Boolean);
  if (!parts.length) return '';
  // 첫 직군 블록에 앵커를 붙인다 — 상단 메뉴의 「무대」가 여기로 온다
  parts[0] = parts[0].replace('<section', '<section id="work"');
  return parts.join('');
};

/* ---------- 상단 바 · 이어지는 링크 ---------- */

const WORK_LABEL = {
  magician: '무대', singer: '노래', actor: '작품', band: '멤버',
};

function siteBar(artist, site) {
  const menu = [
    { href: '#about', label: '소개' },
    (CATEGORY_BLOCKS[artist.category] || []).length
      ? { href: '#work', label: WORK_LABEL[artist.category] || '활동' } : null,
    (artist.shows || []).length ? { href: '#schedule', label: '일정' } : null,
    { href: '#gallery', label: '갤러리' },
    { href: '#contact', label: '섭외' },
  ].filter(Boolean);

  return `<header class="sitebar"><div class="wrap sitebar__in">
    <a class="sitebar__me" href="#top">${esc(artist.nameMark || artist.name)}</a>
    <nav class="sitebar__nav" aria-label="페이지 안">
      ${menu.map((m) => `<a href="${m.href}">${esc(m.label)}</a>`).join('')}
    </nav>
    <a class="sitebar__home" href="/list/">${esc(site.brand)} 목록</a>
  </div></header>`;
}

/** 같은 직군의 다른 아티스트로 이어준다. 목록으로 돌아가지 않아도 계속 볼 수 있게. */
function relatedBlock(artist, all, site) {
  const peers = (all || [])
    .filter((a) => a.slug !== artist.slug && a.category === artist.category && a.listed !== false)
    .slice(0, 3);
  if (!peers.length) return '';
  return `<div class="wrap"><section id="more">
    <p class="eye">More</p>
    <h2>같은 분야의 다른 아티스트</h2>
    <div class="related">
      ${peers.map((a) => `<a href="/${esc(a.slug)}/">
        <b>${esc(a.name)}</b>
        <span>${esc(a.summary || CATEGORY_LABEL[a.category] || '')}</span>
      </a>`).join('')}
    </div>
    <div style="margin-top:18px"><a class="btn btn--ghost" href="/list/">전체 목록 보기</a></div>
  </section></div>`;
}

/** 디자인 미리보기 페이지 위에 붙는 띠. */
function previewBar(design, site) {
  return `<div class="pvbar"><div class="wrap pvbar__in">
    <span class="pvbar__code">${esc(design.code)}</span>
    <span class="pvbar__name">${esc(design.name)}</span>
    <span class="pvbar__for">${esc(design.for)} · ${esc(design.concept)}</span>
    <span class="pvbar__acts">
      <a href="/designs/">다른 디자인</a>
      <a class="on" href="/#contact">이 디자인으로 문의</a>
    </span>
  </div></div>`;
}

/* ---------- 유형 배치 ---------- */

function layoutA(artist) {
  const hero = `<div class="wrap"><div class="a-hero">
      <div>
        ${has(artist.role) ? `<p class="a-role">${esc(artist.role)}</p>` : ''}
        <h1 class="a-name">${esc(artist.name)}</h1>
        ${has(artist.tagline) ? `<p class="a-line">${nl(artist.tagline)}</p>` : ''}
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:30px">
          <a class="btn" href="#contact">${esc(artist.ctaPrimary || '섭외 문의')}</a>
          ${has(artist.video) ? `<a class="btn btn--ghost" href="${esc(artist.video)}">영상 보기</a>` : ''}
        </div>
      </div>
      ${img(pic(artist, 'hero'), `${artist.name}`, 'a-shot')}
    </div></div>`;
  return hero + profileBlock(artist) + catBlocks(artist) + galleryBlock(artist) + contactBlock(artist);
}

function layoutB(artist) {
  const next = (artist.shows || [])[0];
  const band = `<div class="b-band"><div class="wrap">
      <p class="eye" style="margin-bottom:4px">${esc(artist.nextLabel || 'Next Show')}</p>
      ${next ? `<div class="b-next">
          <div class="b-date">${esc(next.date)}${next.time ? `<span>${esc(next.time)}</span>` : ''}</div>
          <div><div class="b-tit">${esc(next.title)}</div>
            <div class="b-place">${esc(next.place || '')}</div></div>
          ${has(next.ticket) ? `<a class="btn" href="${esc(next.ticket)}">예매하기</a>` : ''}
        </div>`
      : (artist.draft ? `<div class="fill" style="margin-top:14px"><span>채울 자리 — 다음 일정</span>
          <p>가장 가까운 일정 하나를 여기에 둡니다. 이 자리가 비면 B안은 힘을 잃습니다 — 일정이 드물면 A안이나 C안이 낫습니다.</p></div>` : '')}
    </div></div>`;
  const two = `<div class="wrap"><section><div class="b-two">
      <div><p class="eye">On Stage</p><h2>${esc(artist.profileTitle || '소개')}</h2>
        ${(artist.intro || []).map((t) => `<p class="lede" style="margin-top:12px">${nl(t)}</p>`).join('')}
        ${factGrid(artist)}</div>
      ${img(pic(artist, 'hero'), artist.name, 'b-shot')}
    </div></section></div>`;
  return band + scheduleBlock(artist, { first: true }) + catBlocks(artist) + two
       + galleryBlock(artist) + contactBlock(artist);
}

function layoutC(artist) {
  const top = `<div class="c-top"><div class="wrap">
      <div class="c-head">
        ${img(artist.photos?.portrait || artist.photos?.hero || pic(artist, 'portrait'), artist.name, 'c-shot')}
        <div>
          ${has(artist.listing?.field) ? `<p class="eye" style="margin-bottom:6px">${esc(artist.listing.field)}</p>` : ''}
          <div class="c-name">${esc(artist.name)}</div>
          ${has(artist.summary) ? `<p class="c-sub">${nl(artist.summary)}</p>` : ''}
        </div>
        <div class="c-actions">
          <a class="btn btn--big" href="#contact">섭외 문의</a>
          ${has(artist.press) ? `<a class="btn btn--ghost" href="${esc(artist.press)}">자료 받기</a>` : ''}
        </div>
      </div>
      ${factGrid(artist)}
    </div></div>`;
  return top + catBlocks(artist) + galleryBlock(artist) + historyBlock(artist)
       + contactBlock(artist, { form: true });
}

const LAYOUTS = { A: layoutA, B: layoutB, C: layoutC };

/* ---------- 한 장으로 ---------- */

export function renderArtist(artist, site, opts = {}) {
  const layout = LAYOUTS[artist.type] || layoutA;
  const design = designFor(artist);
  const title = `${artist.name}${artist.role ? ' · ' + artist.role : ''}`;
  const desc = artist.summary || (artist.intro || [])[0] || `${artist.name} 공식 페이지`;
  const draftBar = artist.draft
    ? `<p class="draft">시안 · <b>사진은 실제 자료</b>, 이력과 세부 정보는 <b>채워 넣을 자리</b>입니다</p>`
    : '';

  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
${artist.photos?.hero ? `<meta property="og:image" content="${esc(artist.photos.hero)}">` : ''}
<meta property="og:type" content="profile">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONT_HREF}">
<style>${css(artist.accent)}
${LIGHTBOX_CSS}
/* ${design.code} · ${design.name} */
${design.css}</style>
</head>
<body id="top">
${opts.preview ? previewBar(opts.preview, site) : ''}
${draftBar}
${siteBar(artist, site)}
${layout(artist)}
${opts.preview ? '' : relatedBlock(artist, opts.all, site)}
<p style="text-align:center;padding:20px;font-size:13px;color:var(--ivory-3);
  border-top:1px solid var(--line)">
  <a href="/" style="color:var(--ivory-3);text-decoration:none">${esc(site.brand)}</a>
  <span style="opacity:.5"> · </span>
  <a href="/list/" style="color:var(--ivory-3);text-decoration:none">아티스트 목록</a>
  <span style="opacity:.5"> · </span>
  <a href="/designs/" style="color:var(--ivory-3);text-decoration:none">디자인</a>
  <span style="opacity:.5"> · </span>
  <a href="/#contact" style="color:var(--ivory-3);text-decoration:none">홈페이지 제작 문의</a>
</p>
<script>${INQUIRY_JS}
${LIGHTBOX_JS}</script>
</body>
</html>`;
}
