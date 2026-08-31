/**
 * 오버레이 메뉴.
 *
 * 상단 바에 이름과 MENU 만 남기고, 나머지 갈래는 눌렀을 때 화면 전체로 펼친다.
 * 유형 D(전시형)에서 쓴다 — 첫 화면을 사진 한 장으로 비워 두기 위한 장치다.
 *
 * A · B · C 는 지금까지 쓰던 가로 막대 그대로다. 이 파일은 그쪽을 건드리지 않는다.
 */

export const NAV_CSS = `
/* 사진 위에 뜨는 상단 바 */
.sitebar--float{position:fixed;top:0;left:0;right:0;background:transparent;border-bottom:0;
  transition:background .25s ease,border-color .25s ease}
.sitebar--float::before{content:"";position:absolute;inset:0;z-index:-1;
  background:linear-gradient(to bottom,rgba(0,0,0,.55),rgba(0,0,0,0));transition:opacity .25s ease}
.sitebar--float .sitebar__me{color:#fff}
.sitebar--float.is-solid{background:var(--night-2);border-bottom:1px solid var(--line)}
.sitebar--float.is-solid::before{opacity:0}
.sitebar--float.is-solid .sitebar__me{color:var(--ivory)}

/* MENU 단추 */
.navbtn{margin-left:auto;font-family:var(--mono);font-size:12px;letter-spacing:.2em;
  text-transform:uppercase;color:#fff;background:transparent;border:1px solid rgba(255,255,255,.45);
  padding:8px 14px;cursor:pointer;line-height:1}
.sitebar--float.is-solid .navbtn{color:var(--ivory);border-color:var(--line)}
.navbtn:hover{border-color:var(--ac);color:var(--ac)}
.navbtn:focus-visible{outline:2px solid var(--ac);outline-offset:3px}

/* 펼쳐진 판 */
.navsheet{position:fixed;inset:0;z-index:60;background:var(--night);
  display:flex;flex-direction:column;justify-content:center;align-items:center;gap:6px;
  padding:80px 24px 40px}
.navsheet[hidden]{display:none}
.navsheet a{font-family:var(--display);font-weight:700;text-decoration:none;color:var(--ivory);
  font-size:clamp(28px,7vw,46px);line-height:1.35;letter-spacing:.04em}
.navsheet a:hover,.navsheet a[aria-current=page]{color:var(--ac)}
.navsheet a:focus-visible{outline:2px solid var(--ac);outline-offset:4px}
.navsheet .navsheet__sub{font-family:var(--mono);font-size:12px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--ivory-3);margin-top:26px}
.navclose{position:absolute;top:14px;right:clamp(20px,5vw,48px);font-family:var(--mono);
  font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--ivory-2);
  background:transparent;border:1px solid var(--line);padding:8px 14px;cursor:pointer;line-height:1}
.navclose:hover{color:var(--ac);border-color:var(--ac)}
.navclose:focus-visible{outline:2px solid var(--ac);outline-offset:3px}
body.nav-open{overflow:hidden}

/* 첫 화면 아래 페이지에서는 바가 여느 바처럼 붙어 있다 — 단추 색을 되돌린다 */
.sitebar:not(.sitebar--float) .navbtn{color:var(--ivory);border-color:var(--line)}
.sitebar:not(.sitebar--float) .navbtn:hover{color:var(--ac);border-color:var(--ac)}
`;

export const NAV_JS = `
(function(){
  var bar = document.querySelector('.sitebar--float');
  var btn = document.querySelector('.navbtn');
  var sheet = document.getElementById('navsheet');
  if (bar) {
    var solid = function(){ bar.classList.toggle('is-solid', window.scrollY > 40); };
    solid();
    window.addEventListener('scroll', solid, { passive: true });
  }
  if (!btn || !sheet) return;
  var open = function(){
    sheet.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
    var first = sheet.querySelector('a');
    if (first) first.focus();
  };
  var close = function(back){
    sheet.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    if (back !== false) btn.focus();
  };
  btn.addEventListener('click', function(){ sheet.hidden ? open() : close(); });
  sheet.addEventListener('click', function(e){
    if (e.target.closest('.navclose') || e.target.tagName === 'A') close(e.target.tagName !== 'A');
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && !sheet.hidden) close();
  });
})();
`;

