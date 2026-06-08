// SHIPhtml Lesson Grid Logic
// Renders 25 lesson cards, reads localStorage for completion, updates progress

document.addEventListener('DOMContentLoaded', () => {
  const lessonsGrid = document.getElementById('lessons-grid');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const streakEl = document.getElementById('streak');

  // Lesson metadata - matches your 25 files
  const lessons = [
    { id: 1, title: "HTML Boilerplate", time: "8 min", goal: "Write your first HTML file", difficulty: "Easy" },
    { id: 2, title: "Tags & Elements", time: "10 min", goal: "h1, p, div, span, semantic tags", difficulty: "Easy" },
    { id: 3, title: "Links & Images", time: "9 min", goal: "a href, img src, alt text", difficulty: "Easy" },
    { id: 4, title: "Lists & Tables", time: "11 min", goal: "ul, ol, table, thead, tbody", difficulty: "Easy" },
    { id: 5, title: "Forms Intro", time: "12 min", goal: "input, label, button, form", difficulty: "Medium" },
    { id: 6, title: "CSS Intro", time: "10 min", goal: "Selectors, properties, colors", difficulty: "Easy" },
    { id: 7, title: "Box Model", time: "11 min", goal: "margin, padding, border, width", difficulty: "Medium" },
    { id: 8, title: "Typography", time: "9 min", goal: "font-size, weight, line-height", difficulty: "Easy" },
    { id: 9, title: "Colors & Backgrounds", time: "8 min", goal: "hex, rgb, gradients, images", difficulty: "Easy" },
    { id: 10, title: "Display & Position", time: "13 min", goal: "block, inline, flex, absolute", difficulty: "Medium" },
    { id: 11, title: "Flexbox Basics", time: "12 min", goal: "justify-content, align-items", difficulty: "Medium" },
    { id: 12, title: "Flexbox Advanced", time: "10 min", goal: "gap, wrap, grow, shrink", difficulty: "Medium" },
    { id: 13, title: "CSS Grid Intro", time: "12 min", goal: "grid-template-columns, rows", difficulty: "Medium" },
    { id: 14, title: "Grid Areas", time: "11 min", goal: "grid-template-areas, span", difficulty: "Hard" },
    { id: 15, title: "Responsive Units", time: "9 min", goal: "%, rem, em, vw, vh", difficulty: "Medium" },
    { id: 16, title: "Media Queries", time: "10 min", goal: "Mobile-first breakpoints", difficulty: "Medium" },
    { id: 17, title: "Transitions", time: "8 min", goal: "hover, transform, transition", difficulty: "Easy" },
    { id: 18, title: "Animations", time: "10 min", goal: "@keyframes, animation", difficulty: "Hard" },
    { id: 19, title: "CSS Variables", time: "7 min", goal: "--tokens, var(), theming", difficulty: "Medium" },
    { id: 20, title: "JavaScript Intro", time: "12 min", goal: "script, variables, console.log", difficulty: "Medium" },
    { id: 21, title: "Functions", time: "10 min", goal: "function, parameters, return", difficulty: "Medium" },
    { id: 22, title: "Arrays & Loops", time: "10 min", goal: "[], push, forEach, map", difficulty: "Medium" },
    { id: 23, title: "Objects", time: "9 min", goal: "{key: value}, dot notation", difficulty: "Medium" },
    { id: 24, title: "DOM Manipulation", time: "12 min", goal: "querySelector, createElement", difficulty: "Hard" },
    { id: 25, title: "Final Project", time: "20 min", goal: "Notes app with localStorage", difficulty: "Hard" }
  ];

  // Check completion status
  function isCompleted(id) {
    return localStorage.getItem(`lesson-${id}-complete`) === 'true';
  }

  // Calculate streak - consecutive completed lessons from day 1
  function calculateStreak() {
    let streak = 0;
    for (let i = 1; i <= lessons.length; i++) {
      if (isCompleted(i)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  // Update progress UI
  function updateProgress() {
    const completed = lessons.filter(l => isCompleted(l.id)).length;
    const percent = Math.round((completed / lessons.length) * 100);
    
    if (progressBar) progressBar.style.width = percent + '%';
    if (progressText) progressText.textContent = `${percent}% Complete · ${completed}/${lessons.length} lessons`;
    
    const streak = calculateStreak();
    if (streakEl) streakEl.textContent = `🔥 ${streak} day streak`;
  }

  // Render lesson cards
  function renderLessons() {
    if (!lessonsGrid) return;
    
    lessonsGrid.innerHTML = lessons.map(lesson => {
      const completed = isCompleted(lesson.id);
      const locked = lesson.id > 1 && !isCompleted(lesson.id - 1); // unlock next after completing prev
      
      return `
        <a href="${locked ? '#' : 'lessons/lesson-' + lesson.id + '.html'}" 
           class="lesson-card ${completed ? 'completed' : ''} ${locked ? 'locked' : ''}"
           ${locked ? 'onclick="event.preventDefault(); alert(\'Complete Lesson ' + (lesson.id - 1) + ' first!\')"' : ''}>
          <div class="lesson-header">
            <div class="lesson-number">${lesson.id}</div>
            <div class="lesson-status">
              ${completed ? '✓' : locked ? '🔒' : ''}
            </div>
          <h3 class="lesson-title">${lesson.title}</h3>
          <p class="lesson-goal">${lesson.goal}</p>
          <div class="lesson-meta">
            <span class="lesson-time">⏱ ${lesson.time}</span>
            <span class="lesson-diff ${lesson.difficulty.toLowerCase()}">${lesson.difficulty}</span>
          </div>
        </a>
      `;
    }).join('');
  }

  // Add CSS for lesson cards if not in style.css
  const style = document.createElement('style');
  style.textContent = `
    .lesson-card {
      background: var(--surface);
      border: 2px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s;
      display: block;
    }
    .lesson-card:hover:not(.locked) {
      transform: translateY(-4px);
      box-shadow: var(--shadow);
      border-color: var(--primary);
    }
    .lesson-card.completed {
      border-color: var(--secondary);
      background: linear-gradient(135deg, var(--surface) 0%, rgba(16, 185, 129, 0.05) 100%);
    }
    .lesson-card.locked {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .lesson-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .lesson-number {
      width: 32px;
      height: 32px;
      background: var(--primary);
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }
    .lesson-card.completed .lesson-number {
      background: var(--secondary);
    }
    .lesson-status {
      font-size: 20px;
    }
    .lesson-title {
      font-size: 18px;
      margin: 0 0 8px;
      color: var(--text);
    }
    .lesson-goal {
      font-size: 14px;
      color: var(--text-muted);
      margin: 0 0 16px;
      line-height: 1.5;
    }
    .lesson-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
    }
    .lesson-time {
      color: var(--text-muted);
    }
    .lesson-diff {
      padding: 4px 8px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
    }
    .lesson-diff.easy { background: #DBEAFE; color: #1E40AF; }
    .lesson-diff.medium { background: #FEF3C7; color: #92400E; }
    .lesson-diff.hard { background: #FEE2E2; color: #991B1B; }
  `;
  document.head.appendChild(style);

  // Init
  renderLessons();
  updateProgress();
});
