const {ipcMain} = require('electron')
const log = require('electron-log')
const IPCMESSAGE = require('../constipc')
const NotebookService = require('./service/notebookservice')
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
                log.info(`send msg:${msg} ${JSON.stringify(result)}`);
                event.sender.send(msg, result)
            })
        })
    }

    _reg(IPCMESSAGE.NOTEBOOK_LIST, (event, args, callback) => {
        NotebookService.findAll(callback)
    })

    _reg(IPCMESSAGE.NOTEBOOK_SAVE, (event, args, callback) => {
        NotebookService.insertOrUpdate(args, callback)
    })

    _reg(IPCMESSAGE.NOTEBOOK_DELETE, (event, args, callback) => {
        NotebookService.remove(args, callback)
    })

    _reg(IPCMESSAGE.TAGS_LIST, (event, args, callback) => {
        TagsService.findAll(callback)
    })

    _reg(IPCMESSAGE.NOTE_LIST, (event, args, callback) => {
        if (typeof args.notebookId !== 'undefined')
            NoteService.findNotesByNotebookIdSort(args.notebookId, args.keyword, args.sort, args.order, callback)
        else
            NoteService.findNotesByTagsSort(args.tags, args.keyword, args.sort, args.order, callback)
    })

    _reg(IPCMESSAGE.NOTE_DELETE, (event, args, callback) => {
        NoteService.remove(args, callback)
    })

    _reg(IPCMESSAGE.NOTE_SAVE, (event, args, callback) => {
        NoteService.insertOrUpdate(args, callback)
    })

    _reg(IPCMESSAGE.NOTE_MOVE, (event, args, callback) => {
        NoteService.move(args.ids, args.notebookId, callback)
    })

    _reg(IPCMESSAGE.NOTE_EXPORT_PDF, (event, args, callback) => {
        NoteService.exportToPdf(args);
    })

    _reg(IPCMESSAGE.NOTE_EXPORT_FILE, (event, args, callback) => {
        NoteService.exportToFile(args);
    })
}

module.exports = regIPCMessage