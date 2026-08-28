/**
 * Workers 진입점.
 *
 * Cloudflare Workers 는 Pages 와 달리 functions/ 폴더 규약을 쓰지 않는다.
 * 여기서 /api/* 만 직접 받고, 나머지는 dist 에 올려 둔 정적 파일로 넘긴다.
 */

import { onRequestPost } from '../functions/api/contact.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      if (request.method === 'POST') return onRequestPost({ request, env });
      return new Response(
        JSON.stringify({ ok: false, message: '이 주소는 문의 보내기 전용입니다.' }),
        { status: 405, headers: { 'content-type': 'application/json; charset=utf-8' } },
      );
    }

    // 정적 파일 — 랜딩 · 목록 · 디자인 · 아티스트 페이지
    return env.ASSETS.fetch(request);
  },
};
