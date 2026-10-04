// --- 0. 主题切换功能 ---
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// 配置：默认主题；localStorage 里没有 theme 时使用 light，改成 dark 可让首次访问默认深色
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
}

// 主题切换函数
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// 绑定点击事件
themeToggle?.addEventListener('click', toggleTheme);

// --- 0.1 顶部菜单跳转 ---
const navMenuToggle = document.getElementById('nav-menu-toggle');
const navSectionMenu = document.getElementById('nav-section-menu');
const navSheetLayer = document.getElementById('nav-sheet-layer');
const sitePage = document.getElementById('site-page');
const navbar = document.querySelector('.navbar');
const navSheetOptions = navSectionMenu?.querySelector('.nav-sheet-options');
const navSheetHandle = navSectionMenu?.querySelector('.nav-sheet-handle');
let navFocusBeforeOpen = null;
let navSwipeStart = null;
let navSwipeDistance = 0;
let navHandlePointerId = null;

function closeNavSectionMenu(restoreFocus = true) {
    if (!navSheetLayer?.classList.contains('open')) return;
    navSwipeStart = null;
    navSwipeDistance = 0;
    navSectionMenu?.classList.remove('dragging');
    navSectionMenu?.style.removeProperty('--nav-sheet-drag');
    navSheetLayer.classList.remove('open');
    navSheetLayer.setAttribute('aria-hidden', 'true');
    navSheetLayer.setAttribute('inert', '');
    document.body.classList.remove('nav-sheet-open');
    navbar?.removeAttribute('inert');
    sitePage?.removeAttribute('inert');
    navMenuToggle?.classList.remove('is-open');
    navMenuToggle?.setAttribute('aria-expanded', 'false');
    navMenuToggle?.setAttribute('aria-label', '打开菜单');
    if (restoreFocus && navFocusBeforeOpen?.isConnected) navFocusBeforeOpen.focus();
}

function openNavSectionMenu() {
    if (!navSheetLayer || !navSectionMenu) return;
    navFocusBeforeOpen = document.activeElement;
    sitePage?.style.setProperty('--nav-sheet-center', `${window.scrollY + window.innerHeight / 2}px`);
    navSectionMenu.style.removeProperty('--nav-sheet-drag');
    navSheetLayer.removeAttribute('inert');
    navSheetLayer.setAttribute('aria-hidden', 'false');
    navSheetLayer.classList.add('open');
    document.body.classList.add('nav-sheet-open');
    navMenuToggle?.classList.add('is-open');
    navMenuToggle?.setAttribute('aria-expanded', 'true');
    navMenuToggle?.setAttribute('aria-label', '关闭菜单');
    navbar?.setAttribute('inert', '');
    sitePage?.setAttribute('inert', '');
    navSectionMenu.focus();
}

navMenuToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    if (navSheetLayer?.classList.contains('open')) {
        closeNavSectionMenu();
    } else {
        openNavSectionMenu();
    }
});

navSectionMenu?.addEventListener('click', (event) => {
    const control = event.target.closest('button[data-target], a[data-target]');
    if (!control) return;

    const href = control.getAttribute('href');
    const targetId = control.dataset.target;
    const target = targetId ? document.getElementById(targetId) : null;

    // 当前页面有目标区块时只做平滑滚动；只有目标不在当前页面时才进行页面跳转。
    if (target) {
        event.preventDefault();
        closeNavSectionMenu();
        scrollToId(targetId);
        return;
    }

    if (control.tagName === 'A' && href) {
        closeNavSectionMenu(false);
    }
});

navSheetLayer?.querySelector('.nav-sheet-backdrop')?.addEventListener('click', () => closeNavSectionMenu());
navSectionMenu?.querySelector('.nav-sheet-cancel')?.addEventListener('click', () => closeNavSectionMenu());

document.addEventListener('keydown', (event) => {
    if (!navSheetLayer?.classList.contains('open')) return;
    if (event.key === 'Escape') {
        event.preventDefault();
        closeNavSectionMenu();
    } else if (event.key === 'Tab') {
        const controls = [...navSectionMenu.querySelectorAll('a, button')];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === navSectionMenu)) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === navSectionMenu)) {
            event.preventDefault();
            first.focus();
        }
    }
});

function startNavSwipe(x, y, inOptions = false) {
    navSwipeStart = {
        x,
        y,
        time: performance.now(),
        inOptions
    };
    navSwipeDistance = 0;
}

