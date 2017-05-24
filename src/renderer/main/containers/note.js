import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as NoteActions from '../actions/noteactions'
import NoteList from '../components/notelist'
import Editor from '../components/editor'
import {Button, Input, Modal} from 'antd'
import SplitPane from 'react-split-pane'
const Search = Input.Search;
import './note.scss'

class Note extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            dataSource: [],
            mask: true,
        }

        this.setNotebook = this.setNotebook.bind(this);
        this.addNote = this.addNote.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onClickMenu = this.onClickMenu.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // if (typeof nextProps.deleteNum === 'number' && nextProps.deleteNum > 0) {
        //     this.props.list(this._notebook._id);
        // }
        // if (typeof nextProps.note !== 'undefined' && nextProps.note !== null) {
        //     this._note = nextProps.note;
        //     this.refs.editor.setNote(this._note);
        // }
        // if (typeof nextProps.dataSource !== 'undefined') {
        //     if (nextProps.dataSource.length == 0) {
        //         this.refs.editor.clear();
        //         this.refs.editor.readOnly();
        //     }
        // }
    }

    setNotebook(notebook) {
        this._notebook = notebook;
        this.setState({title: this._notebook.title, mask: false})
        this.props.list(this._notebook._id)
    }

    addNote() {
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

    onSelect(e, note) {
        if (note == null)
            return;
        this._note = note;
        this.refs.editor.setNote(note);
    }

    onSave(note) {
        this._note = note;
        this._note.lastUpdateTime = new Date();
        this.props.save(note, () => {
            this.props.list(this._notebook._id);
        });
    }

    onClickMenu(e, cmd, items) {
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
        }
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
                            <Button shape="circle" icon="edit" onClick={this.addNote}></Button>
                        </div>
                        <div className="search">
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                            />
                        </div>
                    </div>
                    <div className="list">
                        <NoteList ref="noteList" onClickMenu={this.onClickMenu}
                                  dataSource={this.props.dataSource}
                                  onSelect={this.onSelect}/>
                    </div>
                </div>
                <div className="nb_content">
                    <Editor ref="editor" onSave={this.onSave}/>
                </div>
            </SplitPane>
        );
    }
}


const mapStateToProps = (state) => {
    return state.NoteReducer;
}

export default connect(mapStateToProps, NoteActions, null, {withRef: true})(Note)