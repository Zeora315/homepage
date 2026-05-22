# Zeora Personal Homepage

一个简洁优雅的个人主页模板，采用 Apple 风格设计，支持响应式布局和深色/浅色模式切换。

## 特性

- 🎨 **Apple 风格设计** - 简洁现代的视觉风格
- 🌓 **深色/浅色模式** - 支持自动和手动主题切换
- 📱 **响应式布局** - 完美适配桌面端和移动端
- 🖼️ **图片轮播** -图片展示，支持手动切换
- ✨ **平滑动画** - 优雅的滚动显示和过渡效果
- 🔗 **社交链接** - 集成多种社交媒体联系方式

## 文件结构

```
homepage/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 脚本文件
├── img/                # 图片资源
│   ├── zeora-logo-light.png
│   ├── zeora-logo-dark.png
│   └── theme-toggle-icon.svg
└── README.md           # 本文件
```

## 功能模块

### 1. 导航栏
- 博客快捷入口
- 品牌 Logo（点击返回顶部）
- 主题切换按钮

### 2. Hero 区域
- 多语言问候语轮播（hello/你好/hola/bonjour/こんにちは/ciao）
- 一言 API 动态标语
- 个人简介和社交链接

### 3. Highlights 区域
- 6 个 Bento 风格卡片
- 包含博客、工具箱、监控、论坛等链接

### 4. 图片轮播 (Gallery)
- 竖屏 3:2 比例图片展示
- 支持左右按钮手动切换
- 到头停止，不循环播放
- Coverflow 3D 效果

### 5. 联系方式
- 支持 YouTube、Twitter/X、QQ、Email、GitHub
- 点击弹出模态框，支持复制和跳转

## 本地预览

```bash
# 使用 Python 启动本地服务器
python -m http.server 8000

# 然后在浏览器中访问
http://localhost:8000
```

## 自定义配置

### 修改个人信息
编辑 `index.html` 中的相关内容：
- 品牌名称和 Logo
- 社交账号链接
- 个人简介

### 修改主题颜色
编辑 `style.css` 中的 CSS 变量：
```css
:root {
    --bg-color: #f5f5f7;
    --text-primary: #1d1d1f;
    --accent-blue: #0071e3;
    /* ... */
}
```

### 修改轮播图片
编辑 `index.html` 中的 Gallery 区域，替换图片 URL：
```html
<div class="swiper-slide">
    <img src="你的图片链接?w=300&h=450&fit=crop" alt="描述" />
</div>
```

## 浏览器兼容

- Chrome 90+
- Edge 90+
- Firefox 88+
- Safari 14+

## 许可证

MIT License

## 作者

Zeora
