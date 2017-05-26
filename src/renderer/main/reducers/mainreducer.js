import {
    ACTION_MESSAGE
} from '../actions/constaction';

export default function (state = {
    dataSource: []
}, action) {
    switch (action.type) {
        case ACTION_MESSAGE.NOTEBOOK_LIST:
            if (typeof action.payload !== 'undefined')
                return { ...state,
                    dataSource: action.payload
                }
            else if (typeof action.error !== 'undefined')
                return { ...state,
                    error: action.error
                }
            break;
        case ACTION_MESSAGE.NOTEBOOK_DELETE:
            if (typeof action.error !== 'undefined')
                return { ...state,
                    error: action.error
                }
            break;
        default:
            return state;
    }
}