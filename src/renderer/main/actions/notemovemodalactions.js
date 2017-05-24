import IPCMESSAGE from '../../../constipc'
const {ipcRenderer} = require('electron')
import {ACTION_MESSAGE} from './constaction'
import _ from 'underscore'

export const move = (note, notebookId) => {
    let cnote = _.clone(note);
    cnote.notebookId = notebookId;
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
        ipcRenderer.send(IPCMESSAGE.NOTE_SAVE, cnote)
    }
}