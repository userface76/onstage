/**
 * 섭외 · 제작 문의 받기.
 *
 * Cloudflare Pages Functions — /api/contact 로 POST 되면 여기가 받는다.
 * 받은 내용을 Resend 로 메일 발송한다.
 *
 * Cloudflare 대시보드에서 환경변수 두 개를 넣어야 동작한다.
 *   RESEND_API_KEY   Resend 에서 받은 키 (re_ 로 시작)
 *   INQUIRY_EMAIL    문의를 받을 주소
 * 선택:
 *   FROM_EMAIL       보내는 주소. 없으면 onboarding@resend.dev 를 쓴다
 *                    (그 주소는 Resend 가입 메일로만 보낼 수 있다)
 *
 * 키가 없으면 메일을 보내지 않고 「접수됨」으로만 답한다 — 화면이 깨지지 않게.
 */

const ok = (body) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const bad = (message, status = 400) =>
  new Response(JSON.stringify({ ok: false, message }), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const clean = (v, max = 500) =>
  String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

export async function onRequestPost({ request, env }) {
  let data;
  try {
    const ct = request.headers.get('content-type') || '';
    data = ct.includes('application/json')
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return bad('내용을 읽지 못했습니다.');
  }

  // 봇 거르기 — 사람에게는 보이지 않는 칸이다. 채워져 있으면 봇이다.
  if (clean(data.company)) return ok({ ok: true });

  const name = clean(data.name, 80);
  const contact = clean(data.contact, 120);
  const message = clean(data.message, 3000);
  const when = clean(data.when, 200);
  const category = clean(data.category, 80);
  const region = clean(data.region, 120);
  const from = clean(data.from, 120);     // 어느 페이지에서 왔는지
  const artist = clean(data.artist, 80);  // 아티스트 페이지면 그 이름

  if (!name && !contact) return bad('이름과 연락처를 적어 주세요.');
  if (!contact) return bad('연락처를 적어 주세요.');

  const lines = [
    artist ? `아티스트   ${artist}` : null,
    `이름       ${name || '(없음)'}`,
    `연락처     ${contact}`,
    category ? `직군       ${category}` : null,
    region ? `지역·빈도  ${region}` : null,
    when ? `일정·장소  ${when}` : null,
    '',
    message || '(내용 없음)',
    '',
    '—',
    from ? `보낸 페이지 ${from}` : null,
    `받은 시각   ${new Date().toISOString()}`,
  ].filter((l) => l !== null).join('\n');

  const subject = artist
    ? `[온스테이지] ${artist} 섭외 문의 — ${name || contact}`
    : `[온스테이지] 제작 문의 — ${name || contact}`;

  const key = env.RESEND_API_KEY;
  const to = env.INQUIRY_EMAIL;

  // 아직 연결 전이면 조용히 접수만 한다. 문의가 사라지는 것보다 낫다고 알린다.
  // 어느 값이 없는지는 이름만 돌려준다 — 값은 절대 내보내지 않는다.
  if (!key || !to) {
    console.log('메일 미연결 · 접수 내용:\n' + lines);
    return ok({
      ok: true,
      sent: false,
      missing: [!key ? 'RESEND_API_KEY' : null, !to ? 'INQUIRY_EMAIL' : null].filter(Boolean),
      message: '접수되었습니다. 메일 연결 전이라 확인이 늦어질 수 있습니다.',
    });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL || '온스테이지 <onboarding@resend.dev>',
        to: [to],
        reply_to: contact.includes('@') ? contact : undefined,
        subject,
        text: lines,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Resend 실패', res.status, detail);
      return ok({
        ok: true,
        sent: false,
        message: '접수되었습니다. 메일 발송에 문제가 있어 확인이 늦어질 수 있습니다.',
      });
    }

    return ok({ ok: true, sent: true, message: '문의가 전달되었습니다. 곧 연락드리겠습니다.' });
  } catch (e) {
    console.error('발송 오류', e);
    return ok({
      ok: true,
      sent: false,
      message: '접수되었습니다. 확인 후 연락드리겠습니다.',
    });
  }
}

/** POST 아닌 요청은 안내만 한다. */
export async function onRequest() {
  return bad('이 주소는 문의 보내기 전용입니다.', 405);
}
