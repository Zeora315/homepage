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

    // --- 项目页卡片 ---
    function renderProjects() {
        const grid = document.querySelector('.projects-grid');
        if (!grid || !Array.isArray(data.products)) return;

        grid.innerHTML = data.products.map((product, index) => {
            const number = String(index + 1).padStart(2, '0');
            const detailUrl = `project-detail.html?p=${encodeURIComponent(product.id || number)}`;
            return `
                <article class="project-card">
                    <div class="project-cover" style="${backgroundStyle(product.cover)}"><span>${product.cover ? '' : `封面图 ${number}`}</span></div>
                    <div class="project-card-body">
                        <h2>${escapeHtml(product.name || '项目名称')}</h2>
                        <p>${escapeHtml(product.summary || '这里填写项目的简单介绍和主要特色。')}</p>
                    </div>
                    <a href="${detailUrl}" aria-label="了解${escapeHtml(product.name || '项目')}">了解更多 <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
                </article>`;
        }).join('');
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
        renderProjects();
        renderProductDetail();
    });
})();
