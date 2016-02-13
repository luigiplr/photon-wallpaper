import app from 'app'
import BrowserWindow from 'browser-window'
import {
    Menu, Tray
}
from 'electron'
import shell from 'shell'
import path from 'path'
import yargs from 'yargs'

const args = yargs(process.argv.slice(1)).wrap(100).argv
var minimzeInfoShown = false

app.on('ready', () => {

    const minWidth = 900
    const minHeight = 465

    const mainWindow = new BrowserWindow({
        width: minWidth,
        height: 500,
        skipTaskbar: true,
        resizable: true,
        icon: 'images/Bing-logo-blue.png',
        title: 'Photon Wallpaper',
        center: true,
        'auto-hide-menu-bar': true,
        frame: true,
        show: false,
        minWidth,
        minHeight
    })

    if (args.dev) {
        mainWindow.show()
        mainWindow.toggleDevTools()
        mainWindow.focus()
        console.info('Dev Mode Active: Developer Tools Enabled.')
    }

    const appIcon = new Tray(path.join(__dirname, '../images/Bing-logo-blue.png'))

    appIcon.on('click', () => mainWindow.isMinimized() ? mainWindow.restore() : mainWindow.minimize())
    appIcon.setToolTip('Photon Wallpaper')

    appIcon.setContextMenu(Menu.buildFromTemplate([{
        label: 'Sync Wallpaper',
        click: () => mainWindow.webContents.send('sync_wallpaper')
    }, {
        type: 'separator'
    }, {
        label: 'Exit',
        click: app.quit
    }]))

    mainWindow.loadURL(path.normalize('file://' + path.join(__dirname, '../index.html')))

    mainWindow.webContents.on('new-window', event => event.preventDefault())

    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (!url.includes('build/index.html'))
            event.preventDefault()
    });

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show()
        mainWindow.focus()
    })

    mainWindow.on('close', app.quit)
});


app.on('window-all-closed', app.quit)