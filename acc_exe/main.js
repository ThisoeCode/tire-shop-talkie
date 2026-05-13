const

TEST = true,

// IMPORT
{ app, BrowserWindow, ipcMain, screen, } = require('electron'),
path = require("path"),

/** @typedef {Electron.BrowserWindowConstructorOptions} winConfig */



// CONFIG
/** @type {winConfig}*/
window = {
  width: 1260,
  height: 720,
  minWidth: 1110,
  minHeight: 390,
  autoHideMenuBar: true,
  icon: path.join(__dirname,"/src/favicon.ico"),
  webPreferences:{
    preload: path.join(__dirname,"/sw.js")
  },
},

/** @type {winConfig}*/
popup = {
  width:390,
  height: 180,

  frame: false,
  autoHideMenuBar: true,
  resizable: false,
  minimizable: false,
  maximizable: false,
  alwaysOnTop: true,
  skipTaskbar: true,

  transparent: true,
  hasShadow: true,
},

popnotify=(e,row)=>{
  const
    dt = new Date(row.dt*1000).toLocaleTimeString('ko'),
    carid=row.carid,
    msg =
      'plain'in row?row.plain[0]
      :('opts'in row?row.opts[0].desc:'')
      ||'cbs' in row?row.cbs[0]
      :'내역 없음'
  TEST&&console.dir({dt,row,msg})

  /** @todo open popup window */
},



// MAIN
main=_=>{
  // init
  const $main = new BrowserWindow(window)
  TEST&&$main.webContents.openDevTools()
  $main.loadFile('index.html')

  // ipc
  ipcMain.on("notifych",popnotify)
}

TEST&&require("electron-reload")(__dirname)



// RENDER
app.whenReady().then(main)
