const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const regIPCMessage = require('./ipcMessage')
const AppContext = require('./appcontext')

let mainWindow, loadingScreen, windowParams = {
    width: 1200,
    height: 600,
    icon: '../../resources/logo.png',
    show: false,
    webPreferences: {
        experimentalFeatures: true
    }
};

function createWindow() {

    regIPCMessage();

    mainWindow = new BrowserWindow(windowParams)
    AppContext.mainWindow = mainWindow;

    console.log(__dirname);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../../public/main.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();

        if (loadingScreen) {
            let loadingScreenBounds = loadingScreen.getBounds();
            mainWindow.setBounds(loadingScreenBounds);
            loadingScreen.close();
        }
    });

    if (process.env.NODE_ENV === `development`) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    require('./menu');
}

function createLoadingScreen() {
    loadingScreen = new BrowserWindow(Object.assign(windowParams, {parent: mainWindow}));
    loadingScreen.loadURL(url.format({
        pathname: path.join(__dirname, '../../public/loading.html'),
        protocol: 'file:',
        slashes: true
    }))
    loadingScreen.on('closed', () => loadingScreen = null);
    loadingScreen.webContents.on('did-finish-load', () => {
        loadingScreen.show();
    });
}

app.on('ready', () => {
    createLoadingScreen();
    createWindow();
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