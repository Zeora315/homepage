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

// 滚动到顶部功能
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 0.5 一言 API 获取句子 ---
const subtitleElement = document.getElementById('hero-subtitle');

async function fetchHitokoto() {
    try {
        const response = await fetch('https://v1.hitokoto.cn/?c=i&c=d&c=e&max_length=30');
        const data = await response.json();
        if (subtitleElement) {
            subtitleElement.textContent = data.hitokoto;
            subtitleElement.style.opacity = '1';
        }
    } catch (error) {
        console.error('Failed to fetch hitokoto:', error);
        if (subtitleElement) {
            subtitleElement.textContent = 'Welcome to Zeora\'s Personal Space';
        }
    }
}

// 页面加载时获取一言
fetchHitokoto();

// --- 1.5 RSS 文章展示 ---
async function fetchRSSArticles() {
    const container = document.getElementById('articles-container');
    if (!container) return;

    try {
        // 使用 CORS 代理来避免跨域问题
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const rssUrl = 'https://blog.zeora.top/atom.xml';
        const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));
        const xmlText = await response.text();
        
        // 解析 XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // 获取文章条目
        const entries = xmlDoc.querySelectorAll('entry');
        const articles = [];
        
        // 限制显示 5 篇文章
        const maxArticles = 5;
        for (let i = 0; i < Math.min(entries.length, maxArticles); i++) {
            const entry = entries[i];
            const title = entry.querySelector('title')?.textContent || '无标题';
            const link = entry.querySelector('link')?.getAttribute('href') || '#';
            const published = entry.querySelector('published')?.textContent || 
                            entry.querySelector('updated')?.textContent || '';
            
            // 格式化日期
            const date = published ? new Date(published).toLocaleDateString('zh-CN') : '';
            
            articles.push({ title, link, date });
        }
        
        // 生成 HTML
        container.innerHTML = articles.map(article => `
            <a href="${article.link}" target="_blank" class="block group">
                <div class="bento-card p-6 hover:transform hover:scale-[1.02] transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <h4 class="text-lg font-semibold text-black group-hover:text-blue-600 transition-colors line-clamp-2">
                            ${article.title}
                        </h4>
                        <span class="text-xs text-gray-400 whitespace-nowrap ml-4">${article.date}</span>
                    </div>
                    <div class="mt-2 flex items-center text-xs text-gray-500">
                        <i class="fa-solid fa-arrow-up-right-from-square mr-1"></i>
                        <span>阅读文章</span>
                    </div>
                </div>
            </a>
        `).join('');
        
    } catch (error) {
        console.error('Failed to fetch RSS:', error);
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fa-solid fa-exclamation-triangle text-yellow-500 text-2xl mb-3"></i>
                <p class="text-gray-500 text-sm">无法加载文章，请稍后重试</p>
            </div>
        `;
    }
}

// 页面加载完成后获取 RSS 文章
document.addEventListener('DOMContentLoaded', () => {
    fetchRSSArticles();
});

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
        btnGo.style.display = 'none';
    } else {
        btnGo.style.display = 'block';
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
    }, 2000);
}
