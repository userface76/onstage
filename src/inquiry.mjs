/**
 * 문의폼 보내기.
 *
 * 페이지를 떠나지 않고 /api/contact 로 보낸다.
 * 자바스크립트가 꺼져 있어도 폼 자체는 남아 있으므로 내용이 사라지지는 않는다.
 */

export const INQUIRY_JS = `
(function () {
  var forms = document.querySelectorAll('.js-inquiry');
  if (!forms.length) return;

  forms.forEach(function (form) {
    var msg = form.querySelector('.js-msg');
    var btn = form.querySelector('button[type=submit]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn.disabled) return;

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      data.from = location.pathname;
      if (form.dataset.artist) data.artist = form.dataset.artist;

      var label = btn.textContent;
      btn.disabled = true;
      btn.textContent = '보내는 중…';
      msg.hidden = true;

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (out) {
          msg.hidden = false;
          if (out.ok) {
            msg.style.color = 'var(--ac)';
            msg.textContent = out.message || '문의가 전달되었습니다. 곧 연락드리겠습니다.';
            form.reset();
            btn.textContent = '보냈습니다';
          } else {
            msg.style.color = 'var(--ivory-2)';
            msg.textContent = out.message || '보내지 못했습니다. 잠시 후 다시 시도해 주세요.';
            btn.disabled = false;
            btn.textContent = label;
          }
        })
        .catch(function () {
          msg.hidden = false;
          msg.style.color = 'var(--ivory-2)';
          msg.textContent = '연결이 끊겼습니다. 잠시 후 다시 시도해 주세요.';
          btn.disabled = false;
          btn.textContent = label;
        });
    });
  });
})();
`;
