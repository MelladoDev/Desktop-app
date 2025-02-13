document.getElementById('close-btn').addEventListener('click', () => {
  window.electronAPI.closeWindow(); // Llama a la función expuesta en preload.js
});

document.getElementById('minimizeBtn').addEventListener('click', () => {
  window.electronAPI.minimizeWindow(); // Llama a la función expuesta en preload.js
});

