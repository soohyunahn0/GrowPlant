const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveGameData: (gameData) => ipcRenderer.invoke('save-game-data', gameData),
  loadGameData: () => ipcRenderer.invoke('load-game-data'),
  
  platform: process.platform,
  version: process.versions.electron
});