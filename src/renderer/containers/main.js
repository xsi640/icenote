import React, {Component} from 'react'
import SplitPane from 'react-split-pane'
import NoteTreeView from '../components/notetreeview'
import Tags from '../components/tags'
import './main.scss'
import './splitpane.scss'
import 'antd/dist/antd.css';
import NoteContent from './notecontent'
import {Button} from "antd";
import NoteBookModal from '../components/notebookmodal'

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.onAddNoteBook = this.onAddNoteBook.bind(this);
        this.onModifyNoteBook = this.onModifyNoteBook.bind(this);
        this.onDeleteNoteBook = this.onDeleteNoteBook.bind(this);
    }

    onAddNoteBook(e, data) {
        console.log('onAddNoteBook', e, data);
    }

    onModifyNoteBook(e, data) {
        console.log('onModifyNoteBook', e, data);
    }

    onDeleteNoteBook(e, data) {
        console.log('onDeleteNoteBook', e, data);
    }

    onSelectNotebook(key, sender) {
        console.log('onSelectNotebook', key, sender);
    }

    render() {
        return (
            <div>
                <SplitPane split="vertical" minSize={200} defaultSize={220}>
                    <div className="left">
                        <SplitPane split="horizontal" minSize={500} defaultSize={500} allowResize={false}>
                            <div className="notebook">
                                <div className="title">
                                    My Notebook
                                    <Button shape="circle" icon="file-add"/>
                                </div>
                                <div className="notebook-root">
                                    <NoteTreeView onAddNoteBook={this.onAddNoteBook}
                                                  onModifyNoteBook={this.onModifyNoteBook}
                                                  onDeleteNoteBook={this.onDeleteNoteBook}
                                                  onSelect={this.onSelectNotebook}/>
                                </div>
                            </div>
                            <div className="tags">
                                <div className="title">Tags</div>
                                <Tags/>
                            </div>
                        </SplitPane>

                    </div>
                    <div className="content">
                        <NoteContent/>
                    </div>
                </SplitPane>
                <NoteBookModal/>
            </div>)
    }
}