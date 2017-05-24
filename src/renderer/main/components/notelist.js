import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'underscore'
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu"
import './menu.scss'
import './notelist.scss'

export default class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndexs: [],
        }

        this._lastSelectedIndex = -1;
        this.onSelect = this.onSelect.bind(this);
        this.onClickMenu = this.onClickMenu.bind(this);
        this.setSelectedIndex = this.setSelectedIndex.bind(this);
    }

    setSelectedIndex(index) {
        this.setState({selectedIndexs: [index]});
    }

    onSelect(e, id) {
        let {ctrlKey, shiftKey, metaKey} = e;
        let {dataSource} = this.props;
        let obj = _.find(dataSource, (item) => {
            return item._id === id;
        });
        let selectedIndex = obj ? _.indexOf(dataSource, obj) : -1;
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
            let index = _.indexOf(this.state.selectedIndexs, selectedIndex);
            if (index === -1) {
                this.state.selectedIndexs.push(selectedIndex);
            } else {
                this.state.selectedIndexs.splice(index, 1);
                obj = null;
            }
        }

        this._lastSelectedIndex = selectedIndex;
        this.forceUpdate();
        if (obj !== null)
            this.props.onSelect(e, obj);
        e.preventDefault();
    }

    onClickMenu(e, cmd) {
        let data = [];
        for (let index of this.state.selectedIndexs) {
            data.push(this.props.dataSource[index]);
        }
        this.props.onClickMenu(e, cmd, data);
    }

    render() {
        let {selectedIndexs} = this.state;
        let {dataSource} = this.props;
        let list = [];
        for (let i = 0; i < dataSource.length; i++) {
            let item = dataSource[i];
            let checked = _.contains(selectedIndexs, i);
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
                            this.onClickMenu(e, 'move')
                        }}>
                            Move to Notebook
                        </MenuItem>
                        <MenuItem data={item} onClick={(e) => {
                            this.onClickMenu(e, 'delete')
                        }}>
                            Delete Note
                        </MenuItem>
                        <MenuItem divider/>
                        <MenuItem data={item} onClick={(e) => {
                            this.onClickMenu(e, 'export_pdf')
                        }}>
                            Export to pdf
                        </MenuItem>
                        <MenuItem data={item} onClick={(e) => {
                            this.onClickMenu(e, 'export_html')
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