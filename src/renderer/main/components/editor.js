import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input, Button} from 'antd';
import {WithContext as ReactTags} from 'react-tag-input';
import CodeMirror from 'react-codemirror'
import ReactMarkdown from 'react-markdown'
const {ipcRenderer} = require('electron')
import IPCMESSAGE from '../../../constipc'
import './editor.scss'
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown"
import "codemirror/theme/seti.css";

export default class Editor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            suggestions: [],
            content: '',
            title: '',
            mode: 0,
            readOnly: true,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleToolbar = this.handleToolbar.bind(this);

        this.setNote = this.setNote.bind(this);
        this.clear = this.clear.bind(this);

        this.handleMenuSelectAll = this.handleMenuSelectAll.bind(this);
        this.handleMenuSave = this.handleMenuSave.bind(this);
    }

    componentDidMount() {
        ipcRenderer.on(IPCMESSAGE.MENU_SELECT_ALL, this.handleMenuSelectAll)
        ipcRenderer.on(IPCMESSAGE.MENU_NOTE_SAVE, this.handleMenuSave)
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(IPCMESSAGE.MENU_SELECT_ALL, this.handleMenuSelectAll)
        ipcRenderer.removeListener(IPCMESSAGE.MENU_NOTE_SAVE, this.handleMenuSave)
    }

    handleMenuSave() {
        this.handleSave();
    }

    handleMenuSelectAll() {
        let editor = this.refs.codeMirror;
        if (editor) {
            let codeMirror = editor.getCodeMirror();
            codeMirror.execCommand('selectAll');
            console.log('selectAll');
        }
    }

    handleDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
    }

    handleAddition(tag) {
        for (let tag of this.state.tags) {
            if (tag.text == tag) {
                return;
            }
        }
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
    }

    handleDrag(tag, currPos, newPos) {
        let tags = this.state.tags;
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);
        this.setState({tags: tags});
    }

    handleChange(name, value) {
        this.setState({[name]: value})
    }

    handleSave() {
        if (_.isUndefined(this._note) || this._note === null)
            return;

        this._note.title = this.state.title;
        this._note.content = this.state.content;
        this._note.tags = this.state.tags;

        this.props.onSave(this._note);
    }

    handleToolbar(e, cmd) {
        switch (cmd) {
            case 'preview':
                if (this.state.mode === 0) {
                    this.setState({mode: 1})
                } else if (this.state.mode === 1) {
                    this.setState({mode: 0})
                } else if (this.state.mode === 2) {
                    this.setState({mode: 1});
                }
                break;
            case 'book':
                if (this.state.mode === 2) {
                    this.setState({mode: 0})
                } else {
                    this.setState({mode: 2})
                }
                break;
            default:
                this.handleEditor(cmd);
                break;
        }
    }

    handleEditor(cmd) {
        let editor = this.refs.codeMirror;
        if (editor) {
            let codeMirror = editor.getCodeMirror();
            let selection = codeMirror.getSelection();
            let cursor = codeMirror.getCursor();
            if (cmd === 'bold') {
                codeMirror.replaceSelection('***' + selection + '***');
            } else if (cmd === 'italic') {
                codeMirror.replaceSelection('*' + selection + '*');
            } else if (cmd === 'title') {
                codeMirror.replaceRange('# ', {line: cursor.line, ch: 0});
            } else if (cmd === 'refs') {
                codeMirror.replaceRange('> ', {line: cursor.line, ch: 0});
            } else if (cmd === 'code') {
                codeMirror.replaceSelection('```\n' + selection + '\n```');
            } else if (cmd === 'list') {
                codeMirror.replaceRange('* ', {line: cursor.line, ch: 0});
            } else if (cmd === 'list-num') {
                codeMirror.replaceRange('1. ', {line: cursor.line, ch: 0});
            } else if (cmd === 'link') {
                codeMirror.replaceSelection('[' + selection + '](http://)');
            } else if (cmd === 'line') {
                codeMirror.replaceSelection('---\n' + selection);
            }
        }
    }

    setNote(note) {
        this._note = note;
        this.setState({
            title: this._note.title,
            content: this._note.content,
            tags: this._note.tags,
            readOnly: false,
        })
    }

    clear() {
        this.setState({
            title: '',
            content: '',
            tags: [],
            readOnly: true,
        })
    }

    render() {
        const {tags, suggestions, content, title, mode, readOnly} = this.state;
        const options = {
            mode: 'markdown',
            theme: 'seti',
        };

        let editor = null;
        if (mode === 0) {
            editor = <div className="editor">
                <CodeMirror ref="codeMirror" value={content} options={{...options, autofocus: !readOnly}}
                            onFocusChange={this.handleSave}
                            onChange={e => {
                                this.handleChange('content', e)
                            }}/>
            </div>;
        } else if (mode === 1) {
            editor = <div className="md">
                <ReactMarkdown escapeHtml={true} skipHtml={false} source={content}/>
            </div>
        } else if (mode === 2) {
            editor = <div className="book">
                <div className="book-left">
                    <CodeMirror ref="codeMirror" value={content} options={{...options, autofocus: !readOnly}}
                                onFocusChange={this.handleSave}
                                onChange={e => {
                                    this.handleChange('content', e)
                                }}/>
                </div>
                <div className="book-right md">
                    <ReactMarkdown escapeHtml={true} skipHtml={false} source={content}/>
                </div>
            </div>
        }

        return (
            <div className="editor-root">
                <div className="title">
                    <Input className="in-title" placeholder="title" value={title} onChange={e => {
                        this.handleChange('title', e.target.value)
                    }} onBlur={this.handleSave}/>
                </div>
                <div className="tags">
                    <ReactTags tags={tags}
                               suggestions={suggestions}
                               handleDelete={this.handleDelete}
                               handleAddition={this.handleAddition}
                               handleDrag={this.handleDrag} handleInputBlur={this.handleSave}/>
                </div>
                <div className="toolbar">
                    {/*预览、分屏阅读；加粗、倾斜、删除线；标题、引用、code；项目列表，编号列表，checkbox；链接、分割线*/}
                    <Button onClick={e => {
                        this.handleToolbar(e, 'preview');
                    }} title="Preview">
                        <div className="icon-preview"></div>
                    </Button>
                    <Button onClick={e => {
                        this.handleToolbar(e, 'book');
                    }}>
                        <div className="icon-book"></div>
                    </Button>
                    <Button onClick={e => {
                        this.handleToolbar(e, 'bold');
                    }}>
                        <div className="icon-bold"></div>
                    </Button>
                    <Button onClick={e => {
                        this.handleToolbar(e, 'italic');
                    }}>
                        <div className="icon-italic"></div>
                    </Button>
                    {/*<Button onClick={e => {*/}
                    {/*this.handleToolbar(e, 'strike');*/}
                    {/*}}>*/}
                    {/*<div className="icon-strike"></div>*/}
                    {/*</Button>*/}

                    <Button onClick={e => {
                        this.handleToolbar(e, 'title');
                    }}>
                        <div className="icon-title"></div>
                    </Button>
                    <Button onClick={e => {
                        this.handleToolbar(e, 'refs');
                    }}>
                        <div className="icon-refs"></div>
                    </Button>
                    <Button onClick={e => {
                        this.handleToolbar(e, 'code');
                    }}>
                        <div className="icon-code"></div>
                    </Button>

                    <Button onClick={e => {
                        this.handleToolbar(e, 'list');
                    }}>
                        <div className="icon-list"></div>
                    </Button>
                    <Button onClick={e => {
                        this.handleToolbar(e, 'list-num');
                    }}>
                        <div className="icon-list-num"></div>
                    </Button>
                    {/*<Button onClick={e => {*/}
                    {/*this.handleToolbar(e, 'checkbox');*/}
                    {/*}}>*/}
                    {/*<div className="icon-checkbox"></div>*/}
                    {/*</Button>*/}

                    <Button onClick={e => {
                        this.handleToolbar(e, 'link');
                    }}>
                        <div className="icon-link"></div>
                    </Button>
                    <Button onClick={e => {
                        this.handleToolbar(e, 'line');
                    }}>
                        <div className="icon-line"></div>
                    </Button>
                </div>
                <div className="editor">
                    {editor}
                </div>
                {this.state.readOnly ? <div className="mask"></div> : null}
            </div>
        )
    }
}

Editor.PropTypes = {
    setNote: PropTypes.func,
    clear: PropTypes.func,
    onSave: PropTypes.func,
}
