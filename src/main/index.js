'use strict'
import path from 'path'

import { app, BrowserWindow, ipcMain, screen, Menu, Tray } from 'electron'
import { download } from 'electron-dl'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

/*

主窗口

 */

let mainWindow
const mainWindowUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 680,
    minHeight: 680,
    width: 1100,
    minWidth: 1100,
    useContentSize: true,
    frame: false,
    show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      devTools: process.env.NODE_ENV === 'development'
    }
  })

  mainWindow.loadURL(mainWindowUrl)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipcMain.on('download', (event, info) => {
    info.properties.onProgress = progress => {
      mainWindow.webContents.send('download progress', {
        progress: parseInt((progress * 100).toFixed(2)),
        uuid: info.properties.uuid
      })
    }
    download(mainWindow, info.url, info.properties)
      .then(dl => {
        mainWindow.webContents.send('download complete', {
          savePath: dl.getSavePath(),
          uuid: info.properties.uuid
        })
      })
  })
}

/*

悬浮窗窗口

 */
let suspensionWindow
const suspensionWindowUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/suspension`
  : `file://${__dirname}/index.html/#/suspension`

function createSuspensionWindow () {
  suspensionWindow = new BrowserWindow({
    width: 107,
    height: 27,
    type: 'toolbar',
    frame: false,
    resizable: false,
    show: false,
    webPreferences: {
      devTools: process.env.NODE_ENV === 'development'
    },
    transparent: true,
    alwaysOnTop: true
  })
  const size = screen.getPrimaryDisplay().workAreaSize
  const winSize = suspensionWindow.getSize()

  suspensionWindow.setPosition(size.width - winSize[0] - 100, 100)
  suspensionWindow.loadURL(suspensionWindowUrl)

  suspensionWindow.once('ready-to-show', () => {
    suspensionWindow.show()
  })

  suspensionWindow.on('close', () => {
    suspensionWindow = null
  })
  suspensionWindow.webContents.openDevTools()
}

/*

托盘图标

 */
let tray = null

function createTray () {
  tray = new Tray(path.join(__static, 'cloud.png'))
  const contextMenu = Menu
    .buildFromTemplate([
      {
        label: '设置',
        click: () => {
          mainWindow.show()
          mainWindow.webContents.send('to', '/s')
        }
      },
      {
        label: '显示悬浮窗',
        type: 'checkbox',
        checked: true,
        click: (menuItem) => {
          menuItem.checked ? suspensionWindow.show() : suspensionWindow.hide()
        }
      }, { type: 'separator' },
      {
        label: '退出应用',
        click: () => {
          app.quit()
        }
      }
    ])
  tray.setToolTip('云存储客户端')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    console.log(mainWindow.isVisible)
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
}

app.on('ready', () => {
  createWindow()
  createSuspensionWindow()
  createTray()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
