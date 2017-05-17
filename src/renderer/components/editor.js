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
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.changePreviewState = this.changePreviewState.bind(this);
        this.setContent = this.setContent.bind(this);
    }

    setContent(content) {
        console.log('setContent', content);
        this._content = content;
        this.setState({
            title: this._content.title,
            content: this._content.content,
            tags: this._content.tags,
        })
    }

    handleDelete(i) {
        console.log('delete tag', this.props.tags[i]);
    }

    handleAddition(tag) {
        console.log('add tag', tag);
    }

    handleDrag(tag, currPos, newPos) {
        let tags = this.props.tags;

        // mutate array
        // tags.splice(currPos, 1);
        // tags.splice(newPos, 0, tag);
        //
        // // re-render
        // this.setState({tags: tags});
    }

    changePreviewState() {
        this.setState({preview: !this.state.preview});
    }

    onChange(name, value) {
        this.setState({[name]: value})
    }

    onSave() {
        this._content.title = this.state.title;
        this._content.content = this.state.content;
        this._content.tags = this.state.tags;

        this.props.onSave(this._content);
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
            </div>
        )
    }
}

Editor.PropTypes = {
    setContent: PropTypes.func,
    onSave: PropTypes.func,
}
