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

        this.onAddNotebook = this.onAddNotebook.bind(this);
        this.onModifyNotebook = this.onModifyNotebook.bind(this);
        this.onDeleteNotebook = this.onDeleteNotebook.bind(this);
        this.onSelectNotebook = this.onSelectNotebook.bind(this);
        this.noteBookModalClose = this.noteBookModalClose.bind(this);
        this.onSaved = this.onSaved.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
    }

    componentDidMount() {
        this.props.getNotebookList();
    }

    onAddNotebook(e, data) {
        this.refs.notebookModal.getWrappedInstance().show(data, null);
    }

    onModifyNotebook(e, data) {
        this.refs.notebookModal.getWrappedInstance().show(null, data);
    }

    onDeleteNotebook(e, data) {
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

    onSelectNotebook(keys, sender) {
        let notebook = _.find(this.state.dataSource, (item)=>{
            return _.contains(keys, item._id);
        })
        if (notebook != null) {
            this.refs.note.getWrappedInstance().setNotebook(notebook);
        }
    }

    noteBookModalClose() {
        this.props.getNotebookList();
    }

    onSaved() {
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
                                <NoteTreeView dataSource={this.state.dataSource}
                                              onAddNotebook={this.onAddNotebook}
                                              onModifyNotebook={this.onModifyNotebook}
                                              onDeleteNotebook={this.onDeleteNotebook}
                                              onSelectNotebook={this.onSelectNotebook}/>
                            </div>
                        </div>
                        <div className="tags">
                            <div className="title unselect">Tags</div>
                            <Tags ref="tags"/>
                        </div>
                    </SplitPane>
                    <div className="content">
                        <Note ref="note" onSaved={this.onSaved} noteBookDataSource={this.state.dataSource}/>
                    </div>
                </SplitPane>
                <NotebookModal ref="notebookModal" onClose={this.noteBookModalClose}/>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return state.MainReducer;
}

export default connect(mapStateToProps, MainActions, null, {withRef: true})(Main)