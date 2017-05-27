import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Tree} from 'antd'
import Notebook from './notebook'
import AppContext from '../context/appcontext'
const TreeNode = Tree.TreeNode
import _ from 'underscore'

export default class NoteTreeView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedKeys: [],
            dataSource: []
        }

        this.handleSelectNotebook = this.handleSelectNotebook.bind(this);
        this.handleAddNotebook = this.handleAddNotebook.bind(this);
        this.handleModifyNotebook = this.handleModifyNotebook.bind(this);
        this.handleDeleteNotebook = this.handleDeleteNotebook.bind(this);
        this.clearSelected = this.clearSelected.bind(this);
    }

    componentDidMount() {
        AppContext.loadNotebook(() => {
            if (!_.isUndefined(AppContext.NotebookList)) {
                this.setState({dataSource: AppContext.NotebookList})
            }
        })

        AppContext.onNotebookChanged(() => {
            if (!_.isUndefined(AppContext.NotebookList)) {
                this.setState({dataSource: AppContext.NotebookList})
            }
        })
    }

    handleAddNotebook(e, data) {
        this.props.onAddNotebook(e, data)
    }

    handleModifyNotebook(e, data) {
        this.props.onModifyNotebook(e, data)
    }

    handleDeleteNotebook(e, data) {
        this.props.onDeleteNotebook(e, data);
    }

    handleSelectNotebook(keys, data) {
        if (this.state.selectedKeys.length === 1 &&
            this.state.selectedKeys[0] === data.node.props.eventKey) {

        } else {
            this.props.onSelectNotebook(keys, _.find(this.state.dataSource, (item) => {
                return item._id === keys[0];
            }));
            this.setState({selectedKeys: [keys[0]]})
        }
    }

    clearSelected() {
        this.setState({selectedKeys: []})
    }

    renderTreeNode(parentId) {
        let {dataSource} = this.state;
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
                                       onAddNotebook={this.handleAddNotebook}
                                       onModifyNotebook={this.handleModifyNotebook}
                                       onDeleteNotebook={this.handleDeleteNotebook}/>
                let isLeaf = true;
                for (let node of dataSource) {
                    if (typeof node.parentId !== 'undefined' && node.parentId === item._id) {
                        isLeaf = false;
                        break;
                    }
                }
                if (!isLeaf) {
                    root.push(<TreeNode key={item._id} title={header}
                                        isLeaf={isLeaf}>{this.renderTreeNode(item._id)}</TreeNode>);
                }
                else {
                    root.push(<TreeNode key={item._id} title={header}
                                        isLeaf={isLeaf}></TreeNode>);
                }
            }
        })
        return root;
    }

    render() {
        return (<div>
            {
                <Tree onSelect={this.handleSelectNotebook} multiple={false} defaultExpandAll={true}
                      selectedKeys={this.state.selectedKeys}>
                    {
                        this.renderTreeNode(undefined)
                    }
                </Tree>
            }
        </div>)
    }
}

NoteTreeView.PropTypes = {
    onAddNotebook: PropTypes.func,
    onModifyNotebook: PropTypes.func,
    onDeleteNotebook: PropTypes.func,
    onSelectNotebook: PropTypes.func,
}