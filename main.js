const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    title: 'Grow Your Plant!',
    icon: path.join(__dirname, 'assets/icon.png'),
    resizable: true,
    minWidth: 600,
    minHeight: 500
  });

  mainWindow.loadFile('index.html');

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for game state
ipcMain.handle('save-game-data', async (event, gameData) => {
  // In a real app, you'd save to a file or database
  console.log('Saving game data:', gameData);
  return { success: true };
});

ipcMain.handle('load-game-data', async () => {
  // In a real app, you'd load from a file or database
  console.log('Loading game data');
  return {
    plantType: 'sunflower',
    waterLevel: 100,
    happiness: 80,
    potDecoration: 'none',
    lastWatered: Date.now()
  };
});