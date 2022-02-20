const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  handleCpu: (callback) => ipcRenderer.on('cpu', callback),
  handleMem: (callback) => ipcRenderer.on('mem', callback),
  handleTotalMem: (callback) => ipcRenderer.on('total-mem', callback),
});
