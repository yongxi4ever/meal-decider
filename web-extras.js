/* 干饭贩卖机 · 网页版增强（仅网页部署包含此文件；容器版不含，避免触发 a[download] 限制） */
(function () {
  'use strict';

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
