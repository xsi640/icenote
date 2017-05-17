import React, {Component} from 'react'
import {connect} from 'react-redux'
import SplitPane from 'react-split-pane'
import NoteTreeView from '../components/notetreeview'
import Tags from '../components/tags'
import './main.scss'
import './splitpane.scss'
import 'antd/dist/antd.css';
import NoteContent from './notecontent'
import {Button, Modal} from "antd";
import NoteBookModal from '../components/notebookmodal'
import * as MainActions from '../actions/mainactions'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notbookDataSource: []
        }

        this.onAddNoteBook = this.onAddNoteBook.bind(this);
        this.onModifyNoteBook = this.onModifyNoteBook.bind(this);
        this.onDeleteNoteBook = this.onDeleteNoteBook.bind(this);
        this.noteBookModalClose = this.noteBookModalClose.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (typeof nextProps.deleteNum === 'number' && nextProps.deleteNum > 0) {
            this.props.getNoteBookList();
        }
    }

    componentDidMount() {
        this.props.getNoteBookList();
    }

    onAddNoteBook(e, data) {
        this.refs.noteBookModal.getWrappedInstance().show(data, null);
    }

    onModifyNoteBook(e, data) {
        this.refs.noteBookModal.getWrappedInstance().show(null, data);
    }

    onDeleteNoteBook(e, data) {
        let {deleteNoteBookList} = this.props;
        Modal.confirm({
            title: 'delete "' + data.title + '" notebook?',
            content: 'you can\'t undo the action.',
            onOk() {
                deleteNoteBookList(data._id);
            },
            onCancel() {
            },
        });
    }

    onSelectNotebook(key, sender) {
        console.log('onSelectNotebook', key, sender);
    }

    noteBookModalOk() {

    }

    noteBookModalClose() {
        this.props.getNoteBookList();
    }

    render() {
        return (
            <div>
                <SplitPane split="vertical" minSize={200} defaultSize={220} maxSize={-800}>
                    <div className="left">
                        <SplitPane split="horizontal" minSize={300} defaultSize={400} maxSize={-200}>
                            <div className="notebook">
                                <div className="title unselect">
                                    My Notebook
                                    <Button shape="circle" icon="file-add" onClick={(e) => {
                                        this.refs.noteBookModal.getWrappedInstance().show(null, null)
                                    }}/>
                                </div>
                                <div className="notebook-root">
                                    <NoteTreeView dataSource={this.state.notbookDataSource}
                                                  onAddNoteBook={this.onAddNoteBook}
                                                  onModifyNoteBook={this.onModifyNoteBook}
                                                  onDeleteNoteBook={this.onDeleteNoteBook}
                                                  onSelectNoteBook={this.onSelectNotebook}/>
                                </div>
                            </div>
                            <div className="tags">
                                <div className="title unselect">Tags</div>
                                <Tags/>
                            </div>
                        </SplitPane>

                    </div>
                    <div className="content">
                        <NoteContent/>
                    </div>
                </SplitPane>
                <NoteBookModal ref="noteBookModal" onOK={this.noteBookModalOk} onClose={this.noteBookModalClose}/>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return state.MainReducer;
}

export default connect(mapStateToProps, MainActions, null, {withRef: true})(Main)