const Datastore = require('nedb')
const log = require('electron-log');

const db = new Datastore({filename: 'database/tags.db', autoload: true});

const insertOrUpdate = (tag, callback) => {
    log.info('Tags insertOrUpdate tag:' + JSON.stringify(tag))
    if (typeof tag._id === 'undefined') {
        db.insert(tag, callback);
    } else {
        db.findOne({_id: tag._id}, (err, doc) => {
            if (err)
                callback(err, doc)
            if (doc === null) {
                db.insert(tag, callback);
            } else {
                db.update({_id: doc._id}, tag, {}, () => {
                    callback(undefined, tag);
                })
            }
        });
    }
}

const remove = (ids, callback) => {
    log.info('Tags remove ids' + JSON.stringify(ids));
    db.remove({_id: {$in: ids}}, {}, (err, num) => {
        callback(err, num);
    })
}

const clear = (callback) => {
    log.info('Tags clear');
    db.remove({}, {multi: true}, callback);
}

const insert = (tag, callback) => {
    log.info('Tags insert ' + JSON.stringify(tag));
    db.insert(tag, callback);
}

const findAll = (callback) => {
    log.info('Tags findall')
    db.find({}).exec((err, docs) => {
        callback(err, docs);
    })
}

const findTags = (tags, callback) => {
    db.find({name: {$in: tags}}, callback);
}

const updateCount = (id, count, callback) => {
    db.update({_id: id}, {count: count}, {}, callback);
}

module.exports = {insertOrUpdate, insert, remove, clear, findAll, findTags, updateCount}