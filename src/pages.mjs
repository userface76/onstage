/** 온스테이지 자체 페이지 — 영업 랜딩과 아티스트 목록. */

import { css, FONTS } from './theme.mjs';
import { esc, CATEGORY_LABEL } from './render.mjs';
import { placeholder } from './placeholder.mjs';

const shell = (site, { title, desc, body, extra = '' }) => `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
${FONTS}
<style>${css('gold')}
.bar{padding:24px 0 0;display:flex;align-items:baseline;gap:12px}
.brand{font-family:var(--display);font-weight:800;font-size:22px;letter-spacing:.04em}
.brand b{color:var(--ac);font-weight:400}
.brand__en{font-family:var(--mono);font-size:12px;letter-spacing:.22em;color:var(--ivory-3);text-transform:uppercase;font-weight:500}
h1{font-family:var(--display);font-weight:800;font-size:clamp(32px,5.4vw,56px);line-height:1.2;
  letter-spacing:-.01em;margin:0;text-wrap:balance}
h1 .hl{color:var(--ac)}
.hero{padding:clamp(44px,7vw,84px) 0 clamp(36px,5vw,60px)}
.hero__price{margin-top:22px;font-size:17px;color:var(--ivory-2);
  display:flex;flex-wrap:wrap;gap:6px 14px;align-items:baseline}
.hero__price b{color:var(--ac);font-family:var(--display);font-weight:800;font-size:21px}
.hero__price span{font-family:var(--mono);font-size:12px;letter-spacing:.1em;color:var(--ivory-3)}
.cta{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}
.pain{margin-top:24px;border-top:1px solid var(--line)}
.pain div{display:grid;grid-template-columns:18px 1fr;gap:14px;padding:16px 2px;
  border-bottom:1px solid var(--line);font-size:15.5px;color:var(--ivory-2)}
.pain div::before{content:"—";color:var(--ac);font-weight:700}
.cats{display:grid;gap:14px;margin-top:26px}
@media(min-width:640px){.cats{grid-template-columns:repeat(2,1fr)}}
@media(min-width:960px){.cats{grid-template-columns:repeat(4,1fr)}}
.cat{border:1px solid var(--line);border-top:3px solid var(--ac);background:var(--night-2);
  padding:20px;display:flex;flex-direction:column;gap:7px}
.cat b{font-family:var(--display);font-size:18px;letter-spacing:-.01em}
.cat span{font-size:14.5px;color:var(--ivory-2);line-height:1.7}
.types{display:grid;gap:14px;margin-top:26px}
@media(min-width:760px){.types{grid-template-columns:repeat(3,1fr)}}
.scope{margin-top:26px;display:grid;gap:1px;background:var(--line);border:1px solid var(--line)}
@media(min-width:640px){.scope{grid-template-columns:repeat(2,1fr)}}
@media(min-width:960px){.scope{grid-template-columns:repeat(4,1fr)}}
.scope>div{background:var(--night-2);padding:17px 19px;display:flex;flex-direction:column;gap:4px}
.scope span{font-size:14.5px;color:var(--ivory-2);line-height:1.65}
.price{display:grid;gap:14px;margin-top:26px}
@media(min-width:820px){.price{grid-template-columns:1.15fr 1fr}}
.price__col{border:1px solid var(--line);background:var(--night-2);padding:26px 24px;
  display:flex;flex-direction:column;gap:5px}
.price__col--sub{border-color:var(--ac-2)}
.price__k{font-family:var(--mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--ivory-3);font-weight:500}
.price__v{font-family:var(--display);font-weight:800;font-size:clamp(34px,5vw,46px);
  line-height:1.1;color:var(--ac)}
.price__d{font-size:14.5px;color:var(--ivory-2);margin-bottom:14px}
.price__col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:9px}
.price__col li{display:grid;grid-template-columns:14px 1fr;gap:9px;font-size:14.5px;color:var(--ivory-2)}
.price__col li::before{content:"+";color:var(--ac);font-weight:700}
.price__stop{margin-top:16px;padding-top:14px;border-top:1px solid var(--line);
  font-size:13.5px;color:var(--ivory-3)}
.plans{display:grid;gap:14px;margin-top:26px}
@media(min-width:820px){.plans{grid-template-columns:repeat(3,1fr)}}
.plan{border:1px solid var(--line);background:var(--night-2);padding:24px 22px;
  display:flex;flex-direction:column;gap:4px;position:relative}
.plan--pick{border-color:var(--ac)}
.plan__flag{position:absolute;top:-1px;left:-1px;background:var(--ac);color:var(--night);
  font-size:11px;font-weight:700;padding:3px 12px}
.plan__k{font-family:var(--mono);font-size:12px;letter-spacing:.14em;color:var(--ivory-3);
  text-transform:uppercase;margin-top:6px;font-weight:500}
.plan__n{font-family:var(--display);font-weight:800;font-size:25px}
.plan__d{font-size:14.5px;color:var(--ivory-2);margin-bottom:12px}
.plan ul{list-style:none;margin:0 0 20px;padding:0;display:flex;flex-direction:column;gap:9px}
.plan li{display:grid;grid-template-columns:14px 1fr;gap:9px;font-size:14.5px;color:var(--ivory-2)}
.plan li::before{content:"+";color:var(--ac);font-weight:700}
.plan .btn{margin-top:auto;text-align:center}
.steps{margin-top:26px;border-top:1px solid var(--line)}
.step{display:grid;gap:3px 22px;padding:17px 2px;border-bottom:1px solid var(--line)}
@media(min-width:640px){.step{grid-template-columns:54px 150px 1fr;align-items:baseline}}
.step__n{font-family:var(--mono);font-size:13.5px;color:var(--ac);font-weight:500}
.step__t{font-weight:700;font-size:16px}
.step__d{font-size:15px;color:var(--ivory-2)}
.faq{margin-top:26px;border-top:1px solid var(--line)}
.faq details{border-bottom:1px solid var(--line)}
.faq summary{cursor:pointer;list-style:none;padding:18px 2px;font-weight:700;font-size:16.5px;
  display:flex;justify-content:space-between;gap:16px;align-items:center}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";color:var(--ac);font-family:var(--mono);font-size:17px}
.faq details[open] summary::after{content:"−"}
.faq summary:focus-visible{outline:1px solid var(--ac);outline-offset:-2px}
.faq p{padding:0 2px 18px;font-size:14.5px;color:var(--ivory-2);max-width:62ch}
.dir{display:grid;gap:14px;margin-top:26px}
@media(min-width:700px){.dir{grid-template-columns:repeat(3,1fr)}}
.card{border:1px solid var(--line);background:var(--night-2);overflow:hidden;
  display:flex;flex-direction:column;text-decoration:none;color:inherit}
.card:hover{border-color:var(--ac-2)}
.card:focus-visible{outline:2px solid var(--ac);outline-offset:2px}
.card__shot{aspect-ratio:4/3;background:var(--night-3) center/cover no-repeat;
  border-bottom:1px solid var(--line);display:grid;place-items:center;
  font-family:var(--mono);font-size:10px;color:var(--ivory-3);letter-spacing:.14em}
.card__in{padding:16px 18px 18px;display:flex;flex-direction:column;gap:6px}
.card__tag{font-family:var(--mono);font-size:11.5px;letter-spacing:.12em;color:var(--ac);text-transform:uppercase;font-weight:500}
.card__name{font-family:var(--display);font-weight:700;font-size:20px}
.card__meta{font-size:14.5px;color:var(--ivory-2);line-height:1.65}
.chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:4px}
.chip{font-size:12.5px;background:var(--night-3);color:var(--ivory-2);padding:3px 10px;border-radius:999px}
.chip--on{background:rgba(255,255,255,.06);color:var(--ac)}
.note{margin-top:16px;font-size:12.5px;color:var(--ivory-3);font-family:var(--mono)}
${extra}</style>
</head>
<body>
<header class="sitebar"><div class="wrap sitebar__in">
  <a class="sitebar__me" href="/">${esc(site.brand)}</a>
  <span class="brand__en">${esc(site.brandEn)}</span>
  <nav class="sitebar__nav" aria-label="주요 메뉴">
    <a href="/designs/">디자인</a>
    <a href="/list/">아티스트</a>
    <a href="/#price">요금</a>
    <a href="/#contact">문의</a>
  </nav>
  <a class="sitebar__home" href="/#contact">제작 문의</a>
</div></header>
${body}
</body>
</html>`;

