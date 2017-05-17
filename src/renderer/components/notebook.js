import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu"
import './notebook_menu.scss'

export default class NoteBook extends Component {

    constructor(props) {
        super(props);
        this.onAddNoteBook = this.onAddNoteBook.bind(this)
        this.onModifyNoteBook = this.onModifyNoteBook.bind(this)
        this.onDeleteNoteBook = this.onDeleteNoteBook.bind(this)
    }

    onAddNoteBook(e) {
        this.props.onAddNoteBook(e, this.props.data)
    }

    onModifyNoteBook(e) {
        this.props.onModifyNoteBook(e, this.props.data)
    }

    onDeleteNoteBook(e) {
        this.props.onDeleteNoteBook(e, this.props.data);
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
                    <MenuItem   data={this.props.data} onClick={this.onAddNoteBook}>
                        新建笔记本
                    </MenuItem>
                    <MenuItem data={this.props.data} onClick={this.onModifyNoteBook}>
                        重命名
                    </MenuItem>
                    <MenuItem data={this.props.data} onClick={this.onDeleteNoteBook}>
                        删除笔记本
                    </MenuItem>
                </ContextMenu>
            </div>
        );
    }
}

NoteBook.propTypes = {
    id: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string,
    count: PropTypes.number,
    data: PropTypes.object,
    onAddNoteBook: PropTypes.func,
    onModifyNoteBook: PropTypes.func,
    onDeleteNoteBook: PropTypes.func,
}