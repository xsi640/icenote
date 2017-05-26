const path = require('path')
const utils = require('./utils')

class Store {
    constructor(fileName) {
        this._path = path.join(utils.getUserDataPath(), fileName);
        console.log(this._path);
        this.load();
    }

    get Data() {
        return this._data;
    }

    save() {
        utils.save(this._path, this._data);
    }

    load() {
        try {
            this._data = utils.read(this._path);
        } catch (error) {
            this._data = [];
        }
    }
}

module.exports = Store;