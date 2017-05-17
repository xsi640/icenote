import React, {Component} from 'react'
import {connect} from 'react-redux'
import SplitPane from 'react-split-pane'
import NoteTreeView from '../components/notetreeview'
import Tags from '../components/tags'
import './main.scss'
import './splitpane.scss'
import 'antd/dist/antd.css';
import Content from './content'
import {Button, Modal} from "antd";
import NotebookModal from '../components/notebookmodal'
import * as MainActions from '../actions/mainactions'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notebookDataSource: []
        }

        this.onAddNotebook = this.onAddNotebook.bind(this);
        this.onModifyNotebook = this.onModifyNotebook.bind(this);
        this.onDeleteNotebook = this.onDeleteNotebook.bind(this);
        this.onSelectNotebook = this.onSelectNotebook.bind(this);
        this.noteBookModalClose = this.noteBookModalClose.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (typeof nextProps.deleteNum === 'number' && nextProps.deleteNum > 0) {
            this.props.getNotebookList();
        }
    }

    componentDidMount() {
        this.props.getNotebookList();
    }

    onAddNotebook(e, data) {
        this.refs.notebookModal.getWrappedInstance().show(data, null);
    }

    onModifyNotebook(e, data) {
        this.refs.notebookModal.getWrappedInstance().show(null, data);
    }

    onDeleteNotebook(e, data) {
        let {deleteNotebookList} = this.props;
        Modal.confirm({
            title: 'delete "' + data.title + '" notebook?',
            content: 'you can\'t undo the action.',
            onOk() {
                deleteNotebookList(data._id);
            },
            onCancel() {
            },
        });
    }

    onSelectNotebook(keys, sender) {
        let notebook = null;
        for (let nb of this.state.notebookDataSource) {
            let exists = false;
            for(let key of keys){
                if(key === nb._id){
                    exists = true;
                    break;
                }
            }
            if(exists){
                notebook = nb;
            }
        }
        if (notebook != null) {
            this.refs.content.getWrappedInstance().setNotebook(notebook);
        }
    }

    noteBookModalOk() {
    }

    noteBookModalClose() {
        this.props.getNotebookList();
    }

    render() {
        return (
            <div>
                <SplitPane split="vertical" minSize={200} defaultSize={220} maxSize={-800}>
                    <div className="left">
                        <SplitPane split="horizontal" minSize={300} defaultSize={400} maxSize={-200}>
                            <div className="notebook">
                                <div className="title unselect">
                                    My Notebook
                                    <Button shape="circle" icon="file-add" onClick={(e) => {
                                        this.refs.notebookModal.getWrappedInstance().show(null, null)
                                    }}/>
                                </div>
                                <div className="notebook-root">
                                    <NoteTreeView dataSource={this.state.notebookDataSource}
                                                  onAddNotebook={this.onAddNotebook}
                                                  onModifyNotebook={this.onModifyNotebook}
                                                  onDeleteNotebook={this.onDeleteNotebook}
                                                  onSelectNotebook={this.onSelectNotebook}/>
                                </div>
                            </div>
                            <div className="tags">
                                <div className="title unselect">Tags</div>
                                <Tags/>
                            </div>
                        </SplitPane>

                    </div>
                    <div className="content">
                        <Content ref="content"/>
                    </div>
                </SplitPane>
                <NotebookModal ref="notebookModal" onOK={this.noteBookModalOk} onClose={this.noteBookModalClose}/>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return state.MainReducer;
}

export default connect(mapStateToProps, MainActions, null, {withRef: true})(Main)