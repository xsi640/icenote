const Datastore = require('nedb')
const log = require('electron-log');

const db = new Datastore({filename: 'database/notebook.db', autoload: true});

const insertOrUpdate = (notebook, callback) => {
    log.info('Category insertOrUpdate Category:'+JSON.stringify(notebook))
    if (typeof notebook._id === 'undefined') {
        db.insert(notebook, callback);
    } else {
        db.findOne({_id: notebook._id}, (err, doc) => {
            if (err)
                callback(err, doc)
            if (doc === null) {
                db.insert(notebook, callback);
            } else {
                db.update({_id: doc._id}, notebook, {}, () => {
                    callback(undefined, notebook);
                })
            }
        });
    }
}

const remove = (ids, callback) => {
    log.info('Category remove ids:'+JSON.stringify(ids))
    db.remove({_id: {$in: ids}}, {}, (err, num) => {
        callback(err, num);
    })
}

const findAll = (callback) => {
    log.info('Category findAll')
    db.find({}).exec((err, docs) => {
        callback(err, docs);
    })
}

module.exports = {insertOrUpdate, remove, findAll}