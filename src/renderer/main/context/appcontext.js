import EventEmitter from '../../utils/eventemitter'
import IPCMESSAGE from '../../../constipc'
const {ipcRenderer} = require('electron')
import _ from 'underscore'

class AppContext {

    constructor() {
        this._em = new EventEmitter();
    }

    get TagList() {
        return this._TagList;
    }

    get NotebookList() {
        return this._NotebookList;
    }

    loadNotebook(callback) {
        ipcRenderer.once(IPCMESSAGE.NOTEBOOK_LIST, (event, args) => {
            if (!_.isUndefined(args.data)) {
                this._NotebookList = args.data;
            }
            if (!_.isUndefined(callback)) {
                callback(args.error, args.data);
            }
        })
        ipcRenderer.send(IPCMESSAGE.NOTEBOOK_LIST);
    }

    loadTags(callback) {
        ipcRenderer.once(IPCMESSAGE.TAGS_LIST, (event, args) => {
            if (!_.isUndefined(args.data)) {
                this._TagList = args.data;
            }
            if (!_.isUndefined(callback)) {
                callback(args.error, args.data);
            }
        })
        ipcRenderer.send(IPCMESSAGE.TAGS_LIST);
    }

    onTagListChanged(callback) {
        this._em.on('TagListChanged', callback);
    }

    tagListChanged() {
        this.loadTags(() => {
            this._em.emit('TagListChanged');
        })
    }

    onNotebookChanged(callback) {
        this._em.on('NotebookChanged', callback);
    }

    notebookChanged() {
        this.loadNotebook(() => {
            this._em.emit('NotebookChanged');
        })
    }
}

export default new AppContext();