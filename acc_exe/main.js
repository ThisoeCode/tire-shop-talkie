const

TEST = false,

// IMPORT
{ app, BrowserWindow, ipcMain, screen, } = require('electron'),
path = require("path"),

/** @typedef {Electron.BrowserWindowConstructorOptions} winConfig */



// CONFIG
/** @type {winConfig}*/
win = {
  width: 1260,
  height: 540,
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
  width:210,
  height: 120,
  gap: 9,

  frame: false,
  autoHideMenuBar: true,
  // resizable: false,
  minimizable: false,
  maximizable: false,
  alwaysOnTop: true,
  skipTaskbar: true,
  transparent: true,
  hasShadow: true,

  webPreferences:{
    preload: path.join(__dirname,"/popup/bridge.js")
  },
}

let
  /** @type {null|BrowserWindow} */
  $main=null,
  /** @type {null|BrowserWindow} */
  $popup=null,

  lastrow=null,
  unread = 0



const

// MAIN
isPopedup=_=>$popup && !$popup.isDestroyed(),

newNotify=(row,{w,h})=>{
  unread++
  const
    id = row.row,
    dt = new Date(row.dt*1000).toLocaleTimeString('ko'),
    carid=row.carid,
    msg =
      'plain'in row?row.plain[0]
      :('opts'in row?row.opts[0].desc:'')
      ||'cbs' in row?row.cbs[0]
      :'',
    data={id,dt,carid,msg},
    showNotify=_=>{
      $popup.webContents.send("notify-update",{unread,data})
      $popup.showInactive()
    }
  TEST&&console.dir(data)

  // popup window exists
  if(isPopedup()){
    showNotify()
    return
  }
  // open new popup
  $popup = new BrowserWindow({
    x: popup.gap,
    y: (h - popup.height - popup.gap),
    ...popup
  })
  $popup.loadFile('popup/index.html')
  $popup.once('ready-to-show',showNotify)
},

closePopup=_=>{
  if(isPopedup()){
    $popup.close()
    $popup =null
    lastrow=null
    unread = 0
  }
},

openNotify=(e,rid)=>{
  closePopup()
  if($main && !$main.isDestroyed()){
    $main.isMinimized() && $main.restore()
    $main.show()
    $main.focus()
  }
}

TEST&&require("electron-reload")(__dirname)



// RENDER
app.whenReady().then(_=>{
  // init
  $main = new BrowserWindow(win)
  TEST&&$main.webContents.openDevTools()
  $main.loadFile('index.html')

  const
    pd=screen.getPrimaryDisplay(),
    Wwa=pd.workArea.width,
    Wx=pd.workArea.X,
    Hwa=pd.workArea.height,
    Hy=pd.workArea.y

  // ipc
  ipcMain.on("notifych",(e,row)=>
    newNotify(row,{w:Wwa+Wx,h:Hwa+Hy})
  )
  ipcMain.on("popupClose",closePopup)
  ipcMain.on("popupClick",openNotify)

  // listen
  $main.on("closed",_=>app.quit())
})
