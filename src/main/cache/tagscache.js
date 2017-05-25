const Store = require('../utils/store')
const utils = require('../utils/utils')
const guid = require('../utils/guid')
const _ = require('underscore')

class TagCache {
    constructor() {
        this._store = new Store('tagcache');
        this._store.load();
        this._data = this._store.Data;
    }

    insertOrUpdate(tag) {
        if (typeof tag._id === 'undefined') {
            this.insert(tag);
        } else {
            let t = this.get(tag._id);
            if (typeof t === 'undefined') {
                this.insert(tag)
            } else {
                this.update(tag)
            }
        }
    }

    insert(tag) {
        if (typeof tag._id === 'undefined')
            tag._id = guid.create().value;
        this._data.push(tag);
    }

    update(notebook) {
        this.delete(notebook._id);
        this._data.push(notebook);
    }

    constains(tagId) {
        return this.get(tagId) !== undefined;
    }

    delete(tagId) {
        let index = this.findIndex(tagId);
        if (index !== -1) {
            this._data.splice(index, 1);
        }
    }

    findAll() {
        return this._data.sort(utils.compare('createTime'));
    }

    findIndex(tagId) {
        return _.findIndex(this._data, (item) => {
            return item._id === tagId;
        })
    }

    get(tagId) {
        return _.find(this._data, (item) => {
            return item._id === tagId;
        });
    }
}

module.exports = TagCache;