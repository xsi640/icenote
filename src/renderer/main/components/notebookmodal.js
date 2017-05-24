import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Modal, Input, Alert} from 'antd'
import * as NotebookModalActions from '../actions/notebookmodalactions'

class NotebookModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            error: '',
            title: '',
        }
        this._save = this._save.bind(this);
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.change = this.change.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (typeof nextProps.notebook !== 'undefined') {
            this._notebook = nextProps.notebook;
            this.props.onClose(this._notebook);
            this.close();
        }
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

    _save() {
        if (!this._validInput()) {
            return;
        }
        let notebook = {};
        if (this._notebook !== null) {
            notebook._id = this._notebook._id;
            notebook.parentId = this._notebook.parentId;
        }
        if(this._parent !== null){
            notebook.parentId = this._parent._id;
        }
        notebook.title = this.state.title;
        this.props.save(notebook)
    }

    close() {
        this.setState({visible: false});
    }

    _validInput() {
        if (this.state.title === '') {
            this.setState({error: 'title is null.'})
            return false;
        }
        return true;
    }

    change(name, value) {
        this.setState({[name]: value})
    }

    render() {
        return (
            <div>
                <Modal title={<div
                    className="unselect">{typeof this._notebook === 'undefined' || this._notebook === null ? 'Add NoteBook' : 'Modify NoteBook'}</div>}
                       visible={this.state.visible}
                       onOk={this._save} onCancel={this.close}
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
                        <Input placeholder="Input the notebook title." value={this.state.title} onPressEnter={this._save} onChange={(e) => {
                            this.change('title', e.target.value)
                        }}/>
                    </div>
                </Modal>
            </div>)
    }
}

NotebookModal.PropTypes = {
    onClose: PropTypes.func,
    show: PropTypes.func,
}

const mapStateToProps = (state) => {
    return state.NotebookModalReducer;
}

export default connect(mapStateToProps, NotebookModalActions, null, {withRef: true})(NotebookModal)