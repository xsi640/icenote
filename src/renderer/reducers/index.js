import NoteBookModalReducer from './notebookmodalreducer'
import MainReducer from './mainreducer'
import {combineReducers} from 'redux'

export default combineReducers({
    MainReducer,
    NoteBookModalReducer,
})