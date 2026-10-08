(() => {
  'use strict';
  const directory = document.querySelector('.page-directory');
  const panel = directory.querySelector('.directory-panel');
  const toggle = directory.querySelector('.directory-toggle');
  const directoryLinks = [...directory.querySelectorAll('.directory-nav a')];
  const links = [...document.querySelectorAll('.site-nav a'), ...directoryLinks];
  // The directory is the single ordered source, including the nested portfolio.
  const targets = directoryLinks.map(link => document.getElementById(link.hash.slice(1)));
  const currentLabel = directory.querySelector('.directory-current');
  const positionLabel = directory.querySelector('.directory-position');
  const header = document.querySelector('.site-header');
  const wideScreen = window.matchMedia('(min-width:1280px)');
  let scheduled = false;
  let requestedSection = null;
  function setRequestedSection(hash) {
    requestedSection = targets.find(target => `#${target.id}` === hash) || null;
  }
  function updateNavigation() {
    const headerHeight = header.offsetHeight;
    const readingLine = headerHeight + Math.min(100, (window.innerHeight - headerHeight) * .2);
    let active = targets[0].id;
    for (const target of targets) {
      if (target.getBoundingClientRect().top <= readingLine) active = target.id;
    }
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    if (window.scrollY >= maxScroll - 2) active = 'contact';
    // Near the page end, an anchor may be unable to reach the reading line.
    // Keep the explicitly selected short section current at its clamped position.
    if (requestedSection) {
      const rect = requestedSection.getBoundingClientRect();
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const margin = parseFloat(getComputedStyle(requestedSection).scrollMarginTop) || 0;
      const destination = Math.min(maxScroll, Math.max(0, window.scrollY + rect.top - padding - margin));
      if (Math.abs(window.scrollY - destination) < 3) active = requestedSection.id;
    }
    for (const link of links) {
      if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    const index = targets.findIndex(target => target.id === active);
    currentLabel.textContent = directoryLinks[index].textContent;
    positionLabel.textContent = `${String(index + 1).padStart(2, '0')} / ${String(targets.length).padStart(2, '0')}`;
    scheduled = false;
  }
  function scheduleNavigation() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
  }
  function syncHeaderHeight() {
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    scheduleNavigation();
  }
  function syncDirectoryLayout() {
    const focused = document.activeElement;
    panel.open = wideScreen.matches;
    if (!wideScreen.matches && panel.contains(focused) && focused !== toggle) toggle.focus({ preventScroll: true });
    if (wideScreen.matches && focused === toggle) {
      (directory.querySelector('[aria-current]') || directoryLinks[0]).focus({ preventScroll: true });
    }
    syncHeaderHeight();
  }
  function closeDirectory(returnFocus = false) {
    if (wideScreen.matches || !panel.open) return;
    panel.open = false;
    if (returnFocus) toggle.focus({ preventScroll: true });
  }
  for (const link of links) {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      setRequestedSection(link.hash);
      if (directory.contains(link) && !wideScreen.matches) {
        closeDirectory();
        const target = document.getElementById(link.hash.slice(1));
        // Focus follows the jump rather than remaining in the collapsed menu.
        target.setAttribute('tabindex', '-1');
        setTimeout(() => target.focus({ preventScroll: true }), 0);
      }
      scheduleNavigation();
    });
  }
  directory.addEventListener('focusout', event => {
    if (event.relatedTarget && !directory.contains(event.relatedTarget)) closeDirectory();
  });
  document.addEventListener('pointerdown', event => {
    requestedSection = null;
    if (!directory.contains(event.target)) closeDirectory();
  });
  window.addEventListener('wheel', () => { requestedSection = null; scheduleNavigation(); }, { passive: true });
  window.addEventListener('touchstart', () => { requestedSection = null; }, { passive: true });
  document.addEventListener('keydown', event => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) requestedSection = null;
    if (event.key === 'Escape' && panel.open && !wideScreen.matches) {
      closeDirectory(true);
      event.preventDefault();
    }
  });
  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', syncHeaderHeight);
  window.addEventListener('load', scheduleNavigation);
  window.addEventListener('hashchange', () => { setRequestedSection(location.hash); scheduleNavigation(); });
  window.addEventListener('pageshow', scheduleNavigation);
  wideScreen.addEventListener('change', syncDirectoryLayout);
  new ResizeObserver(syncHeaderHeight).observe(header);
  document.fonts.ready.then(scheduleNavigation);
  setRequestedSection(location.hash);
  syncDirectoryLayout();
  updateNavigation();
  const copyButton = document.querySelector('[data-copy]');
  const status = document.querySelector('.copy-status');
  if (navigator.clipboard?.writeText) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(copyButton.dataset.copy); status.textContent = '邮箱已复制'; }
      catch { status.textContent = '请长按或选中邮箱地址复制'; }
    });
  }
  const galleryFilters = document.querySelector('.gallery-filters');
  if (galleryFilters) {
    const buttons = [...galleryFilters.querySelectorAll('[data-work-filter]')];
    const cards = [...document.querySelectorAll('#creative-gallery [data-work-category]')];
    const count = document.querySelector('.gallery-count');
    function filterWorks(category) {
      let visible = 0;
      for (const card of cards) {
        card.hidden = category !== 'all' && card.dataset.workCategory !== category;
        if (!card.hidden) visible++;
      }
      for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.workFilter === category));
      count.textContent = category === 'all' ? `共 ${visible} 件作品` : `显示 ${visible} / ${cards.length} 件作品`;
      updateNavigation();
    }
    for (const button of buttons) button.addEventListener('click', () => filterWorks(button.dataset.workFilter));
    galleryFilters.hidden = false;
    window.addEventListener('hashchange', () => {
      const target = document.getElementById(location.hash.slice(1));
      const card = target?.closest('[data-work-category]');
      if (card?.hidden) { filterWorks('all'); target.scrollIntoView(); }
    });
  }
  // Keep previously shared resume and game entry links useful after the redesign.
  if (location.hash === '#resume' || location.hash === '#play') {
    history.replaceState(null, '', location.pathname + location.search + '#home');
    document.querySelector('#home').scrollIntoView();
  }
})();
