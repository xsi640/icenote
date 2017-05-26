const NoteBookCache = require('../cache/notebookcache')
const NoteService = require('./noteservice')
const utils = require('../utils/utils')
const _ = require('underscore')

const _NotebookCache = new NoteBookCache();

const insertOrUpdate = (notebook, callback) => {
    _NotebookCache.insertOrUpdate(notebook);
    callback(undefined, notebook);
}

const remove = (ids, callback) => {
    if (_.isArray(ids)) {
        utils.loop(0, ids.length, (index, resolve, reject) => {
            let nb = _NotebookCache.get(ids[index]);
            if (!_.isUndefined(nb)) {
                NoteService.removeByNotebookId(nb._id, (err, num) => {
                    if (err) {
                        reject(err);
                    } else {
                        _NotebookCache.delete(ids);
                        resolve();
                    }
                })
            } else {
                resolve();
            }
        }).then(() => {
            callback(undefined, ids);
        }).catch((err) => {
            callback(err, undefined);
        });
    } else {
        let nb = _NotebookCache.get(ids);
        if (!_.isUndefined(nb)) {
            NoteService.removeByNotebookId(nb._id, (err, num) => {
                if (err) {
                    callback(err, undefined);
                } else {
                    _NotebookCache.delete(ids);
                    callback(undefined, err);
                }
            })
        }
    }
}

const findAll = (callback) => {
    callback(undefined, _NotebookCache.findAll());
}

module.exports = {
    insertOrUpdate,
    remove,
    findAll
}