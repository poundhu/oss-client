'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import { download } from 'electron-dl'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
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
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(winURL)

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

  mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

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