function moveNavSwipe(x, y) {
    if (!navSwipeStart || !navSheetLayer?.classList.contains('open')) return false;
    const distance = Math.max(0, y - navSwipeStart.y);
    const horizontalDistance = x - navSwipeStart.x;
    if (Math.abs(horizontalDistance) > distance || (navSwipeStart.inOptions && navSheetOptions?.scrollTop > 0)) return false;
    navSwipeDistance = distance;
    navSectionMenu.classList.add('dragging');
    navSectionMenu.style.setProperty('--nav-sheet-drag', `${distance}px`);
    return true;
}

function finishNavSwipe(cancelled = false) {
    if (!navSwipeStart) return;
    const elapsed = Math.max(1, performance.now() - navSwipeStart.time);
    const shouldClose = !cancelled && (navSwipeDistance > 90 || (navSwipeDistance > 35 && navSwipeDistance / elapsed > 0.5));
    navSwipeStart = null;
    navSectionMenu?.classList.remove('dragging');
    navSectionMenu?.style.removeProperty('--nav-sheet-drag');
    if (shouldClose) closeNavSectionMenu();
}

// Pointer capture keeps the handle attached to the mouse or finger outside its bounds.
navSheetHandle?.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0 || !navSheetLayer?.classList.contains('open')) return;
    event.preventDefault();
    navHandlePointerId = event.pointerId;
    startNavSwipe(event.clientX, event.clientY);
    navSheetHandle.setPointerCapture(event.pointerId);
});

navSheetHandle?.addEventListener('pointermove', (event) => {
    if (event.pointerId !== navHandlePointerId) return;
    if (moveNavSwipe(event.clientX, event.clientY)) event.preventDefault();
});

function finishNavHandleDrag(event) {
    if (event.pointerId !== navHandlePointerId) return;
    navHandlePointerId = null;
    if (navSheetHandle.hasPointerCapture(event.pointerId)) navSheetHandle.releasePointerCapture(event.pointerId);
    finishNavSwipe(event.type !== 'pointerup');
}

navSheetHandle?.addEventListener('pointerup', finishNavHandleDrag);
navSheetHandle?.addEventListener('pointercancel', finishNavHandleDrag);
navSheetHandle?.addEventListener('lostpointercapture', finishNavHandleDrag);

navSectionMenu?.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1 || event.target.closest('.nav-sheet-handle')) return;
    startNavSwipe(event.touches[0].clientX, event.touches[0].clientY, !!event.target.closest('.nav-sheet-options'));
}, { passive: true });

navSectionMenu?.addEventListener('touchmove', (event) => {
    if (event.touches.length !== 1 || navHandlePointerId !== null) return;
    if (moveNavSwipe(event.touches[0].clientX, event.touches[0].clientY)) event.preventDefault();
}, { passive: false });

navSectionMenu?.addEventListener('touchend', () => {
    if (navHandlePointerId === null) finishNavSwipe();
});
navSectionMenu?.addEventListener('touchcancel', () => {
    if (navHandlePointerId === null) finishNavSwipe(true);
});


// 配置：主页加载层策略；这些时间控制首屏加载动画和导航栏出现节奏
// 页面骨架就绪后释放加载层，避免外部图片或 CDN 慢时挡住整页。
let pageReadyShown = false;
let pageReadyFallbackId = null;

function hideLoadingLayer() {
    const loadingAnimation = document.getElementById('loading-animation');
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        navbar.classList.add('show');
    }

    document.body.classList.add('hero-ready');

    if (loadingAnimation) {
        loadingAnimation.style.opacity = '0';
        // 配置：加载层淡出后彻底隐藏的等待时间；要和 CSS transition duration 保持接近
        setTimeout(function() {
            loadingAnimation.style.display = 'none';
        }, 500);
    }
}

// 页面可以用 window.__pageLoaderGates 注册等待任务，加载层会等它们全部完成后再释放。
function waitForContentGates() {
    const gates = window.__pageLoaderGates || [];
    if (gates.length === 0) return Promise.resolve();

    const tasks = gates.map((gate) => {
        try {
            return Promise.resolve(gate());
        } catch (error) {
            return Promise.resolve();
        }
    });

    // 配置：内容就绪等待上限；超过后强制进入页面，避免外部图片卡住加载层
    const timeout = new Promise(function(resolve) {
        setTimeout(resolve, 4000);
    });

    return Promise.race([Promise.all(tasks), timeout]);
}

function showPageReady() {
    if (pageReadyShown) return;
    pageReadyShown = true;
    if (pageReadyFallbackId) {
        window.clearTimeout(pageReadyFallbackId);
    }

    // 配置：首屏加载层最短展示时间；400ms 越小越快消失，越大动画停留越久
    setTimeout(function() {
        Promise.resolve(waitForContentGates()).then(hideLoadingLayer);
    }, 400);
}

