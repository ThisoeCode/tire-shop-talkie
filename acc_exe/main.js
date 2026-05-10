const

// import
{ app, BrowserWindow } = require('electron'),
path = require("path"),



// lib
main=_=>{
  const win = new BrowserWindow({
    width: 1260,
    height: 720,
    minWidth: 1080,
    minHeight: 390,
    icon: path.join(__dirname,"/src/favicon.ico"),
    autoHideMenuBar: true,
  })
  win.loadFile('index.html')
}



// dev
require("electron-reload")(__dirname)



// render
app.whenReady().then(main)
