import React, {Component} from 'react'
import {connect} from 'react-redux'
import SplitPane from 'react-split-pane'
import NoteTreeView from '../components/notetreeview'
import Tags from '../components/tags'
import Note from './note'
import {Button, Modal} from "antd";
import NotebookModal from '../components/notebookmodal'
import * as MainActions from '../actions/mainactions'
import _ from 'underscore'
import './main.scss'
import './splitpane.scss'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }

        this.handleAddNotebook = this.handleAddNotebook.bind(this);
        this.handleModifyNotebook = this.handleModifyNotebook.bind(this);
        this.handleDeleteNotebook = this.handleDeleteNotebook.bind(this);
        this.handleSelectNotebook = this.handleSelectNotebook.bind(this);
        this.handleNotebookSaved = this.handleNotebookSaved.bind(this);
        this.handleNoteSaved = this.handleNoteSaved.bind(this);
        this.handleSelectTag = this.handleSelectTag.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
    }

    componentDidMount() {
        this.props.getNotebookList();
    }

    handleAddNotebook(e, data) {
        this.refs.notebookModal.getWrappedInstance().show(data, null);
    }

    handleModifyNotebook(e, data) {
        this.refs.notebookModal.getWrappedInstance().show(null, data);
    }

    handleDeleteNotebook(e, data) {
        let {deleteNotebookList} = this.props;
        Modal.confirm({
            title: 'delete "' + data.title + '" notebook?',
            content: 'you can\'t undo the action.',
            onOk() {
                deleteNotebookList(data._id);
            },
            onCancel() {
            },
        });
    }

    handleSelectNotebook(keys, notebook) {
        if (notebook != null) {
            this.refs.note.getWrappedInstance().setNotebook(notebook);
        }
        this.refs.tags.getWrappedInstance().setSelectedIndex(-1);
    }

    handleSelectTag(e, tag) {
        if (tag != null) {
            this.refs.note.getWrappedInstance().setTag(tag.text);
        }
        this.refs.noteTreeView.clearSelected();
    }

    handleNotebookSaved() {
        this.props.getNotebookList();
    }

    handleNoteSaved() {
        this.refs.tags.getWrappedInstance().refresh();
    }

    render() {
        return (
            <div>
                <SplitPane split="vertical" minSize={200} defaultSize={220} maxSize={-800}>
                    <SplitPane split="horizontal" minSize={300} defaultSize={400} maxSize={-200} className="left">
                        <div className="notebook">
                            <div className="title unselect">
                                My Notebook
                                <Button shape="circle" onClick={(e) => {
                                    this.refs.notebookModal.getWrappedInstance().show(null, null)
                                }}>Add</Button>
                            </div>
                            <div className="notebook-root">
                                <NoteTreeView ref="noteTreeView" dataSource={this.state.dataSource}
                                              onAddNotebook={this.handleAddNotebook}
                                              onModifyNotebook={this.handleModifyNotebook}
                                              onDeleteNotebook={this.handleDeleteNotebook}
                                              onSelectNotebook={this.handleSelectNotebook}/>
                            </div>
                        </div>
                        <div className="tags">
                            <div className="title unselect">Tags</div>
                            <Tags ref="tags" onSelected={this.handleSelectTag}/>
                        </div>
                    </SplitPane>
                    <div className="content">
                        <Note ref="note" onSaved={this.handleNoteSaved} noteBookDataSource={this.state.dataSource}/>
                    </div>
                </SplitPane>
                <NotebookModal ref="notebookModal" onSave={this.handleNotebookSaved}/>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return state.MainReducer;
}

export default connect(mapStateToProps, MainActions, null, {withRef: true})(Main)