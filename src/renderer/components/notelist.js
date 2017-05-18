import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './notelist.scss'
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu"
import './menu.scss'

export default class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        }
        this.onSelect = this.onSelect.bind(this);
        this.onClickMenu = this.onClickMenu.bind(this);
        this.setSelectedIndex = this.setSelectedIndex.bind(this);
    }

    setSelectedIndex(index) {
        this.setState({selectedIndex: index});
    }

    onSelect(e, id) {
        let {dataSource} = this.props;
        let obj = null;
        for (let i = 0; i < dataSource.length; i++) {
            if (dataSource[i]._id === id) {
                this.setState({selectedIndex: i});
                obj = dataSource[i];
                break;
            }
        }
        if (obj !== null)
            this.props.onSelect(e, obj);
        e.preventDefault();
    }

    onClickMenu(e, cmd, data) {
        this.props.onClickMenu(e, cmd, data);
    }

    render() {
        let {selectedIndex} = this.state;
        let {dataSource} = this.props;
        let list = [];
        for (let i = 0; i < dataSource.length; i++) {
            let item = dataSource[i];
            let checked = i === selectedIndex;

            let className = "note-item";
            if (i % 2 === 0) {
                className = "note-item even"
            }
            list.push(
                <div className={className} key={item._id}>
                    <ContextMenuTrigger id={item._id}>
                        <div onClick={(e) => {
                            this.onSelect(e, item._id)
                        }}>
                            <input type="radio" id={item._id} name="radios" value={item._id} checked={checked}></input>
                            <label htmlFor={item._id}>
                                <div className="title unselect">{item.title === '' ? 'UnTitled' : item.title}</div>
                                <div className="summary unselect">{item.content}</div>
                            </label>
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenu id={item._id}>
                        <MenuItem data={item} onClick={(e) => {
                            this.onClickMenu(e, 'move', item)
                        }}>
                            Move to Notebook
                        </MenuItem>
                        <MenuItem data={item} onClick={(e) => {
                            this.onClickMenu(e, 'delete', item)
                        }}>
                            Delete Note
                        </MenuItem>
                        <MenuItem divider/>
                        <MenuItem data={item} onClick={(e) => {
                            this.onClickMenu(e, 'export_pdf', item)
                        }}>
                            Export to pdf
                        </MenuItem>
                        <MenuItem data={item} onClick={(e) => {
                            this.onClickMenu(e, 'export_html', item)
                        }}>
                            Export to html
                        </MenuItem>
                    </ContextMenu>
                </div>
            )
        }

        return (
            <div className="note-list">
                {list}
            </div>
        )
    }
}

NoteList.PropTypes = {
    dataSource: PropTypes.array,
    onSelect: PropTypes.func,
    onClickMenu: PropTypes.func,
}

NoteList.defaultProps = {
    dataSource: [],
}