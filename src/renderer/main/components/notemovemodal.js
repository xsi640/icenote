import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Modal, TreeSelect, Alert} from 'antd'
const TreeNode = TreeSelect.TreeNode;
import AppContext from '../context/appcontext'
import _ from 'underscore'
import * as NoteMoveModalActions from '../actions/notemovemodalactions'

class NoteMoveModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            dataSource: [],
            error: '',
            notebookId: '',
        }
        this.handleSave = this.handleSave.bind(this);
        this.show = this.show.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({dataSource: AppContext.NotebookList})
        AppContext.onNotebookChanged(() => {
            if (!_.isUndefined(AppContext.NotebookList)) {
                this.setState({dataSource: AppContext.NotebookList})
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (typeof nextProps.num !== 'undefined') {
            this.props.onSaved();
            this.handleClose();
        }
    }

    handleClose() {
        this.setState({visible: false});
    }

    handleChange(value) {
        this.setState({notebookId: value})
    }

    show(notes) {
        this._notes = notes;
        this.setState({visible: true, notebookId: this._notes[0].notebookId});
    }

    handleSave() {
        if (this._notes[0].notebookId === this.state.notebookId) {
            this.handleClose();
        } else {
            this.props.move(this._notes, this.state.notebookId);
        }
    }

    renderTreeNode(parentId) {
        let {dataSource} = this.state;
        if (typeof dataSource === 'undefined')
            return;
        if (dataSource.length === 0) return;
        let root = [];
        dataSource.map(item => {
            if (item.parentId === parentId) {
                let isLeaf = true;
                for (let node of dataSource) {
                    if (typeof node.parentId !== 'undefined' && node.parentId === item._id) {
                        isLeaf = false;
                        break;
                    }
                }
                if (!isLeaf)
                    root.push(<TreeNode value={item._id} title={item.title}
                                        key={item._id}>{this.renderTreeNode(item._id)}</TreeNode>)
                else
                    root.push(<TreeNode value={item._id} title={item.title} key={item._id}/>)

            }
        })
        return root;
    }

    render() {
        let title = "The Untitled Note.";
        if (typeof this._notes !== 'undefined') {
            if (this._notes.length === 1) {
                if (this._notes[0].title !== '') {
                    title = `The ${this._notes[0].title} Note.`
                }
            } else {
                title = "Selected Notes."
            }
        }
        return (
            <div>
                <Modal title={<div
                    className="unselect">Move to</div>}
                       visible={this.state.visible}
                       onOk={this.handleSave} onCancel={this.handleClose}
                       closable={false}>
                    {
                        typeof this.state.error === 'string' && this.state.error !== '' ?
                            <Alert message={this.state.error}
                                   type="error"
                                   closable
                            /> : null
                    }
                    <div className="unselect">
                        {title}
                    </div>
                    <div className="unselect">
                        Move to:
                        <div>
                            <TreeSelect
                                showSearch
                                style={{width: 300}}
                                value={this.state.notebookId}
                                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                placeholder="Please select"
                                allowClear={false}
                                treeDefaultExpandAll
                                onChange={this.handleChange}
                            >
                                {
                                    this.renderTreeNode(undefined)
                                }
                            </TreeSelect>
                        </div>
                    </div>
                </Modal>
            </div>)
    }
}

NoteMoveModal.PropTypes = {
    onSaved: PropTypes.func,
    show: PropTypes.func,
}

const mapStateToProps = (state) => {
    return state.NoteMoveModalReducer;
}

export default connect(mapStateToProps, NoteMoveModalActions, null, {withRef: true})(NoteMoveModal)