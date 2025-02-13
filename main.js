const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

let mainWindow

function createWindow ()  {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    alwaysOnTop: true, // Mantiene la ventana en primer plano
    frame: false, // Si quieres que tenga barra de título
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true,

    }
  })

  mainWindow.loadFile('index.html');


}

// Mover la ventana
ipcMain.on("move-window", (event, deltaX, deltaY) => {
  if (mainWindow) {
    const bounds = mainWindow.getBounds();
    const factor = 1; // Reducir la velocidad (ajusta este valor según necesites)
    
    mainWindow.setBounds({
      x: bounds.x + deltaX / factor,
      y: bounds.y + deltaY / factor,
      width: bounds.width,
      height: bounds.height
    });
  }
});

ipcMain.on('close-window', () => {
    if (mainWindow) mainWindow.close();
});

ipcMain.on('minimize-window', () => {
    if (mainWindow) mainWindow.minimize();
});



app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})