import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './notelist.scss'
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu"
import './menu.scss'

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

export default class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            selectedIndexs: [],
        }

        this._lastSelectedIndex = -1;
        this.onSelect = this.onSelect.bind(this);
        this.onClickMenu = this.onClickMenu.bind(this);
        this.setSelectedIndex = this.setSelectedIndex.bind(this);
    }

    setSelectedIndex(index) {
        this.setState({selectedIndex: index});
    }

    onSelect(e, id) {
        let {ctrlKey, shiftKey, metaKey} = e;
        let {dataSource} = this.props;
        let obj = null;
        let selectedIndex = -1;
        for (let i = 0; i < dataSource.length; i++) {
            if (dataSource[i]._id === id) {
                selectedIndex = i;
                obj = dataSource[i];
                break;
            }
        }
        if (!ctrlKey && !shiftKey && !metaKey) {
            this.state.selectedIndexs = [selectedIndex];
        } else if (shiftKey && this._lastSelectedIndex !== -1) {
            if (this._lastSelectedIndex != -1) {
                let start = this._lastSelectedIndex;
                let end = selectedIndex;
                if (start > end) {
                    let temp = start;
                    start = end;
                    end = temp;
                }
                this.state.selectedIndexs = [];
                for (; start < end + 1; start++) {
                    this.state.selectedIndexs.push(start);
                }
            }
        } else if (ctrlKey || metaKey) {
            if (!this.state.selectedIndexs.contains(selectedIndex)) {
                this.state.selectedIndexs.push(selectedIndex);
            } else {
                this.state.selectedIndexs.remove(selectedIndex);
                obj = null;
            }
        }

        this._lastSelectedIndex = selectedIndex;
        this.forceUpdate();
        if (obj !== null)
            this.props.onSelect(e, obj);
        e.preventDefault();
    }

    onClickMenu(e, cmd, data) {
        this.props.onClickMenu(e, cmd, data);
    }

    render() {
        let {selectedIndexs} = this.state;
        let {dataSource} = this.props;
        let list = [];
        for (let i = 0; i < dataSource.length; i++) {
            let item = dataSource[i];
            let checked = selectedIndexs.contains(i);

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
                            <input type="checkbox" id={item._id} name="radios" value={item._id}
                                   checked={checked}></input>
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