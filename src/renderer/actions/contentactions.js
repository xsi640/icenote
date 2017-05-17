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