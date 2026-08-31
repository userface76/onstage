/**
 * 제작 신청서.
 *
 * 문의폼과 다르다. 문의는 「관심 있다」이고, 신청서는 「이 자료로 만들어 주세요」다.
 * 여기서 받는 항목이 곧 아티스트 JSON 의 항목이라, 받은 메일을 그대로 옮겨 적으면 된다.
 * 자료를 다시 물어보느라 며칠 새는 것을 막는 것이 이 페이지의 목적이다.
 */

import { esc, CATEGORY_LABEL } from './render.mjs';

export function applyBody(site, designs) {
  const cats = Object.entries(CATEGORY_LABEL)
    .map(([, label]) => `<option>${esc(label)}</option>`).join('')
    + '<option>그 밖의 문화예술 분야</option>';

  const designOpts = designs.map((d) =>
    `<label class="pick">
       <input type="radio" name="디자인" value="${esc(d.code)} ${esc(d.name)}">
       <span class="pick__sw" style="background:${d.sw.bg};color:${d.sw.ink}">
         <b style="font-family:${d.sw.font};font-weight:${d.sw.w}">가</b>
         <i style="background:${d.sw.ac}"></i>
       </span>
       <span class="pick__t"><b>${esc(d.code)}</b>${esc(d.name)}<small>${esc(d.for)}</small></span>
     </label>`).join('');

  return `
<div class="wrap"><section class="hero first">
  <p class="eye">Apply</p>
  <h1>제작 신청서</h1>
  <p class="lede" style="margin-top:18px">
    아래를 채워 보내주시면 <b>3~5일 안에</b> 만들어 드립니다.
    모르는 칸은 비워 두셔도 됩니다 — 상담하면서 함께 정리합니다.
  </p>
  <p class="hero__price">
    제작 <b>${esc(site.price.build)}</b> · 관리 <b>${esc(site.price.sub)}</b>
    <span>보내신다고 결제되지 않습니다</span>
  </p>
</section></div>

<div class="wrap"><section style="border-top:0;padding-top:0">
<form class="ap js-inquiry">
  <input type="hidden" name="kind" value="apply">

  <fieldset class="ap__g">
    <legend><span>1</span>기본 정보</legend>
    <div class="ap__row">
      <label>활동명 <span class="req">필수</span>
        <input name="활동명" required placeholder="예) 최정한"></label>
      <label>영문명
        <input name="영문명" placeholder="예) Joseph Choi"></label>
    </div>
    <div class="ap__row">
      <label>직군 <span class="req">필수</span>
        <select name="직군" required>${cats}</select></label>
      <label>대표 장르
        <input name="대표장르" placeholder="예) 스테이지 매직 · 힐링매직"></label>
    </div>
    <div class="ap__row">
      <label>활동 경력
        <input name="경력" placeholder="예) 1997년 시작 · 29년"></label>
      <label>활동 지역
        <input name="활동지역" placeholder="예) 서울 · 수도권 · 전국"></label>
    </div>
    <label>섭외 가능 시기
      <input name="섭외가능" placeholder="예) 상시 / 주말만 / 2026년 12월까지"></label>
  </fieldset>

  <fieldset class="ap__g">
    <legend><span>2</span>소개 글</legend>
    <label>한 줄 소개
      <input name="한줄소개" placeholder="예) 마술과 기술, 사람의 마음을 연결하는 29년 경력의 매지션">
      <small>첫 화면에 크게 들어갑니다.</small></label>
    <label>아티스트 소개
      <textarea name="소개글" rows="6" placeholder="어떤 무대에 서는지, 무엇을 잘하는지, 어떤 자리를 찾고 있는지 편하게 적어 주세요. 문단을 나눠 주시면 그대로 반영합니다."></textarea>
      <small>다듬는 것은 저희가 합니다. 생각나는 대로 적으셔도 됩니다.</small></label>
  </fieldset>

  <fieldset class="ap__g">
    <legend><span>3</span>공연 · 프로그램</legend>
    <label>레퍼토리
      <textarea name="레퍼토리" rows="6" placeholder="한 줄에 하나씩, 이렇게 적어 주세요.&#10;&#10;클래식 스테이지 매직 / 10~20분 / 무대·조명 필요 / 기업행사·기념식&#10;힐링매직 / 40~90분 / 강의실 가능 / 청소년·시니어"></textarea>
      <small>이름 / 시간 / 필요한 무대 / 추천 행사 순서입니다. 담당자가 가장 많이 묻는 것들입니다.</small></label>
    <label>주요 활동 · 이력
      <textarea name="이력" rows="4" placeholder="연도와 내용을 한 줄에 하나씩.&#10;&#10;2026.06 / ○○기업 창립기념식&#10;2026.04 / ○○시 봄 축제"></textarea></label>
  </fieldset>

  <fieldset class="ap__g">
    <legend><span>4</span>사진 · 영상</legend>
    <label>사진 보내실 방법 <span class="req">필수</span>
      <select name="사진전달">
        <option>메일로 보내겠습니다</option>
        <option>카카오톡으로 보내겠습니다</option>
        <option>구글드라이브 · 네이버클라우드 링크</option>
        <option>아직 없습니다 (촬영 상담 원함)</option>
      </select>
      <small>첫 화면용 세로 사진 1장, 무대 사진 4~8장이면 충분합니다.</small></label>
    <label>사진 링크 (있으면)
      <input name="사진링크" placeholder="구글드라이브 · 네이버클라우드 주소"></label>
    <label>첫 화면을 영상으로 하고 싶으신가요
      <select name="영상메인">
        <option>아니요 · 사진으로 하겠습니다</option>
        <option>네 · 영상을 첫 화면에 크게</option>
      </select>
      <small>영상을 고르시면 들어오자마자 무대 영상이 재생됩니다. 행사 담당자에게 가장 강합니다.</small></label>
    <label>영상 주소
      <textarea name="영상" rows="3" placeholder="유튜브 주소를 한 줄에 하나씩.&#10;첫 줄에 적으신 것이 첫 화면에 들어갑니다."></textarea></label>
  </fieldset>

  <fieldset class="ap__g">
    <legend><span>5</span>연락처</legend>
    <div class="ap__row">
      <label>이메일 <span class="req">필수</span>
        <input name="contact" type="text" required placeholder="연락받으실 주소"></label>
      <label>전화
        <input name="전화" placeholder="공개 여부는 아래에서 정하세요"></label>
    </div>
    <div class="ap__row">
      <label>인스타그램
        <input name="인스타그램" placeholder="주소 또는 아이디"></label>
      <label>유튜브
        <input name="유튜브" placeholder="채널 주소"></label>
    </div>
    <label>홈페이지에 공개할 것
      <select name="연락처공개">
        <option>문의폼만 (연락처는 숨김)</option>
        <option>문의폼 + 이메일</option>
        <option>문의폼 + 이메일 + 전화</option>
      </select>
      <small>연락처를 숨겨도 문의는 그대로 받습니다. 스팸이 크게 줄어듭니다.</small></label>
    <label>단가 표시
      <select name="단가표시">
        <option>문의 시 안내 (권장)</option>
        <option>홈페이지에 공개하겠습니다</option>
      </select></label>
  </fieldset>

  <fieldset class="ap__g">
    <legend><span>6</span>화면 구성</legend>
    <label>배치
      <select name="배치">
        <option>C · 섭외 중심 — 섭외 버튼과 조건이 맨 위 (가장 많이 선택)</option>
        <option>A · 원페이지 — 대표 이미지와 영상이 첫 화면</option>
        <option>B · 일정 중심 — 다가오는 공연이 첫 화면</option>
        <option>D · 전시형 — 사진 한 장이 첫 화면, 메뉴는 접어 둠</option>
        <option>잘 모르겠습니다 · 추천해 주세요</option>
      </select></label>

    <div class="ap__d">
      <span class="ap__dl">디자인 — 마음에 드는 것을 고르세요 <small>고르지 않으셔도 됩니다</small></span>
      <div class="picks">${designOpts}</div>
      <p class="ap__note">
        <a href="/designs/">디자인 ${designs.length}종 크게 보기</a> · 나중에 언제든 무료로 바꿔 드립니다.
      </p>
    </div>
  </fieldset>

  <fieldset class="ap__g">
    <legend><span>7</span>주소</legend>
    <label>원하는 도메인
      <input name="도메인" placeholder="예) junghanchoimagician.com">
      <small>없으시면 비워 두세요. 연 1~2만원이며 <b>본인 명의로</b> 등록해 드립니다.
        도메인 없이도 주소 하나는 드립니다.</small></label>
    <label>그 밖에 하고 싶은 말
      <textarea name="message" rows="4" placeholder="원하시는 것, 걱정되는 것 무엇이든"></textarea></label>
  </fieldset>

  <div class="ap__g" aria-hidden="true" style="position:absolute;left:-9999px">
    <label>회사<input name="company" tabindex="-1" autocomplete="off"></label>
  </div>

  <div class="ap__send">
    <button class="btn btn--big" type="submit">신청서 보내기</button>
    <p class="js-msg" hidden style="font-size:15px;margin-top:12px"></p>
    <p class="ap__note" style="margin-top:12px">
      보내신다고 결제되지 않습니다. 내용을 보고 먼저 연락드립니다.
    </p>
  </div>
</form>
</section></div>`;
}

