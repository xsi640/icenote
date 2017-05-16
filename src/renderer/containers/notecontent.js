import React, {Component} from 'react'
import NoteList from '../components/notelist'
import Editor from '../components/editor'
import {Button, Icon, Input} from 'antd'
import SplitPane from 'react-split-pane'
const Search = Input.Search;
import './notecontent.scss'

export default class NoteContent extends Component {
    render() {
        return (
            <SplitPane split="vertical" minSize={270} defaultSize={300}>
                <div className="nb_list">
                    <div className="top">
                        <div className="left">
                            <Button shape="circle" icon="file-add"></Button>
                        </div>
                        <div className="title">
                            title
                        </div>
                        <div className="right">
                            <Button shape="circle" icon="edit"></Button>
                        </div>
                        <div className="search">
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                            />
                        </div>
                    </div>
                    <div className="list">
                        <NoteList/>
                    </div>
                </div>
                <div className="nb_content">
                    <Editor/>
                </div>
            </SplitPane>
        );
    }
}