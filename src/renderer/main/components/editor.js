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
            readOnly: true,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

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
        })
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
                    <Button icon="eye-o" shape="circle" onClick={(e) => {
                        this.handleChange('preview', !this.state.preview)
                    }}/>
                </div>
                <div className="editor">
                    <div style={{display: this.state.preview ? 'none' : 'block'}}>
                        <CodeMirror ref="codeMirror" value={content} options={options} onFocusChange={this.handleSave}
                                    onChange={e => {
                                        this.handleChange('content', e)
                                    }}/>
                    </div>
                    <div className="md" style={{display: this.state.preview ? 'block' : 'none'}}>
                        <ReactMarkdown escapeHtml={false} skipHtml={false} source={content}/>
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
