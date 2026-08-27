/**
 * 아티스트 가상 이미지 한눈에 보기.
 * data 의 모든 아티스트에 대해 자리표 그래픽을 뽑아 한 장에 늘어놓는다.
 * 검토용이며 배포물이 아니다.  실행: node contact-sheet.mjs
 */

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { placeholder } from './src/placeholder.mjs';
import { CATEGORY_LABEL } from './src/render.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const p = (...x) => path.join(root, ...x);
const readJson = async (f) => JSON.parse(await readFile(f, 'utf8'));
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const list = [];
for (const f of (await readdir(p('data', 'artists'))).filter((x) => x.endsWith('.json'))) {
  list.push(await readJson(p('data', 'artists', f)));
}
if (existsSync(p('data', 'samples.json'))) list.push(...await readJson(p('data', 'samples.json')));
list.sort((a, b) => (a.order ?? 100) - (b.order ?? 100));

const cards = list.map((a) => {
  const art = a.art || {};
  const src = placeholder({
    category: a.category, kind: 'hero', seed: `${a.slug}-hero-0`,
    count: art.count, prop: art.prop,
  });
  const real = a.photos?.hero ? '실제 사진 있음' : '';
  return `<figure>
    <img src="${esc(src)}" alt="${esc(a.name)} 무대 그래픽" loading="lazy">
    <figcaption>
      <b>${esc(a.name)}</b>
      <span>${esc(CATEGORY_LABEL[a.category] || a.category)}</span>
      <i>${art.count ? art.count + '인' : '솔로'} · ${esc(art.prop || '기본')}${real ? ' · ' + real : ''}</i>
    </figcaption>
  </figure>`;
}).join('');

const html = `<title>온스테이지 아티스트 이미지</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+KR:wght@400;500;700&display=swap">
<style>
  :root{--bg:#0D0D10;--sf:#16161B;--ln:#28282F;--tx:#EDEDF1;--dm:#8A8A95;--ac:#7FC2B4;
    --mono:"IBM Plex Mono",monospace}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--tx);
    font-family:"Pretendard","Noto Sans KR",sans-serif;line-height:1.7}
  header{border-bottom:1px solid var(--ln);background:var(--sf)}
  .in{max-width:1240px;margin:0 auto;padding:20px clamp(16px,4vw,34px)}
  h1{font-size:21px;margin:0 0 4px}
  h1 b{color:var(--ac);font-weight:400}
  .note{font-size:14px;color:var(--dm);margin:0;max-width:70ch}
  .grid{display:grid;gap:16px;max-width:1240px;margin:0 auto;
    padding:clamp(20px,4vw,34px) clamp(16px,4vw,34px) 70px;grid-template-columns:repeat(2,1fr)}
  @media(min-width:700px){.grid{grid-template-columns:repeat(3,1fr)}}
  @media(min-width:1000px){.grid{grid-template-columns:repeat(4,1fr)}}
  figure{margin:0;border:1px solid var(--ln);background:var(--sf);overflow:hidden}
  figure img{display:block;width:100%;height:auto}
  figcaption{padding:12px 14px 14px;display:flex;flex-direction:column;gap:2px;
    border-top:1px solid var(--ln)}
  figcaption b{font-size:15.5px}
  figcaption span{font-size:13px;color:var(--dm)}
  figcaption i{font-style:normal;font-family:var(--mono);font-size:11.5px;
    letter-spacing:.06em;color:var(--ac)}
  footer{max-width:1240px;margin:0 auto;padding:0 clamp(16px,4vw,34px) 80px;
    color:var(--dm);font-size:14px}
</style>
<header><div class="in">
  <h1>온스테이지 <b>· 아티스트 가상 이미지</b></h1>
  <p class="note">사람 얼굴은 만들지 않았습니다. 무대 조명 아래 선 실루엣으로 그렸고,
    인원수와 손에 든 것만 지정하면 나머지는 이름을 씨앗 삼아 자동으로 달라집니다.</p>
</div></header>
<div class="grid">${cards}</div>
<footer>
  같은 사람은 언제 다시 뽑아도 같은 그림이 나옵니다. 실제 사진이 들어오면 그 자리를 대신합니다.<br>
  구도를 바꾸려면 JSON 의 <code>art</code> 에서 <code>count</code>(인원)와 <code>prop</code>(소품)만 고치면 됩니다 —
  hat · dove · cards · mic · handmic · guitar · frame · plain.
</footer>`;

await writeFile(p('아티스트이미지_모음.html'), html, 'utf8');
console.log(`아티스트이미지_모음.html · ${list.length}명`);
