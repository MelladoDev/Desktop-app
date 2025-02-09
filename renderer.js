const { ipcRenderer } = require('electron');

let win;

ipcRenderer.invoke('get-window').then((mainWin) => {
  win = mainWin; // Guardamos la ventana aquí para usarla luego
  console.log(win);
});

document.onreadystatechange = (event) => {
  if (document.readyState === "complete") {
    handleWindowControls();
    document.getElementById('electron-ver').innerHTML = `${process.versions.electron}`;
  }
};

function handleWindowControls() {
  // Asegúrate de que los botones existan antes de asignarles listeners
  const minimizeButton = document.getElementById('minimizeBtn');
  const closeButton = document.getElementById('closeBtn');

  if (minimizeButton && win) {
    minimizeButton.addEventListener("click", () => {
      win.minimize(); // Usar la ventana obtenida a través de IPC
    });
  }

  if (closeButton && win) {
    closeButton.addEventListener("click", () => {
      win.close(); // Usar la ventana obtenida a través de IPC
    });
  }
}

// Limpiar listeners si es necesario
window.onbeforeunload = () => {
  if (win) {
    win.removeAllListeners();
  }
};