/* ---------- 목록 카드 ---------- */

function card(a) {
  const l = a.listing || {};
  const shot = a.photos?.card || a.photos?.hero
    || placeholder({ category: a.category, kind: 'card', seed: a.slug,
                     count: a.art?.count, prop: a.art?.prop });
  return `<a class="card" href="/${esc(a.slug)}/">
    <div class="card__shot" style="background-image:url(&quot;${esc(shot)}&quot;)"></div>
    <div class="card__in">
      <span class="card__tag">${esc(l.field || CATEGORY_LABEL[a.category] || '')}</span>
      <span class="card__name">${esc(a.name)}</span>
      <span class="card__meta">${esc(a.summary || '')}</span>
      <div class="chips">
        ${l.available ? `<span class="chip chip--on">${esc(l.available)}</span>` : ''}
        ${l.region ? `<span class="chip">${esc(l.region)}</span>` : ''}
        <span class="chip">${esc(CATEGORY_LABEL[a.category] || '')}</span>
      </div>
    </div>
  </a>`;
}

/* ---------- 랜딩 ---------- */

export function renderLanding(site, artists) {
  const preview = artists.slice(0, 3).map(card).join('');
  const hasSample = artists.some((a) => a.sample);

  const body = `
<div class="wrap"><section class="hero first">
  <p class="eye">가수 · 밴드 · 트롯 · 배우 · 마술사 홈페이지 제작</p>
  <h1>무대가 끝나도<br><span class="hl">찾을 수 있게</span></h1>
  <p class="lede" style="margin-top:20px">
    섭외 문의를 아직 개인 DM으로 받고 계신가요.
    프로필, 영상, 일정, 연락처를 주소 하나에 정리해 드립니다.
  </p>
  <p class="hero__price">
    제작 <b>${esc(site.price.build)}</b> · 관리 <b>${esc(site.price.sub)}</b>
    <span>등급 없음 · 위약금 없음</span>
  </p>
  <div class="cta">
    <a class="btn btn--big" href="#contact">제작 문의하기</a>
    <a class="btn btn--ghost" href="/designs/">디자인 보기</a>
    <a class="btn btn--ghost" href="/list/">아티스트 목록</a>
  </div>
</section></div>

<div class="wrap"><section>
  <p class="eye">Directory</p>
  <h2>섭외하는 사람이 먼저 찾아옵니다</h2>
  <p class="lede" style="margin-top:8px">
    홈페이지를 만들면 목록에 함께 오릅니다. 담당자가 분야와 지역으로 골라 보고,
    마음에 드는 아티스트의 공식 페이지로 바로 넘어갑니다.
  </p>
  <div class="dir">${preview}</div>
  ${hasSample ? '<p class="note">※ 일부 카드는 화면 구성을 보여드리는 예시입니다.</p>' : ''}
  <div class="cta"><a class="btn btn--ghost" href="/list/">전체 목록 보기</a></div>
</section></div>

<div class="wrap"><section>
  <p class="eye">왜 필요한가</p>
  <h2>이런 적, 있으시죠</h2>
  <div class="pain">
    <div>담당자가 "공식 자료 좀 보내주세요"라고 할 때마다 폴더와 카톡을 뒤진다.</div>
    <div>프로필은 옛날 카페에, 영상은 유튜브에, 이력은 머릿속에 있다.</div>
    <div>이름을 검색하면 남이 찍어 올린 흔들리는 영상이 먼저 나온다.</div>
    <div>섭외가 개인 DM으로 들어와 단가 이야기가 사적인 대화처럼 되어 버린다.</div>
    <div>같은 질문을 매번 받는다 — 몇 분짜리인지, 무대가 얼마나 필요한지, 지방도 가는지.</div>
  </div>
</section></div>

<div class="wrap"><section>
  <p class="eye">직군</p>
  <h2>하는 일에 따라 화면이 달라집니다</h2>
  <p class="lede" style="margin-top:8px">직군이 정하는 것은 <b>어떤 표가 들어가느냐</b>입니다.</p>
  <div class="cats">
    <div class="cat"><b>마술사</b><span>레퍼토리 — 액트별 소요 시간과 필요한 무대 크기</span></div>
    <div class="cat"><b>트롯 · 행사 가수</b><span>대표곡과 음원 링크, 행사 구성</span></div>
    <div class="cat"><b>배우</b><span>필모그래피 — 연도 · 작품 · 역할 · 매체</span></div>
    <div class="cat"><b>밴드 · 싱어송라이터</b><span>멤버와 앨범, 공연 일정</span></div>
  </div>
</section></div>

<div class="wrap"><section>
  <p class="eye">유형</p>
  <h2>활동 방식에 따라 배치가 달라집니다</h2>
  <p class="lede" style="margin-top:8px">유형이 정하는 것은 <b>첫 화면에 무엇이 오느냐</b>입니다.</p>
  <div class="types">
    <div class="cat"><b>A · 원페이지</b><span>대표 이미지와 영상이 첫 화면. 가장 빠르고 가벼운 구성.</span></div>
    <div class="cat"><b>B · 일정 중심</b><span>다가오는 공연이 첫 화면. 정기 무대가 있을 때.</span></div>
    <div class="cat"><b>C · 섭외 중심</b><span>섭외 버튼과 조건이 맨 위로. 섭외가 수입일 때.</span></div>
  </div>
</section></div>

<div class="wrap"><section>
  <p class="eye">제작 범위</p>
  <h2>한 주소에 다 들어갑니다</h2>
  <div class="scope">
    <div><h3>프로필</h3><span>활동명, 소개, 경력, 고화질 사진</span></div>
    <div><h3>영상 · 음원</h3><span>유튜브 · 인스타 · 멜론 바로 재생</span></div>
    <div><h3>일정</h3><span>다가오는 무대와 지난 기록</span></div>
    <div><h3>직군별 표</h3><span>레퍼토리 · 필모그래피 · 대표곡</span></div>
    <div><h3>섭외 문의폼</h3><span>들어온 문의는 메일과 문자로 동시 알림</span></div>
    <div><h3>갤러리</h3><span>무대 사진, 포스터, 프로필 컷</span></div>
    <div><h3>모바일 최적화</h3><span>담당자 열에 아홉은 휴대폰으로 봅니다</span></div>
    <div><h3>검색 노출</h3><span>이름을 검색하면 공식 페이지가 먼저</span></div>
  </div>
</section></div>

<div class="wrap"><section id="price">
  <p class="eye">요금 안내</p>
  <h2>하나입니다. 고르실 것이 없습니다</h2>
  <p class="lede" style="margin-top:8px">
    등급을 나누지 않았습니다. 어느 직군이든 같은 값이고, 나중에 더 내라고 하지 않습니다.
  </p>

  <div class="price">
    <div class="price__col">
      <span class="price__k">제작비 · 한 번</span>
      <span class="price__v">${esc(site.price.build)}</span>
      <span class="price__d">${esc(site.price.buildNote)} · ${esc(site.price.pages)}</span>
      <ul>
        <li>디자인 ${esc(String(site.designCount || 15))}종 중에서 선택</li>
        <li>프로필 · 영상 · 사진</li>
        <li>직군별 표 — 레퍼토리 · 필모그래피 · 대표곡</li>
        <li>섭외 문의폼</li>
        <li>모바일 최적화 · 검색 노출</li>
        <li>아티스트 목록 등재</li>
      </ul>
    </div>
    <div class="price__col price__col--sub">
      <span class="price__k">관리비 · 매달</span>
      <span class="price__v">${esc(site.price.sub)}</span>
      <span class="price__d">${esc(site.price.subNote)}</span>
      <ul>
        <li>주소와 서버 유지</li>
        <li>섭외 문의 알림 — 메일 · 문자</li>
        <li>사진과 일정 직접 수정</li>
        <li>디자인 교체 언제든 무료</li>
      </ul>
      <p class="price__stop">그만두시면 그달로 끝입니다. 위약금이 없습니다.</p>
    </div>
  </div>

  <p class="note">
    ※ 도메인(주소) 비용은 별도입니다 — 연 1~2만원, 본인 명의로 등록해 드립니다.
    로고나 홍보 영상처럼 따로 만들어야 하는 것은 상담 후 안내드립니다.
  </p>
</section></div>

<div class="wrap"><section>
  <p class="eye">제작 과정</p>
  <h2>오픈까지 다섯 단계</h2>
  <div class="steps">
    <div class="step"><span class="step__n">01</span><span class="step__t">상담</span><span class="step__d">어떤 무대에 서는지, 어떤 문의를 받고 싶은지 먼저 듣습니다.</span></div>
    <div class="step"><span class="step__n">02</span><span class="step__t">자료 전달</span><span class="step__d">사진, 영상 링크, 프로필, 이력. 정리되어 있지 않아도 괜찮습니다.</span></div>
    <div class="step"><span class="step__n">03</span><span class="step__t">시안 확인</span><span class="step__d">첫 화면부터 실제 화면으로 보여드립니다. 상상하지 않으셔도 됩니다.</span></div>
    <div class="step"><span class="step__n">04</span><span class="step__t">수정</span><span class="step__d">두 번까지는 추가 비용 없이 고쳐 드립니다.</span></div>
    <div class="step"><span class="step__n">05</span><span class="step__t">오픈</span><span class="step__d">도메인 연결, 검색 등록, 목록 등재까지 마치고 넘겨 드립니다.</span></div>
  </div>
</section></div>

<div class="wrap"><section>
  <p class="eye">자주 묻는 질문</p>
  <h2>궁금하실 것들</h2>
  <div class="faq">
    <details><summary>정말 10만원이면 끝인가요?</summary>
      <p>제작비는 10만원 한 번입니다. 이후에는 월 5천원만 내시면 됩니다. 도메인 비용(연 1~2만원)만 별도이고, 그 외에 나중에 더 청구하는 것은 없습니다.</p></details>
    <details><summary>월 5천원은 무엇에 쓰이나요?</summary>
      <p>주소와 서버를 유지하고, 섭외 문의가 들어오면 메일과 문자로 알려드리는 비용입니다. 디자인을 바꾸고 싶으시면 그것도 이 안에 포함됩니다.</p></details>
    <details><summary>그만두면 어떻게 되나요?</summary>
      <p>그달로 끝입니다. 위약금이 없습니다. 도메인은 본인 명의라 다른 곳으로 옮겨 그대로 쓰실 수 있고, 내용도 파일로 드립니다.</p></details>
    <details><summary>제작 기간이 얼마나 걸리나요?</summary>
      <p>자료를 다 주신 날부터 3~5일입니다. 사진과 소개 글이 정리돼 있으면 더 빠릅니다.</p></details>
    <details><summary>나중에 제가 직접 수정할 수 있나요?</summary>
      <p>일정이나 새 사진처럼 자주 바뀌는 부분은 직접 고치실 수 있게 만들어 드립니다. 휴대폰에서도 됩니다.</p></details>
    <details><summary>단가를 공개해야 하나요?</summary>
      <p>아니요. 「문의 시 안내」로 두시는 분이 더 많습니다. 대신 소요 시간과 조건만 적어 두어도 헛걸음 문의가 크게 줍니다.</p></details>
    <details><summary>자료가 별로 없는데 괜찮을까요?</summary>
      <p>사진 몇 장과 영상 링크만 있으면 시작할 수 있습니다. 부족한 부분은 무엇을 준비하면 좋을지 같이 정리해 드립니다.</p></details>
    <details><summary>목록에만 올릴 수도 있나요?</summary>
      <p>가능합니다. 다만 목록은 공식 페이지로 넘어가는 통로라서, 넘어갈 곳이 있을 때 섭외로 이어집니다.</p></details>
  </div>
</section></div>

<div class="wrap"><section id="contact">
  <p class="eye">문의하기</p>
  <h2>지금 활동 얘기부터 들려주세요</h2>
  <p class="lede" style="margin-top:8px">아직 결정하지 않으셨어도 괜찮습니다. 무엇이 필요한지부터 같이 정리해 드립니다.</p>
  <form class="form" style="margin-top:24px" onsubmit="event.preventDefault();this.querySelector('.sent').hidden=false">
    <div class="f"><label for="n">이름 · 활동명</label><input id="n" name="name" type="text" placeholder="예) 밴드 늦은고백"></div>
    <div class="f"><label for="c">연락처</label><input id="c" name="contact" type="text" placeholder="전화 또는 이메일"></div>
    <div class="f"><label for="g">직군</label><input id="g" name="category" type="text" placeholder="예) 트롯 가수 / 배우 / 마술사"></div>
    <div class="f"><label for="r">활동 지역 · 빈도</label><input id="r" name="region" type="text" placeholder="예) 서울·경기, 월 3~4회"></div>
    <div class="f f--full"><label for="m">하고 싶은 말</label><textarea id="m" name="message" placeholder="원하시는 것, 걱정되는 것 무엇이든"></textarea></div>
    <div class="f f--full"><button class="btn" type="submit">문의 보내기</button>
      <p class="sent" hidden style="color:var(--ac);font-size:14px;margin-top:10px">보내기 연결은 오픈 시 붙습니다.</p></div>
  </form>
  <div class="sfoot"><span class="mark">${esc(site.brand)}</span><span>${esc(site.tagline)}</span></div>
</section></div>`;

  return shell(site, { title: `${site.brand} — ${site.tagline}`, desc: site.description, body });
}

