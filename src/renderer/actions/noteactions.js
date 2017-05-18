import IPCMESSAGE from '../../constipc'
const {ipcRenderer} = require('electron')
import {ACTION_MESSAGE} from './constaction'

export const save = (content) => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.NOTE_SAVE, (event, args) => {
            if (typeof args.error === 'undefined') {
                dispatch({
                    type: ACTION_MESSAGE.NOTE_SAVE,
                    payload: args.data,
                })
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

export const list = (notebookId) => {
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
        ipcRenderer.send(IPCMESSAGE.NOTE_LIST, {notebookId: notebookId})
    }
}

export const deleteNote = (ids) => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.NOTE_DELETE, (event, args) => {
            if (typeof args.error === 'undefined') {
                dispatch({
                    type: ACTION_MESSAGE.NOTE_DELETE,
                    payload: args.data,
                })
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

export const tags = () => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.TAGS_LIST, (event, args) => {
            if (typeof args.error === 'undefined') {
                dispatch({
                    type: ACTION_MESSAGE.TAG_LIST,
                    payload: args.data,
                })
            } else {
                dispatch({
                    type: ACTION_MESSAGE.TAG_LIST,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.TAGS_LIST);
    }
}