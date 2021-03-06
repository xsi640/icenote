const Store = require('../utils/store')
const guid = require('../utils/guid')
const _ = require('underscore')

class TagCache {
    constructor() {
        this._store = new Store('tagcache.json');
        this._store.load();
        this._data = this._store.Data;
    }

    add(tag) {
        if (tag.length === 0)
            return;

        let currentTag = _.find(this._data, (item) => {
            return item.text === tag;
        })
        if (_.isUndefined(currentTag)) {
            let result = {
                _id: guid.create().value,
                text: tag,
                count: 1
            }
            this._data.push(result);
            this._store.save();
            return result;
        } else {
            currentTag.count = currentTag.count + 1;
            this._store.save();
            return currentTag;
        }
    }

    remove(tag) {
        let index = _.findIndex(this._data, (item) => {
            return item.text === tag;
        })
        if (index !== -1) {
            let currentTag = this._data[index];
            if (currentTag.count <= 1) {
                this._data.splice(index, 1);
            } else {
                currentTag.count -= 1;
            }
            this._store.save();
        }
    }

    findAll() {
        return this._data;
    }
}

module.exports = TagCache;