import path from 'path'
import {
    Menu, Tray
}
from 'electron'

const init = mainWindow => {

    let appIcon = new Tray(path.join(__dirname, '../images/Bing-logo-blue.png'))

    appIcon.on('click', () => mainWindow.show())
    appIcon.on('double-click', () => mainWindow.show())

    const contextMenu = Menu.buildFromTemplate([{
        label: 'Show',
        click: () => mainWindow.show()
    }, {
        type: 'separator'
    }, {
        label: 'Exit',
        click: mainWindow.close
    }])
    appIcon.setToolTip('Photon Wallpaper')
    appIcon.setContextMenu(contextMenu)
}

export default init