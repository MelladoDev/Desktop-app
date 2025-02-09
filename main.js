const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main')
const path = require('node:path')

let mainWindow

function createWindow ()  {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    alwaysOnTop: true, // Mantiene la ventana en primer plano
    frame: false, // Si quieres que tenga barra de título
    webPreferences: {
      contexIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
  ipcMain.handle('get-window', () => mainWindow);

  mainWindow.on('close', () => {
    mainWindow = null
  });
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


// Cambiar el tema
ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})


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