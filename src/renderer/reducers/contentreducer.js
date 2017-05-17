import {ACTION_MESSAGE} from '../actions/constaction';

export default function (state = {}, action) {
    switch (action.type) {
        case ACTION_MESSAGE.CONTENT_LIST:
            if (typeof action.payload !== 'undefined')
                return {...state, contentDataSource: action.payload, deleteNum: undefined};
            else if (typeof action.error !== 'undefined')
                return {...state, error: action.error, deleteNum: undefined}
        case ACTION_MESSAGE.CONTENT_DELETE:
            if (typeof action.payload !== 'undefined')
                return {...state, deleteNum: action.payload};
            else if (typeof action.error !== 'undefined')
                return {...state, error: action.error}
        case ACTION_MESSAGE.CONTENT_SAVE:
            if (typeof action.payload !== 'undefined')
                return {...state, content: action.payload};
            else if (typeof action.error !== 'undefined')
                return {...state, error: action.error}
        default:
            return state;
    }
}