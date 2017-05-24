import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Modal, TreeSelect, Alert} from 'antd'
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
            this.props.save(this._note._id, this.state.notebookId);
        }
    }

    onClose() {
        this.setState({visible: false});
        this.props.onClose(this._note);
    }

    onChange(value) {
        this.setState({note: value})
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
                        The note:{this._note.title}
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
                            </TreeSelect>
                        </div>
                    </div>
                </Modal>
            </div>)
    }
}

NotebookModal.PropTypes = {
    onClose: PropTypes.func,
    show: PropTypes.func,
    dataSource: PropTypes.array,
}

const mapStateToProps = (state) => {
    return state.NoteMoveModalReducer;
}

export default connect(mapStateToProps, NoteMoveModalActions, null, {withRef: true})(NoteMoveModal)