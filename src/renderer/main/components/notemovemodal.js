import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Modal, TreeSelect, Alert} from 'antd'
const TreeNode = TreeSelect.TreeNode;
import * as NoteMoveModalActions from '../actions/notemovemodalactions'

class NoteMoveModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            error: '',
            notebookId: '',
        }
        this._save = this._save.bind(this);
        this.show = this.show.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (typeof nextProps.note !== 'undefined') {
            this._note = nextProps.note;
            this.onClose();
        }
    }

    show(note) {
        this._note = note;
        this.setState({visible: true});
    }

    _save() {
        if (this._note.notebookId === this.state.notebookId) {
            this.onClose();
        } else {
            this.props.save(this._note, this.state.notebookId);
        }
    }

    onClose() {
        this.setState({visible: false});
        this.props.onClose(this._note);
    }

    onChange(value) {
        this.setState({note: value})
    }

    renderTreeNode(parentId) {
        let {dataSource} = this.props;
        if (typeof dataSource === 'undefined')
            return;
        if (dataSource.length === 0) return;
        let root = [];
        dataSource.map(item => {
            if (item.parentId === parentId) {
                root.push(<TreeNode value={item._id} title={item.title} key={item._id}/>)
            }
        })
        return root;
    }

    render() {
        return (
            <div>
                <Modal title={<div
                    className="unselect">Move to</div>}
                       visible={this.state.visible}
                       onOk={this._save} onCancel={this.onClose}
                       closable={false}>
                    {
                        typeof this.state.error === 'string' && this.state.error !== '' ?
                            <Alert message={this.state.error}
                                   type="error"
                                   closable
                            /> : null
                    }
                    <div className="unselect">
                        The note:{this._note ? this._note.title : null}
                    </div>
                    <div className="unselect">
                        Move to:
                        <div className="select">
                            <TreeSelect
                                showSearch
                                style={{width: 300}}
                                value={this.state.notebookId}
                                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                placeholder="Please select"
                                allowClear
                                treeDefaultExpandAll
                                onChange={this.onChange}
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
    onClose: PropTypes.func,
    show: PropTypes.func,
    dataSource: PropTypes.array,
}

const mapStateToProps = (state) => {
    return state.NoteMoveModalReducer;
}

export default connect(mapStateToProps, NoteMoveModalActions, null, {withRef: true})(NoteMoveModal)