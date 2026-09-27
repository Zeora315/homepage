// 配置：微信页视口高度变量；用于移动端浏览器地址栏变化时保持页面满屏
// 改进vh
const vh = window.innerHeight * 1;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 1;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// 兼容旧浏览器的复制
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch (e) {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

document.addEventListener('DOMContentLoaded', (event) => {
  // 配置：微信页 URL 参数；replyText 用来控制“关注公众号并回复”的关键词
  // 获取URL参数
  const urlParams = new URLSearchParams(window.location.search);
  const replyText = urlParams.get('replyText');

  const replyNode = document.getElementById('wechat-need-reply');

  // 检测是否有replyText参数
  if (replyText) {
    replyNode.style.display = 'flex';
    document.getElementById('wechat-need-reply-text').textContent = replyText;
  } else {
    replyNode.style.display = 'none';
  }

  document.getElementById('wechat-need-reply-copybtn').addEventListener('click', function () {
    const textToCopy = document.getElementById('wechat-need-reply-text').innerText;
    const replyBackElement = document.getElementById('wechat-need-reply-back');
    const originalText = '即可获取资源'; // 配置：复制按钮恢复后的默认提示文字

    copyText(textToCopy).then((ok) => {
      if (ok) {
        replyBackElement.innerText = '复制成功';
        replyBackElement.style.color = 'green';
      } else {
        replyBackElement.innerText = '复制失败，请手动复制';
        replyBackElement.style.color = '#e11d48';
      }
      setTimeout(() => {
        replyBackElement.innerText = originalText;
        replyBackElement.style.color = '';
      }, 2000);
    });
  });

  // 主题切换（与首页一致）
  var themeBtn = document.getElementById('wechat-theme-toggle');
  var html = document.documentElement;
  var savedTheme = localStorage.getItem('theme') || 'light'; // 配置：微信页默认主题；没有本地记录时使用 light
  if (savedTheme === 'dark') html.setAttribute('data-theme', 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var cur = html.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : 'dark';
      if (next === 'dark') html.setAttribute('data-theme', 'dark');
      else html.removeAttribute('data-theme');
      localStorage.setItem('theme', next);
    });
  }

  // 加载动画（含跳过按钮）
  (function () {
    var loading = document.getElementById('wechat-loading');
    if (!loading) return;
    var skipBtn = document.getElementById('wechat-loading-skip');
    var isHidden = function () { return loading.classList.contains('is-hidden') || loading.style.display === 'none'; };
    var showSkipTimer = setTimeout(function () {
      if (!isHidden()) skipBtn && skipBtn.classList.add('is-visible');
    }, 3000); // 配置：加载超过 3 秒才显示“跳过动画”按钮
    var hide = function () {
      if (isHidden()) return;
      clearTimeout(showSkipTimer);
      if (skipBtn) skipBtn.classList.remove('is-visible');
      loading.classList.add('is-hidden');
      setTimeout(function () {
        loading.style.display = 'none';
      }, 350); // 配置：加载层淡出后隐藏的延迟，需接近 CSS 的过渡时间
    };
    if (skipBtn) skipBtn.addEventListener('click', hide);
    // 配置：微信页加载动画最长停留时间；2.5s 后自动收尾，load 完成则提前 200ms 收尾
    var autoHide = setTimeout(hide, 2500);
    window.addEventListener('load', function () {
      clearTimeout(autoHide);
      setTimeout(hide, 200);
    });
  })();
});

window.addEventListener('load', function () {
  var loading = document.getElementById('wechat-loading');
  var skip = document.getElementById('wechat-loading-skip');
  if (loading && !loading.classList.contains('is-hidden')) {
    if (skip) skip.classList.remove('is-visible');
    loading.classList.add('is-hidden');
    setTimeout(function () {
      loading.style.display = 'none';
    }, 350);
  }
});
