import IPCMESSAGE from '../../../constipc'
const {ipcRenderer} = require('electron')
import {ACTION_MESSAGE} from './constaction'

export const list = () => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.TAGS_LIST, (event, args) => {
            if (typeof args.error === 'undefined') {
                dispatch({
                    type: ACTION_MESSAGE.TAGS_LIST,
                    payload: args.data,
                })
            } else {
                dispatch({
                    type: ACTION_MESSAGE.TAGS_LIST,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.TAGS_LIST)
    }
}