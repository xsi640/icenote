import IPCMESSAGE from '../../../constipc'
const {ipcRenderer} = require('electron')
import {ACTION_MESSAGE} from './constaction'

export const getNotebookList = () => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.NOTEBOOK_LIST, (event, args) => {
            if (typeof args.error === 'undefined') {
                dispatch({
                    type: ACTION_MESSAGE.NOTEBOOK_LIST,
                    payload: args.data,
                })
            } else {
                dispatch({
                    type: ACTION_MESSAGE.NOTEBOOK_LIST,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.NOTEBOOK_LIST)
    }
}

export const deleteNotebookList = (id) => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.NOTEBOOK_DELETE, (event, args) => {
            if (typeof args.error === 'undefined') {
                ipcRenderer.once(IPCMESSAGE.NOTEBOOK_LIST, (event, args) => {
                    if (typeof args.error === 'undefined') {
                        dispatch({
                            type: ACTION_MESSAGE.NOTEBOOK_LIST,
                            payload: args.data,
                        })
                    } else {
                        dispatch({
                            type: ACTION_MESSAGE.NOTEBOOK_LIST,
                            error: args.error,
                        })
                    }
                })
                ipcRenderer.send(IPCMESSAGE.NOTEBOOK_LIST)
            } else {
                dispatch({
                    type: ACTION_MESSAGE.NOTEBOOK_DELETE,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.NOTEBOOK_DELETE, id);
    }
}