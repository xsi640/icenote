import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Modal, Input, Alert} from 'antd'
import * as NotebookModalActions from '../actions/notebookmodalactions'
import AppContext from '../context/appcontext'

class NotebookModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            error: '',
            title: '',
        }
        this.handleSave = this.handleSave.bind(this);
        this.show = this.show.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (typeof nextProps.notebook !== 'undefined') {
            this._notebook = nextProps.notebook;
            AppContext.notebookChanged();
            this.handleClose();
        }
    }

    handleSave() {
        if (!this._validInput()) {
            return;
        }
        let notebook = {};
        if (this._notebook !== null) {
            notebook._id = this._notebook._id;
            notebook.parentId = this._notebook.parentId;
        }
        if (this._parent !== null) {
            notebook.parentId = this._parent._id;
        }
        notebook.title = this.state.title;
        this.props.save(notebook)
    }

    handleClose() {
        this.setState({visible: false});
    }

    handleChange(name, value) {
        this.setState({[name]: value})
    }

    _validInput() {
        if (this.state.title === '') {
            this.setState({error: 'title is null.'})
            return false;
        }
        return true;
    }

    show(parentNotebook, notebook) {
        this._parent = parentNotebook;
        this._notebook = notebook;
        if (this._notebook !== null) {
            this.setState({title: this._notebook.title});
        } else {
            this.setState({title: ''})
        }
        this.setState({visible: true});
    }

    render() {
        return (
            <div>
                <Modal title={<div
                    className="unselect">{typeof this._notebook === 'undefined' || this._notebook === null ? 'Add NoteBook' : 'Modify NoteBook'}</div>}
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
                    {
                        typeof this._parent === 'undefined' || this._parent === null ? null :
                            <div className="unselect">Parent: {this._parent.title}</div>
                    }
                    <div className="unselect">
                        Title:
                    </div>
                    <div>
                        <Input placeholder="Input the notebook title." value={this.state.title}
                               onPressEnter={this.handleSave} onChange={(e) => {
                            this.handleChange('title', e.target.value)
                        }}/>
                    </div>
                </Modal>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return state.NotebookModalReducer;
}

export default connect(mapStateToProps, NotebookModalActions, null, {withRef: true})(NotebookModal)