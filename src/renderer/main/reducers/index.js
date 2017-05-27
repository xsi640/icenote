import NotebookModalReducer from './notebookmodalreducer'
import NoteMoveModalReducer from './notemovemodalreducer'
import MainReducer from './mainreducer'
import NoteReducer from './notereducer'
import {combineReducers} from 'redux'

export default combineReducers({
    NotebookModalReducer,
    NoteMoveModalReducer,
    MainReducer,
    NoteReducer,
})