// 配置：兜底释放加载层时间；如果 DOMContentLoaded/load 被外部资源拖慢，700ms 后也会尝试进入页面
pageReadyFallbackId = window.setTimeout(showPageReady, 700);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showPageReady, { once: true });
} else {
    showPageReady();
}
window.addEventListener('load', showPageReady, { once: true });

// 滚动到顶部功能
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 0.5 一言 API 获取句子 ---
const subtitleElement = document.getElementById('hero-subtitle');

async function fetchHitokoto() {
    if (subtitleElement?.dataset.static === 'true') return;

    try {
        // 配置：首页副标题一言 API；c 参数控制句子分类，max_length 控制最大字数
        const response = await fetch('https://v1.hitokoto.cn/?c=i&c=d&c=e&max_length=30');
        const data = await response.json();
        if (subtitleElement) {
            subtitleElement.textContent = data.hitokoto;
            subtitleElement.style.opacity = '1';
        }
    } catch (error) {
        console.error('Failed to fetch hitokoto:', error);
        if (subtitleElement) {
            // 配置：一言 API 失败时显示的兜底副标题
            subtitleElement.textContent = 'Welcome to Zeora\'s Personal Space';
        }
    }
}

// 页面加载时获取一言
if (subtitleElement) fetchHitokoto();

// --- 1. Hello 轮播 ---
const helloText = document.getElementById('hero-text');
// 配置：首页 hello 轮播文案；只有 index.html 里 hero-text 的 data-static 不是 true 时才会启用
const greetings = ["hello", "你好", "hola", "bonjour", "こんにちは", "ciao", "你好"];
let index = 0;

function rotateText() {
    if (helloText?.dataset.static === 'true') return;
    if (!helloText) return;

    helloText.style.opacity = '0';
    helloText.style.transform = 'translateY(10px)';
    setTimeout(() => {
        index = (index + 1) % greetings.length;
        helloText.textContent = greetings[index] + ".";
        helloText.style.opacity = '1';
        helloText.style.transform = 'translateY(0)';
    }, 600);
}
if (helloText?.dataset.static !== 'true') {
    // 配置：首页 hello 轮播间隔；3000ms 表示每 3 秒切换一次
    setInterval(rotateText, 3000);
}

// --- 2. Scroll Reveal ---
// 配置：滚动出现动画触发阈值；0.1 表示元素露出约 10% 时开始显示
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

function scrollToId(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
}

// 推荐产品轮播已迁移到 data.js，由渲染后的卡片自动初始化。

