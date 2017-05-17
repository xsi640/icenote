import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as ContentActions from '../actions/contentactions'
import ContentList from '../components/contentlist'
import Editor from '../components/editor'
import {Button, Icon, Input} from 'antd'
import SplitPane from 'react-split-pane'
const Search = Input.Search;
import './content.scss'

class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            contentDataSource: []
        }

        this.setNotebook = this.setNotebook.bind(this);
        this.addNoteContent = this.addNoteContent.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (typeof nextProps.deleteNum === 'number' && nextProps.deleteNum > 0) {
            this.props.getNotebookList();
        }
    }

    setNotebook(notebook) {
        this._notebook = notebook;
        this.setState({title: this._notebook.title})
        this.props.list(this._notebook._id)
    }

    addNoteContent() {
        console.log(this._notebook)
        this.props.save({
            title: '',
            content: '',
            type: 'markdown',
            createTime: new Date(),
            lastUpdateTime: new Date(),
            tags: [],
            notebookId: this._notebook._id,
        });
    }

    onSelect(e, content) {
        this.refs.editor.setContent(content);
    }

    onSave(content) {
        console.log('save', content);
    }

    render() {
        return (
            <SplitPane split="vertical" minSize={270} defaultSize={300} maxSize={-300}>
                <div className="nb_list">
                    <div className="top">
                        <div className="left">
                            <Button shape="circle" icon="file-add"></Button>
                        </div>
                        <div className="title unselect">
                            {this.state.title}
                        </div>
                        <div className="right">
                            <Button shape="circle" icon="edit" onClick={this.addNoteContent}></Button>
                        </div>
                        <div className="search">
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                            />
                        </div>
                    </div>
                    <div className="list">
                        <ContentList dataSource={this.state.contentDataSource} onSelect={this.onSelect}/>
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
    return state.ContentReducer;
}

export default connect(mapStateToProps, ContentActions, null, {withRef: true})(Content)