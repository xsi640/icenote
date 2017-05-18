import {ACTION_MESSAGE} from '../actions/constaction';

export default function (state = {}, action) {
    switch (action.type) {
        case ACTION_MESSAGE.NOTEBOOK_SAVE:
            if (typeof action.payload !== 'undefined')
                return {...state, notebook: action.payload};
            else if (typeof action.error !== 'undefined')
                return {...state, error: action.error}
        default:
            return state;
    }
}