// --- 2.1 Coverflow 相册 ---
function initCoverflowGallery() {
    const gallery = document.querySelector('.coverflow-gallery');
    const stage = gallery?.querySelector('.coverflow-stage');
    const cards = gallery ? [...gallery.querySelectorAll('.coverflow-card')] : [];
    const previousButton = gallery?.closest('.carousel-section')?.querySelector('.carousel-btn-prev');
    const nextButton = gallery?.closest('.carousel-section')?.querySelector('.carousel-btn-next');
    const dots = gallery?.closest('.carousel-section')?.querySelector('.coverflow-dots');

    if (!gallery || !stage || cards.length < 2 || !dots) return;

    let activeIndex = 0;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerId = null;
    let dragged = false;

    const wrapIndex = (index) => (index + cards.length) % cards.length;

    function getRelativeIndex(index) {
        let relative = index - activeIndex;
        if (relative > cards.length / 2) relative -= cards.length;
        if (relative < -cards.length / 2) relative += cards.length;
        return relative;
    }

    function renderCoverflow() {
        const stageWidth = stage.getBoundingClientRect().width;
        const cardWidth = cards[0].getBoundingClientRect().width;
        const isMobile = window.matchMedia('(max-width: 640px)').matches;
        // 配置：相册卡片横向间距；移动端和桌面端分别控制封面流展开幅度
        const spread = isMobile
            ? Math.min(cardWidth * 0.62, stageWidth * 0.3)
            : Math.min(cardWidth * 0.72, 280);
        // 配置：相册 3D 深度；数值越大，非当前图片越往后退
        const depth = isMobile ? 150 : 240;
        // 配置：相册 Y 轴倾斜角度；数值越大，左右图片透视感越强
        const yTilt = isMobile ? 10 : 12;
        // 配置：相册旋转角度；数值越大，左右图片倾斜越明显
        const zTilt = isMobile ? 4 : 7;

        cards.forEach((card, index) => {
            const relative = getRelativeIndex(index);
            const distance = Math.abs(relative);
            const visible = distance <= 2;
            const isActive = relative === 0;
            const scale = Math.max(0.58, 1 - distance * 0.16);

            card.style.setProperty('--coverflow-x', `${relative * spread}px`);
            card.style.setProperty('--coverflow-z', `${-distance * depth}px`);
            card.style.setProperty('--coverflow-y', `${-relative * yTilt}deg`);
            card.style.setProperty('--coverflow-r', `${relative * zTilt}deg`);
            card.style.setProperty('--coverflow-scale', scale);
            card.style.setProperty('--coverflow-opacity', visible ? (isActive ? 1 : 0.56) : 0);
            card.style.setProperty('--coverflow-saturation', isActive ? 1 : 0.7);
            card.style.setProperty('--coverflow-blur', isActive ? '0px' : '0.7px');
            card.style.zIndex = String(10 - distance);
            card.classList.toggle('is-visible', visible);
            card.classList.toggle('is-active', isActive);
            card.setAttribute('aria-hidden', String(!isActive));
        });

        dots.querySelectorAll('.coverflow-dot').forEach((dot, index) => {
            dot.classList.toggle('is-active', index === activeIndex);
            dot.setAttribute('aria-selected', String(index === activeIndex));
        });
    }

    function goTo(index) {
        activeIndex = wrapIndex(index);
        renderCoverflow();
    }

    function step(direction) {
        goTo(activeIndex + direction);
    }

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (dragged) return;
            const relative = getRelativeIndex(index);
            step(relative === 0 ? 1 : relative);
        });
    });

    cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'coverflow-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `查看第 ${index + 1} 张图片`);
        dot.addEventListener('click', () => goTo(index));
        dots.appendChild(dot);
    });

    previousButton?.addEventListener('click', () => step(-1));
    nextButton?.addEventListener('click', () => step(1));

    gallery.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            step(-1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            step(1);
        } else if (event.key === 'Home') {
            event.preventDefault();
            goTo(0);
        } else if (event.key === 'End') {
            event.preventDefault();
            goTo(cards.length - 1);
        }
    });

    gallery.addEventListener('pointerdown', (event) => {
        pointerId = event.pointerId;
        pointerStartX = event.clientX;
        pointerStartY = event.clientY;
        dragged = false;
        gallery.setPointerCapture?.(pointerId);
    });

    gallery.addEventListener('pointermove', (event) => {
        if (event.pointerId !== pointerId) return;
        const deltaX = event.clientX - pointerStartX;
        const deltaY = event.clientY - pointerStartY;
        dragged = Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY);
    });

    gallery.addEventListener('pointerup', (event) => {
        if (event.pointerId !== pointerId) return;
        const deltaX = event.clientX - pointerStartX;
        if (dragged && Math.abs(deltaX) > 42) step(deltaX < 0 ? 1 : -1);
        pointerId = null;
        window.setTimeout(() => { dragged = false; }, 0);
    });

    gallery.addEventListener('pointercancel', () => {
        pointerId = null;
        dragged = false;
    });

    window.addEventListener('resize', renderCoverflow, { passive: true });
    renderCoverflow();
}

initCoverflowGallery();

// --- 3. Modal & Action Sheet Logic ---
// 配置：社交弹窗当前链接和值；由 index.html 里每个 openModal(...) 按钮传入
let currentLink = '';
let currentValue = '';

// 配置：社交入口弹窗参数说明；type 是标题，value 是可复制账号，link 是跳转地址，iconClass 是图标，color 是图标颜色
function openModal(type, value, link, iconClass, color) {
    const modal = document.getElementById('contact-modal');
    const iconDiv = document.getElementById('modal-icon');
    
    // 配置：弹窗标题和展示值；这里决定点击社交卡片后弹出的标题和账号/链接文字
    document.getElementById('modal-title').innerText = type.charAt(0).toUpperCase() + type.slice(1);
    document.getElementById('modal-value').innerText = value;
    iconDiv.innerHTML = `<i class="${iconClass}"></i>`;
    iconDiv.style.color = color;

    currentLink = link;
    currentValue = value;

    // 配置：弹窗按钮显示规则；没有 link 就隐藏“前往链接”，微信公众号隐藏“复制”按钮
    const btnGo = document.getElementById('btn-go');
    const btnCopy = document.getElementById('btn-copy');
    if (!link) {
        btnGo.style.display = 'none';
    } else {
        btnGo.style.display = 'block';
    }
    if (type === 'wechat') {
        btnCopy.style.display = 'none';
    } else {
        btnCopy.style.display = 'block';
    }

    modal.classList.add('open');
}

function closeModal(e) {
    if (e.target.id === 'contact-modal') {
        document.getElementById('contact-modal').classList.remove('open');
    }
}

function closeModalDirect() {
    document.getElementById('contact-modal').classList.remove('open');
}

