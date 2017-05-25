const Store = require('../utils/store')
const utils = require('../utils/utils')
const guid = require('../utils/guid')
const _ = require('underscore')

class NoteBookCache {
    constructor() {
        this._store = new Store('notebookcache');
        this._store.load();
        this._data = this._store.Data;
    }

    insertOrUpdate(notebook) {
        if (typeof notebook._id === 'undefined') {
            this.insert(notebook);
        } else {
            let nb = this.get(notebook._id);
            if (typeof nb === 'undefined') {
                this.insert(notebook)
            } else {
                this.update(notebook)
            }
        }
    }

    insert(notebook) {
        if (typeof notebook._id === 'undefined')
            notebook._id = guid.create().value;
        this._data.push(notebook);
    }

    update(notebook) {
        this.delete(notebook._id);
        this._data.push(notebook);
    }

    constains(notebookId) {
        return this.get(notebookId) !== undefined;
    }

    delete(notebookId) {
        let index = this.findIndex(notebookId);
        if (index !== -1) {
            this._data.splice(index, 1);
        }
    }

    findAll() {
        return this._data.sort(utils.compare('createTime'));
    }

    findIndex(notebookId) {
        return _.findIndex(this._data, (item) => {
            return item._id === notebookId;
        })
    }

    get(notebookId) {
        return _.find(this._data, (item) => {
            return item._id === notebookId;
        });
    }
}

module.exports = NoteBookCache;