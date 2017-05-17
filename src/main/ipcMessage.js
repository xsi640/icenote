const {ipcMain} = require('electron')
const log = require('electron-log')
const IPCMESSAGE = require('../constipc')
const CategoryService = require('./service/categoryservice')
const NoteService = require('./service/noteservice')
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
        CategoryService.findAll(callback)
    })

    _reg(IPCMESSAGE.NOTE_SAVE, (event, args, callback) => {
        CategoryService.insertOrUpdate(args, callback)
    })

    _reg(IPCMESSAGE.NOTE_DELETE, (event, args, callback) => {
        CategoryService.remove(args, callback)
    })

    _reg(IPCMESSAGE.TAGS_SAVE, (event, args, callback) => {
        TagsService.insertOrUpdate(args, callback)
    })

    _reg(IPCMESSAGE.TAGS_DELETE, (event, args, callback) => {
        TagsService.remove(args, callback)
    })

    _reg(IPCMESSAGE.NOTE_CONTENT_LIST, (event, args, callback) => {
        NoteService.findNotesByCategoryId(args.categoryId, callback)
    })

    _reg(IPCMESSAGE.NOTE_CONTENT_DELETE, (event, args, callback) => {
        NoteService.remove(args, callback)
    })

    _reg(IPCMESSAGE.NOTE_CONTENT_SAVE, (event, args, callback) => {
        NoteService.insertOrUpdate(args, callback)
    })
}

module.exports = regIPCMessage