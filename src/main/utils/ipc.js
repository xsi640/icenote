const {ipcMain} = require('electron')
const log = require('electron-log')

const reg = (msg, func) => {
    ipcMain.on(msg, (event, args) => {
        log.info(`receive msg:${msg} args:${JSON.stringify(args)}`);
        func(event, args, (err, data) => {
            if (typeof err === 'undefined' &&
                typeof data === 'undefined') {
                return;
            }
            let result = {
                data,
                err
            }
            log.info(`send msg:${msg} data:${JSON.stringify(result)}`);
            event.sender.send(msg, result)
        })
    })
}

module.exports = {reg};