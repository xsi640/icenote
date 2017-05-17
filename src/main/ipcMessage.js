const {ipcMain} = require('electron')
const log = require('electron-log')
const IPCMESSAGE = require('../constipc')
const NotebookService = require('./service/notebookservice')
const ContentService = require('./service/contentservice')
const TagsService = require('./service/tagservice')

const regIPCMessage = () => {
    function _reg(msg, func) {
        ipcMain.on(msg, (event, args) => {
            log.info(`receive msg:${msg} args:${JSON.stringify(args)}`);
            func(event, args, (error, data) => {
                if (typeof error === 'undefined' &&
                    typeof data === 'undefined') {
                    return;
                }
                let result = {
                    data,
                    error: typeof error === 'undefined' || error === null ? undefined : error.message,
                }
                log.info(`send msg:${msg} data:${JSON.stringify(result)}`);
                event.sender.send(msg, result)
            })
        })
    };

    _reg(IPCMESSAGE.NOTE_LIST, (event, args, callback) => {
        NotebookService.findAll(callback)
    })

    _reg(IPCMESSAGE.NOTE_SAVE, (event, args, callback) => {
        NotebookService.insertOrUpdate(args, callback)
    })

    _reg(IPCMESSAGE.NOTE_DELETE, (event, args, callback) => {
        NotebookService.remove(args, callback)
    })

    _reg(IPCMESSAGE.TAGS_SAVE, (event, args, callback) => {
        TagsService.insertOrUpdate(args, callback)
    })

    _reg(IPCMESSAGE.TAGS_DELETE, (event, args, callback) => {
        TagsService.remove(args, callback)
    })

    _reg(IPCMESSAGE.CONTENT_LIST, (event, args, callback) => {
        if (typeof args.notebookId !== 'undefined')
            ContentService.findNotesByNotebookId(args.notebookId, callback)
        else
            ContentService.findNotesByTags(args.tags, callback)
    })

    _reg(IPCMESSAGE.CONTENT_DELETE, (event, args, callback) => {
        ContentService.remove(args, callback)
    })

    _reg(IPCMESSAGE.CONTENT_SAVE, (event, args, callback) => {
        ContentService.insertOrUpdate(args, callback)
    })
}

module.exports = regIPCMessage