function handleGo() {
    if(currentLink) window.open(currentLink, '_blank');
    closeModalDirect();
}

function handleCopy() {
    navigator.clipboard.writeText(currentValue).then(() => {
        showToast();
        closeModalDirect();
    }).catch(err => {
        console.error('Failed to copy: ', err);
        const textArea = document.createElement("textarea");
        textArea.value = currentValue;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        showToast();
        closeModalDirect();
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000); // 配置：复制成功提示停留时间；2000ms 表示显示 2 秒
}

// --- 4. Music Player ---
// 配置：音乐播放器歌单；每个对象代表一首歌，title/artist 显示在播放器，src 是音频，cover 是封面，lrc 是歌词
const musicTracks = [
    // 配置：第 1 首歌；页面首次加载默认从 musicTrackIndex=0 的这首开始
    {
        "title": "青花瓷",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.4/青花瓷/青花瓷.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002eFUFm2XYZ7z_2.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.4/青花瓷/青花瓷.lrc"
    },
    // 配置：第 2 首歌；复制这一整段对象并放到数组里可新增歌曲
    {
        "title": "稻香",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.1/周杰伦/稻香/稻香.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.1/周杰伦/稻香/稻香.lrc"
    },
    // 配置：第 3 首歌；title 会显示为歌名，artist 会显示为歌手名
    {
        "title": "晴天",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/晴天/晴天.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/晴天/晴天.lrc"
    },
    // 配置：第 4 首歌；src 支持 mp3/flac 等浏览器可播放音频地址
    {
        "title": "七里香",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/七里香/七里香.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000003DFRzD192KKD_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/七里香/七里香.lrc"
    },
    // 配置：第 5 首歌；cover 是播放器封面图，建议使用正方形图片
    {
        "title": "花海",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/花海/花海.flac",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/花海/花海.lrc"
    },
    // 配置：第 6 首歌；lrc 是歌词文件地址，加载失败时会显示“歌词加载失败”
    {
        "title": "反方向的钟",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/反方向的钟/反方向的钟.flac",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000000f01724fd7TH_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/反方向的钟/反方向的钟.lrc"
    },
    // 配置：第 7 首歌
    {
        "title": "兰亭序",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.1/周杰伦/兰亭序/兰亭序.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.1/周杰伦/兰亭序/兰亭序.lrc"
    },
    // 配置：第 8 首歌
    {
        "title": "说好的辛福呢",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/说好的辛福呢/说好的辛福呢.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/说好的辛福呢/说好的幸福呢.lrc"
    },
    // 配置：第 9 首歌
    {
        "title": "我落泪情绪零碎",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/我落泪情绪零碎/我落泪情绪零碎.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000000bviBl4FjTpO_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/我落泪情绪零碎/我落泪情绪零碎.lrc"
    },
    // 配置：第 10 首歌
    {
        "title": "听妈妈的话",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/听妈妈的话/听妈妈的话.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002jLGWe16Tf1H_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/听妈妈的话/听妈妈的话.lrc"
    },
    // 配置：第 11 首歌
    {
        "title": "明明就",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/明明就/明明就.flac",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000003Ow85E3pnoqi_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/明明就/明明就.lrc"
    },
    // 配置：第 12 首歌
    {
        "title": "我是如此相信",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/我是如此相信/我是如此相信.flac",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000001hGx1Z0so1YX_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/我是如此相信/我是如此相信.lrc"
    },
    // 配置：第 13 首歌
    {
        "title": "发如雪",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.3/发如雪/发如雪.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M0000024bjiL2aocxT_3.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.3/发如雪/发如雪.lrc"
    },
    // 配置：第 14 首歌
    {
        "title": "以父之名",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.3/以父之名/以父之名.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.3/以父之名/以父之名.lrc"
    },
    // 配置：第 15 首歌
    {
        "title": "园游会",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.3/园游会/园游会.flac",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000003DFRzD192KKD_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.3/园游会/园游会.lrc"
    },
    // 配置：第 16 首歌
    {
        "title": "本草纲目",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.4/本草纲目/本草纲目.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002jLGWe16Tf1H_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.4/本草纲目/本草纲目.lrc"
    },
    // 配置：第 17 首歌；数组最后一首播放结束后会自动回到第一首
    {
        "title": "龙卷风",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.4/龙卷风/龙卷风.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000000f01724fd7TH_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.4/龙卷风/龙卷风.lrc"
    }
];

const musicAudio = document.getElementById('music-audio');
const musicCard = document.querySelector('.music-card');
const musicPlayButton = document.getElementById('music-play');
const musicPrevButton = document.getElementById('music-prev');
const musicNextButton = document.getElementById('music-next');
const musicProgress = document.getElementById('music-progress');
const musicCurrentTime = document.getElementById('music-current-time');
const musicDuration = document.getElementById('music-duration');
const musicSongTitle = document.getElementById('music-song-title');
const musicSongArtist = document.getElementById('music-song-artist');
const musicCoverImg = document.getElementById('music-cover-img');
const musicLyrics = document.getElementById('music-lyrics');
const navLogo = document.querySelector('.navbar-logo');
const navMusicLyrics = document.getElementById('nav-music-lyrics');
const navMusicToggle = document.getElementById('nav-music-toggle');
// 配置：默认播放第几首；0 是第一首，1 是第二首，以此类推
let musicTrackIndex = 0;
let currentLyrics = [];
let currentLyricIndex = -1;
const lyricsCache = new Map();

function updateNavLyric(text) {
    if (!navMusicLyrics || navMusicLyrics.textContent === text) return;
    navMusicLyrics.textContent = text;
    navMusicLyrics.classList.remove('is-switching');
    void navMusicLyrics.offsetWidth;
    navMusicLyrics.classList.add('is-switching');
}

function formatMusicTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
}

