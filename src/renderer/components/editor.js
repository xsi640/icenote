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
            preview: false,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.updateCode = this.updateCode.bind(this);
        this.changePreviewState = this.changePreviewState.bind(this);
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

    updateCode(content) {
        console.log('updateCode', content)
    }

    changePreviewState() {
        this.setState({preview: !this.state.preview});
    }

    render() {
        const {tags, suggestions, content} = this.props;
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
                        <CodeMirror value={this.content} onChange={this.updateCode} options={options}/>
                    </div>
                    <div className="md" style={{display: this.state.preview ? 'block' : 'none'}}>
                        <ReactMarkdown escapeHtml={false} skipHtml={false} source={this.content}/>
                    </div>
                </div>
            </div>
        )
    }
}

Editor.PropTypes = {
    content: PropTypes.string,
    tags: PropTypes.array,
    suggestions: PropTypes.array,
}

Editor.DefaultProps = {
    content: '',
    tags: [],
    suggestions: []
}
