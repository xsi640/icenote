import React, {Component} from 'react'
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu"
import './notebook_menu.scss'

export default class NoteBook extends Component {

    constructor(props){
        super(props);
        this.onAddNoteBook = this.onAddNoteBook.bind(this)
        this.onModifyNoteBook = this.onModifyNoteBook.bind(this)
        this.onDeleteNoteBook = this.onDeleteNoteBook.bind(this)
    }

    onAddNoteBook(e, data){
        this.props.onAddNoteBook(e, data)
    }

    onModifyNoteBook(e, data){
        this.props.onModifyNoteBook(e, data)
    }

    onDeleteNoteBook(e, data){
        this.props.onDeleteNoteBook(e, data);
    }

    render() {
        return (
            <div className="notebook">
                <ContextMenuTrigger id={this.props.id}>
                    {this.props.icon ? <img src={this.props.icon} className="icon"/> : null}
                    {this.props.name}
                    {this.props.count ? <div className="count">({this.props.count})</div> : null}
                </ContextMenuTrigger>
                <ContextMenu id={this.props.id}>
                    <MenuItem data={this.props.data} onClick={this.onAddNoteBook}>
                        新建笔记本
                    </MenuItem>
                    <MenuItem data={this.props.data} onClick={this.onModifyNoteBook}>
                        重命名
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={this.props.data} onClick={this.onDeleteNoteBook}>
                        删除笔记本
                    </MenuItem>
                </ContextMenu>
            </div>
        );
    }
}