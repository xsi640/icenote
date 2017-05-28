import IPCMESSAGE from '../../../constipc'
const {ipcRenderer} = require('electron')
import {ACTION_MESSAGE} from './constaction'

export const deleteNotebookList = (id, callback) => {
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.NOTEBOOK_DELETE, (event, args) => {
            if (typeof args.error === 'undefined') {
                //删除成功
                callback(id);
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