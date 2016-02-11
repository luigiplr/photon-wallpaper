import app from 'app';
import BrowserWindow from 'browser-window';
import shell from 'shell';
import path from 'path';
import yargs from 'yargs';
import tray from './tray';


const args = yargs(process.argv.slice(1)).wrap(100).argv;
var minimzeInfoShown = false;


app.on('ready', () => {

    const mainWindow = new BrowserWindow({
        minWidth: 930,
        minHeight: 600,
        width: 960,
        height: 650,
        resizable: true,
        backgroundColor: '#202B33',
        title: 'Bing Photon',
        center: true,
        'auto-hide-menu-bar': true,
        frame: true,
        show: false
    });

    const appIcon = tray({
        close: app.quit,
        show: () => {
            mainWindow.show();
            mainWindow.focus();
        }
    });


    if (args.dev) {
        mainWindow.show();
        mainWindow.toggleDevTools();
        mainWindow.focus();
        console.info('Dev Mode Active: Developer Tools Enabled.')
    }


    mainWindow.loadURL(path.normalize('file://' + path.join(__dirname, '../index.html')));

    mainWindow.webContents.on('new-window', event => event.preventDefault());

    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (url.indexOf('build/index.html#') < 0) {
            event.preventDefault();
            shell.openExternal(url);
        }
    });

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('close', app.quit);

    mainWindow.on('minimize', event => {
        event.preventDefault();
        mainWindow.hide();
        if (!minimzeInfoShown) {
            minimzeInfoShown = true;
            appIcon.displayBalloon({
                title: 'Slackie has been minimized to tray',
                content: 'Slackie is still running and can be restored by clicking its tray icon.'
            });
        }
    });

});


app.on('window-all-closed', app.quit);