import React, {Component} from 'react'
import SplitPane from 'react-split-pane'
import TreeView from '../components/treeview'
import './main.scss'
import './splitpane.scss'
import 'antd/dist/antd.css';
import notepad_icon from '../images/notepad.png'
import NoteContent from './notecontent'

const dataSource =
    [{
        id: '0',
        name: '我的笔记本',
        icon: notepad_icon,
        type: 'category',
        children: [{
            id: '1',
            name: '你的第一个笔记本',
            count: '2'
        }]
    }]

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

    onSelect(key, sender) {
        console.log('onSelect', key, sender);
    }

    render() {
        return <SplitPane split="vertical" minSize={200} defaultSize={220}>
            <div className="left">
                <div className="notebook">
                    <TreeView dataSource={dataSource} onAddNoteBook={this.onAddNoteBook}
                              onModifyNoteBook={this.onModifyNoteBook} onDeleteNoteBook={this.onDeleteNoteBook}
                              onSelect={this.onSelect}/>
                </div>
            </div>
            <div className="content">
                <NoteContent/>
            </div>
        </SplitPane>
    }
}