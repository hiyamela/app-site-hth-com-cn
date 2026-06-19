// 页面辅助交互模块
(function() {
    'use strict';

    // 配置数据
    const CONFIG = {
        siteUrl: 'https://app-site-hth.com.cn',
        keywords: ['华体会', '体育', '电竞', '真人', '棋牌'],
        cardTitle: '平台访问提示',
        cardMessage: '如遇访问异常，请尝试更换网络环境或使用官方镜像地址。'
    };

    // 状态管理
    const state = {
        cardVisible: false,
        badgeList: []
    };

    // DOM 工具函数
    function createElement(tag, className, content) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (content) el.textContent = content;
        return el;
    }

    function appendChildren(parent, children) {
        children.forEach(child => parent.appendChild(child));
    }

    // 生成关键词徽章
    function buildBadges() {
        const container = createElement('div', 'keyword-badges');
        CONFIG.keywords.forEach(kw => {
            const badge = createElement('span', 'badge', kw);
            badge.setAttribute('data-keyword', kw.toLowerCase());
            badge.addEventListener('click', function() {
                alert('关键词: ' + this.textContent);
            });
            container.appendChild(badge);
            state.badgeList.push(badge);
        });
        return container;
    }

    // 生成提示卡片
    function buildCard() {
        const card = createElement('div', 'access-card');
        card.style.display = 'none';

        const title = createElement('h4', 'card-title', CONFIG.cardTitle);
        const message = createElement('p', 'card-message', CONFIG.cardMessage);
        const link = createElement('a', 'card-link', '立即访问');
        link.href = CONFIG.siteUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        const closeBtn = createElement('button', 'card-close', '×');
        closeBtn.setAttribute('aria-label', '关闭提示');
        closeBtn.addEventListener('click', function() {
            card.style.display = 'none';
            state.cardVisible = false;
        });

        appendChildren(card, [title, message, link, closeBtn]);
        return card;
    }

    // 插入样式
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .access-card {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                padding: 16px;
                max-width: 280px;
                z-index: 9999;
                font-family: sans-serif;
            }
            .access-card .card-title {
                margin: 0 0 8px;
                font-size: 16px;
                color: #333;
            }
            .access-card .card-message {
                margin: 0 0 12px;
                font-size: 14px;
                color: #666;
                line-height: 1.4;
            }
            .access-card .card-link {
                display: inline-block;
                background: #4e73df;
                color: #fff;
                padding: 6px 14px;
                border-radius: 4px;
                text-decoration: none;
                font-size: 14px;
            }
            .access-card .card-link:hover {
                background: #2e59d9;
            }
            .access-card .card-close {
                position: absolute;
                top: 6px;
                right: 10px;
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #999;
                line-height: 1;
            }
            .access-card .card-close:hover {
                color: #333;
            }
            .keyword-badges {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                margin: 12px 0;
            }
            .keyword-badges .badge {
                background: #f0f0f0;
                border: 1px solid #ccc;
                border-radius: 12px;
                padding: 4px 10px;
                font-size: 12px;
                cursor: pointer;
                transition: background 0.2s;
            }
            .keyword-badges .badge:hover {
                background: #e2e2e2;
            }
            .access-trigger {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #4e73df;
                color: #fff;
                border: none;
                border-radius: 50%;
                width: 48px;
                height: 48px;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                z-index: 9998;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .access-trigger:hover {
                background: #2e59d9;
            }
        `;
        document.head.appendChild(style);
    }

    // 初始化
    function init() {
        injectStyles();

        // 创建触发按钮
        const trigger = createElement('button', 'access-trigger', 'ℹ');
        trigger.setAttribute('title', '查看访问信息');
        trigger.addEventListener('click', function() {
            const card = document.querySelector('.access-card');
            if (card) {
                card.style.display = state.cardVisible ? 'none' : 'block';
                state.cardVisible = !state.cardVisible;
            }
        });

        // 构建UI
        const badges = buildBadges();
        const card = buildCard();
        card.appendChild(badges);

        document.body.appendChild(trigger);
        document.body.appendChild(card);
    }

    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();