(() => {
  'use strict';
  const links = [...document.querySelectorAll('.site-nav a')];
  const targets = links.map(link => document.querySelector(link.hash)).filter(Boolean);
  let scheduled = false;
  function updateNavigation() {
    const offset = document.querySelector('.site-header').offsetHeight + 140;
    let active = null;
    for (const target of targets) if (target.getBoundingClientRect().top <= offset) active = target.id;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 30) active = 'contact';
    for (const link of links) {
      if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
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
