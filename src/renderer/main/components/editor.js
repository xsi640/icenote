import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input, Button} from 'antd';
import {WithContext as ReactTags} from 'react-tag-input';
import CodeMirror from 'react-codemirror'
import ReactMarkdown from 'react-markdown'
import './editor.scss'
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown"
import "codemirror/theme/3024-day.css";

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
        if (_.isUndefined(this._note))
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
                if(this.state.mode === 2){
                    this.setState({mode: 0})
                }else {
                    this.setState({mode: 2})
                }
                break;
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
        const {tags, suggestions, content, title} = this.state;
        const options = {
            mode: 'markdown',
            theme: '3024-day',
        };
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
                    <Button onClick={e => {
                        this.handleToolbar(e, 'strike');
                    }}>
                        <div className="icon-strike"></div>
                    </Button>

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
                    <Button onClick={e => {
                        this.handleToolbar(e, 'checkbox');
                    }}>
                        <div className="icon-checkbox"></div>
                    </Button>

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
                    <div style={{display: this.state.mode === 0 ? 'block' : 'none'}}>
                        <CodeMirror ref="codeMirror" value={content} options={options} onFocusChange={this.handleSave}
                                    onChange={e => {
                                        this.handleChange('content', e)
                                    }}/>
                    </div>
                    <div className="md" style={{display: this.state.mode === 1 ? 'block' : 'none'}}>
                        <ReactMarkdown escapeHtml={false} skipHtml={false} source={content}/>
                    </div>
                    <div className="book" style={{display: this.state.mode === 2 ? 'grid' : 'none'}}>
                        <div className="book-left">
                            <CodeMirror ref="codeMirror2" value={content} options={options}
                                        onFocusChange={this.handleSave}
                                        onChange={e => {
                                            this.handleChange('content', e)
                                        }}/>
                        </div>
                        <div className="book-right">
                            <ReactMarkdown escapeHtml={false} skipHtml={false} source={content}/>
                        </div>
                    </div>
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
