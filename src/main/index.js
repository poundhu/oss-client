'use strict'
import path from 'path'
import os from 'os'

import {app, BrowserWindow, ipcMain, screen, Menu, MenuItem, Tray, nativeImage} from 'electron'
import {download} from 'electron-dl'

const platform = os.platform()
console.log(platform)

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

function createMainWindow () {
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
  const trayImage = nativeImage.createFromPath(path.join(__static, 'cloud.png'))
  tray = new Tray(trayImage)
  const contextMenu = new Menu()
  const setting = new MenuItem({
    label: '设置',
    click: () => {
      mainWindow.show()
      mainWindow.webContents.send('to', '/s')
    }
  })
  contextMenu.append(setting)
  const suspension = new MenuItem({
    label: '显示悬浮窗',
    type: 'checkbox',
    checked: true,
    click: (menuItem) => {
      menuItem.checked ? suspensionWindow.show() : suspensionWindow.hide()
    }
  })
  platform !== 'darwin' && contextMenu.append(suspension)
  contextMenu.append(new MenuItem({type: 'separator'}))
  const quit = new MenuItem({
    label: '退出应用',
    click: () => {
      app.quit()
    }
  })
  contextMenu.append(quit)
  tray.setToolTip('云存储客户端')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
}

app.on('ready', () => {
  createMainWindow()
  createTray()
  platform !== 'darwin' && createSuspensionWindow()
})

app.on('window-all-closed', () => {
  platform !== 'darwin' && app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
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