function loadMusicTrack(index) {
    if (!musicAudio) return;
    const track = musicTracks[index];
    musicAudio.src = track.src;
    if (musicSongTitle) musicSongTitle.textContent = track.title;
    if (musicSongArtist) musicSongArtist.textContent = track.artist;
    if (musicCoverImg) {
        musicCoverImg.src = track.cover;
        musicCoverImg.alt = `${track.title} 封面`;
    }
    if (musicProgress) {
        musicProgress.value = 0;
        musicProgress.style.setProperty('--music-progress', '0%');
    }
    if (musicCurrentTime) musicCurrentTime.textContent = '0:00';
    if (musicDuration) musicDuration.textContent = '0:00';
    loadLyrics(track);
}

function updateMusicPlayState(isPlaying) {
    if (musicCard) musicCard.classList.toggle('is-playing', isPlaying);
    if (navLogo) navLogo.classList.toggle('is-music-playing', isPlaying);
    if (musicPlayButton) {
        musicPlayButton.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
    }
}

function parseLrc(lrcText) {
    return lrcText.split('\n').flatMap(line => {
        const text = line.replace(/\[[^\]]+\]/g, '').trim();
        const tags = [...line.matchAll(/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g)];
        return tags.filter(() => text).map(match => ({
            time: Number(match[1]) * 60 + Number(match[2]) + Number((match[3] || '0').padEnd(3, '0')) / 1000,
            text
        }));
    }).sort((a, b) => a.time - b.time);
}

function renderLyrics(lyrics, message = '暂无歌词') {
    currentLyrics = lyrics;
    currentLyricIndex = -1;
    updateNavLyric(lyrics[0]?.text || message);
}

async function loadLyrics(track) {
    if (!track.lrc) {
        renderLyrics([], '暂无歌词');
        return;
    }
    renderLyrics([], '歌词加载中...');
    try {
        if (!lyricsCache.has(track.lrc)) {
            const response = await fetch(track.lrc);
            if (!response.ok) throw new Error(`Failed to load lyrics: ${response.status}`);
            lyricsCache.set(track.lrc, parseLrc(await response.text()));
        }
        renderLyrics(lyricsCache.get(track.lrc), '暂无歌词');
    } catch (error) {
        console.error(error);
        renderLyrics([], '歌词加载失败');
    }
}

function syncLyrics(currentTime) {
    if (!currentLyrics.length) return;
    const nextIndex = currentLyrics.findIndex((line, index) => {
        const nextLine = currentLyrics[index + 1];
        return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
    });
    if (nextIndex === -1 || nextIndex === currentLyricIndex) return;
    updateNavLyric(currentLyrics[nextIndex].text);
    currentLyricIndex = nextIndex;
}

function playMusicTrack(index) {
    musicTrackIndex = (index + musicTracks.length) % musicTracks.length;
    loadMusicTrack(musicTrackIndex);
    musicAudio.play().then(() => updateMusicPlayState(true)).catch(() => updateMusicPlayState(false));
}

