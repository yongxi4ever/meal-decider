/* 干饭贩卖机 · 网页版增强（仅网页部署包含此文件；小工具容器版不含）
   - 备份文件下载（a[download]）
   - 背景音乐 + 抽签音效 + 右上角声音开关（自注入 DOM/CSS，无需改动 index.html）
*/
(function () {
  'use strict';

  /* ================= 声音 ================= */
  var KEY = 'meal.sound';
  var soundOn = true;
  try {
    var raw = localStorage.getItem(KEY);
    if (raw !== null) soundOn = JSON.parse(raw) !== false;
  } catch (e) { /* 忽略 */ }

  function saveSound() {
    try { localStorage.setItem(KEY, JSON.stringify(soundOn)); } catch (e) { /* 忽略 */ }
  }

  // 注入样式（沿用页面 :root 里的像素风变量）
  var css = document.createElement('style');
  css.textContent =
    '.sound-toggle{position:fixed;z-index:60;right:12px;' +
    'top:calc(8px + var(--safe-area-inset-top, env(safe-area-inset-top, 0px)));' +
    'width:40px;height:40px;font-size:18px;line-height:1;padding:0;' +
    'background:var(--surface);color:var(--ink);border:3px solid var(--ink);' +
    'box-shadow:4px 4px 0 var(--ink);cursor:pointer;' +
    '-webkit-appearance:none;appearance:none;}' +
    '.sound-toggle:active{transform:translate(4px,4px);box-shadow:none;}' +
    '.sound-toggle.off{opacity:.5;}' +
    '.sound-hint{position:fixed;z-index:59;right:60px;display:none;pointer-events:none;' +
    'top:calc(16px + var(--safe-area-inset-top, env(safe-area-inset-top, 0px)));' +
    'font-family:var(--f-pixel, monospace);font-size:11px;color:var(--ink);' +
    'background:var(--surface);border:3px solid var(--ink);box-shadow:3px 3px 0 var(--ink);padding:6px 8px;}' +
    '.sound-hint.show{display:block;animation:pop 120ms steps(2);}';
  document.head.appendChild(css);

  // 创建音频元素（包内媒体文件，相对路径）
  var bgm = document.createElement('audio');
  bgm.src = './audio/bgm.m4a';
  bgm.loop = true;
  bgm.preload = 'auto';
  var sfx = document.createElement('audio');
  sfx.src = './audio/sfx.m4a';
  sfx.preload = 'auto';
  document.body.appendChild(bgm);
  document.body.appendChild(sfx);

  // 右上角开关 + 提示
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', '声音开关');
  document.body.appendChild(btn);

  var hint = document.createElement('div');
  hint.className = 'sound-hint';
  hint.textContent = '点击任意处开启音乐';
  document.body.appendChild(hint);

  function updateUI() {
    btn.textContent = soundOn ? '🔊' : '🔇';
    btn.className = 'sound-toggle' + (soundOn ? '' : ' off');
  }
  function showHint() { if (soundOn) hint.classList.add('show'); }
  function hideHint() { hint.classList.remove('show'); }

  var unlocked = false;

  // 尽力立即播放（部分环境允许；被拦截则等首次手势）
  function tryPlay() {
    if (!soundOn || unlocked) return;
    var p;
    try { p = bgm.play(); } catch (e) { showHint(); return; }
    if (p && p.then) {
      p.then(function () { unlocked = true; hideHint(); })
       .catch(function () { showHint(); });
    } else {
      unlocked = true;
      hideHint();
    }
  }

  function playSfx() {
    if (!soundOn) return;
    try {
      sfx.currentTime = 0;
      var p = sfx.play();
      if (p && p.catch) p.catch(function () { /* 忽略 */ });
    } catch (e) { /* 忽略 */ }
  }
  function toggle() {
    soundOn = !soundOn;
    saveSound();
    if (!soundOn) { try { bgm.pause(); } catch (e) { /* 忽略 */ } hideHint(); }
    else { unlocked = false; tryPlay(); }
    updateUI();
  }
  btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });

  // 首次任意手势都尝试解锁（尽量早）
  function unlock() { tryPlay(); }
  ['pointerdown', 'mousedown', 'touchstart', 'keydown', 'click', 'scroll'].forEach(function (ev) {
    document.addEventListener(ev, unlock, { passive: true });
  });

  // 回到前台时重试
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { try { bgm.pause(); } catch (e) { /* 忽略 */ } }
    else { unlocked = false; tryPlay(); }
  });

  // 抽签音效：监听贩卖机 spinning 类（不改动 app.js）
  var machine = document.getElementById('machine');
  if (machine && window.MutationObserver) {
    var obs = new MutationObserver(function () {
      if (machine.classList.contains('spinning')) playSfx();
    });
    obs.observe(machine, { attributes: true, attributeFilter: ['class'] });
  }

  updateUI();
  tryPlay();   // 进入即尝试播放

  /* ================= 备份文件下载 ================= */
  window.MEAL_WEB_EXTRAS = {
    available: true,
    download: function (text, filename) {
      try {
        var blob = new Blob([text], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename || 'meal-decider-backup.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      } catch (e) { /* 忽略下载失败 */ }
    }
  };
})();
