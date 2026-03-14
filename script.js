// --- 0. 主题切换功能 ---
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// 从localStorage读取主题设置
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
themeToggle.addEventListener('click', toggleTheme);

// --- 0.1 语言切换功能 ---
const languageToggle = document.getElementById('language-toggle');
let currentLanguage = 'zh';
let languageMenuOpen = false;
const languageMenu = document.getElementById('language-menu');
const languageItems = document.querySelectorAll('.language-menu-item');

// 切换语言菜单显示/隐藏
function toggleLanguageMenu() {
    languageMenuOpen = !languageMenuOpen;
    if (languageMenuOpen) {
        languageMenu.classList.add('show');
    } else {
        languageMenu.classList.remove('show');
    }
}

// 选择语言
function selectLanguage(lang) {
    if (lang === 'en') {
        // 跳转到英文页面
        window.location.href = 'en/';
    } else {
        currentLanguage = 'zh';
        updateLanguage();
        showToast('已切换到中文');
        
        // 更新活动状态
        languageItems.forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
        
        // 关闭菜单
        languageMenuOpen = false;
        languageMenu.classList.remove('show');
    }
}

// 点击页面其他地方关闭语言菜单
document.addEventListener('click', function(event) {
    if (!languageMenu.contains(event.target) && !languageToggle.contains(event.target)) {
        languageMenuOpen = false;
        languageMenu.classList.remove('show');
    }
});

// 初始化语言菜单
function initLanguageMenu() {
    // 设置默认语言
    const defaultLang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
    document.querySelector(`[data-lang="${defaultLang}"]`).classList.add('active');
    
    // 添加语言项点击事件
    languageItems.forEach(item => {
        item.addEventListener('click', function() {
            selectLanguage(this.getAttribute('data-lang'));
        });
    });
}

// 语言切换函数（保持向后兼容）
function toggleLanguage() {
    toggleLanguageMenu();
}

function updateLanguage() {
    const elements = {
        'hero-subtitle': {
            zh: 'Welcome to Zeora\'s Personal Space',
            en: '欢迎来到 Zeora 的个人空间'
        },
        'philosophy-title': {
            zh: 'Coding with <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Communication & Innovation.</span>',
            en: '编码与 <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">沟通与创新。</span>'
        },
        'philosophy-quote': {
            zh: '「征服自己，就能征服世界」',
            en: '"Conquer yourself, and you can conquer the world"'
        },
        'highlights-title': {
            zh: 'Highlights',
            en: '亮点'
        },
        'profile-title': {
            zh: 'Programming & Cybersecurity Learner.',
            en: '编程与网络安全学习者。'
        },
        'profile-desc': {
            zh: '一位 数码领域 学生党博主',
            en: 'A student influencer in the tech field'
        },
        'tech-inno-title': {
            zh: 'Tech Inno',
            en: '技术创新'
        },
        'tech-inno-desc': {
            zh: '学习、实验、创作与创新',
            en: 'Learning, experimenting, creating and innovating'
        },
        'blog-title': {
            zh: '博客',
            en: 'Blog'
        },
        'blog-desc': {
            zh: '分享科技与日常生活',
            en: 'Sharing technology and daily life'
        },
        'news-title': {
            zh: 'NewsNow',
            en: 'NewsNow'
        },
        'news-desc': {
            zh: '实时热点资讯',
            en: 'Real-time hot news'
        },
        'chat-title': {
            zh: '即时聊天',
            en: 'Chat'
        },
        'chat-desc': {
            zh: '端到端加密即时通讯',
            en: 'End-to-end encrypted messaging'
        },
        'contact-title': {
            zh: 'Get in touch.',
            en: '联系我。'
        },
        'contact-desc': {
            zh: '点击下方图标选择操作',
            en: 'Click the icons below to choose an action'
        },
        'copy-btn': {
            zh: '<i class="fa-regular fa-copy mr-2"></i> 复制 ID / 账号',
            en: '<i class="fa-regular fa-copy mr-2"></i> Copy ID / Account'
        },
        'go-btn': {
            zh: '<i class="fa-solid fa-arrow-up-right-from-square mr-2"></i> 前往链接',
            en: '<i class="fa-solid fa-arrow-up-right-from-square mr-2"></i> Go to Link'
        },
        'cancel-btn': {
            zh: '取消',
            en: 'Cancel'
        },
        'footer-copyright': {
            zh: '&copy; 2026 zeora. Design by Apple Aesthetics.',
            en: '&copy; 2026 zeora. Designed by Apple Aesthetics.'
        },
        'language-tooltip': {
            zh: '切换语言 / Switch Language',
            en: 'Switch Language / 切换语言'
        }
    };
    
    // 更新语言切换按钮提示
    document.querySelector('.language-tooltip').textContent = elements['language-tooltip'][currentLanguage];
    
    // 更新所有元素的语言
    Object.keys(elements).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (key === 'philosophy-title' || key === 'copy-btn' || key === 'go-btn') {
                element.innerHTML = elements[key][currentLanguage];
            } else {
                element.textContent = elements[key][currentLanguage];
            }
        }
    });
}

