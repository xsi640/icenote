import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Tree} from 'antd'
import NoteBook from './notebook'
const TreeNode = Tree.TreeNode

export default class NoteTreeView extends Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
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

    onSelect(key, data) {
        this.props.onSelect(key, data);
    }

    renderTreeNode(node) {
        let children = [];
        if (typeof node.children === 'undefined' ||
            node.children === null ||
            node.children.length == 0) {
            children = null;
            node.isLeaf = true;
        } else {
            node.children.map(item => {
                children.push(this.renderTreeNode(item));
            })
            node.isLeaf = false;
        }
        let header = <NoteBook id={node.id} icon={node.icon}
                               name={node.name}
                               count={node.count}
                               data={node}
                               onAddNoteBook={this.onAddNoteBook}
                               onModifyNoteBook={this.onModifyNoteBook}
                               onDeleteNoteBook={this.onDeleteNoteBook}/>
        return (
            <TreeNode key={node.id} title={header} data={node}>
                {children}
            </TreeNode>
        );
    }

    render() {
        return (<div>
            {
                <Tree onSelect={this.onSelect}>
                    {
                        this.props.dataSource ? this.props.dataSource.map(item => this.renderTreeNode(item)) : null
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
    onSelect: PropTypes.func,
    dataSource: PropTypes.array,
}