/* 干饭贩卖机 · 小工具逻辑（Chrome 61 / ES2017 基线） */
(function () {
  'use strict';

  /* ---------- 配置 ---------- */
  var MEALS = ['早餐', '正餐', '下午茶', '夜宵'];
  var LIGHTS = [{ k: 'no', t: '不需要轻食' }, { k: 'need', t: '需要轻食' }, { k: 'any', t: '无所谓' }];
  var GROUPS = [
    { key: 'taste', label: '口味', opts: ['辣', '清淡', '甜', '酸', '咸鲜', '麻'] },
    { key: 'meat', label: '荤素', opts: ['纯素', '有肉', '海鲜'] },
    { key: 'temp', label: '冷热', opts: ['热食', '凉食', '带汤'] },
    { key: 'staple', label: '主食', opts: ['米饭', '面', '粉', '汤', '饼', '包子饺子'] },
    { key: 'scene', label: '场景·不选默认一人食', opts: ['约会', '聚餐'] }
  ];

  // 忌口：match(f) 为 true 表示该食物在开启此忌口时【被排除】
  var AVOIDS = [
    { k: 'veg', t: '素食', match: function (f) { return !(f.tags.meat || []).includes('纯素'); } },
    { k: 'spicy', t: '不吃辣', match: function (f) { return (f.tags.taste || []).includes('辣'); } },
    { k: 'sea', t: '不吃海鲜', match: function (f) { return (f.tags.meat || []).includes('海鲜'); } },
    { k: 'sweet', t: '不吃甜', match: function (f) { return (f.tags.taste || []).includes('甜'); } },
    { k: 'sour', t: '不吃酸', match: function (f) { return (f.tags.taste || []).includes('酸'); } },
    { k: 'cold', t: '不吃凉食', match: function (f) { return (f.tags.temp || []).includes('凉食'); } },
    { k: 'soup', t: '不吃带汤', match: function (f) { return (f.tags.temp || []).includes('带汤'); } },
    { k: 'noodle', t: '不吃面食', match: function (f) { return (f.tags.staple || []).includes('面'); } },
    { k: 'rice', t: '不吃米饭', match: function (f) { return (f.tags.staple || []).includes('米饭'); } }
  ];

  /* ---------- 状态 ---------- */
  var IS_CONTAINER = !!(window.xhs && window.xhs.miniTool);
  var WEB = window.MEAL_WEB_EXTRAS;
  var CAN_FILES = !IS_CONTAINER && !!(WEB && WEB.available);

  var BUILTIN = (window.FOODS_DATA || []).slice();
  var customFoods = [];
  (function () {
    var stored = load('meal.foods', []);
    if (Array.isArray(stored)) {
      stored.forEach(function (f) { var s = sanitizeFood(f); if (s) customFoods.push(s); });
    }
  })();
  var FOODS = BUILTIN.concat(customFoods);

  var state = { meal: null, light: null, chip: {} };
  var avoidSet = load('meal.avoid', []);
  var tempExclude = {};
  var newFoodTags = [];
  var newFoodMeals = [];
  var lastResult = null;
  var toastTimer = null;
  var avoidFromPrefs = false;

  function load(k, d) {
    try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; }
  }
  function save(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 忽略写入失败 */ }
  }
  function sanitizeFood(f) {
    if (!f || typeof f.name !== 'string' || !f.name) return null;
    if (!Array.isArray(f.meal) || !f.meal.length) return null;
    var src = f.tags || {};
    var tags = {};
    ['taste', 'meat', 'temp', 'staple', 'scene'].forEach(function (g) {
      tags[g] = Array.isArray(src[g]) ? src[g].filter(function (x) { return typeof x === 'string'; }) : [];
    });
    var id = (typeof f.id === 'number') ? f.id : (Date.now() + Math.floor(Math.random() * 1000));
    return {
      id: id, cat: '自定义', name: f.name,
      emoji: (typeof f.emoji === 'string' && f.emoji) ? f.emoji : '🍽️',
      custom: true, meal: f.meal.slice(), tags: tags
    };
  }
  function saveCustom() {
    save('meal.foods', customFoods);
    FOODS = BUILTIN.concat(customFoods);
  }
  function $(id) { return document.getElementById(id); }

  /* ---------- 初始化默认时段 ---------- */
  function defaultMeal() {
    var h = new Date().getHours();
    if (h >= 5 && h < 10) return '早餐';
    if (h >= 10 && h < 16) return '正餐';
    if (h >= 16 && h < 17) return '下午茶';
    if (h >= 17 && h < 21) return '正餐';
    return '夜宵';
  }

  /* ---------- 渲染 ---------- */
  function renderShelf() {
    var pick = FOODS.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 9);
    $('shelf').innerHTML = pick.map(function (f) {
      return '<div class="cell"><span>' + f.emoji + '</span></div>';
    }).join('');
  }

  function renderRequired() {
    $('mealRow').innerHTML = MEALS.map(function (m) {
      return '<button class="pick-btn' + (state.meal === m ? ' on' : '') +
        '" data-act="setMeal" data-meal="' + m + '">' + m + '</button>';
    }).join('');
    $('lightRow').innerHTML = LIGHTS.map(function (l) {
      return '<button class="pick-btn' + (state.light === l.k ? ' on' : '') +
        '" data-act="setLight" data-light="' + l.k + '">' + l.t + '</button>';
    }).join('');
  }
  function setMeal(m) { state.meal = m; renderRequired(); }
  function setLight(k) { state.light = k; renderRequired(); }

  function renderGroups() {
    $('groups').innerHTML = GROUPS.map(function (g) {
      var chips = g.opts.map(function (o) {
        var k = g.key + ':' + o;
        var s = state.chip[k] || 0;
        var cls = s === 1 ? 'want' : (s === 2 ? 'avoid' : '');
        return '<div class="chip ' + cls + '" data-act="toggleChip" data-k="' + k + '">' + o + '</div>';
      }).join('');
      return '<div class="group">' +
        '<div class="g-label"><b>' + g.label + '</b><span class="opt">（可选）</span></div>' +
        '<div class="chips">' + chips + '</div>' +
        '</div>';
    }).join('');
  }
  function toggleChip(el) {
    var k = el.getAttribute('data-k');
    var s = ((state.chip[k] || 0) + 1) % 3;
    if (s === 0) delete state.chip[k]; else state.chip[k] = s;
    el.className = 'chip' + (s === 1 ? ' want' : (s === 2 ? ' avoid' : ''));
  }

  /* ---------- 偏好集合 ---------- */
  function getPrefSets() {
    var want = {}, avoid = {};
    Object.keys(state.chip).forEach(function (k) {
      var parts = k.split(':');
      var g = parts[0], o = parts[1];
      if (state.chip[k] === 1) { (want[g] = want[g] || []).push(o); }
      if (state.chip[k] === 2) { (avoid[g] = avoid[g] || []).push(o); }
    });
    return { want: want, avoid: avoid };
  }
  function hasAny(o) { return Object.keys(o).length > 0; }
  function lightLabel(k) {
    for (var i = 0; i < LIGHTS.length; i++) { if (LIGHTS[i].k === k) return LIGHTS[i].t; }
    return '';
  }
  function avoidLabel(k) {
    for (var i = 0; i < AVOIDS.length; i++) { if (AVOIDS[i].k === k) return AVOIDS[i].t; }
    return '';
  }

  /* ---------- 打开偏好 ---------- */
  function openPrefs() {
    if (!state.meal) state.meal = defaultMeal();
    if (!state.light) state.light = 'any';
    renderRequired(); renderGroups(); updateAvoidUI();
    $('prefOverlay').classList.add('show');
  }
  function closePrefs() { $('prefOverlay').classList.remove('show'); }

  /* ---------- 二次确认 ---------- */
  function openConfirm() {
    if (!state.meal) { toast('请先选择时段'); return; }
    if (!state.light) { toast('请选择是否需要轻食'); return; }
    var pref = getPrefSets();
    var want = pref.want, avoid = pref.avoid;
    function collect(o) {
      var out = [];
      for (var g in o) { if (g === 'scene') continue; o[g].forEach(function (t) { out.push(t); }); }
      return out;
    }
    var wantTags = collect(want), avoidTags = collect(avoid);
    var scenePicked = (want.scene && want.scene.length) || (avoid.scene && avoid.scene.length);
    var sceneText = scenePicked
      ? (want.scene || []).map(function (t) { return '<span class="pill want">' + t + '</span>'; }).join('') +
        (avoid.scene || []).map(function (t) { return '<span class="pill avoid">' + t + '</span>'; }).join('')
      : '一人食（默认）';
    var avoidText = avoidSet.length
      ? avoidSet.map(function (k) { return '<span class="pill avoid">' + avoidLabel(k) + '</span>'; }).join('')
      : '无';
    function row(k, v) {
      return '<div class="confirm-row"><div class="k">' + k + '</div><div class="v">' + v + '</div></div>';
    }
    $('confirmBody').innerHTML =
      row('时段', state.meal) +
      row('轻食', lightLabel(state.light)) +
      row('场景', sceneText) +
      row('忌口', avoidText) +
      row('想吃', wantTags.length ? wantTags.map(function (t) { return '<span class="pill want">' + t + '</span>'; }).join('') : '无') +
      row('不想吃', avoidTags.length ? avoidTags.map(function (t) { return '<span class="pill avoid">' + t + '</span>'; }).join('') : '无');
    closePrefs();
    $('confirmOverlay').classList.add('show');
  }
  function closeConfirm() { $('confirmOverlay').classList.remove('show'); }
  function backToEdit() {
    closeConfirm();
    setTimeout(function () { $('prefOverlay').classList.add('show'); }, 120);
  }

  /* ---------- 抽选 ---------- */
  function buildPool(relax) {
    var pref = getPrefSets();
    var want = pref.want, avoid = pref.avoid;
    var pool = FOODS.filter(function (f) { return f.meal.indexOf(state.meal) !== -1; });
    pool = pool.filter(function (f) { return !tempExclude[f.id]; });
    if (relax < 3) {
      var active = AVOIDS.filter(function (a) { return avoidSet.indexOf(a.k) !== -1; });
      pool = pool.filter(function (f) {
        for (var i = 0; i < active.length; i++) { if (active[i].match(f)) return false; }
        return true;
      });
    }
    if (relax < 2) {
      if (state.light === 'need') pool = pool.filter(function (f) { return (f.tags.meat || []).indexOf('轻食') !== -1; });
      if (state.light === 'no') pool = pool.filter(function (f) { return (f.tags.meat || []).indexOf('轻食') === -1; });
    }
    if (relax < 1) {
      pool = pool.filter(function (f) {
        for (var g in avoid) {
          var arr = f.tags[g] || [];
          for (var i = 0; i < arr.length; i++) { if (avoid[g].indexOf(arr[i]) !== -1) return false; }
        }
        return true;
      });
      var scenePicked = (want.scene && want.scene.length) || (avoid.scene && avoid.scene.length);
      if (!scenePicked) {
        pool = pool.filter(function (f) {
          return !(f.tags.scene.length === 1 && f.tags.scene[0] === '聚餐');
        });
      }
    }
    return { pool: pool, want: want };
  }
  function pick() {
    var relax = 0, res = null;
    while (relax <= 3) { res = buildPool(relax); if (res.pool.length) break; relax++; }
    var pool = res.pool, want = res.want;
    if (!pool.length) return null;
    if (relax > 0) toast('偏好太严格，已自动放宽条件');
    if (!hasAny(want)) return pool[Math.floor(Math.random() * pool.length)];
    var weights = pool.map(function (f) {
      var hits = 0;
      for (var g in want) {
        var arr = f.tags[g] || [];
        for (var i = 0; i < arr.length; i++) { if (want[g].indexOf(arr[i]) !== -1) { hits++; break; } }
      }
      return 1 + 2 * hits;
    });
    var total = weights.reduce(function (a, b) { return a + b; }, 0);
    var r = Math.random() * total;
    for (var i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) return pool[i]; }
    return pool[pool.length - 1];
  }
  function spinAndShow(msg) {
    var machine = $('machine');
    machine.classList.add('spinning');
    setTimeout(function () {
      machine.classList.remove('spinning');
      lastResult = pick();
      if (!lastResult) { toast(msg); return; }
      showReceipt(lastResult);
    }, 900);
  }
  function confirmDraw() { closeConfirm(); spinAndShow('没有符合条件的食物，请放宽偏好'); }
  function excludeAndAgain() {
    if (lastResult) tempExclude[lastResult.id] = true;
    closeReceipt();
    spinAndShow('没有符合条件的食物，请放宽忌口');
  }
  function showReceipt(f) {
    $('r-emoji').textContent = f.emoji;
    $('r-name').textContent = f.name;
    $('r-meal').textContent = state.meal;
    var tags = [];
    GROUPS.forEach(function (g) { (f.tags[g.key] || []).forEach(function (t) { tags.push(t); }); });
    $('r-tags').textContent = tags.length ? tags.join(' · ') : '—';
    var d = new Date();
    function p(n) { return String(n).padStart(2, '0'); }
    $('r-time').textContent = d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) +
      ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
    $('r-no').textContent = '#' + String(Math.floor(1000 + Math.random() * 8999));
    var bars = [];
    for (var i = 0; i < 26; i++) {
      bars.push('<i style="width:' + (1 + Math.floor(Math.random() * 3)) + 'px;height:' +
        (18 + Math.floor(Math.random() * 16)) + 'px"></i>');
    }
    $('r-barcode').innerHTML = bars.join('');
    $('receiptOverlay').classList.add('show');
  }
  function closeReceipt() { $('receiptOverlay').classList.remove('show'); }
  function again() {
    closeReceipt();
    setTimeout(function () { $('prefOverlay').classList.add('show'); }, 150);
  }

  /* ---------- 美食库 ---------- */
  function openLib() {
    renderLib(); renderAddMeals(); renderAddTags();
    $('libOverlay').classList.add('show');
  }
  function closeLib() { $('libOverlay').classList.remove('show'); }
  function renderLib() {
    var list = customFoods.slice().reverse().concat(BUILTIN);
    $('foodList').innerHTML = list.map(function (f) {
      var tags = [];
      GROUPS.forEach(function (g) { (f.tags[g.key] || []).forEach(function (t) { tags.push(t); }); });
      var right = f.custom
        ? '<button class="del" data-act="delFood" data-id="' + f.id + '">删除</button>'
        : '<span class="builtin-badge">内置</span>';
      return '<div class="food-row">' +
        '<span class="e">' + f.emoji + '</span>' +
        '<span class="n">' + f.name + '<br><span class="tag">' + f.meal.join('/') + ' · ' +
        (tags.join(' · ') || '—') + '</span></span>' + right +
        '</div>';
    }).join('');
  }
  function renderAddMeals() {
    $('f-meal').innerHTML = MEALS.map(function (m) {
      return '<span class="mini-chip" data-act="toggleNewMeal" data-m="' + m + '">' + m + '</span>';
    }).join('');
  }
  function renderAddTags() {
    $('f-tags').innerHTML = GROUPS.map(function (g) {
      return g.opts.map(function (o) {
        return '<span class="mini-chip" data-act="toggleNewTag" data-t="' + g.key + ':' + o + '">' + o + '</span>';
      }).join('');
    }).join('');
  }
  function toggleNewMeal(el) {
    var m = el.getAttribute('data-m');
    var i = newFoodMeals.indexOf(m);
    if (i !== -1) { newFoodMeals.splice(i, 1); el.classList.remove('on'); }
    else { newFoodMeals.push(m); el.classList.add('on'); }
  }
  function toggleNewTag(el) {
    var t = el.getAttribute('data-t');
    var i = newFoodTags.indexOf(t);
    if (i !== -1) { newFoodTags.splice(i, 1); el.classList.remove('on'); }
    else { newFoodTags.push(t); el.classList.add('on'); }
  }
  function addFood() {
    var name = $('f-name').value.trim();
    var emoji = $('f-emoji').value.trim() || '🍽️';
    if (!name) { toast('请填写名称'); return; }
    if (!newFoodMeals.length) { toast('请选择可出现的时段'); return; }
    var tags = { taste: [], meat: [], temp: [], staple: [], scene: [] };
    newFoodTags.forEach(function (t) {
      var parts = t.split(':');
      tags[parts[0]].push(parts[1]);
    });
    customFoods.push({ id: Date.now(), cat: '自定义', name: name, emoji: emoji, custom: true, meal: newFoodMeals.slice(), tags: tags });
    saveCustom();
    $('f-name').value = '';
    $('f-emoji').value = '';
    newFoodTags = []; newFoodMeals = [];
    renderAddMeals(); renderAddTags(); renderLib(); renderShelf();
    toast('已加入美食库');
  }
  function delFood(id) {
    customFoods = customFoods.filter(function (f) { return f.id !== id; });
    saveCustom();
    renderLib(); renderShelf();
  }

  /* ---------- 忌口 ---------- */
  function openAvoid(fromPrefs) {
    if (fromPrefs) { closePrefs(); avoidFromPrefs = true; }
    renderAvoidChips();
    $('avoidOverlay').classList.add('show');
  }
  function closeAvoid() {
    $('avoidOverlay').classList.remove('show');
    updateAvoidUI();
    if (avoidFromPrefs) { avoidFromPrefs = false; $('prefOverlay').classList.add('show'); }
  }
  function renderAvoidChips() {
    $('avoidChips').innerHTML = AVOIDS.map(function (a) {
      var on = avoidSet.indexOf(a.k) !== -1;
      return '<div class="chip' + (on ? ' avoid' : '') + '" data-act="toggleAvoid" data-k="' + a.k + '">' + a.t + '</div>';
    }).join('');
  }
  function toggleAvoid(k, el) {
    var i = avoidSet.indexOf(k);
    if (i !== -1) avoidSet.splice(i, 1); else avoidSet.push(k);
    save('meal.avoid', avoidSet);
    el.classList.toggle('avoid');
    updateAvoidUI();
  }
  function updateAvoidUI() {
    var n = avoidSet.length;
    var b = $('avoidBadge');
    b.textContent = n ? String(n) : '';
    b.style.display = n ? 'inline-block' : 'none';
    $('avoidHint').textContent = n
      ? '已启用忌口：' + avoidSet.map(avoidLabel).join('、') + ' · 去设置 >'
      : '未设置忌口 · 去设置 >';
  }

  /* ---------- 数据管理（导出 / 导入 / 清空） ---------- */
  function openData() { $('dataOverlay').classList.add('show'); }
  function closeData() { $('dataOverlay').classList.remove('show'); }
  function buildExport() {
    return JSON.stringify({
      version: 1,
      exportedAt: new Date().toISOString(),
      avoid: avoidSet,
      foods: customFoods
    }, null, 2);
  }
  function openExport() {
    $('exportText').value = buildExport();
    $('exportFileRow').style.display = CAN_FILES ? 'flex' : 'none';
    $('exportOverlay').classList.add('show');
  }
  function closeExport() { $('exportOverlay').classList.remove('show'); }
  function downloadBackup() {
    if (CAN_FILES && WEB.download) { WEB.download(buildExport()); }
    else { toast('当前环境不支持文件下载，请长按复制文本'); }
  }
  function openImport() {
    $('importText').value = '';
    $('importFileRow').style.display = CAN_FILES ? 'flex' : 'none';
    $('importOverlay').classList.add('show');
  }
  function closeImport() { $('importOverlay').classList.remove('show'); }
  function pickImportFile() { var el = $('importFile'); if (el) el.click(); }
  function applyImport(data) {
    var foods = Array.isArray(data.foods) ? data.foods : null;
    var avoid = Array.isArray(data.avoid) ? data.avoid : null;
    if (!foods && !avoid) { toast('备份内容无法识别'); return false; }
    var next = [];
    if (foods) foods.forEach(function (f) { var s = sanitizeFood(f); if (s) next.push(s); });
    customFoods = next;
    avoidSet = avoid ? avoid.filter(function (k) { return typeof k === 'string'; }) : [];
    save('meal.foods', customFoods);
    save('meal.avoid', avoidSet);
    FOODS = BUILTIN.concat(customFoods);
    tempExclude = {};
    renderShelf(); renderLib(); renderAvoidChips(); updateAvoidUI();
    return true;
  }
  function doImport() {
    var raw = $('importText').value.trim();
    if (!raw) { toast('请先粘贴或选择备份内容'); return; }
    var data;
    try { data = JSON.parse(raw); } catch (e) { toast('格式错误：不是有效的 JSON'); return; }
    if (!window.confirm('导入将覆盖当前的自定义食物与忌口设置，且无法撤销。确定继续吗？')) return;
    if (!applyImport(data)) return;
    closeImport();
    toast('导入成功，已覆盖');
  }
  function clearAll() {
    if (!window.confirm('确定清空所有自定义食物与忌口设置吗？此操作无法撤销，建议先导出备份。')) return;
    customFoods = [];
    avoidSet = [];
    save('meal.foods', customFoods);
    save('meal.avoid', avoidSet);
    FOODS = BUILTIN.concat(customFoods);
    tempExclude = {};
    renderShelf(); renderLib(); renderAvoidChips(); updateAvoidUI();
    toast('已清空，恢复默认');
  }

  /* ---------- toast ---------- */
  function toast(msg) {
    var el = $('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 1800);
  }

  /* ---------- 事件委托（容器禁用内联事件，统一在此绑定） ---------- */
  var ACTIONS = {
    openLib: function () { openLib(); },
    closeLib: function () { closeLib(); },
    openAvoid: function (el) { openAvoid(el.getAttribute('data-from') === 'prefs'); },
    closeAvoid: function () { closeAvoid(); },
    openPrefs: function () { openPrefs(); },
    closePrefs: function () { closePrefs(); },
    openConfirm: function () { openConfirm(); },
    closeConfirm: function () { closeConfirm(); },
    backToEdit: function () { backToEdit(); },
    confirmDraw: function () { confirmDraw(); },
    excludeAndAgain: function () { excludeAndAgain(); },
    again: function () { again(); },
    closeReceipt: function () { closeReceipt(); },
    addFood: function () { addFood(); },
    setMeal: function (el) { setMeal(el.getAttribute('data-meal')); },
    setLight: function (el) { setLight(el.getAttribute('data-light')); },
    toggleChip: function (el) { toggleChip(el); },
    delFood: function (el) { delFood(Number(el.getAttribute('data-id'))); },
    toggleNewMeal: function (el) { toggleNewMeal(el); },
    toggleNewTag: function (el) { toggleNewTag(el); },
    toggleAvoid: function (el) { toggleAvoid(el.getAttribute('data-k'), el); },
    openExport: function () { openExport(); },
    closeExport: function () { closeExport(); },
    openData: function () { openData(); },
    closeData: function () { closeData(); },
    downloadBackup: function () { downloadBackup(); },
    openImport: function () { openImport(); },
    closeImport: function () { closeImport(); },
    pickImportFile: function () { pickImportFile(); },
    doImport: function () { doImport(); },
    clearAll: function () { clearAll(); }
  };

  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el !== document) {
      if (el.getAttribute && el.getAttribute('data-act')) break;
      el = el.parentNode;
    }
    if (!el || el === document) return;
    var act = el.getAttribute('data-act');
    if (ACTIONS[act]) { e.preventDefault(); ACTIONS[act](el, e); }
  });

  /* ---------- init ---------- */
  (function () {
    var el = $('importFile');
    if (el) {
      el.addEventListener('change', function () {
        var file = el.files && el.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () { $('importText').value = String(reader.result || ''); };
        reader.readAsText(file);
      });
    }
  })();

  renderShelf();
  renderRequired();
  renderGroups();
  renderAddMeals();
  renderAddTags();
  updateAvoidUI();
})();
