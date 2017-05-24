import {ACTION_MESSAGE} from '../actions/constaction';
import _ from 'underscore'

export default function (state = {dataSource: []}, action) {
    switch (action.type) {
        case ACTION_MESSAGE.NOTE_LIST:
            if (typeof action.payload !== 'undefined')
                return {...state, dataSource: action.payload};
            else if (typeof action.error !== 'undefined')
                return {...state, error: action.error}
        case ACTION_MESSAGE.NOTE_DELETE:
           if (typeof action.error !== 'undefined')
                return {...state, error: action.error}
        case ACTION_MESSAGE.NOTE_SAVE:
            if (typeof action.error !== 'undefined')
                return {...state, deleteNum: undefined, error: action.error}
        default:
            return state;
    }
}