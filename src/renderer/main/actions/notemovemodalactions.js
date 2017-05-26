import IPCMESSAGE from '../../../constipc'
const {ipcRenderer} = require('electron')
import {ACTION_MESSAGE} from './constaction'
import _ from 'underscore'

export const move = (notes, notebookId) => {
    let ids = [];
    for (let note of notes)
        ids.push(note._id);
    return dispatch => {
        ipcRenderer.once(IPCMESSAGE.NOTE_MOVE, (event, args) => {
            if (typeof args.error === 'undefined') {
                dispatch({
                    type: ACTION_MESSAGE.NOTE_MOVE,
                    payload: args.data,
                })
            } else {
                dispatch({
                    type: ACTION_MESSAGE.NOTE_MOVE,
                    error: args.error,
                })
            }
        })
        ipcRenderer.send(IPCMESSAGE.NOTE_MOVE, {ids, notebookId})
    }
}