// 绑定语言切换事件
languageToggle.addEventListener('click', toggleLanguage);

// 滚动到顶部功能
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 1. Hello 轮播 ---
const helloText = document.getElementById('hero-text');
const greetings = ["hello", "你好", "hola", "bonjour", "こんにちは", "ciao", "你好"];
let index = 0;

function rotateText() {
    helloText.style.opacity = '0';
    helloText.style.transform = 'translateY(10px)';
    setTimeout(() => {
        index = (index + 1) % greetings.length;
        helloText.textContent = greetings[index] + ".";
        helloText.style.opacity = '1';
        helloText.style.transform = 'translateY(0)';
    }, 600);
}
setInterval(rotateText, 3000);

// --- 2. Scroll Reveal ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

function scrollToId(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// --- 3. Modal & Action Sheet Logic ---
let currentLink = '';
let currentValue = '';

function openModal(type, value, link, iconClass, color) {
    const modal = document.getElementById('contact-modal');
    const iconDiv = document.getElementById('modal-icon');
    
    // Set Content
    document.getElementById('modal-title').innerText = type.charAt(0).toUpperCase() + type.slice(1);
    document.getElementById('modal-value').innerText = value;
    iconDiv.innerHTML = `<i class="${iconClass}"></i>`;
    iconDiv.style.color = color;

    currentLink = link;
    currentValue = value;

    // Handle Buttons state
    const btnGo = document.getElementById('btn-go');
    if (!link) {
        btnGo.style.display = 'none'; // 如 QQ 可能没有直接链接
    } else {
        btnGo.style.display = 'block';
    }
    
    // Update button text based on current language
    const elements = {
        'copy-btn': {
            zh: '<i class="fa-regular fa-copy mr-2"></i> 复制 ID / 账号',
            en: '<i class="fa-regular fa-copy mr-2"></i> Copy ID / Account'
        },
        'go-btn': {
            zh: '<i class="fa-solid fa-arrow-up-right-from-square mr-2"></i> 前往链接',
            en: '<i class="fa-solid fa-arrow-up-right-from-square mr-2"></i> Go to Link'
        },
        'cancel-btn': {
            zh: '取消',
            en: 'Cancel'
        }
    };
    
    document.getElementById('btn-copy').innerHTML = elements['copy-btn'][currentLanguage];
    document.getElementById('btn-go').innerHTML = elements['go-btn'][currentLanguage];
    document.getElementById('btn-cancel').textContent = elements['cancel-btn'][currentLanguage];

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
        // Fallback for some browsers
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
    }, 2000);
}

// 页面加载完成后初始化语言菜单
document.addEventListener('DOMContentLoaded', initLanguageMenu);