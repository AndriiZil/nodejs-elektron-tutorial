const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendItem: (item) => ipcRenderer.send('item:add', item)
});
