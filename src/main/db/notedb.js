const Datastore = require('nedb')
const log = require('electron-log');

const db = new Datastore({filename: 'database/note.db', autoload: true});

const insertOrUpdate = (note, callback) => {
    log.info('Note insertOrUpdate Note:' + JSON.stringify(note))
    if (typeof note._id === 'undefined') {
        db.insert(note, callback);
    } else {
        db.findOne({_id: note._id}, (err, doc) => {
            if (err)
                callback(err, doc)
            if (doc === null) {
                db.insert(note, callback);
            } else {
                db.update({_id: doc._id}, note, {}, () => {
                    callback(undefined, note);
                })
            }
        });
    }
}

const remove = (ids, callback) => {
    log.info('Note remove ids:' + JSON.stringify(ids))
    db.remove({_id: {$in: ids}}, {}, callback)
}

const removeByCategoryId = (categoryId, callback) => {
    log.info('Note removeByCategoryId categoryId:' + categoryId)
    db.remove({categoryId: categoryId}, {}, callback)
}

const findNotesByCategoryId = (categoryId, callback) => {
    log.info('Note findNodesByCategoryId categoryId:' + categoryId)
    db.find({categoryId: categoryId}, {}, callback)
}

const findNotesByTags = (tags, callback) => {
    log.info('Note findNodesByTags tags:' + tags)
    db.find({tags: {$in: tags}}, {}, callback)
}

module.exports = {insertOrUpdate, remove, removeByCategoryId, findNotesByCategoryId, findNotesByTags}