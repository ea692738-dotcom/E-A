const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "EA Browser",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true
    }
  });

  win.loadFile('index.html');
}

ipcMain.on('win-minimize', () => { if (win) win.minimize(); });
ipcMain.on('win-maximize', () => {
  if (win) {
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
  }
});
ipcMain.on('win-close', () => { if (win) win.close(); });

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});