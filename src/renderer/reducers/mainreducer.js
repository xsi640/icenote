import {ACTION_MESSAGE} from '../actions/constaction';

export default function (state = {}, action) {
    switch (action.type) {
        case ACTION_MESSAGE.NOTE_LIST:
            if (typeof action.payload !== 'undefined')
                return {...state, notbookDataSource: action.payload, deleteNum: undefined};
            else if (typeof action.error !== 'undefined')
                return {...state, error: action.error, deleteNum: undefined}
        case ACTION_MESSAGE.NOTE_DELETE:
            if (typeof action.payload !== 'undefined')
                return {...state, deleteNum: action.payload};
            else if (typeof action.error !== 'undefined')
                return {...state, error: action.error}
            break;
        default:
            return state;
    }
}