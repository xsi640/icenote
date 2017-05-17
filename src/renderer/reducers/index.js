import NotebookModalReducer from './notebookmodalreducer'
import MainReducer from './mainreducer'
import ContentReducer from './contentreducer'
import {combineReducers} from 'redux'

export default combineReducers({
    NotebookModalReducer,
    MainReducer,
    ContentReducer,
})