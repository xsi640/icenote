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
            readOnly: true,
        }

        this.setNotebook = this.setNotebook.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.handleSelectChanged = this.handleSelectChanged.bind(this);
        this.handleClickNoteMenu = this.handleClickNoteMenu.bind(this);
        this.handleNoteSave = this.handleNoteSave.bind(this);
        this.handleMoveModalSaved = this.handleMoveModalSaved.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource.length === 0) {
            this.refs.editor.clear();
            this.refs.noteList.setSelectedIndex(-1);
        } else {
            let note = nextProps.dataSource[this.refs.noteList.lastSelectedIndex];
            if (typeof note === 'undefined') {
                note = nextProps.dataSource[0]
                this.refs.noteList.setSelectedIndex(0);
            }
            this.refs.editor.setNote(note);
        }
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
            this.load();
        });
    }

    handleClickNoteMenu(e, cmd, data) {
        let {deleteNote, list, listByTag} = this.props;
        let {_notebook, _tag} = this;
        if (cmd === 'delete') {
            let title = '';
            if (data.selectedItems.length > 1) {
                title = 'delete selected notes?'
            } else {
                title = `delete the ${data.selectedItems[0].title === '' ? 'Untitled' : data.selectedItems[0].title } note?`
            }
            Modal.confirm({
                title,
                content: 'you can\'t undo the action.',
                onOk() {
                    let ids = [];
                    for (let item of data.selectedItems)
                        ids.push(item._id)
                    deleteNote(ids, () => {
                        if (_notebook != null) {
                            list(_notebook._id)
                        } else if (_tag != null) {
                            listByTag(_tag);
                        }
                    });
                },
                onCancel() {
                },
            });
        } else if (cmd === 'move') {
            this.refs.noteMoveModal.getWrappedInstance().show(data.selectedItems);
        }
    }

    handleMoveModalSaved() {
        this.load();
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
        }, (newNote) => {
            this.load();
            this.refs.noteList.setSelectedIndex(0);
            this.refs.editor.setNote(newNote);
        });
    }

    load() {
        if (this._notebook != null) {
            this.props.list(this._notebook._id)
        } else if (this._tag != null) {
            this.props.listByTag(this._tag);
        }
    }

    setNotebook(notebook) {
        this._tag = null;
        this._notebook = notebook;
        this.setState({title: this._notebook.title, readOnly: false})
        this.load();
        this.refs.noteList.setSelectedIndex(0);
    }

    setTag(tag) {
        this._tag = tag;
        this._notebook = null;
        this.setState({title: tag, readOnly: false})
        this.load();
        this.refs.noteList.setSelectedIndex(0);
    }

    render() {
        return (
            <SplitPane split="vertical" minSize={270} defaultSize={300} maxSize={-300}>
                <div className="nb_list">
                    {this.state.readOnly ? <div className="mask"></div> : null}
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
                                   onSaved={this.handleMoveModalSaved}/>
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