import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Tree} from 'antd'
import Notebook from './notebook'
const TreeNode = Tree.TreeNode

export default class NoteTreeView extends Component {

    constructor(props) {
        super(props);
        this.onSelectNotebook = this.onSelectNotebook.bind(this);
        this.onAddNotebook = this.onAddNotebook.bind(this);
        this.onModifyNotebook = this.onModifyNotebook.bind(this);
        this.onDeleteNotebook = this.onDeleteNotebook.bind(this);
    }

    onAddNotebook(e, data) {
        this.props.onAddNotebook(e, data)
    }

    onModifyNotebook(e, data) {
        this.props.onModifyNotebook(e, data)
    }

    onDeleteNotebook(e, data) {
        this.props.onDeleteNotebook(e, data);
    }

    onSelectNotebook(key, data) {
        this.props.onSelectNotebook(key, data);
    }

    renderTreeNode(parentId) {
        let {dataSource} = this.props;
        if (typeof dataSource === 'undefined')
            return;
        if (dataSource.length === 0) return;
        let root = [];
        dataSource.map(item => {
            if (item.parentId === parentId) {
                let header = <Notebook id={item._id}
                                       name={item.title}
                                       count={item.count}
                                       data={item}
                                       onAddNotebook={this.onAddNotebook}
                                       onModifyNotebook={this.onModifyNotebook}
                                       onDeleteNotebook={this.onDeleteNotebook}/>
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
                <Tree onSelect={this.onSelectNotebook} multiple={false} defaultExpandAll={true}>
                    {
                        this.renderTreeNode(undefined)
                    }
                </Tree>
            }
        </div>)
    }
}

NoteTreeView.propTypes = {
    onAddNotebook: PropTypes.func,
    onModifyNotebook: PropTypes.func,
    onDeleteNotebook: PropTypes.func,
    onSelectNotebook: PropTypes.func,
    dataSource: PropTypes.array,
}