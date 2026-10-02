/* =========================================
   站点内容配置（只需要改这个文件）
   =========================================
   说明：
   1. recommendations = 首页「推荐」区域的 6 个位置；
   2. products = 产品中心 / 项目页里的产品，同时用于生成详情页；
   3. 图片字段为空时，会自动显示占位样式，不会报错。
========================================= */

window.SITE_DATA = {
    // 配置：首页推荐位；建议保持 6 个，切换箭头会自动按数量计算。
    recommendations: [
        {
            badge: '推荐位 01',
            title: '等待填充推荐内容',
            image: '',
            link: ''
        },
        {
            badge: '推荐位 02',
            title: '等待填充推荐内容',
            image: '',
            link: ''
        },
        {
            badge: '推荐位 03',
            title: '等待填充推荐内容',
            image: '',
            link: ''
        },
        {
            badge: '推荐位 04',
            title: '等待填充推荐内容',
            image: '',
            link: ''
        },
        {
            badge: '推荐位 05',
            title: '等待填充推荐内容',
            image: '',
            link: ''
        },
        {
            badge: '推荐位 06',
            title: '等待填充推荐内容',
            image: '',
            link: ''
        }
    ],

    // 配置：首页博客推荐；RSS 失败时使用 fallback，保证静态页仍然可用。
    blogFeed: {
        feedUrl: 'https://blog.zeora.top/atom.xml',
        siteUrl: 'https://blog.zeora.top',
        limit: 6,
        fallback: [
            {
                title: '机器人已经卷到这种程度了？',
                url: 'https://blog.zeora.top/posts/531c66a5/',
                category: '科技',
                published: '2026-08-26T12:00:00.000Z',
                image: 'https://p.zeora.top/rsdld-cover-20260822-x1p8s.webp'
            },
            {
                title: '台风名字的由来',
                url: 'https://blog.zeora.top/posts/0/',
                category: '知识科普',
                published: '2026-07-12T00:00:00.000Z',
                image: 'https://p.zeora.top/%E5%8F%B0%E9%A3%8E%E5%90%8D%E5%AD%97'
            },
            {
                title: '支付宝AI深度实测：从查账单到打车',
                url: 'https://blog.zeora.top/posts/8aaeb8d7/',
                category: '软件推荐',
                published: '2026-06-16T02:00:00.000Z',
                image: 'https://p.zeora.top/AI%E6%94%AF%E4%BB%98%E5%AE%9D'
            },
            {
                title: 'WWDC26：Siri彻底重构从语音助手到个人智能代理',
                url: 'https://blog.zeora.top/posts/f26887eb/',
                category: '经验分享',
                published: '2026-06-10T13:25:13.142Z',
                image: 'https://p.zeora.top/wwdc26'
            },
            {
                title: 'ChatGPT Images 2.0：当AI学会"造假"之后，"眼见为实"正在失效',
                url: 'https://blog.zeora.top/posts/40df77d4/',
                category: '经验分享',
                published: '2026-04-26T00:17:51.532Z',
                image: 'https://p.zeora.top/blog-cover/Canvas-Ruom_z.webp'
            },
            {
                title: 'Hexo 博客搭建教程',
                url: 'https://blog.zeora.top/posts/70db7d7c/',
                category: 'Hexo',
                published: '2026-03-28T09:31:39.236Z',
                image: 'https://p.zeora.top/blog-img/1774690328573.webp'
            }
        ]
    },

    // 配置：赞助页内容；改这里即可，不用改 sponsor.html。
    sponsor: {
        intro: '赞助收入用于维持博客、开源项目与个人站点的持续更新。',
        usages: [                       // 配置：赞助去向卡片
            {
                icon: 'fa-solid fa-server',
                title: '服务器与域名',
                desc: '支付站点与服务的运行开销，保持长期在线。'
            },
            {
                icon: 'fa-solid fa-code',
                title: '开发与维护',
                desc: '持续修复问题、更新功能、跟进新设备兼容。'
            },
        ],
        methods: [                      // 配置：赞助方式；qr 填收款码图片地址，url / links 填外链，account 填可复制的账号
            {
                name: '支付宝',
                icon: 'fa-brands fa-alipay',
                color: '#1677ff',
                qr: '',
                account: '',
                note: '扫码或搜索账号捐赠',
                url: ''
            },
            {
                name: '微信支付',
                icon: 'fa-brands fa-weixin',
                color: '#22c55e',
                qr: '',
                account: '',
                note: '扫码捐赠',
                url: ''
            },
            {
                name: '爱发电',
                icon: 'fa-solid fa-bolt',
                color: '#ff5c8a',
                qr: 'https://p.zeora.top/aifadianwebp',
                account: '',
                note: '在爱发电上持续支持',
                url: '',
                links: [                // 配置：额外跳转按钮，label 为按钮文字，url 为跳转地址
                    {
                        label: '爱发电主页',
                        url: 'https://afdian.com/a/zeora?utm_source=copylink&utm_medium=link'
                    }
                ]
            }
        ],
        sponsors: [                     // 配置：赞助名单；没有数据时自动显示占位文案
            // {
            //     name: '赞助者名称',
            //     amount: '¥ 10',
            //     date: '2026-09',
            //     message: '感谢你的项目'
            // }
        ]
    },

    // 配置：产品列表；复制一段对象即可新增一个产品。
    products: [
        {
            // 配置：产品唯一标识，使用包名，详情页用 ?p=top.zeora.band.metronome 打开
            id: 'top.zeora.band.metronome',
            name: '节拍器',                 // 配置：产品名称
            type: '快应用',                 // 配置：产品类型，如：网站 / 快应用 / 应用 / 工具
            theme: '#3a7aa7ff',               // 配置：主题色，跟随图标配色，决定顶部渐变和下载按钮颜色（待你确认后替换）
            icon: 'https://raw.githubusercontent.com/Zeora315/top.zeora.band.metronome/refs/heads/main/media/logo.png', // 配置：产品图标图片地址
            cover: 'https://raw.githubusercontent.com/Zeora315/top.zeora.band.metronome/refs/heads/main/media/Screenshot_2026-09-19-22-30-34-912_com.lemon.lv_1789828253986edit.jpg', // 配置：项目页封面图地址
            summary: '这是一款运行在小米手环上的轻量级节拍器应用',
            download: 'https://v4.gh-proxy.org/https://raw.githubusercontent.com/Zeora315/top.zeora.band.metronome/refs/heads/main/downloads/top.zeora.band.metronome.release.2.2.0.rpk', // 配置：下载地址
            links: [                        // 配置：相关链接；url 留空则不显示
                {
                    label: 'GitHub',
                    url: 'https://github.com/Zeora315/top.zeora.band.metronome',                // 配置：GitHub 地址，等你填写
                    icon: 'fa-brands fa-github'
                }
            ],
            screenshots: [                  // 配置：应用截图，横向展示，可放多张；中文文件名需 URL 编码
                'https://github.com/Zeora315/top.zeora.band.metronome/blob/main/media/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260919211805_111_21.png?raw=true',
                'https://github.com/Zeora315/top.zeora.band.metronome/blob/main/media/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260919211818_112_21.png?raw=true'
            ],
            changelog: [                    // 配置：更新日志，按版本从新到旧排列
                {
                    version: '2.1.7',
                    content: '修复节拍模式'
                }
            ],
            // 配置：下载弹窗内容；第一级是系统 / 设备，第二级是下载来源。
            downloadOptions: [
                {
                    name: '小米手环 10 NFC',
                    icon: 'fa-solid fa-watch',
                    sources: [
                        {
                            label: 'GitHub 下载',
                            icon: 'fa-brands fa-github',
                            url: 'https://github.com/Zeora315/top.zeora.band.metronome/blob/main/downloads/top.zeora.band.metronome.release.2.2.0.rpk',
                            note: '从 GitHub 仓库获取'
                        },
                        {
                            label: 'AstroBox 获取',
                            icon: 'fa-solid fa-box-open',
                            url: 'https://abox.run/open?source=resv2&id=top.zeora.band.metronome&provider=OfficialV2',
                            note: '从 AstroBox 打开'
                        },
                        {
                            label: '直接下载',
                            icon: 'fa-solid fa-circle-down',
                            url: 'https://v4.gh-proxy.org/https://raw.githubusercontent.com/Zeora315/top.zeora.band.metronome/refs/heads/main/downloads/top.zeora.band.metronome.release.2.2.0.rpk',
                            note: '安装包直链'
                        }
                    ]
                },
                {
                    name: '小米手环 10',
                    icon: 'fa-solid fa-watch',
                    sources: [
                        {
                            label: '直接下载',
                            icon: 'fa-solid fa-circle-down',
                            url: 'downloads/top.zeora.band.metronome.release.2.2.0.rpk',
                            note: '官方安装包'
                        },
                        {
                            label: 'GitHub 下载',
                            icon: 'fa-brands fa-github',
                            url: '',
                            note: 'GitHub Releases'
                        },
                        {
                            label: '百度网盘下载',
                            icon: 'fa-solid fa-cloud-arrow-down',
                            url: '',
                            note: '备用下载'
                        },
                        {
                            label: '指令下载',
                            icon: 'fa-solid fa-terminal',
                            url: '',
                            note: '命令行获取'
                        }
                    ]
                }
            ]
        }
    ]
};

