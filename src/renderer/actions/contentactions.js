import IPCMESSAGE from '../../constipc'
const {ipcRenderer} = require('electron')
import {ACTION_MESSAGE} from './constaction'

export const save = (content) => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.CONTENT_SAVE, (event, args) => {
            if (typeof args.error === 'undefined') {
                dispatch({
                    type: ACTION_MESSAGE.CONTENT_SAVE,
                    payload: args.data,
                })
            } else {
                dispatch({
                    type: ACTION_MESSAGE.CONTENT_SAVE,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.CONTENT_SAVE, content)
    }
}

export const list = (notebookId) => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.CONTENT_LIST, (event, args) => {
            if (typeof args.error === 'undefined') {
                dispatch({
                    type: ACTION_MESSAGE.CONTENT_LIST,
                    payload: args.data,
                })
            } else {
                dispatch({
                    type: ACTION_MESSAGE.CONTENT_LIST,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.CONTENT_LIST, {notebookId: notebookId})
    }
}

export const deleteContent = (ids) => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.CONTENT_DELETE, (event, args) => {
            if (typeof args.error === 'undefined') {
                dispatch({
                    type: ACTION_MESSAGE.CONTENT_DELETE,
                    payload: args.data,
                })
            } else {
                dispatch({
                    type: ACTION_MESSAGE.CONTENT_DELETE,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.CONTENT_LIST, ids)
    }
}