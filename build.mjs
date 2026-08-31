/**
 * 온스테이지 빌드.
 *
 *   data/artists/*.json  →  dist/<slug>/index.html
 *   public/**            →  dist/**
 *   랜딩                  →  dist/index.html
 *   목록                  →  dist/list/index.html
 *
 * 실행: npm run build
 */

import { readFile, readdir, mkdir, cp, writeFile, rm } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderArtist, renderArtistPages, CATEGORY_LABEL, PAGES, pagesOf } from './src/render.mjs';
import { renderLanding, renderList, renderDesigns, renderApply } from './src/pages.mjs';
import { DESIGNS } from './src/designs.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const p = (...xs) => path.join(root, ...xs);

const readJson = async (f) => JSON.parse(await readFile(f, 'utf8'));

/**
 * 사진 내용을 보고 같은 그림인지 가린다.
 * 파일명만 다르고 내용이 같은 사진이 흔하다 (choi0.jpg 와 choi2.jpg 처럼).
 * 이름으로만 거르면 같은 사진이 두 번 실린다.
 */
const hashCache = new Map();
function contentKey(webPath) {
  if (!webPath || webPath.startsWith('http') || webPath.startsWith('data:')) return webPath;
  if (hashCache.has(webPath)) return hashCache.get(webPath);
  const file = p('public', webPath.replace(/^\//, ''));
  let key = webPath;
  try {
    key = createHash('sha1').update(readFileSync(file)).digest('hex');
  } catch { /* 파일이 없으면 경로를 열쇠로 쓴다 */ }
  hashCache.set(webPath, key);
  return key;
}

/** 사진 경로를 /artists/<slug>/ 기준 절대경로로 바꾼다. 이미 /나 http면 그대로 둔다. */
function resolvePhotos(a) {
  const base = `/artists/${a.slug}/`;
  const fix = (v) => (!v || v.startsWith('/') || v.startsWith('http')) ? v : base + v;
  const ph = a.photos || {};
  const hero = fix(ph.hero);
  const portrait = fix(ph.portrait);
  const card = fix(ph.card);

  // 첫 화면과 프로필에 이미 쓴 사진은 갤러리에서 뺀다 — 같은 사진이 두 번 나오면 성의 없어 보인다.
  // 파일명이 아니라 내용을 비교하므로, 이름만 다른 같은 사진도 걸러진다.
  const seen = new Set([hero, portrait].filter(Boolean).map(contentKey));
  const gallery = [];
  for (const raw of ph.gallery || []) {
    const s = fix(raw);
    if (!s) continue;
    const key = contentKey(s);
    if (seen.has(key)) continue;
    seen.add(key);
    gallery.push(s);
  }

  a.photos = { ...ph, hero, portrait, card, gallery };
  (a.members || []).forEach((m) => { m.photo = fix(m.photo); });
  return a;
}

function validate(a, file) {
  const problems = [];
  if (!a.slug) problems.push('slug 없음');
  if (!a.name) problems.push('name 없음');
  if (!CATEGORY_LABEL[a.category]) problems.push(`category 가 이상함: ${a.category}`);
  if (!['A', 'B', 'C', 'D'].includes(a.type)) problems.push(`type 은 A · B · C · D 중 하나여야 함: ${a.type}`);
  // 오타 난 갈래 이름은 조용히 버려지므로 여기서 잡아 준다
  const bad = (a.pages || []).filter((k) => !PAGES[k]);
  if (bad.length) problems.push(`pages 에 없는 갈래: ${bad.join(' · ')} (쓸 수 있는 것: ${Object.keys(PAGES).join(' · ')})`);
  if (a.pages && !a.multipage) problems.push('pages 는 multipage 가 true 일 때만 씁니다');
  if (problems.length) {
    throw new Error(`${path.basename(file)} — ${problems.join(' / ')}`);
  }
}

async function main() {
  const site = await readJson(p('data', 'site.json'));

  const dir = p('data', 'artists');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.json'));

  const artists = [];
  for (const f of files) {
    const a = await readJson(path.join(dir, f));
    validate(a, f);
    artists.push(resolvePhotos(a));
  }

  // 예시 아티스트 — 한 파일에 여러 명. 직군마다 세 명씩 두어 갤러리가 비지 않게 한다.
  const samplesFile = p('data', 'samples.json');
  if (existsSync(samplesFile)) {
    for (const s of await readJson(samplesFile)) {
      validate(s, 'samples.json');
      artists.push(resolvePhotos({ draft: false, ...s }));
    }
  }
  artists.sort((x, y) => (x.order ?? 100) - (y.order ?? 100) || x.name.localeCompare(y.name, 'ko'));

  // 지운 아티스트의 페이지가 남아 배포되지 않도록 매번 비우고 시작한다
  const dist = p('dist');
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  // 정적 자산
  if (existsSync(p('public'))) {
    await cp(p('public'), dist, { recursive: true });
  }

  // 아티스트별 페이지
  for (const a of artists) {
    const out = path.join(dist, a.slug);
    await mkdir(out, { recursive: true });

    if (a.multipage) {
      // 소개 · 무대 · 갤러리 · 섭외를 각각 따로 — 개인 홈페이지처럼
      for (const page of renderArtistPages(a, site, { all: artists })) {
        const dir = page.key ? path.join(out, page.key) : out;
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, 'index.html'), page.html, 'utf8');
      }
    } else {
      await writeFile(path.join(out, 'index.html'), renderArtist(a, site, { all: artists }), 'utf8');
    }

    console.log(`  ${a.slug.padEnd(14)} ${CATEGORY_LABEL[a.category]} · ${a.type}안`
      + `${a.multipage ? ` · ${pagesOf(a).length + 1}쪽 (${pagesOf(a).join(' · ')})` : ''}`
      + `${a.draft ? ' (시안)' : ''}`);
  }

  // 자체 페이지
  const listed = artists.filter((a) => a.listed !== false);
  await writeFile(path.join(dist, 'index.html'), renderLanding(site, listed), 'utf8');
  await mkdir(path.join(dist, 'list'), { recursive: true });
  await writeFile(path.join(dist, 'list', 'index.html'), renderList(site, listed), 'utf8');

  // 제작 신청서
  await mkdir(path.join(dist, 'apply'), { recursive: true });
  await writeFile(path.join(dist, 'apply', 'index.html'), renderApply(site, DESIGNS), 'utf8');

  // 디자인 갤러리 + 디자인마다 미리보기 한 장
  await mkdir(path.join(dist, 'designs'), { recursive: true });
  await writeFile(path.join(dist, 'designs', 'index.html'), renderDesigns(site, DESIGNS), 'utf8');

  const demoBase = await readJson(p('data', 'demo.json'));
  for (const d of DESIGNS) {
    // 배치를 정해 둔 디자인은 그 배치로 보여 준다 — 전시형은 C안으로 띄우면 뜻이 안 산다
    const demo = resolvePhotos({
      ...structuredClone(demoBase),
      ...(d.demo || {}),
      slug: `designs/${d.code}`,
      design: d.code,
      name: demoBase.name,
    });
    const out = path.join(dist, 'designs', d.code);
    await mkdir(out, { recursive: true });
    await writeFile(path.join(out, 'index.html'), renderArtist(demo, site, { preview: d }), 'utf8');
  }
  console.log(`  디자인 ${DESIGNS.length}종 · 미리보기 생성`);

  // 검색엔진용
  const urls = ['', 'list/', 'designs/', 'apply/', ...artists.flatMap((a) =>
    a.multipage
      ? [`${a.slug}/`, ...pagesOf(a).map((k) => `${a.slug}/${k}/`)]
      : [`${a.slug}/`])];
  await writeFile(path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${site.origin}/${u}</loc></url>`).join('\n') +
    `\n</urlset>\n`, 'utf8');
  await writeFile(path.join(dist, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`, 'utf8');

  console.log(`\n아티스트 ${artists.length}명 · dist 완성`);
}

main().catch((e) => {
  console.error('\n빌드 실패:', e.message);
  process.exit(1);
});
