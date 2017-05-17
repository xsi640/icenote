import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Tree} from 'antd'
import NoteBook from './notebook'
const TreeNode = Tree.TreeNode

export default class NoteTreeView extends Component {

    constructor(props) {
        super(props);
        this.onSelectNoteBook = this.onSelectNoteBook.bind(this);
        this.onAddNoteBook = this.onAddNoteBook.bind(this);
        this.onModifyNoteBook = this.onModifyNoteBook.bind(this);
        this.onDeleteNoteBook = this.onDeleteNoteBook.bind(this);
    }

    onAddNoteBook(e, data) {
        this.props.onAddNoteBook(e, data)
    }

    onModifyNoteBook(e, data) {
        this.props.onModifyNoteBook(e, data)
    }

    onDeleteNoteBook(e, data) {
        this.props.onDeleteNoteBook(e, data);
    }

    onSelectNoteBook(key, data) {
        this.props.onSelectNoteBook(key, data);
    }

    renderTreeNode(parentId) {
        let {dataSource} = this.props;
        if (typeof dataSource === 'undefined')
            return;
        if (dataSource.length === 0) return;
        let root = [];
        dataSource.map(item => {
            if (item.parentId === parentId) {
                let header = <NoteBook id={item._id}
                                       name={item.title}
                                       count={item.count}
                                       data={item}
                                       onAddNoteBook={this.onAddNoteBook}
                                       onModifyNoteBook={this.onModifyNoteBook}
                                       onDeleteNoteBook={this.onDeleteNoteBook}/>
                let isLeaf = true;
                for (let node of dataSource) {
                    if (typeof node.parentId !== 'undefined' && node.parentId === item._id) {
                        isLeaf = false;
                        break;
                    }
                }
                if (!isLeaf)
                    root.push(<TreeNode key={item._id} title={header} data={item}
                                        isLeaf={isLeaf}>{this.renderTreeNode(item._id)}</TreeNode>);
                else
                    root.push(<TreeNode key={item._id} title={header} data={item}
                                        isLeaf={isLeaf}></TreeNode>);
            }
        })
        return root;
    }

    render() {
        return (<div>
            {
                <Tree onSelect={this.onSelectNoteBook}>
                    {
                        this.renderTreeNode(undefined)
                    }
                </Tree>
            }
        </div>)
    }
}

NoteTreeView.propTypes = {
    onAddNoteBook: PropTypes.func,
    onModifyNoteBook: PropTypes.func,
    onDeleteNoteBook: PropTypes.func,
    onSelectNoteBook: PropTypes.func,
    dataSource: PropTypes.array,
}