// HTMLBase v1.0 - Global JS - Locked

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = next === 'dark' ? '🌙' : '☀️';
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = saved === 'dark' ? '🌙' : '☀️';
  }
}

function updateStreak() {
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem('lastVisit');
  let streak = parseInt(localStorage.getItem('streak') || '0');
  
  if (lastVisit !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastVisit === yesterday.toDateString()) {
      streak++;
    } else if (lastVisit) {
      streak = 1;
    } else {
      streak = 1;
    }
    
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastVisit', today);
  }
  
  const el = document.getElementById('streak');
  if (el && streak > 0) {
    el.textContent = `${streak} day streak 🔥`;
  }
}

function getProgress() {
  let count = 0;
  for (let i = 1; i <= 25; i++) {
    if (localStorage.getItem(`lesson-${i}-complete`) === 'true') {
      count++;
    }
  }
  return count;
}

function initCommandPalette() {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const modal = document.getElementById('cmdk');
      if (modal) modal.classList.toggle('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateStreak();
  initCommandPalette();
});
