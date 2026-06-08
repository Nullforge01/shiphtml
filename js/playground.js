// SHIPhtml Playground Logic
// Handles live preview, auto-save, tab switching, download

document.addEventListener('DOMContentLoaded', () => {
  const htmlEditor = document.getElementById('html-editor');
  const cssEditor = document.getElementById('css-editor');
  const jsEditor = document.getElementById('js-editor');
  const preview = document.getElementById('preview');
  const runBtn = document.getElementById('runBtn');
  const saveBtn = document.getElementById('saveBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const resetBtn = document.getElementById('resetBtn');
  const tabs = document.querySelectorAll('.tab');
  const editors = document.querySelectorAll('.editor');

  // Default starter code
  const defaultHTML = `<!-- HTML -->
<div class="app">
  <h1>Hello SHIPhtml</h1>
  <p id="text">Edit me and hit Run</p>
  <button id="btn">Click me</button>
</div>`;

  const defaultCSS = `/* CSS */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.app {
  background: white;
  padding: 40px;
  border-radius: 16px;
  border: 2px solid #E2E8F0;
  text-align: center;
}

h1 {
  margin: 0 0 16px;
  color: #2563EB;
}

#btn {
  background: #2563EB;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
}

#btn:active {
  transform: scale(0.95);
}`;

  const defaultJS = `// JavaScript
const btn = document.getElementById('btn');
const text = document.getElementById('text');
let count = 0;

btn.onclick = () => {
  count++;
  text.textContent = 'Clicked ' + count + ' times';
  console.log('Button clicked', count);
};`;

  // Load saved code or defaults
  function loadCode() {
    htmlEditor.value = localStorage.getItem('playground-html') || defaultHTML;
    cssEditor.value = localStorage.getItem('playground-css') || defaultCSS;
    jsEditor.value = localStorage.getItem('playground-js') || defaultJS;
  }

  // Save to localStorage
  function saveCode() {
    localStorage.setItem('playground-html', htmlEditor.value);
    localStorage.setItem('playground-css', cssEditor.value);
    localStorage.setItem('playground-js', jsEditor.value);

    // Visual feedback
    saveBtn.textContent = 'Saved ✓';
    setTimeout(() => saveBtn.textContent = 'Save', 1000);
  }

  // Combine and render
  function runCode() {
    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;

    const output = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;

    preview.srcdoc = output;
  }

  // Download as single HTML file
  function downloadCode() {
    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;

    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SHIPhtml Export</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
  <script>
${js}
  <\/script>
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shiphtml-export.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Reset to defaults
  function resetCode() {
    if (confirm('Reset all code to defaults? This cannot be undone.')) {
      localStorage.removeItem('playground-html');
      localStorage.removeItem('playground-css');
      localStorage.removeItem('playground-js');
      loadCode();
      runCode();
    }
  }

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show correct editor
      editors.forEach(editor => {
        if (editor.id === target + '-editor') {
          editor.classList.add('active');
        } else {
          editor.classList.remove('active');
        }
      });
    });
  });

  // Auto-save on input with debounce
  let saveTimeout;
  function autoSave() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveCode, 1000);
  }

  htmlEditor.addEventListener('input', autoSave);
  cssEditor.addEventListener('input', autoSave);
  jsEditor.addEventListener('input', autoSave);

  // Button handlers
  runBtn.addEventListener('click', runCode);
  saveBtn.addEventListener('click', saveCode);
  downloadBtn.addEventListener('click', downloadCode);
  resetBtn.addEventListener('click', resetCode);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        e.preventDefault();
        saveCode();
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
    }
  });

  // Init
  loadCode();
  runCode();
});
