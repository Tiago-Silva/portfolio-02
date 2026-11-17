/* ==========================================================================
   THEME SWITCHER & COMMAND PALETTE (VS CODE / OMARCHY STYLE)
   ========================================================================== */

(() => {
    const STORAGE_KEY = 'portfolio-theme';

    const THEMES = [
        {
            id: 'default',
            name: 'Tiago Dark',
            tag: 'Default • Glassmorphism Cyan',
            themeColor: '#070a12',
            swatches: ['#070a12', '#0f172a', '#06b6d4', '#8b5cf6']
        },
        {
            id: 'tokyo-night',
            name: 'Tokyo Night',
            tag: 'Dark • Omarchy Default',
            themeColor: '#1a1b26',
            swatches: ['#1a1b26', '#24283b', '#7aa2f7', '#bb9af7']
        },
        {
            id: 'catppuccin-mocha',
            name: 'Catppuccin Mocha',
            tag: 'Dark • Soothing Pastel',
            themeColor: '#1e1e2e',
            swatches: ['#1e1e2e', '#313244', '#cba6f7', '#89b4fa']
        },
        {
            id: 'gruvbox',
            name: 'Gruvbox Dark',
            tag: 'Dark • Retro Groove',
            themeColor: '#1d2021',
            swatches: ['#1d2021', '#282828', '#fe8019', '#fabd2f']
        },
        {
            id: 'nord',
            name: 'Nord',
            tag: 'Dark • Arctic Bluish',
            themeColor: '#242933',
            swatches: ['#242933', '#2e3440', '#88c0d0', '#81a1c1']
        },
        {
            id: 'rose-pine',
            name: 'Rosé Pine',
            tag: 'Dark • Soho Vibes',
            themeColor: '#191724',
            swatches: ['#191724', '#1f1d2e', '#ebbcba', '#c4a7e7']
        },
        {
            id: 'kanagawa',
            name: 'Kanagawa',
            tag: 'Dark • Wave & Ink',
            themeColor: '#16161d',
            swatches: ['#16161d', '#1f1f28', '#7e9cd8', '#957fb8']
        },
        {
            id: 'catppuccin-latte',
            name: 'Catppuccin Latte',
            tag: 'Light • Crisp Daylight',
            themeColor: '#eff1f5',
            swatches: ['#eff1f5', '#ffffff', '#1e66f5', '#8839ef']
        }
    ];

    const THEME_MAP = new Map(THEMES.map(theme => [theme.id, theme]));
    let transitionTimer = null;

    function resolveThemeId(themeId) {
        return THEME_MAP.has(themeId) ? themeId : 'default';
    }

    function getSavedThemeId() {
        try {
            return resolveThemeId(localStorage.getItem(STORAGE_KEY));
        } catch {
            return 'default';
        }
    }

    function applyTheme(themeId, { persist = false, animate = true } = {}) {
        const id = resolveThemeId(themeId);
        const theme = THEME_MAP.get(id);
        const root = document.documentElement;

        if (animate) {
            root.classList.add('theme-transitioning');
            clearTimeout(transitionTimer);
            transitionTimer = setTimeout(() => {
                root.classList.remove('theme-transitioning');
            }, 280);
        }

        root.setAttribute('data-theme', id);

        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor && theme) {
            metaThemeColor.setAttribute('content', theme.themeColor);
        }

        const triggerLabel = document.querySelector('.theme-trigger-label');
        if (triggerLabel && theme) {
            triggerLabel.textContent = theme.name;
        }

        if (persist) {
            try {
                localStorage.setItem(STORAGE_KEY, id);
            } catch {
                // Ignore storage errors in restricted contexts
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const triggerBtn = document.getElementById('theme-trigger-btn');
        const backdrop = document.getElementById('theme-palette-backdrop');
        const input = document.getElementById('theme-palette-input');
        const list = document.getElementById('theme-palette-list');
        const closeBtn = document.getElementById('theme-palette-close');

        if (!triggerBtn || !backdrop || !input || !list) return;

        let committedTheme = getSavedThemeId();
        let filteredThemes = [...THEMES];
        let focusedIndex = 0;

        applyTheme(committedTheme, { persist: false, animate: false });

        function renderList() {
            list.innerHTML = '';

            if (filteredThemes.length === 0) {
                const empty = document.createElement('li');
                empty.className = 'theme-palette-empty';
                empty.textContent = 'Nenhum tema encontrado.';
                list.appendChild(empty);
                return;
            }

            filteredThemes.forEach((theme, index) => {
                const li = document.createElement('li');
                li.className = 'theme-palette-item';
                li.setAttribute('role', 'option');
                li.dataset.themeId = theme.id;

                if (theme.id === committedTheme) {
                    li.classList.add('active');
                }
                if (index === focusedIndex) {
                    li.classList.add('focused');
                }

                const isActive = theme.id === committedTheme;
                const swatchesHtml = theme.swatches
                    .map(color => `<span class="theme-swatch" style="background-color: ${color}"></span>`)
                    .join('');

                li.innerHTML = `
                    <div class="theme-item-info">
                        <span class="theme-item-name">
                            ${theme.name}
                            ${isActive ? '<span class="theme-item-badge">Atual</span>' : ''}
                        </span>
                        <span class="theme-item-tag">${theme.tag}</span>
                    </div>
                    <div class="theme-swatches" aria-hidden="true">${swatchesHtml}</div>
                `;

                li.addEventListener('mouseenter', () => {
                    focusedIndex = index;
                    updateFocusAndPreview();
                });

                li.addEventListener('click', () => {
                    commitTheme(theme.id);
                });

                list.appendChild(li);
            });
        }

        function updateFocusAndPreview() {
            const items = list.querySelectorAll('.theme-palette-item');
            items.forEach((item, idx) => {
                item.classList.toggle('focused', idx === focusedIndex);
            });

            const focusedTheme = filteredThemes[focusedIndex];
            if (focusedTheme) {
                applyTheme(focusedTheme.id, { persist: false, animate: true });
                const activeEl = items[focusedIndex];
                if (activeEl) {
                    activeEl.scrollIntoView({ block: 'nearest' });
                }
            }
        }

        function openPalette() {
            committedTheme = getSavedThemeId();
            input.value = '';
            filteredThemes = [...THEMES];
            focusedIndex = Math.max(0, filteredThemes.findIndex(t => t.id === committedTheme));

            renderList();
            backdrop.classList.add('open');
            backdrop.setAttribute('aria-hidden', 'false');
            triggerBtn.setAttribute('aria-expanded', 'true');

            setTimeout(() => {
                input.focus();
            }, 20);
        }

        function closePalette({ restore = true } = {}) {
            if (!backdrop.classList.contains('open')) return;

            backdrop.classList.remove('open');
            backdrop.setAttribute('aria-hidden', 'true');
            triggerBtn.setAttribute('aria-expanded', 'false');

            if (restore) {
                applyTheme(committedTheme, { persist: false, animate: true });
            }
        }

        function commitTheme(themeId) {
            committedTheme = resolveThemeId(themeId);
            applyTheme(committedTheme, { persist: true, animate: true });
            closePalette({ restore: false });
        }

        triggerBtn.addEventListener('click', openPalette);
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closePalette({ restore: true }));
        }

        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                closePalette({ restore: true });
            }
        });

        input.addEventListener('input', () => {
            const query = input.value.trim().toLowerCase();
            filteredThemes = THEMES.filter(theme =>
                theme.name.toLowerCase().includes(query) ||
                theme.tag.toLowerCase().includes(query) ||
                theme.id.toLowerCase().includes(query)
            );
            focusedIndex = 0;
            renderList();
            if (filteredThemes.length > 0) {
                updateFocusAndPreview();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (filteredThemes.length > 0) {
                    focusedIndex = (focusedIndex + 1) % filteredThemes.length;
                    updateFocusAndPreview();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (filteredThemes.length > 0) {
                    focusedIndex = (focusedIndex - 1 + filteredThemes.length) % filteredThemes.length;
                    updateFocusAndPreview();
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const selected = filteredThemes[focusedIndex];
                if (selected) {
                    commitTheme(selected.id);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closePalette({ restore: true });
            }
        });

        document.addEventListener('keydown', (e) => {
            const isPaletteOpen = backdrop.classList.contains('open');
            const isCtrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
            const isAltT = e.altKey && e.key.toLowerCase() === 't';

            if (isCtrlK || isAltT) {
                e.preventDefault();
                if (isPaletteOpen) {
                    closePalette({ restore: true });
                } else {
                    openPalette();
                }
            } else if (e.key === 'Escape' && isPaletteOpen) {
                e.preventDefault();
                closePalette({ restore: true });
            }
        });
    });
})();
