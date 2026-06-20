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

// 页面加载完成后隐藏加载动画并显示菜单栏
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingAnimation = document.getElementById('loading-animation');
        const navbar = document.querySelector('.navbar');
        
        if (loadingAnimation) {
            loadingAnimation.style.opacity = '0';
            setTimeout(function() {
                loadingAnimation.style.display = 'none';
                
                // 显示菜单栏
                if (navbar) {
                    navbar.classList.add('show');
                }
            }, 500);
        }
    }, 1000); // 1秒后开始淡出
});

// 滚动到顶部功能
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 0.5 一言 API 获取句子 ---
const subtitleElement = document.getElementById('hero-subtitle');

async function fetchHitokoto() {
    if (subtitleElement?.dataset.static === 'true') return;

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

// --- 1. Hello 轮播 ---
const helloText = document.getElementById('hero-text');
const greetings = ["hello", "你好", "hola", "bonjour", "こんにちは", "ciao", "你好"];
let index = 0;

function rotateText() {
    if (helloText?.dataset.static === 'true') return;

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
    setInterval(rotateText, 3000);
}

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

// --- 4. Music Player ---
const musicTracks = [
    {
        "title": "青花瓷",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.4/青花瓷/青花瓷.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002eFUFm2XYZ7z_2.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.4/青花瓷/青花瓷.lrc"
    },
    {
        "title": "稻香",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.1/周杰伦/稻香/稻香.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.1/周杰伦/稻香/稻香.lrc"
    },
    {
        "title": "晴天",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/晴天/晴天.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/晴天/晴天.lrc"
    },
    {
        "title": "七里香",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/七里香/七里香.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000003DFRzD192KKD_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/七里香/七里香.lrc"
    },
    {
        "title": "花海",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/花海/花海.flac",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/花海/花海.lrc"
    },
    {
        "title": "反方向的钟",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/反方向的钟/反方向的钟.flac",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000000f01724fd7TH_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/反方向的钟/反方向的钟.lrc"
    },
    {
        "title": "兰亭序",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.1/周杰伦/兰亭序/兰亭序.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.1/周杰伦/兰亭序/兰亭序.lrc"
    },
    {
        "title": "说好的辛福呢",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/说好的辛福呢/说好的辛福呢.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/说好的辛福呢/说好的幸福呢.lrc"
    },
    {
        "title": "我落泪情绪零碎",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/我落泪情绪零碎/我落泪情绪零碎.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000000bviBl4FjTpO_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/我落泪情绪零碎/我落泪情绪零碎.lrc"
    },
    {
        "title": "听妈妈的话",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/听妈妈的话/听妈妈的话.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002jLGWe16Tf1H_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.2/听妈妈的话/听妈妈的话.lrc"
    },
    {
        "title": "明明就",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/明明就/明明就.flac",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000003Ow85E3pnoqi_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/明明就/明明就.lrc"
    },
    {
        "title": "我是如此相信",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/我是如此相信/我是如此相信.flac",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000001hGx1Z0so1YX_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music-jay@1.0.1/我是如此相信/我是如此相信.lrc"
    },
    {
        "title": "发如雪",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.3/发如雪/发如雪.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M0000024bjiL2aocxT_3.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.3/发如雪/发如雪.lrc"
    },
    {
        "title": "以父之名",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.3/以父之名/以父之名.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.3/以父之名/以父之名.lrc"
    },
    {
        "title": "园游会",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.3/园游会/园游会.flac",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000003DFRzD192KKD_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.3/园游会/园游会.lrc"
    },
    {
        "title": "本草纲目",
        "artist": "周杰伦",
        "src": "https://npm.elemecdn.com/anzhiyu-music@1.0.4/本草纲目/本草纲目.mp3",
        "cover": "https://y.qq.com/music/photo_new/T002R300x300M000002jLGWe16Tf1H_1.jpg?max_age=2592000",
        "lrc": "https://npm.elemecdn.com/anzhiyu-music@1.0.4/本草纲目/本草纲目.lrc"
    },
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
    return lrcText
        .split('\n')
        .flatMap(line => {
            const text = line.replace(/\[[^\]]+\]/g, '').trim();
            const timeTags = [...line.matchAll(/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g)];
            return timeTags
                .filter(() => text)
                .map(match => {
                    const minutes = Number(match[1]);
                    const seconds = Number(match[2]);
                    const milliseconds = Number((match[3] || '0').padEnd(3, '0'));
                    return {
                        time: minutes * 60 + seconds + milliseconds / 1000,
                        text
                    };
                });
        })
        .sort((first, second) => first.time - second.time);
}

function renderLyrics(lyrics, message = '暂无歌词') {
    currentLyrics = lyrics;
    currentLyricIndex = -1;

    if (!lyrics.length) {
        if (musicLyrics) musicLyrics.innerHTML = `<p class="is-active">${message}</p>`;
        updateNavLyric(message);
        return;
    }

    if (musicLyrics) musicLyrics.innerHTML = lyrics.map(line => `<p>${line.text}</p>`).join('');
    updateNavLyric(lyrics[0].text);
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

    if (musicLyrics) {
        const lyricLines = musicLyrics.querySelectorAll('p');
        lyricLines[currentLyricIndex]?.classList.remove('is-active');
        lyricLines[nextIndex]?.classList.add('is-active');
        lyricLines[nextIndex]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
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
