import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as NoteActions from '../actions/noteactions'
import NoteList from '../components/notelist'
import Editor from '../components/editor'
import {Button, Input, Modal} from 'antd'
import SplitPane from 'react-split-pane'
import NoteMoveModal from '../components/notemovemodal'
const Search = Input.Search;
import './note.scss'

class Note extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            mask: true,
        }

        this.setNotebook = this.setNotebook.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.handleSelectChanged = this.handleSelectChanged.bind(this);
        this.handleClickNoteMenu = this.handleClickNoteMenu.bind(this);
        this.handleNoteSave = this.handleNoteSave.bind(this);
        this.handleMoveModalSaved = this.handleMoveModalSaved.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    handleSelectChanged(e, note) {
        if (note == null)
            return;
        this._note = note;
        this.refs.editor.setNote(note);
    }

    handleNoteSave(note) {
        this._note = note;
        this._note.lastUpdateTime = new Date();
        this.props.save(note, () => {
            this.props.list(this._notebook._id);
        });
    }

    handleClickNoteMenu(e, cmd, items) {
        let {deleteNote, list} = this.props;
        let notebookId = this._notebook._id;
        if (cmd === 'delete') {
            Modal.confirm({
                title: 'delete selected notes?',
                content: 'you can\'t undo the action.',
                onOk() {
                    let ids = [];
                    for (let item of items)
                        ids.push(item._id)
                    deleteNote(ids, () => {
                        list(notebookId)
                    });
                },
                onCancel() {
                },
            });
        } else if (cmd === 'move') {
            this.refs.noteMoveModal.getWrappedInstance().show(items[0]);
        }
    }

    handleMoveModalSaved() {
        this.props.list(this._notebook._id);
    }

    handleNewNote() {
        this.props.save({
            title: '',
            content: '',
            type: 'markdown',
            createTime: new Date(),
            lastUpdateTime: new Date(),
            tags: [],
            notebookId: this._notebook._id,
        }, () => {
            this.props.list(this._notebook._id);
        });
    }

    setNotebook(notebook) {
        this._notebook = notebook;
        this.setState({title: this._notebook.title, mask: false})
        this.props.list(this._notebook._id)
    }

    render() {
        return (
            <SplitPane split="vertical" minSize={270} defaultSize={300} maxSize={-300}>
                <div className="nb_list">
                    {this.state.mask ? <div className="mask"></div> : null}
                    <div className="top">
                        <div className="nb_left">
                            <Button shape="circle" icon="file-add"></Button>
                        </div>
                        <div className="title unselect">
                            {this.state.title}
                        </div>
                        <div className="right">
                            <Button shape="circle" icon="edit" onClick={this.handleNewNote}></Button>
                        </div>
                        <div className="search">
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                            />
                        </div>
                    </div>
                    <div className="list">
                        <NoteList ref="noteList" onClickMenu={this.handleClickNoteMenu}
                                  dataSource={this.props.dataSource}
                                  onSelect={this.handleSelectChanged}/>
                    </div>
                    <NoteMoveModal ref="noteMoveModal" dataSource={this.props.noteBookDataSource}
                                   onClose={this.handleMoveModalSaved}/>
                </div>
                <div className="nb_content">
                    <Editor ref="editor" onSave={this.handleNoteSave}/>
                </div>
            </SplitPane>
        );
    }
}

Note.PropTypes = {
    setNotebook: PropTypes.func
}


const mapStateToProps = (state) => {
    return state.NoteReducer;
}

export default connect(mapStateToProps, NoteActions, null, {withRef: true})(Note)