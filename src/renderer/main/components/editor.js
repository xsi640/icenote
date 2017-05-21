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
            preview: false,
            mask: true,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.changePreviewState = this.changePreviewState.bind(this);
        this.setNote = this.setNote.bind(this);
        this.clear = this.clear.bind(this);
        this.readOnly = this.readOnly.bind(this);
    }

    setNote(note) {
        this._note = note;
        this.setState({
            title: this._note.title,
            content: this._note.content,
            tags: this._note.tags,
            mask: false,
        })
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

    clear() {
        this.setState({
            title: '',
            content: '',
            tags: [],
        })
    }

    readOnly() {
        this.setState({mask: true})
    }

    changePreviewState() {
        this.setState({preview: !this.state.preview});
    }

    onChange(name, value) {
        this.setState({[name]: value})
    }

    onSave() {
        this._note.title = this.state.title;
        this._note.content = this.state.content;
        this._note.tags = this.state.tags;

        this.props.onSave(this._note);
    }

    render() {
        const {tags, suggestions, content, title} = this.state;
        const options = {
            lineNumbers: true,
            mode: 'markdown',
            theme: '3024-day',
        };
        return (
            <div className="editor-root">
                <div className="title">
                    <Input className="in-title" placeholder="title" value={title} onChange={e => {
                        this.onChange('title', e.target.value)
                    }}/>
                </div>
                <div className="tags">
                    <ReactTags tags={tags}
                               suggestions={suggestions}
                               handleDelete={this.handleDelete}
                               handleAddition={this.handleAddition}
                               handleDrag={this.handleDrag}/>
                </div>
                <div className="toolbar">
                    <Button icon="eye-o" shape="circle" onClick={this.changePreviewState}/>
                </div>
                <div className="editor">
                    <div style={{display: this.state.preview ? 'none' : 'block'}}>
                        <CodeMirror ref="codeMirror" value={content} options={options} onFocusChange={this.onSave}
                                    onChange={e => {
                                        this.onChange('content', e)
                                    }}/>
                    </div>
                    <div className="md" style={{display: this.state.preview ? 'block' : 'none'}}>
                        <ReactMarkdown escapeHtml={false} skipHtml={false} source={content}/>
                    </div>
                </div>
                {this.state.mask ? <div className="mask"></div> : null}
            </div>
        )
    }
}

Editor.PropTypes = {
    setContent: PropTypes.func,
    onSave: PropTypes.func,
}