if (musicAudio) {
    loadMusicTrack(musicTrackIndex);

    musicPlayButton?.addEventListener('click', () => {
        if (musicAudio.paused) {
            musicAudio.play().then(() => updateMusicPlayState(true)).catch(() => updateMusicPlayState(false));
        } else {
            musicAudio.pause();
            updateMusicPlayState(false);
        }
    });

    navMusicToggle?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        musicAudio.pause();
        updateMusicPlayState(false);
    });

    musicPrevButton?.addEventListener('click', () => playMusicTrack(musicTrackIndex - 1));
    musicNextButton?.addEventListener('click', () => playMusicTrack(musicTrackIndex + 1));

    musicAudio.addEventListener('loadedmetadata', () => {
        if (musicDuration) musicDuration.textContent = formatMusicTime(musicAudio.duration);
    });

    musicAudio.addEventListener('timeupdate', () => {
        const progressPercent = musicAudio.duration ? (musicAudio.currentTime / musicAudio.duration) * 100 : 0;
        if (musicProgress) {
            musicProgress.value = progressPercent;
            musicProgress.style.setProperty('--music-progress', `${progressPercent}%`);
        }
        if (musicCurrentTime) musicCurrentTime.textContent = formatMusicTime(musicAudio.currentTime);
        syncLyrics(musicAudio.currentTime);
    });

    musicProgress?.addEventListener('input', () => {
        if (!musicAudio.duration) return;
        const nextTime = (Number(musicProgress.value) / 100) * musicAudio.duration;
        musicAudio.currentTime = nextTime;
        musicProgress.style.setProperty('--music-progress', `${musicProgress.value}%`);
    });

    musicAudio.addEventListener('ended', () => playMusicTrack(musicTrackIndex + 1));
    musicAudio.addEventListener('pause', () => updateMusicPlayState(false));
    musicAudio.addEventListener('play', () => updateMusicPlayState(true));
}

