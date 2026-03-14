// --- 0. Theme Toggle Function ---
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Read theme settings from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
}

// Theme toggle function
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Bind click event
themeToggle.addEventListener('click', toggleTheme);

// --- 0.1 Language Switch Function ---
const languageToggle = document.getElementById('language-toggle');
let currentLanguage = 'en';
let languageMenuOpen = false;
const languageMenu = document.getElementById('language-menu');
const languageItems = document.querySelectorAll('.language-menu-item');

// Toggle language menu display/hide
function toggleLanguageMenu() {
    languageMenuOpen = !languageMenuOpen;
    if (languageMenuOpen) {
        languageMenu.classList.add('show');
    } else {
        languageMenu.classList.remove('show');
    }
}

// Select language
function selectLanguage(lang) {
    if (lang === 'zh-CN') {
        // Jump to Chinese page
        window.location.href = '../index.html';
    } else {
        currentLanguage = 'en';
        updateLanguage();
        showToast('Switched to English');
        
        // Update active status
        languageItems.forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
        
        // Close menu
        languageMenuOpen = false;
        languageMenu.classList.remove('show');
    }
}

// Close language menu when clicking elsewhere on the page
document.addEventListener('click', function(event) {
    if (!languageMenu.contains(event.target) && !languageToggle.contains(event.target)) {
        languageMenuOpen = false;
        languageMenu.classList.remove('show');
    }
});

// Initialize language menu
function initLanguageMenu() {
    // Set default language
    const defaultLang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
    document.querySelector(`[data-lang="${defaultLang}"]`).classList.add('active');
    
    // Add language item click events
    languageItems.forEach(item => {
        item.addEventListener('click', function() {
            selectLanguage(this.getAttribute('data-lang'));
        });
    });
}

// Language toggle function (maintain backward compatibility)
function toggleLanguage() {
    toggleLanguageMenu();
}

function updateLanguage() {
    const elements = {
        'hero-subtitle': {
            zh: 'Welcome to Zeora\'s Personal Space',
            en: 'Welcome to Zeora\'s Personal Space'
        },
        'philosophy-title': {
            zh: 'Coding with <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Communication & Innovation.</span>',
            en: 'Coding with <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Communication & Innovation.</span>'
        },
        'philosophy-quote': {
            zh: '「Conquer yourself, and you can conquer the world」',
            en: '「Conquer yourself, and you can conquer the world」'
        },
        'highlights-title': {
            zh: 'Highlights',
            en: 'Highlights'
        },
        'profile-title': {
            zh: 'A Student Influencer in Tech.',
            en: 'A Student Influencer in Tech.'
        },
        'profile-desc': {
            zh: 'A student influencer in the tech field',
            en: 'A student influencer in the tech field'
        },
        'tech-inno-title': {
            zh: 'Tech Inno',
            en: 'Tech Inno'
        },
        'tech-inno-desc': {
            zh: 'Learning, experimenting, creating and innovating',
            en: 'Learning, experimenting, creating and innovating'
        },
        'blog-title': {
            zh: 'Blog',
            en: 'Blog'
        },
        'blog-desc': {
            zh: 'Sharing technology and daily life',
            en: 'Sharing technology and daily life'
        },
        'news-title': {
            zh: 'NewsNow',
            en: 'NewsNow'
        },
        'news-desc': {
            zh: 'Real-time hot news',
            en: 'Real-time hot news'
        },
        'chat-title': {
            zh: 'Chat',
            en: 'Chat'
        },
        'chat-desc': {
            zh: 'End-to-end encrypted messaging',
            en: 'End-to-end encrypted messaging'
        },
        'contact-title': {
            zh: 'Get in touch.',
            en: 'Get in touch.'
        },
        'contact-desc': {
            zh: 'Click the icons below to choose an action',
            en: 'Click the icons below to choose an action'
        },
        'copy-btn': {
            zh: '<i class="fa-regular fa-copy mr-2"></i> Copy ID / Account',
            en: '<i class="fa-regular fa-copy mr-2"></i> Copy ID / Account'
        },
        'go-btn': {
            zh: '<i class="fa-solid fa-arrow-up-right-from-square mr-2"></i> Go to Link',
            en: '<i class="fa-solid fa-arrow-up-right-from-square mr-2"></i> Go to Link'
        },
        'cancel-btn': {
            zh: 'Cancel',
            en: 'Cancel'
        },
        'footer-copyright': {
            zh: '&copy; 2026 zeora. Designed by Apple Aesthetics.',
            en: '&copy; 2026 zeora. Designed by Apple Aesthetics.'
        },
        'language-tooltip': {
            zh: 'Switch Language / 切换语言',
            en: 'Switch Language / 切换语言'
        }
    };
    
    // Update language toggle button tooltip
    document.querySelector('.language-tooltip').textContent = elements['language-tooltip'][currentLanguage];
    
    // Update all elements' language
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

// Bind language toggle event
languageToggle.addEventListener('click', toggleLanguage);

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 1. Hello Rotation ---
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
        btnGo.style.display = 'none'; // e.g., QQ may not have a direct link
    } else {
        btnGo.style.display = 'block';
    }
    
    // Update button text based on current language
    const elements = {
        'copy-btn': {
            zh: '<i class="fa-regular fa-copy mr-2"></i> Copy ID / Account',
            en: '<i class="fa-regular fa-copy mr-2"></i> Copy ID / Account'
        },
        'go-btn': {
            zh: '<i class="fa-solid fa-arrow-up-right-from-square mr-2"></i> Go to Link',
            en: '<i class="fa-solid fa-arrow-up-right-from-square mr-2"></i> Go to Link'
        },
        'cancel-btn': {
            zh: 'Cancel',
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

// Initialize language menu after page load
document.addEventListener('DOMContentLoaded', initLanguageMenu);
