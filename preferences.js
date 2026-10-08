(() => {
  'use strict';
  const root = document.documentElement;
  const languageButton = document.querySelector('.language-toggle');
  const themeButton = document.querySelector('.theme-toggle');
  const dictionary = window.HUBERY_EN || {};
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const read = key => { try { return localStorage.getItem(key); } catch (_) { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch (_) {} };
  const validTheme = value => value === 'light' || value === 'dark';
  let explicitTheme = validTheme(read('hubery-theme'));
  let language = 'zh';
  const originalAnchoring = root.style.overflowAnchor;
  let restoreAnchoring = 0;
  const ui = {
    zh: { allWorks: total => `共 ${total} 件作品`, filteredWorks: (visible, total) => `显示 ${visible} / ${total} 件作品`, emailCopied: '邮箱已复制', emailFallback: '请长按或选中邮箱地址复制' },
    en: { allWorks: total => `${total} works`, filteredWorks: (visible, total) => `Showing ${visible} of ${total} works`, emailCopied: 'Email copied', emailFallback: 'Select or long-press the email address to copy it' }
  };
  // Keep the original nodes and their markup: switching never replaces cards or links.
  const textNodes = [];
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, [data-no-i18n], .directory-current, .gallery-count, .copy-status')) continue;
    const key = node.nodeValue.trim();
    if (Object.hasOwn(dictionary, key)) textNodes.push({ node, original: node.nodeValue, key });
  }
  const attributes = [];
  for (const element of document.querySelectorAll('[alt], [aria-label], [title], meta[content]')) {
    if (element.closest('[data-no-i18n]')) continue;
    for (const attribute of ['alt', 'aria-label', 'title', 'content']) {
      const original = element.getAttribute(attribute);
      if (original && Object.hasOwn(dictionary, original)) attributes.push({ element, attribute, original });
    }
  }
  const breakSpaces = [...document.querySelectorAll('main br')].map(br => {
    const space = document.createTextNode('');
    br.after(space);
    return space;
  });
  function updateControls() {
    languageButton.textContent = language === 'zh' ? 'EN' : '中文';
    languageButton.lang = language === 'zh' ? 'en' : 'zh-CN';
    languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
    languageButton.title = language === 'zh' ? 'Switch to English' : '切换到中文';
    const dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', language === 'zh' ? '深色模式' : 'Dark mode');
    themeButton.title = language === 'zh' ? `切换到${dark ? '浅色' : '深色'}模式` : `Switch to ${dark ? 'light' : 'dark'} mode`;
    document.querySelector('meta[name="theme-color"]').content = dark ? '#101718' : '#ffffff';
  }
  function applyTheme(theme, remember = false) {
    root.dataset.theme = theme;
    if (remember) { save('hubery-theme', theme); explicitTheme = true; }
    updateControls();
  }
  function readingAnchor() {
    if (window.scrollY < 1) return null;
    const line = document.querySelector('.site-header').offsetHeight + 80;
    const candidates = [...document.querySelectorAll('main [id]')].filter(element => element.getClientRects().length);
    const element = candidates.filter(element => element.getBoundingClientRect().top <= line).at(-1);
    return element ? { element, top: element.getBoundingClientRect().top } : null;
  }
  function applyLanguage(next, remember = false) {
    const anchor = remember ? readingAnchor() : null;
    if (anchor) {
      cancelAnimationFrame(restoreAnchoring);
      // Avoid a second, native scroll-anchor correction after our own adjustment.
      root.style.overflowAnchor = 'none';
    }
    language = next;
    root.lang = next === 'en' ? 'en' : 'zh-CN';
    for (const { node, original, key } of textNodes) {
      node.nodeValue = next === 'en' ? original.replace(key, () => dictionary[key]) : original;
    }
    for (const { element, attribute, original } of attributes) {
      element.setAttribute(attribute, next === 'en' ? dictionary[original] : original);
    }
    for (const space of breakSpaces) space.nodeValue = next === 'en' ? ' ' : '';
    for (const subtitle of document.querySelectorAll('.work-subtitle')) {
      const heading = [...subtitle.parentNode.childNodes].filter(node => node !== subtitle).map(node => node.textContent).join('').trim();
      subtitle.hidden = next === 'en' && heading.toLowerCase() === subtitle.textContent.trim().toLowerCase();
    }
    if (remember) {
      save('hubery-language', next);
      const url = new URL(location.href);
      url.searchParams.set('lang', next);
      try { history.replaceState(history.state, '', url); } catch (_) {}
    }
    updateControls();
    if (anchor) {
      const behavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollBy(0, anchor.element.getBoundingClientRect().top - anchor.top);
      root.style.scrollBehavior = behavior;
      restoreAnchoring = requestAnimationFrame(() => {
        restoreAnchoring = requestAnimationFrame(() => { root.style.overflowAnchor = originalAnchoring; });
      });
    }
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { language } }));
  }
  window.HuberyI18n = Object.freeze({
    get language() { return language; },
    t(key, ...args) { const value = ui[language][key]; return typeof value === 'function' ? value(...args) : value; }
  });
  const queryLanguage = new URLSearchParams(location.search).get('lang');
  const savedLanguage = read('hubery-language');
  applyLanguage((queryLanguage === 'en' || queryLanguage === 'zh') ? queryLanguage : (savedLanguage === 'en' ? 'en' : 'zh'));
  applyTheme(validTheme(root.dataset.theme) ? root.dataset.theme : (systemTheme.matches ? 'dark' : 'light'));
  languageButton.addEventListener('click', () => applyLanguage(language === 'zh' ? 'en' : 'zh', true));
  window.addEventListener('popstate', () => {
    const query = new URLSearchParams(location.search).get('lang');
    const next = query === 'zh' || query === 'en' ? query : (read('hubery-language') === 'en' ? 'en' : 'zh');
    if (next !== language) applyLanguage(next);
  });
  themeButton.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));
  systemTheme.addEventListener('change', event => { if (!explicitTheme) applyTheme(event.matches ? 'dark' : 'light'); });
  languageButton.hidden = false;
  themeButton.hidden = false;
})();
