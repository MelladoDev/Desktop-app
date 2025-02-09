const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

let isDragging = false;
let startX = 0, startY = 0;

document.addEventListener("mousedown", (event) => {
  
  if (event.target.closest("button")) return

  isDragging = true;
  startX = event.screenX;
  startY = event.screenY;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const deltaX = event.screenX - startX;
    const deltaY = event.screenY - startY;
    ipcRenderer.send("move-window", deltaX, deltaY);
    startX = event.screenX;
    startY = event.screenY;
  }
});

// Asegúrate de que los botones existan antes de agregar los event listeners
const minimizeButton = document.getElementById("minimizeBtn");
const closeButton = document.getElementById("closeBtn");

// Si los botones existen, añadirles los eventos
if (minimizeButton) {
  minimizeButton.addEventListener("click", (event) => {
    event.stopPropagation();  // Prevenir que el clic también mueva la ventana
    ipcRenderer.send("minimize-window");
  });
}

if (closeButton) {
  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();  // Prevenir que el clic también mueva la ventana
    ipcRenderer.send("close-window");
  });
}