/* ---------- 디자인 갤러리 ---------- */

export function renderDesigns(site, designs) {
  const concepts = [...new Set(designs.map((d) => d.concept))];

  const cards = designs.map((d) => `<a class="dcard" href="/designs/${esc(d.code)}/">
      <span class="dcard__sw" style="background:${d.light ? '#F4F4F1' : '#121214'}">
        <i style="background:${d.light ? '#1C1C1A' : '#F0F0F2'}"></i>
        <i style="background:var(--ac)"></i>
      </span>
      <span class="dcard__in">
        <span class="dcard__code">${esc(d.code)}</span>
        <span class="dcard__name">${esc(d.name)}</span>
        <span class="dcard__for">${esc(d.for)}</span>
        <span class="chips">
          <span class="chip chip--on">${esc(d.concept)}</span>
          <span class="chip">${d.light ? '밝은 화면' : '어두운 화면'}</span>
        </span>
      </span>
    </a>`).join('');

  const body = `<div class="wrap"><section class="hero first">
      <p class="eye">Design</p>
      <h1>디자인 ${designs.length}종</h1>
      <p class="lede" style="margin-top:18px">
        모두 <b>같은 데이터 한 벌</b>에서 나옵니다. 코드만 바꾸면 화면이 통째로 달라지고,
        내용은 그대로 남습니다. 하나를 고르시고, 나중에 마음이 바뀌면 언제든 바꿔 드립니다.
      </p>
      <p class="note">컨셉 — ${concepts.map(esc).join(' · ')}</p>
    </section></div>
    <div class="wrap"><section style="border-top:0;padding-top:0">
      <div class="dgrid">${cards}</div>
    </section></div>
    <div class="wrap"><section>
      <div class="cbar"><div><h3>어느 것이 맞을지 모르겠다면</h3>
        <p style="margin-top:4px">활동 얘기만 들려주시면 두세 개로 좁혀 드립니다.</p></div>
        <a class="btn" href="/#contact">상담 문의</a></div>
      <div class="sfoot"><span class="mark">${esc(site.brand)}</span><span>${esc(site.tagline)}</span></div>
    </section></div>`;

  const extra = `
.dgrid{display:grid;gap:14px}
@media(min-width:640px){.dgrid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:960px){.dgrid{grid-template-columns:repeat(3,1fr)}}
.dcard{border:1px solid var(--line);background:var(--night-2);text-decoration:none;color:inherit;
  display:flex;flex-direction:column}
.dcard:hover{border-color:var(--ac-2)}
.dcard:focus-visible{outline:2px solid var(--ac);outline-offset:2px}
.dcard__sw{aspect-ratio:16/9;display:flex;align-items:flex-end;gap:8px;padding:16px;
  border-bottom:1px solid var(--line)}
.dcard__sw i{display:block;width:34px;height:34px;border-radius:50%}
.dcard__in{padding:16px 18px 18px;display:flex;flex-direction:column;gap:5px}
.dcard__code{font-family:var(--mono);font-size:11.5px;letter-spacing:.14em;color:var(--ac);font-weight:500}
.dcard__name{font-family:var(--display);font-weight:700;font-size:20px}
.dcard__for{font-size:14px;color:var(--ivory-2)}`;

  return shell(site, { title: `디자인 ${designs.length}종 — ${site.brand}`,
    desc: '아티스트 홈페이지 디자인 갤러리', body, extra });
}

