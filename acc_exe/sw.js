const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('sw',{
  notify: _=>ipcRenderer.send("notifych",_)
})