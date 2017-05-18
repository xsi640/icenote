import {ACTION_MESSAGE} from '../actions/constaction';

export default function (state = {}, action) {
    switch (action.type) {
        case ACTION_MESSAGE.NOTE_LIST:
            if (typeof action.payload !== 'undefined')
                return {...state, dataSource: action.payload, deleteNum: undefined, note: null};
            else if (typeof action.error !== 'undefined')
                return {...state, error: action.error, deleteNum: undefined, note: null}
        case ACTION_MESSAGE.NOTE_DELETE:
            if (typeof action.payload !== 'undefined')
                return {...state, deleteNum: action.payload, note: null};
            else if (typeof action.error !== 'undefined')
                return {...state, error: action.error, note: null}
        case ACTION_MESSAGE.NOTE_SAVE:
            if (typeof action.payload !== 'undefined')
                return {...state, deleteNum: undefined, note: action.payload};
            else if (typeof action.error !== 'undefined')
                return {...state, deleteNum: undefined, error: action.error}
        case ACTION_MESSAGE.TAG_LIST:
            if (typeof action.payload !== 'undefined')
                return {...state, deleteNum: undefined, note: null, tags: action.payload};
            else if (typeof action.error !== 'undefined')
                return {...state, deleteNum: undefined, error: action.error}
        default:
            return state;
    }
}