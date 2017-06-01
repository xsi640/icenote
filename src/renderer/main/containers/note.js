import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as NoteActions from '../actions/noteactions'
import NoteList from '../components/notelist'
import Editor from '../components/editor'
import {Button, Input, Modal, message} from 'antd'
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu"
import SplitPane from 'react-split-pane'
import NoteMoveModal from '../components/notemovemodal'
import AppContext from '../context/appcontext'
const {ipcRenderer} = require('electron')
import IPCMESSAGE from '../../../constipc'
import Guid from '../../../main/utils/guid'
const Search = Input.Search;
import './note.scss'

class Note extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            dataSource: [],
            readOnly: true,
            sort: 'createTime',
            order: 'desc',
            keyword: '',
        }

        this.setNotebook = this.setNotebook.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.handleSelectChanged = this.handleSelectChanged.bind(this);
        this.handleClickNoteMenu = this.handleClickNoteMenu.bind(this);
        this.handleNoteSave = this.handleNoteSave.bind(this);
        this.handleMoveModalSaved = this.handleMoveModalSaved.bind(this);
        this.handleSortMenu = this.handleSortMenu.bind(this);
        this.handleToggleSortMenu = this.handleToggleSortMenu.bind(this);
        this.clear = this.clear.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleMenuNewNote = this.handleMenuNewNote.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (nextProps.dataSource.length === 0) {
            this.refs.editor.clear();
            this.refs.noteList.setSelectedIndex(-1);
        } else {
            if (typeof this._note === 'undefined') {
                this._note = nextProps.dataSource[this.refs.noteList.lastSelectedIndex];
            }
            if (typeof this._note !== 'undefined') {
                let index = _.findIndex(nextProps.dataSource, (item) => {
                    return item._id === this._note._id;
                })
                if (index !== -1) {
                    this.refs.noteList.setSelectedIndex(index);
                    this.refs.editor.setNote(this._note);
                } else {
                    this._note = nextProps.dataSource[0];
                    this.refs.noteList.setSelectedIndex(0);
                    this.refs.editor.setNote(this._note);
                }
            }
        }
    }

    componentDidMount() {
        ipcRenderer.on(IPCMESSAGE.MENU_NOTE_NEW, this.handleMenuNewNote)
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(IPCMESSAGE.MENU_NOTE_NEW, this.handleMenuNewNote)
    }

    handleMenuNewNote() {
        if (_.isUndefined(this._notebook) || this._notebook === null) {
            message.error('Select the notebook, please.');
        }
        this.handleNewNote();
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
            AppContext.tagListChanged();
        });
    }

    handleClickNoteMenu(e, cmd, data) {
        let {deleteNote, list, listByTag} = this.props;
        let {_notebook, _tag} = this;
        let {sort, order} = this.state;
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
                            list(_notebook._id, sort, order)
                        } else if (_tag != null) {
                            listByTag(_tag, sort, order);
                        }
                        AppContext.tagListChanged();
                    });
                },
                onCancel() {
                },
            });
        } else if (cmd === 'move') {
            this.refs.noteMoveModal.getWrappedInstance().show(data.selectedItems);
        } else if (cmd === 'export_pdf') {
            this.props.exportPdf(data.selectedItem._id);
        } else if (cmd === 'export_file') {
            this.props.exportFile(data.selectedItem._id);
        }
    }

    handleMoveModalSaved() {
        this.load();
    }

    handleNewNote() {
        this.props.save({
            _id: Guid.create().value,
            title: '',
            content: '',
            type: 'markdown',
            createTime: new Date(),
            lastUpdateTime: new Date(),
            tags: [],
            notebookId: this._notebook._id,
        }, (newNote) => {
            this._note = newNote;
            this.refs.editor.setNote(this._note);
            this.load();
        });
    }

    handleSortMenu(cmd) {
        switch (cmd) {
            case 'createTime':
                if (this.state.sort !== 'createTime') {
                    this.state.sort = 'createTime';
                    this.load();
                }
                break;
            case 'lastUpdateTime':
                if (this.state.sort !== 'lastUpdateTime') {
                    this.state.sort = 'lastUpdateTime';
                    this.load();
                }
                break;
            case 'title':
                if (this.state.sort !== 'title') {
                    this.state.sort = 'title';
                    this.load();
                }
                break;
            case 'asc':
                if (this.state.order !== 'asc') {
                    this.state.order = 'asc';
                    this.load();
                }
                break;
            case 'desc':
                if (this.state.order !== 'desc') {
                    this.state.order = 'desc';
                    this.load();
                }
                break;
        }
    }

    handleToggleSortMenu(e) {
        this.refs.sortMenuTrigger.handleContextClick(e);
    }

    handleSearch() {
        this.load();
    }

    load() {
        if (this._notebook != null) {
            this.props.list(this._notebook._id, this.state.keyword, this.state.sort, this.state.order)
        } else if (this._tag != null) {
            this.props.listByTag(this._tag, this.state.keyword, this.state.sort, this.state.order);
        }
    }

    setNotebook(notebook) {
        this._tag = null;
        this._notebook = notebook;
        this.setState({title: 'title: ' + this._notebook.title, readOnly: false, keyword: ''})
        this.load();
        this.refs.noteList.setSelectedIndex(0);
    }

    setTag(tag) {
        this._tag = tag;
        this._notebook = null;
        this.setState({title: 'tag: ' + tag, readOnly: false, keyword: ''})
        this.load();
        this.refs.noteList.setSelectedIndex(0);
    }

    clear() {
        this._note = null;
        this._tag = null;
        this._notebook = null;
        this.setState({title: '', readOnly: true, dataSource: []});
        this.refs.editor.clear();
    }

    render() {
        return (
            <SplitPane split="vertical" minSize={260} defaultSize={260} maxSize={-300}>
                <div className="nb_list">
                    {this.state.readOnly ? <div className="mask"></div> : null}
                    <div className="top">
                        <div className="nb_left">
                            <ContextMenuTrigger id="note_sort" ref="sortMenuTrigger">
                                <Button onClick={this.handleToggleSortMenu}>
                                    <div className="icon-sort"></div>
                                </Button>
                            </ContextMenuTrigger>
                            <ContextMenu id="note_sort">
                                <MenuItem onClick={e => this.handleSortMenu('createTime')} onMouseLeave={e => {
                                }} onMouseMove={e => {
                                }}>
                                    <div className="menu-item">
                                        <div className="prex">{this.state.sort === 'createTime' ? '✓' : '\u00A0'}</div>
                                        <div className="name">CreateTime</div>
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={e => this.handleSortMenu('lastUpdateTime')} onMouseLeave={e => {
                                }} onMouseMove={e => {
                                }}>
                                    <div className="menu-item">
                                        <div
                                            className="prex">{this.state.sort === 'lastUpdateTime' ? '✓' : '\u00A0'}</div>
                                        <div className="name">LastModifyTime</div>
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={e => this.handleSortMenu('title')} onMouseLeave={e => {
                                }} onMouseMove={e => {
                                }}>
                                    <div className="menu-item">
                                        <div className="prex">{this.state.sort === 'title' ? '✓' : '\u00A0'}</div>
                                        <div className="name">Title</div>
                                    </div>
                                </MenuItem>
                                <MenuItem divider/>
                                <MenuItem onClick={e => this.handleSortMenu('asc')} onMouseLeave={e => {
                                }} onMouseMove={e => {
                                }}>
                                    <div className="menu-item">
                                        <div className="prex">{this.state.order === 'asc' ? '✓' : '\u00A0'}</div>
                                        <div className="name">Ascending</div>
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={e => this.handleSortMenu('desc')} onMouseLeave={e => {
                                }} onMouseMove={e => {
                                }}>
                                    <div className="menu-item">
                                        <div className="prex">{this.state.order === 'desc' ? '✓' : '\u00A0'}</div>
                                        <div className="name">Descending</div>
                                    </div>
                                </MenuItem>
                            </ContextMenu>
                        </div>
                        <div className="title unselect">
                            {this.state.title}
                        </div>
                        <div className="right">
                            <Button onClick={this.handleNewNote}
                                    disabled={this._notebook === null ? true : false}>
                                <div className="icon-new"></div>
                            </Button>
                        </div>
                        <div className="search">
                            <Search
                                placeholder="input search text"
                                onSearch={this.handleSearch}
                                value={this.state.keyword}
                                onChange={(e) => {
                                    this.setState({keyword: e.target.value})
                                }}
                            />
                        </div>
                    </div>
                    <div className="list">
                        <NoteList ref="noteList" onClickMenu={this.handleClickNoteMenu}
                                  dataSource={this.state.dataSource}
                                  onSelect={this.handleSelectChanged}/>
                    </div>
                    <NoteMoveModal ref="noteMoveModal"
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
    setNotebook: PropTypes.func,
    clear: PropTypes.func,
}


const mapStateToProps = (state) => {
    return state.NoteReducer;
}

export default connect(mapStateToProps, NoteActions, null, {withRef: true})(Note)