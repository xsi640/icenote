import NotebookModalReducer from './notebookmodalreducer'
import NoteMoveModalReducer from './notemovemodalreducer'
import MainReducer from './mainreducer'
import NoteReducer from './notereducer'
import TagsReducer from './tagsreducer'
import {combineReducers} from 'redux'

export default combineReducers({
    NotebookModalReducer,
    NoteMoveModalReducer,
    MainReducer,
    NoteReducer,
    TagsReducer,
})