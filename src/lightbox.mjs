/**
 * 사진 크게 보기.
 *
 * 갤러리 사진을 누르면 화면 가득 펼쳐지고, 좌우로 넘길 수 있다.
 * 바깥 라이브러리를 쓰지 않는다 — 사이트가 가벼워야 담당자 휴대폰에서 빨리 뜬다.
 *
 * 닫기  : Esc · 바깥 누르기 · 닫기 단추
 * 넘기기: ← → · 화면의 화살표 · 손가락으로 밀기
 */

export const LIGHTBOX_CSS = `
.gal>button{appearance:none;padding:0;font:inherit;cursor:zoom-in;
  border:1px solid var(--line);background-color:var(--night-2);
  background-position:center;background-size:cover;background-repeat:no-repeat;
  aspect-ratio:3/4;position:relative}
.gal>button:hover{border-color:var(--ac)}
.gal>button:focus-visible{outline:2px solid var(--ac);outline-offset:2px}

.lb{position:fixed;inset:0;z-index:200;background:rgba(6,6,8,.94);
  display:none;grid-template-rows:auto 1fr auto;gap:10px;padding:14px}
.lb[data-open]{display:grid}
.lb__top{display:flex;align-items:center;justify-content:space-between;gap:12px;
  color:#EDEDF1;font-family:var(--mono);font-size:13px;letter-spacing:.08em}
.lb__stage{display:grid;place-items:center;min-height:0;position:relative}
.lb__img{max-width:100%;max-height:100%;object-fit:contain;
  box-shadow:0 20px 60px rgba(0,0,0,.5)}
.lb__bottom{display:flex;align-items:center;justify-content:center;gap:10px}
.lb__b{appearance:none;background:rgba(255,255,255,.08);color:#EDEDF1;
  border:1px solid rgba(255,255,255,.22);font-family:var(--body);font-size:15px;
  padding:11px 20px;cursor:pointer;line-height:1;min-width:56px}
.lb__b:hover{background:rgba(255,255,255,.16)}
.lb__b:focus-visible{outline:2px solid #FFF;outline-offset:2px}
.lb__b[disabled]{opacity:.3;cursor:default}
.lb__x{appearance:none;background:transparent;border:0;color:#EDEDF1;
  font-size:26px;line-height:1;padding:6px 10px;cursor:pointer}
.lb__x:focus-visible{outline:2px solid #FFF;outline-offset:2px}
@media(min-width:760px){
  .lb{padding:22px}
  .lb__nav{position:absolute;top:50%;transform:translateY(-50%);
    background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.22);
    color:#EDEDF1;font-size:22px;padding:16px 12px;cursor:pointer;line-height:1}
  .lb__nav:hover{background:rgba(255,255,255,.18)}
  .lb__nav:focus-visible{outline:2px solid #FFF;outline-offset:2px}
  .lb__nav--prev{left:0}
  .lb__nav--next{right:0}
  .lb__nav[disabled]{opacity:.25;cursor:default}
}
@media(max-width:759px){ .lb__nav{display:none} }
body[data-lb]{overflow:hidden}
`;

export const LIGHTBOX_JS = `
(function () {
  var cells = Array.prototype.slice.call(document.querySelectorAll('.gal > button[data-src]'));
  if (!cells.length) return;

  var shots = cells.map(function (c) { return { src: c.dataset.src, alt: c.dataset.alt || '' }; });
  var at = 0;
  var opener = null;

  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', '사진 크게 보기');
  lb.innerHTML =
    '<div class="lb__top"><span class="lb__count"></span>' +
    '<button class="lb__x" type="button" aria-label="닫기">&times;</button></div>' +
    '<div class="lb__stage">' +
      '<button class="lb__nav lb__nav--prev" type="button" aria-label="이전 사진">&#8249;</button>' +
      '<img class="lb__img" alt="">' +
      '<button class="lb__nav lb__nav--next" type="button" aria-label="다음 사진">&#8250;</button>' +
    '</div>' +
    '<div class="lb__bottom">' +
      '<button class="lb__b lb__b--prev" type="button">이전</button>' +
      '<button class="lb__b lb__b--next" type="button">다음</button>' +
    '</div>';
  document.body.appendChild(lb);

  var img = lb.querySelector('.lb__img');
  var count = lb.querySelector('.lb__count');
  var closeBtn = lb.querySelector('.lb__x');
  var prevs = lb.querySelectorAll('.lb__nav--prev, .lb__b--prev');
  var nexts = lb.querySelectorAll('.lb__nav--next, .lb__b--next');

  function draw() {
    var s = shots[at];
    img.src = s.src;
    img.alt = s.alt;
    count.textContent = (at + 1) + ' / ' + shots.length;
    prevs.forEach(function (b) { b.disabled = at === 0; });
    nexts.forEach(function (b) { b.disabled = at === shots.length - 1; });
  }

  function open(i, from) {
    at = i; opener = from;
    draw();
    lb.setAttribute('data-open', '');
    document.body.setAttribute('data-lb', '');
    closeBtn.focus();
  }

  function close() {
    lb.removeAttribute('data-open');
    document.body.removeAttribute('data-lb');
    if (opener) opener.focus();
  }

  function move(step) {
    var n = at + step;
    if (n < 0 || n >= shots.length) return;
    at = n; draw();
  }

  cells.forEach(function (c, i) {
    c.addEventListener('click', function () { open(i, c); });
  });
  closeBtn.addEventListener('click', close);
  prevs.forEach(function (b) { b.addEventListener('click', function () { move(-1); }); });
  nexts.forEach(function (b) { b.addEventListener('click', function () { move(1); }); });

  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lb__stage')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.hasAttribute('data-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); move(1); }
  });

  // 손가락으로 밀기
  var x0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) move(dx < 0 ? 1 : -1);
    x0 = null;
  }, { passive: true });
})();
`;
