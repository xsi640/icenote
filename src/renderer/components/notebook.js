import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu"
import './notebook_menu.scss'

export default class Notebook extends Component {

    constructor(props) {
        super(props);
        this.onAddNotebook = this.onAddNotebook.bind(this)
        this.onModifyNotebook = this.onModifyNotebook.bind(this)
        this.onDeleteNotebook = this.onDeleteNotebook.bind(this)
    }

    onAddNotebook(e) {
        this.props.onAddNotebook(e, this.props.data)
    }

    onModifyNotebook(e) {
        this.props.onModifyNotebook(e, this.props.data)
    }

    onDeleteNotebook(e) {
        this.props.onDeleteNotebook(e, this.props.data);
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
                    <MenuItem   data={this.props.data} onClick={this.onAddNotebook}>
                        新建笔记本
                    </MenuItem>
                    <MenuItem data={this.props.data} onClick={this.onModifyNotebook}>
                        重命名
                    </MenuItem>
                    <MenuItem data={this.props.data} onClick={this.onDeleteNotebook}>
                        删除笔记本
                    </MenuItem>
                </ContextMenu>
            </div>
        );
    }
}

Notebook.propTypes = {
    id: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string,
    count: PropTypes.number,
    data: PropTypes.object,
    onAddNotebook: PropTypes.func,
    onModifyNotebook: PropTypes.func,
    onDeleteNotebook: PropTypes.func,
}