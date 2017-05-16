import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal, Input} from 'antd'

export default class NoteBookModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: true
        }
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    showModal(notebook) {
        this._notebook = notebook;
        this.setState({
            visible: true,
        });
    }

    handleOk(e, data) {
        this.setState({
            visible: false,
        });
    }

    handleCancel(e) {
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <div>
                <Modal title={this._notebook ? 'Add NoteBook' : 'Modify NoteBook'} visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}>
                    <div>Title:</div>
                    <div><Input/></div>
                </Modal>
            </div>)
    }
}

NoteBookModal.PropTypes = {
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
}