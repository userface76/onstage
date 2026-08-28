/**
 * GitHub 에 올릴 파일만 골라 내보낸다.
 *
 * 마지막으로 내보낸 시점 이후에 바뀐 파일만 `E:\온스테이지_업로드` 에 담는다.
 * 매번 6MB 를 통째로 올리지 않아도 되고, 무엇이 바뀌었는지 눈으로 확인할 수 있다.
 *
 *   node export.mjs         바뀐 것만
 *   node export.mjs --all   전부 (처음이거나 꼬였을 때)
 *
 * 지워진 파일은 GitHub 웹에서 직접 지워야 한다 — 드래그 업로드로는 삭제가 안 된다.
 * 그래서 지워진 것이 있으면 목록으로 알려 준다.
 */

import { execFileSync } from 'node:child_process';
import { readFile, writeFile, mkdir, rm, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const OUT = 'E:\\온스테이지_업로드';
const MARK = path.join(root, '.upload-mark');

const git = (...args) =>
  execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();

const all = process.argv.includes('--all');

const head = git('rev-parse', 'HEAD');
let since = null;
if (!all && existsSync(MARK)) {
  const saved = (await readFile(MARK, 'utf8')).trim();
  // 저장된 커밋이 아직 저장소에 있는지 확인한다
  try { git('cat-file', '-e', saved + '^{commit}'); since = saved; } catch { since = null; }
}

let changed;
let removed = [];

if (since && since !== head) {
  // -z 출력은 상태와 경로가 번갈아 나온다.
  // 다만 이름 바꾸기(R)와 복사(C)는 「상태, 옛 경로, 새 경로」 세 칸을 쓴다.
  const parts = git('diff', '--name-status', '-z', since, head)
    .split('\0').filter(Boolean);
  changed = [];
  let i = 0;
  while (i < parts.length) {
    const status = parts[i++];
    if (/^[RC]/.test(status)) {
      const from = parts[i++];
      const to = parts[i++];
      removed.push(from);   // 옛 자리는 직접 지워야 한다
      changed.push(to);
    } else {
      const file = parts[i++];
      if (!file) break;
      if (status.startsWith('D')) removed.push(file);
      else changed.push(file);
    }
  }
} else if (since === head) {
  changed = [];
} else {
  changed = git('ls-files', '-z').split('\0').filter(Boolean);
}

// 내보내기 폴더를 비우고 다시 담는다
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

let bytes = 0;
for (const f of changed) {
  const src = path.join(root, f);
  if (!existsSync(src)) continue;
  const dst = path.join(OUT, f);
  await mkdir(path.dirname(dst), { recursive: true });
  await copyFile(src, dst);
  bytes += (await readFile(src)).length;
}

await writeFile(MARK, head + '\n', 'utf8');

/* ---------- 사람이 읽을 결과 ---------- */

const mb = (n) => (n / 1024 / 1024).toFixed(2);

if (!changed.length && !removed.length) {
  console.log('\n올릴 것이 없습니다 — 마지막 내보낸 뒤로 바뀐 파일이 없습니다.\n');
} else {
  console.log(`\n올릴 파일 ${changed.length}개 · ${mb(bytes)} MB`);
  console.log(`위치: ${OUT}\n`);
  for (const f of changed) console.log('  ' + f);
}

if (removed.length) {
  console.log(`\n⚠ GitHub 에서 직접 지워야 할 파일 ${removed.length}개`);
  console.log('  (드래그 업로드로는 삭제가 되지 않습니다)\n');
  for (const f of removed) console.log('  ' + f);
}

console.log('');