/* =========================================
   以下为渲染逻辑，一般不需要修改
========================================= */
(function () {
    const data = window.SITE_DATA || {};

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));
    }

    function backgroundStyle(url) {
        return url ? `background-image: url('${escapeHtml(url)}');` : '';
    }

    // --- 首页推荐区 ---
    function renderRecommendations() {
        const track = document.querySelector('.recommendations-track');
        if (!track || !Array.isArray(data.recommendations)) return;

        track.innerHTML = data.recommendations.map((item, index) => {
            const number = String(index + 1).padStart(2, '0');
            const hasImage = Boolean(item.image);
            const cardClass = `recommendation-card${hasImage ? ' has-image' : ''}`;
            const cardStyle = hasImage ? ` style="${backgroundStyle(item.image)}"` : '';
            const content = `
                <span class="recommendation-badge">${escapeHtml(item.badge || `推荐位 ${number}`)}</span>
                <h3>${escapeHtml(item.title || '等待填充推荐内容')}</h3>
                <p>了解更多 →</p>
                <div class="recommendation-placeholder">${number}</div>`;

            if (item.link) {
                return `<a class="${cardClass}" href="${escapeHtml(item.link)}" aria-label="${escapeHtml(item.title)}"${cardStyle}>${content}</a>`;
            }
            return `<article class="${cardClass}"${cardStyle}>${content}</article>`;
        }).join('');

        initRecommendationSlider(track);
    }

    function initRecommendationSlider(track) {
        const section = document.querySelector('.recommendations-section');
        const previousButton = section?.querySelector('.recommendation-arrow-prev');
        const nextButton = section?.querySelector('.recommendation-arrow-next');
        const cards = [...track.children];
        if (cards.length === 0) return;

        let activeIndex = 0;

        function getVisibleCount() {
            if (window.matchMedia('(max-width: 520px)').matches) return 1;
            if (window.matchMedia('(max-width: 760px)').matches) return 1;
            return 3;
        }

        function renderSlider() {
            const visibleCount = getVisibleCount();
            const maxIndex = Math.max(0, cards.length - visibleCount);
            activeIndex = Math.max(0, Math.min(activeIndex, maxIndex));

            // 用视口宽度计算每屏步长，避免卡片尚未完成布局时量到 0 导致不变位。
            const viewport = track.closest('.recommendations-viewport') || track.parentElement;
            const viewportWidth = viewport ? viewport.clientWidth : track.clientWidth;
            const step = (viewportWidth + 12) / visibleCount;

            track.style.transform = `translateX(${-activeIndex * step}px)`;
            previousButton?.toggleAttribute('disabled', activeIndex === 0);
            nextButton?.toggleAttribute('disabled', activeIndex >= maxIndex);
        }

        previousButton?.addEventListener('click', () => {
            activeIndex -= 1;
            renderSlider();
        });

        nextButton?.addEventListener('click', () => {
            activeIndex += 1;
            renderSlider();
        });

        window.addEventListener('resize', renderSlider, { passive: true });
        window.addEventListener('load', renderSlider);
        renderSlider();

        // 卡片可能由 data.js 异步渲染完成，这里补一次初始化，确保箭头始终可用。
        setTimeout(renderSlider, 300);
    }

    // --- 首页博客推荐 ---
    const blogCoverPalette = ['#8797a6', '#c7d8dc', '#d57b4f', '#6689a4', '#9b7c68', '#7c8b70'];

    function normalizeBlogImage(url) {
        if (!url) return '';
        const value = String(url).trim();
        if (value.startsWith('https://blog.zeora.top/https/')) return `https://${value.slice('https://blog.zeora.top/https/'.length)}`;
        const candidate = value.startsWith('http://') ? `https://${value.slice(7)}` : value;
        try {
            const parsed = new URL(candidate, data.blogFeed.feedUrl);
            return parsed.protocol === 'https:' ? parsed.href : '';
        } catch (error) {
            return '';
        }
    }

    function normalizeBlogUrl(url) {
        try {
            const parsed = new URL(url || data.blogFeed.siteUrl, data.blogFeed.feedUrl);
            return parsed.protocol === 'https:' ? parsed.href : data.blogFeed.siteUrl;
        } catch (error) {
            return data.blogFeed.siteUrl;
        }
    }

    function extractFirstImage(markup) {
        if (!markup) return '';
        const match = String(markup).match(/<img[^>]+src=["']([^"']+)/i);
        return normalizeBlogImage(match?.[1] || '');
    }

    function formatBlogDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    }

    function readFeedEntry(entry) {
        const linkElement = entry.querySelector('link[rel="alternate"]') || entry.querySelector('link[href]');
        const summary = entry.querySelector('summary')?.textContent || '';
        const content = entry.querySelector('content')?.textContent || '';
        const category = entry.querySelector('category')?.getAttribute('term') || '博客';
        return {
            title: entry.querySelector('title')?.textContent?.trim() || '未命名文章',
            url: normalizeBlogUrl(linkElement?.getAttribute('href')),
            category,
            published: entry.querySelector('published')?.textContent || entry.querySelector('updated')?.textContent || '',
            image: extractFirstImage(summary) || extractFirstImage(content)
        };
    }

    async function findArticleCover(url) {
        if (!url) return '';
        try {
            const response = await fetch(url, { mode: 'cors' });
            if (!response.ok) return '';
            const markup = await response.text();
            const documentNode = new DOMParser().parseFromString(markup, 'text/html');
            const ogImage = documentNode.querySelector('meta[property="og:image"]')?.getAttribute('content');
            return normalizeBlogImage(ogImage);
        } catch (error) {
            return '';
        }
    }

    function createBlogCard(item, index) {
        const image = normalizeBlogImage(item.image);
        const category = item.category || '博客';
        const fallback = blogCoverPalette[index % blogCoverPalette.length];
        const card = document.createElement('a');
        card.className = 'blog-card';
        card.href = normalizeBlogUrl(item.url);
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        const cover = document.createElement('div');
        cover.className = 'blog-card-cover';
        if (image) {
            const coverImage = document.createElement('img');
            coverImage.src = image;
            coverImage.alt = item.title || '博客文章封面';
            coverImage.loading = 'lazy';
            coverImage.dataset.blogCover = 'true';
            cover.append(coverImage);
        } else {
            cover.classList.add('blog-card-cover-fallback');
            cover.style.setProperty('--blog-cover-color', fallback);
            const label = document.createElement('span');
            label.textContent = category;
            cover.append(label);
        }

        const body = document.createElement('div');
        body.className = 'blog-card-body';
        const categoryElement = document.createElement('span');
        categoryElement.className = 'blog-card-category';
        categoryElement.textContent = category;
        const titleElement = document.createElement('h3');
        titleElement.textContent = item.title || '未命名文章';
        const timeElement = document.createElement('time');
        timeElement.dateTime = item.published || '';
        timeElement.textContent = formatBlogDate(item.published) || '最近更新';
        body.append(categoryElement, titleElement, timeElement);
        card.append(cover, body);
        return card;
    }

    function initBlogSlider(track) {
        const section = document.querySelector('.blog-recommendations-section');
        const previousButton = section?.querySelector('.blog-arrow-prev');
        const nextButton = section?.querySelector('.blog-arrow-next');
        const cards = [...track.querySelectorAll('.blog-card')];
        if (cards.length === 0) return;

        let activeIndex = 0;
        function getVisibleCount() {
            if (window.matchMedia('(max-width: 760px)').matches) return 1;
            return 3;
        }
        function renderSlider() {
            const visibleCount = getVisibleCount();
            const maxIndex = Math.max(0, cards.length - visibleCount);
            activeIndex = Math.max(0, Math.min(activeIndex, maxIndex));
            const viewport = track.closest('.blog-recommendations-viewport');
            const viewportWidth = viewport ? viewport.clientWidth : track.clientWidth;
            const step = (viewportWidth + 18) / visibleCount;
            track.style.transform = `translateX(${-activeIndex * step}px)`;
            previousButton?.toggleAttribute('disabled', activeIndex === 0);
            nextButton?.toggleAttribute('disabled', activeIndex >= maxIndex);
        }
        previousButton?.addEventListener('click', () => { activeIndex -= 1; renderSlider(); });
        nextButton?.addEventListener('click', () => { activeIndex += 1; renderSlider(); });
        window.addEventListener('resize', renderSlider, { passive: true });
        window.addEventListener('load', renderSlider);
        renderSlider();
        setTimeout(renderSlider, 300);
    }

    function renderBlogRecommendations(items) {
        const track = document.querySelector('.blog-recommendations-track');
        if (!track) return;
        track.replaceChildren(...items.map(createBlogCard));
        track.querySelectorAll('[data-blog-cover]').forEach((image) => {
            image.addEventListener('error', () => {
                const cover = image.closest('.blog-card-cover');
                if (!cover) return;
                const card = image.closest('.blog-card');
                const index = card ? [...track.querySelectorAll('.blog-card')].indexOf(card) : 0;
                cover.classList.add('blog-card-cover-fallback');
                cover.style.setProperty('--blog-cover-color', blogCoverPalette[Math.max(index, 0) % blogCoverPalette.length]);
                cover.replaceChildren();
                const label = document.createElement('span');
                label.textContent = items[index]?.category || '博客';
                cover.append(label);
            }, { once: true });
        });
        initBlogSlider(track);
    }

    async function renderBlogFeed() {
        const track = document.querySelector('.blog-recommendations-track');
        if (!track || !data.blogFeed) return;
        const fallback = (data.blogFeed.fallback || []).slice(0, data.blogFeed.limit || 6);
        let items = fallback;
        try {
            const response = await fetch(data.blogFeed.feedUrl, { mode: 'cors' });
            if (!response.ok) throw new Error(`Feed request failed: ${response.status}`);
            const xml = new DOMParser().parseFromString(await response.text(), 'application/xml');
            const parsed = [...xml.querySelectorAll('entry')]
                .map(readFeedEntry)
                .filter((item) => item.title && item.url)
                .slice(0, data.blogFeed.limit || 6);
            if (parsed.length) items = parsed;
        } catch (error) {
            // 静态站点可能遇到跨域限制，回退数据仍能保持区块可用。
        }

        renderBlogRecommendations(items);
        const coverCandidates = items.filter((item) => item.url);
        if (coverCandidates.length) {
            const discovered = await Promise.all(coverCandidates.map((item) => findArticleCover(item.url)));
            let changed = false;
            coverCandidates.forEach((item, index) => {
                if (discovered[index] && discovered[index] !== item.image) {
                    item.image = discovered[index];
                    changed = true;
                }
            });
            if (changed) renderBlogRecommendations(items);
        }
    }

    // --- 项目页列表 ---
    function renderProjects() {
        const grid = document.querySelector('.projects-grid');
        if (!grid || !Array.isArray(data.products)) return;

        const typeDescriptions = {
            '网站': '持续维护、面向日常使用的站点服务',
            '快应用': '适配设备的轻量应用与实验作品',
            '软件': '用于工作、创作和生活的实用软件',
            '工具': '持续打磨的工具与开源项目'
        };

        const grouped = data.products.reduce((groups, product) => {
            const type = String(product.type || '其他');
            if (!groups[type]) groups[type] = [];
            groups[type].push(product);
            return groups;
        }, {});

        grid.innerHTML = Object.entries(grouped).map(([type, products]) => {
            const groupId = `project-group-${type.replace(/[^a-zA-Z0-9\u4e00-\u9fff]+/g, '-')}`;
            const description = typeDescriptions[type] || '正在构建、维护和持续打磨的作品';
            const items = products.map((product, index) => {
                const number = String(index + 1).padStart(2, '0');
                const detailUrl = `project-detail.html?p=${encodeURIComponent(product.id || `${type}-${number}`)}`;
                const actionLabel = product.actionLabel || (type === '网站' ? '访问' : '获取');
                const icon = product.icon
                    ? `<img class="project-list-icon" src="${escapeHtml(product.icon)}" alt="${escapeHtml(product.name || '项目')}图标" loading="lazy">`
                    : `<span class="project-list-icon project-list-icon-placeholder" aria-hidden="true"><i class="fa-solid fa-cube"></i></span>`;
                const badge = product.badge
                    ? `<span class="project-list-badge">${escapeHtml(product.badge)}</span>`
                    : '';

                return `
                    <article class="project-list-item">
                        <a class="project-list-icon-link" href="${detailUrl}" aria-label="打开${escapeHtml(product.name || '项目')}详情">${icon}</a>
                        <div class="project-list-copy">
                            <div class="project-list-title-row">
                                <h3>${escapeHtml(product.name || '项目名称')}</h3>
                                ${badge}
                            </div>
                            <p>${escapeHtml(product.summary || '这里填写项目的简单介绍和主要特色。')}</p>
                            <a class="project-list-action" href="${detailUrl}" aria-label="${escapeHtml(actionLabel)}${escapeHtml(product.name || '项目')}">${escapeHtml(actionLabel)} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
                        </div>
                    </article>`;
            }).join('');

            return `
                <section class="project-group" aria-labelledby="${groupId}">
                    <div class="project-group-heading">
                        <h2 id="${groupId}">${escapeHtml(type)}</h2>
                        <p>${escapeHtml(description)}</p>
                    </div>
                    <div class="project-group-items">${items}</div>
                </section>`;
        }).join('');
    }

    // --- 赞助页 ---
    function renderSponsor() {
        const root = document.querySelector('.sponsor-section');
        if (!root || !data.sponsor) return;

        const config = data.sponsor;

        const intro = root.querySelector('[data-sponsor-intro]');
        if (intro) {
            intro.textContent = config.intro || '';
            intro.hidden = !config.intro;
        }

        const usageGrid = root.querySelector('.sponsor-usage-grid');
        if (usageGrid) {
            usageGrid.innerHTML = (config.usages || []).map((usage) => `
                <article class="sponsor-usage">
                    <i class="${escapeHtml(usage.icon || 'fa-solid fa-heart')}" aria-hidden="true"></i>
                    <h3>${escapeHtml(usage.title || '')}</h3>
                    <p>${escapeHtml(usage.desc || '')}</p>
                </article>`).join('');
            usageGrid.hidden = (config.usages || []).length === 0;
        }

        const methodGrid = root.querySelector('.sponsor-methods-grid');
        if (methodGrid) {
            methodGrid.innerHTML = (config.methods || []).map((method) => {
                // 二维码可点击：优先跳 url，没有则跳 links 里的第一个地址。
                const jumpUrl = method.url || (method.links || []).map((link) => link.url).find(Boolean) || '';
                const qrImage = method.qr
                    ? `<img src="${escapeHtml(method.qr)}" alt="${escapeHtml(method.name)}收款码" loading="lazy">`
                    : `<span class="sponsor-qr-placeholder"><i class="fa-solid fa-qrcode" aria-hidden="true"></i>待上传收款码</span>`;
                const qr = jumpUrl
                    ? `<a class="sponsor-qr-link" href="${escapeHtml(jumpUrl)}" target="_blank" rel="noopener noreferrer" aria-label="打开${escapeHtml(method.name)}">${qrImage}</a>`
                    : qrImage;

                const mainLink = method.url
                    ? `<a class="sponsor-action" href="${escapeHtml(method.url)}" target="_blank" rel="noopener noreferrer">前往 <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
                    : '';

                // links 可配置多个额外跳转按钮，label 为空时默认显示「前往」。
                const extraLinks = (method.links || []).filter((link) => link.url).map((link) => `
                    <a class="sponsor-action" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label || '前往')} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`).join('');

                const copyAction = method.account
                    ? `<button class="sponsor-action" type="button" data-copy="${escapeHtml(method.account)}">复制账号 <i class="fa-regular fa-copy" aria-hidden="true"></i></button>`
                    : '';

                return `
                <article class="sponsor-method" style="--method-color: ${escapeHtml(method.color || '#0071e3')}">
                    <div class="sponsor-method-head">
                        <i class="${escapeHtml(method.icon || 'fa-solid fa-heart')}" aria-hidden="true"></i>
                        <div>
                            <h3>${escapeHtml(method.name || '赞助方式')}</h3>
                            <p>${escapeHtml(method.note || '')}</p>
                        </div>
                    </div>
                    <div class="sponsor-qr">${qr}</div>
                    <div class="sponsor-method-actions">${mainLink}${extraLinks}${copyAction}</div>
                </article>`;
            }).join('');

            methodGrid.addEventListener('click', (event) => {
                const button = event.target.closest('[data-copy]');
                if (!button) return;
                const text = button.dataset.copy;
                const done = () => {
                    const original = button.dataset.label || button.innerHTML;
                    button.dataset.label = original;
                    button.innerHTML = '已复制 <i class="fa-solid fa-check" aria-hidden="true"></i>';
                    setTimeout(() => { button.innerHTML = original; }, 1600);
                };
                if (navigator.clipboard?.writeText) {
                    navigator.clipboard.writeText(text).then(done).catch(() => {});
                }
            });
        }

        const list = root.querySelector('.sponsor-list');
        if (list) {
            const sponsors = config.sponsors || [];
            if (sponsors.length === 0) {
                list.innerHTML = '<p class="sponsor-empty">还没有人赞助，成为第一个吧。</p>';
            } else {
                list.innerHTML = sponsors.map((item) => `
                    <div class="sponsor-row">
                        <div class="sponsor-row-main">
                            <span class="sponsor-name">${escapeHtml(item.name || '匿名')}</span>
                            <span class="sponsor-amount">${escapeHtml(item.amount || '')}</span>
                        </div>
                        <div class="sponsor-row-sub">
                            <span class="sponsor-date">${escapeHtml(item.date || '')}</span>
                            <p class="sponsor-message">${escapeHtml(item.message || '')}</p>
                        </div>
                    </div>`).join('');
            }
        }
    }

    // --- 产品详情页 ---
    function renderProductDetail() {
        const section = document.querySelector('.app-detail-section');
        if (!section || !Array.isArray(data.products) || data.products.length === 0) return;

        const params = new URLSearchParams(window.location.search);
        const requestedId = params.get('p');
        const product = data.products.find((item) => String(item.id) === String(requestedId)) || data.products[0];

        document.body.style.setProperty('--app-theme', product.theme || '#3aa76d');
        document.title = `${product.name || '产品'} | Zeora`;

        const icon = section.querySelector('.app-detail-icon');
        if (icon && product.icon) icon.src = product.icon;

        const type = section.querySelector('.app-detail-type');
        if (type) type.textContent = product.type || '';

        const name = section.querySelector('#app-detail-name');
        if (name) name.textContent = product.name || '';

        const downloadButton = section.querySelector('.app-download-btn');
        if (downloadButton) {
            if (product.download) {
                downloadButton.href = product.download;
                downloadButton.hidden = false;
            } else {
                downloadButton.hidden = true;
            }
        }

        const linksList = section.querySelector('.app-links-list');
        if (linksList) {
            const links = (product.links || []).filter((link) => link.url);
            linksList.innerHTML = links.map((link) => `
                <a class="app-link-row" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">
                    <i class="${escapeHtml(link.icon || 'fa-solid fa-link')}" aria-hidden="true"></i>
                    <span>${escapeHtml(link.label || '相关链接')}</span>
                    <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                </a>`).join('');

            const block = section.querySelector('.app-links-block');
            if (block) block.hidden = links.length === 0;

            const changelogBlock = section.querySelector('.app-changelog-block');
            if (changelogBlock) changelogBlock.hidden = (product.changelog || []).length === 0;
        }

        const changelogList = section.querySelector('.app-changelog-list');
        if (changelogList) {
            const changelog = product.changelog || [];
            if (changelog.length > 0) {
                changelogList.innerHTML = changelog.map((log) => `
                    <div class="app-changelog-item">
                        <p class="app-changelog-version">${escapeHtml(log.version || '')}</p>
                        <p class="app-changelog-content">${escapeHtml(log.content || '')}</p>
                    </div>`).join('');
                changelogList.hidden = false;
            } else {
                changelogList.innerHTML = '';
                changelogList.hidden = true;
            }
        }

        const shots = section.querySelector('.app-shots');
        if (shots) {
            const screenshots = (product.screenshots || []).filter(Boolean);
            if (screenshots.length > 0) {
                shots.innerHTML = screenshots.map((url, index) => `
                    <img class="app-shot" src="${escapeHtml(url)}" alt="应用截图 ${index + 1}" loading="lazy">`).join('');
                shots.hidden = false;
            } else {
                shots.innerHTML = '';
                shots.hidden = true;
            }
        }

        initDownloadModal(product);
    }

    // --- 下载弹窗：系统 / 设备 -> 下载来源 ---
    function initDownloadModal(product) {
        const button = document.querySelector('.app-download-btn');
        const modal = document.getElementById('download-modal');
        if (!button || !modal) return;

        const options = product.downloadOptions || [];
        if (options.length === 0) return;

        const systemPane = modal.querySelector('.download-pane-system');
        const sourcePane = modal.querySelector('.download-pane-source');
        const systemList = modal.querySelector('.download-system-list');
        const sourceList = modal.querySelector('.download-source-list');
        const sourceTitle = modal.querySelector('.download-source-title');
        const backButton = modal.querySelector('.download-back');

        systemList.innerHTML = options.map((option, index) => `
            <button class="download-option" type="button" data-index="${index}">
                <i class="${escapeHtml(option.icon || 'fa-solid fa-desktop')}" aria-hidden="true"></i>
                <span>${escapeHtml(option.name || '系统')}</span>
                <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </button>`).join('');

        let closeTimer = null;

        function openModal() {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
            modal.classList.remove('is-closing');
            modal.hidden = false;
            document.body.classList.add('download-modal-open');
            showSystemPane();
        }

        function closeModal() {
            modal.classList.add('is-closing');
            document.body.classList.remove('download-modal-open');
            closeTimer = setTimeout(() => {
                modal.hidden = true;
                modal.classList.remove('is-closing');
                closeTimer = null;
            }, 180);
        }

        function showSystemPane() {
            systemPane.hidden = false;
            sourcePane.hidden = true;
        }

        function showSourcePane(option) {
            sourceTitle.textContent = option.name || '选择下载来源';
            sourceList.innerHTML = (option.sources || []).map((source) => {
                const disabled = source.url ? '' : ' disabled';
                const note = source.note ? `<span class="download-source-note">${escapeHtml(source.note)}</span>` : '';
                const target = source.url ? ' target="_blank" rel="noopener noreferrer"' : '';
                return `
                    <a class="download-source${disabled}" href="${escapeHtml(source.url || '#')}"${target}>
                        <i class="${escapeHtml(source.icon || 'fa-solid fa-circle-down')}" aria-hidden="true"></i>
                        <span class="download-source-label">
                            ${escapeHtml(source.label || '下载来源')}
                            ${note}
                        </span>
                        <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>`;
            }).join('');
            systemPane.hidden = true;
            sourcePane.hidden = false;
        }

        button.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });

        systemList.addEventListener('click', (event) => {
            const optionButton = event.target.closest('.download-option');
            if (!optionButton) return;
            const option = options[Number(optionButton.dataset.index)];
            if (option) showSourcePane(option);
        });

        sourceList.addEventListener('click', (event) => {
            const link = event.target.closest('.download-source');
            if (!link || !link.getAttribute('href') || link.getAttribute('href') === '#') {
                event.preventDefault();
                return;
            }
            closeModal();
        });

        backButton?.addEventListener('click', showSystemPane);

        modal.querySelectorAll('[data-download-close]').forEach((element) => {
            element.addEventListener('click', closeModal);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !modal.hidden) closeModal();
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderRecommendations();
        renderBlogFeed();
        renderProjects();
        renderSponsor();
        renderProductDetail();
    });
})();
