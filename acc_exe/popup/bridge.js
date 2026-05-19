const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("popupAPI",{
  onUpdate: callback=>
    ipcRenderer.on("notify-update",
      (_,payload)=>callback(payload)
    ),
  close: _=>ipcRenderer.send("popupClose"),
  bodyClick: _=>ipcRenderer.send("popupClick",_),
})