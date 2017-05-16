const Datastore = require('nedb')
const log = require('electron-log');

const db = new Datastore({filename: 'database/category.db', autoload: true});

const insertOrUpdate = (category, callback) => {
    log.info('Category insertOrUpdate Category:'+JSON.stringify(category))
    if (typeof category._id === 'undefined') {
        db.insert(category, callback);
    } else {
        db.findOne({_id: category._id}, (err, doc) => {
            if (err)
                callback(err, doc)
            if (doc === null) {
                db.insert(category, callback);
            } else {
                db.update({_id: doc._id}, category, {}, () => {
                    callback(undefined, category);
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