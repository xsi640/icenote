import NotebookModalReducer from './notebookmodalreducer'
import MainReducer from './mainreducer'
import NoteReducer from './notereducer'
import TagsReducer from './tagsreducer'
import {combineReducers} from 'redux'

export default combineReducers({
    NotebookModalReducer,
    MainReducer,
    NoteReducer,
    TagsReducer,
})