/* ---------- 목록 ---------- */

export function renderList(site, artists) {
  const groups = Object.keys(CATEGORY_LABEL).map((key) => {
    const list = artists.filter((a) => a.category === key);
    if (!list.length) return '';
    return `<div class="wrap"><section>
      <p class="eye">${esc(CATEGORY_LABEL[key])}</p>
      <h2>${esc(CATEGORY_LABEL[key])}</h2>
      <div class="dir">${list.map(card).join('')}</div>
    </section></div>`;
  }).join('');

  const body = `<div class="wrap"><section class="hero first">
      <p class="eye">Directory</p>
      <h1>아티스트 목록</h1>
      <p class="lede" style="margin-top:18px">
        분야로 골라 보시고, 이름을 누르면 공식 페이지로 넘어갑니다.
        섭외 문의는 각 아티스트 페이지에서 바로 보내실 수 있습니다.
      </p>
    </section></div>${groups}
    <div class="wrap"><section>
      <div class="cbar"><div><h3>목록에 오르고 싶으신가요</h3>
        <p style="margin-top:4px">홈페이지를 만들면 함께 등재됩니다.</p></div>
        <a class="btn" href="/#contact">제작 문의</a></div>
      <div class="sfoot"><span class="mark">${esc(site.brand)}</span><span>${esc(site.tagline)}</span></div>
    </section></div>`;

  return shell(site, { title: `아티스트 목록 — ${site.brand}`, desc: '분야별 아티스트 목록', body });
}
