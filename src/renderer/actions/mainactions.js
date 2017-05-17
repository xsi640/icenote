import IPCMESSAGE from '../../constipc'
const {ipcRenderer} = require('electron')
import {ACTION_MESSAGE} from './constaction'

export const getNotebookList = () => {
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
        ipcRenderer.send(IPCMESSAGE.NOTE_LIST)
    }
}

export const deleteNotebookList = (id) => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.NOTE_DELETE, (event, args) => {
            if (typeof args.error === 'undefined') {
                dispatch({
                    type: ACTION_MESSAGE.NOTE_DELETE,
                    payload: args.data,
                })
            } else {
                dispatch({
                    type: ACTION_MESSAGE.NOTE_LIST,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.NOTE_DELETE, id);
    }
}