export const APPLY_CSS = `
.ap{display:flex;flex-direction:column;gap:16px;max-width:820px}
.ap__g{border:1px solid var(--line);background:var(--night-2);
  padding:24px 22px;margin:0;display:flex;flex-direction:column;gap:16px}
.ap__g legend{display:flex;align-items:center;gap:10px;padding:0 8px;margin-left:-8px;
  font-family:var(--display);font-weight:700;font-size:19px}
.ap__g legend span{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;
  background:var(--ac);color:var(--night);font-family:var(--mono);font-size:13px;font-weight:500}
.ap label{display:flex;flex-direction:column;gap:6px;font-size:15px;font-weight:700}
.ap label small{font-weight:400;font-size:13.5px;color:var(--ivory-3);line-height:1.6}
.ap input,.ap textarea,.ap select{
  font-family:var(--body);font-size:15px;font-weight:400;color:var(--ivory);
  background:var(--night);border:1px solid var(--line);padding:12px 14px;width:100%}
.ap textarea{resize:vertical;line-height:1.7}
.ap input::placeholder,.ap textarea::placeholder{color:var(--ivory-3)}
.ap input:focus-visible,.ap textarea:focus-visible,.ap select:focus-visible{
  outline:2px solid var(--ac);outline-offset:-1px;border-color:var(--ac)}
.ap__row{display:grid;gap:16px}
@media(min-width:640px){.ap__row{grid-template-columns:1fr 1fr}}
.req{font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;color:var(--ac);
  font-weight:500;margin-left:6px}
.ap__d{display:flex;flex-direction:column;gap:10px}
.ap__dl{font-size:15px;font-weight:700}
.ap__dl small{font-weight:400;font-size:13.5px;color:var(--ivory-3);margin-left:6px}
.picks{display:grid;gap:8px}
@media(min-width:560px){.picks{grid-template-columns:repeat(2,1fr)}}
@media(min-width:900px){.picks{grid-template-columns:repeat(3,1fr)}}
.pick{flex-direction:row!important;align-items:center;gap:10px;
  border:1px solid var(--line);padding:10px 12px;cursor:pointer;font-weight:400}
.pick:hover{border-color:var(--ac-2)}
.pick input{position:absolute;opacity:0;width:1px;height:1px}
.pick:has(input:checked){border-color:var(--ac);box-shadow:inset 0 0 0 1px var(--ac)}
.pick:has(input:focus-visible){outline:2px solid var(--ac);outline-offset:2px}
.pick__sw{width:44px;height:34px;flex:0 0 auto;display:flex;align-items:center;
  justify-content:center;gap:4px;border:1px solid var(--line)}
.pick__sw b{font-size:15px;line-height:1}
.pick__sw i{width:7px;height:7px;border-radius:50%}
.pick__t{display:flex;flex-direction:column;font-size:14px;line-height:1.4;min-width:0}
.pick__t b{font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--ac);font-weight:500}
.pick__t small{font-size:12px;color:var(--ivory-3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ap__note{font-size:13.5px;color:var(--ivory-3)}
.ap__send{padding-top:4px}
`;
