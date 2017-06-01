const {app, Menu} = require('electron')
const {version} = require('./version')
const {ipcMain} = require('electron')
const AppContext = require('./appcontext')
const IPCMESSAGE = require('../constipc')

let template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Note',
                    accelerator: 'CmdOrCtrl+N',
                    click:function () {
                        AppContext.mainWindow.webContents.send(IPCMESSAGE.MENU_NOTE_NEW)
                    }
                }, {
                    label: 'Save Note',
                    accelerator: 'CmdOrCtrl+S',
                    click:function () {
                        AppContext.mainWindow.webContents.send(IPCMESSAGE.MENU_NOTE_SAVE)
                    }
                }, {
                    type: 'separator'
                }, {
                    label: 'Export',
                    submenu: [{
                        label: 'All Notes',
                        role: 'export_notes'
                    }]
                }, {
                    type: 'separator'
                }, {
                    label: 'Quit',
                    role: 'quit'
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                }, {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo'
                }, {
                    type: 'separator'
                }, {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut'
                }, {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                }, {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                }, {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    click:function (item, focusedWindow) {
                        AppContext.mainWindow.webContents.send(IPCMESSAGE.MENU_SELECT_ALL)
                    }
                },
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.reload();
                    }
                }, {
                    label: 'Toggle Developer Tools',
                    accelerator: (function () {
                        if (process.platform == 'darwin')
                            return 'Alt+Command+I';
                        else
                            return 'Ctrl+Shift+I';
                    })(),
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.toggleDevTools();
                    }
                },
            ]
        },
        {
            label: 'Window',
            role: 'window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                }, {
                    label: 'Toggle Full Screen',
                    accelerator: (function () {
                        if (process.platform == 'darwin')
                            return 'Ctrl+Command+F';
                        else
                            return 'F11';
                    })(),
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                    }
                }]
        },
        {
            label: 'Help',
            role: 'help',
            submenu: [
                {
                    label: 'Version ' + version,
                    enabled: false
                },
                {
                    label: 'Homepage',
                    click: function () {
                        require('electron').shell.openExternal('https://github.com/xsi640/icenote')
                    }
                }
                ,
            ]
        },
    ]
;

if (process.platform == 'darwin') {
    let name = require('electron').app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                label: 'About ' + name,
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                label: 'Services',
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                label: 'Hide ' + name,
                accelerator: 'Command+H',
                role: 'hide'
            },
            {
                label: 'Hide Others',
                accelerator: 'Command+Shift+H',
                role: 'hideothers'
            },
            {
                label: 'Show All',
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function () {
                    app.quit();
                }
            },
        ]
    });
    // Window menu.
    template[3].submenu.push(
        {
            type: 'separator'
        },
        {
            label: 'Bring All to Front',
            role: 'front'
        }
    );
}

menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);