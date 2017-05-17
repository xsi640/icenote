import React, {Component} from 'react'
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
            code: '',
            preview: false,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.updateCode = this.updateCode.bind(this);
        this.changePreviewState = this.changePreviewState.bind(this);
    }

    handleDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
    }

    handleAddition(tag) {
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
    }

    handleDrag(tag, currPos, newPos) {
        let tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({tags: tags});
    }

    updateCode(newCode) {
        this.setState({
            code: newCode,
        });
    }

    changePreviewState() {
        this.setState({preview: !this.state.preview});
    }

    render() {
        const {tags, suggestions} = this.state;
        const options = {
            lineNumbers: true,
            mode: 'markdown',
            theme: '3024-day',
        };
        return (
            <div className="editor-root">
                <div className="title">
                    <Input className="in-title" placeholder="title"/>
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
                        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options}/>
                    </div>
                    <div className="md" style={{display: this.state.preview ? 'block' : 'none'}}>
                        <ReactMarkdown escapeHtml={false} skipHtml={false} source={this.state.code}/>
                    </div>
                </div>
            </div>
        )
    }
}