import IPCMESSAGE from '../../../constipc'
const {ipcRenderer} = require('electron')
import {ACTION_MESSAGE} from './constaction'

export const save = (content, callback) => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.NOTE_SAVE, (event, args) => {
            if (typeof args.error === 'undefined') {
                callback(args.data);
            } else {
                dispatch({
                    type: ACTION_MESSAGE.NOTE_SAVE,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.NOTE_SAVE, content)
    }
}

export const list = (notebookId, sort, order) => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.NOTE_LIST, (event, args) => {
            if (typeof args.error === 'undefined') {
                dispatch({
                    type: ACTION_MESSAGE.NOTE_LIST,
                    payload: args.data,
                })
            } else {
                dispatch({
                    type: ACTION_MESSAGE.NOTE_LIST,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.NOTE_LIST, {notebookId: notebookId, sort, order})
    }
}

export const listByTag = (tag, sort, order) => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.NOTE_LIST, (event, args) => {
            if (typeof args.error === 'undefined') {
                dispatch({
                    type: ACTION_MESSAGE.NOTE_LIST,
                    payload: args.data,
                })
            } else {
                dispatch({
                    type: ACTION_MESSAGE.NOTE_LIST,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.NOTE_LIST, {tags: tag, sort, order})
    }
}

export const deleteNote = (ids, callback) => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.NOTE_DELETE, (event, args) => {
            if (typeof args.error === 'undefined') {
                callback();
            } else {
                dispatch({
                    type: ACTION_MESSAGE.NOTE_DELETE,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.NOTE_DELETE, ids)
    }
}

export const exportPdf = (id) => {
    return dispatch => {
        ipcRenderer.send(IPCMESSAGE.NOTE_EXPORT_PDF, id)
    }
}

export const exportFile = (id) => {
    return dispatch => {
        ipcRenderer.send(IPCMESSAGE.NOTE_EXPORT_FILE, id)
    }
}