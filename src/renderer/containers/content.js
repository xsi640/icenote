import React, {Component} from 'react'
import ContentList from '../components/contentlist'
import Editor from '../components/editor'
import {Button, Icon, Input} from 'antd'
import SplitPane from 'react-split-pane'
const Search = Input.Search;
import './content.scss'

export default class NoteContent extends Component {

    constructor(props){
        super(props);
    }

    setNotebook(notebook){
        this._notebook = notebook;
    }

    addNoteContent(){

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