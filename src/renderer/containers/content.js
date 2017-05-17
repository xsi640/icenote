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
            contentDataSource: []
        }

        this.setNotebook = this.setNotebook.bind(this);
        this.addNoteContent = this.addNoteContent.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (typeof nextProps.deleteNum === 'number' && nextProps.deleteNum > 0) {
            this.props.getNotebookList();
        }
    }

    setNotebook(notebook) {
        console.log('123')
        this._notebook = notebook;
        this.props.list(this._notebook._id)
    }

    addNoteContent() {
        this.props.save({
            title: '',
            content: '',
            type: 'markdown',
            createTime: new Date(),
            lastUpdateTime: new Date(),
            tags: []
        });
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
                            title
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
                        <ContentList/>
                    </div>
                </div>
                <div className="nb_content">
                    <Editor/>
                </div>
            </SplitPane>
        );
    }
}


const mapStateToProps = (state) => {
    return state.ContentReducer;
}

export default connect(mapStateToProps, ContentActions, null, {withRef: true})(Content)