// --- 5. Footer Pixel Drift ---
function initFooterPixelDrift() {
    const root = document.querySelector('.footer-pixel-drift');
    const canvas = root?.querySelector('.footer-pixel-canvas');
    if (!root || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const text = root.dataset.pixelText || 'ZEORA'; // 配置：页脚粒子文字兜底值；优先读取 index.html 的 data-pixel-text
    const mouseRadius = 22; // 配置：鼠标影响半径；越大，粒子受鼠标影响范围越宽
    const mouseForce = 30; // 配置：鼠标推开粒子的力度；越大，交互越明显
    const particleSize = 1; // 配置：单个粒子的大小；越大，页脚像素字越粗
    const particleCount = 50; // 配置：粒子密度；越大，字越密但性能消耗也更高
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let formValue = prefersReducedMotion ? 1 : 0;
    let visible = prefersReducedMotion;
    let lastTime = 0;
    let rafId = null;
    let pointer = { x: -99999, y: -99999, active: false };
    let smoothPointer = { x: -99999, y: -99999 };
    let previousPointer = { x: -99999, y: -99999 };
    let pointerSpeed = 0;

    function getPixelPalette() {
        const styles = window.getComputedStyle(root);
        return [
            styles.getPropertyValue('--pixel-primary').trim() || '#FFFFFF',
            styles.getPropertyValue('--pixel-accent').trim() || '#F9731A',
            styles.getPropertyValue('--pixel-soft').trim() || '#FFFFFF'
        ];
    }

    function fitFontSize(measureCtx, label, family, maxWidth, maxHeight, cap) {
        let low = 8;
        let high = cap;
        let best = low;

        for (let i = 0; i < 12; i++) {
            const mid = (low + high) / 2;
            measureCtx.font = `800 ${mid}px ${family}`;
            const metrics = measureCtx.measureText(label);
            const textHeight = (metrics.actualBoundingBoxAscent || mid * 0.8) + (metrics.actualBoundingBoxDescent || mid * 0.2);
            if (metrics.width <= maxWidth && textHeight <= maxHeight) {
                best = mid;
                low = mid;
            } else {
                high = mid;
            }
        }

        return best;
    }

    function sampleText() {
        if (!width || !height) return;

        const offscreen = document.createElement('canvas');
        offscreen.width = Math.max(1, Math.floor(width * dpr));
        offscreen.height = Math.max(1, Math.floor(height * dpr));
        const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
        if (!offCtx) return;

        offCtx.scale(dpr, dpr);
        const fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
        const maxWidth = width * 0.92;
        const maxHeight = height * 0.9;
        const fontSize = fitFontSize(offCtx, text, fontFamily, maxWidth, maxHeight, Math.min(132, height * 0.9));

        offCtx.clearRect(0, 0, width, height);
        offCtx.fillStyle = '#ffffff';
        offCtx.font = `800 ${fontSize}px ${fontFamily}`;
        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        offCtx.fillText(text, width / 2, height / 2 + height * 0.035);

        const image = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
        const stride = Math.max(2, Math.round(150 / particleCount));
        const nextParticles = [];

        for (let y = 0; y < height; y += stride) {
            for (let x = 0; x < width; x += stride) {
                const ix = Math.floor(x * dpr);
                const iy = Math.floor(y * dpr);
                const alphaIndex = (iy * image.width + ix) * 4 + 3;
                if (image.data[alphaIndex] > 128) {
                    const angle = Math.random() * Math.PI * 2;
                    const radius = Math.max(width, height) * (0.62 + Math.random() * 0.46);
                    nextParticles.push({
                        ox: x,
                        oy: y,
                        sx: width / 2 + Math.cos(angle) * radius,
                        sy: height / 2 + Math.sin(angle) * radius,
                        x,
                        y,
                        repX: 0,
                        repY: 0,
                        colorIndex: Math.floor(Math.random() * 3)
                    });
                }
            }
        }

        particles = nextParticles;
        formValue = prefersReducedMotion ? 1 : 0;
        visible = prefersReducedMotion || visible;
        lastTime = 0;
    }

    function resizeCanvas() {
        const rect = root.getBoundingClientRect();
        width = Math.floor(rect.width);
        height = Math.floor(rect.height);
        if (width <= 0 || height <= 0) return;

        dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        sampleText();
    }

    function draw(timestamp) {
        ctx.clearRect(0, 0, width, height);
        if (!visible && formValue <= 0) {
            rafId = window.requestAnimationFrame(draw);
            return;
        }

        const last = lastTime || timestamp;
        const delta = Math.min(64, Math.max(0, timestamp - last));
        lastTime = timestamp;
        formValue = prefersReducedMotion ? 1 : Math.min(1, formValue + delta / 420);
        const factor = formValue;
        const active = pointer.active && formValue >= 1;
        const speed = pointerSpeed;
        pointerSpeed *= 0.88;

        if (active) {
            const lerp = Math.max(0.08, 0.3 - speed * 0.006);
            if (smoothPointer.x < -9000) {
                smoothPointer.x = pointer.x;
                smoothPointer.y = pointer.y;
            } else {
                smoothPointer.x += (pointer.x - smoothPointer.x) * lerp;
                smoothPointer.y += (pointer.y - smoothPointer.y) * lerp;
            }
        } else {
            smoothPointer.x = -99999;
            smoothPointer.y = -99999;
        }

        const palette = getPixelPalette();
        ctx.globalAlpha = factor;
        for (const particle of particles) {
            if (formValue < 1) {
                particle.x = particle.sx + (particle.ox - particle.sx) * factor;
                particle.y = particle.sy + (particle.oy - particle.sy) * factor;
            } else {
                let inZone = false;
                if (active) {
                    const dx = particle.ox - smoothPointer.x;
                    const dy = particle.oy - smoothPointer.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq > 0 && distSq < mouseRadius * mouseRadius) {
                        const dist = Math.sqrt(distSq);
                        const nx = dx / dist;
                        const ny = dy / dist;
                        const falloff = 1 - dist / mouseRadius;
                        const push = falloff * speed * mouseForce * 0.05;
                        particle.repX += nx * push;
                        particle.repY += ny * push;
                        particle.repX += (nx * (mouseRadius - dist) - particle.repX) * 0.06;
                        particle.repY += (ny * (mouseRadius - dist) - particle.repY) * 0.06;
                        inZone = true;
                    }
                }
                if (!inZone) {
                    particle.repX *= 0.97;
                    particle.repY *= 0.97;
                }
                particle.x = particle.ox + particle.repX;
                particle.y = particle.oy + particle.repY;
            }

            ctx.fillStyle = palette[particle.colorIndex] || palette[0];
            ctx.fillRect(particle.x, particle.y, particleSize, particleSize);
        }
        ctx.globalAlpha = 1;

        rafId = window.requestAnimationFrame(draw);
    }

    function updatePointer(event) {
        const rect = canvas.getBoundingClientRect();
        const nextX = (event.clientX - rect.left) * (width / rect.width);
        const nextY = (event.clientY - rect.top) * (height / rect.height);
        if (previousPointer.x > -9000) {
            const dx = nextX - previousPointer.x;
            const dy = nextY - previousPointer.y;
            pointerSpeed = Math.sqrt(dx * dx + dy * dy);
        }
        previousPointer = { x: nextX, y: nextY };
        pointer = { x: nextX, y: nextY, active: true };
    }

    function clearPointer() {
        pointer = { x: -99999, y: -99999, active: false };
        previousPointer = { x: -99999, y: -99999 };
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
            visible = true;
        }
    }, { threshold: 0.2 });

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(root);
    observer.observe(root);
    canvas.addEventListener('pointermove', updatePointer);
    canvas.addEventListener('pointerleave', clearPointer);
    canvas.addEventListener('pointercancel', clearPointer);

    resizeCanvas();
    rafId = window.requestAnimationFrame(draw);
}

initFooterPixelDrift();
