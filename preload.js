const { contextBridge, ipcRenderer } = require('electron/renderer')

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

contextBridge.exposeInMainWorld('electronAPI', {
  closeWindow: () => ipcRenderer.send('close-window'),
  minimizeWindow: () => ipcRenderer.send('minimize-window')
});
