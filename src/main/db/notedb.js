const Datastore = require('nedb')
const log = require('electron-log');

const db = new Datastore({filename: 'database/note.db', autoload: true});

const insertOrUpdate = (content, callback) => {
    log.info('Note insertOrUpdate Note:' + JSON.stringify(content))
    if (typeof content._id === 'undefined') {
        db.insert(content, callback);
    } else {
        db.findOne({_id: content._id}, (err, doc) => {
            if (err)
                callback(err, doc)
            if (doc === null) {
                db.insert(content, callback);
            } else {
                db.update({_id: doc._id}, content, {}, () => {
                    callback(undefined, content);
                })
            }
        });
    }
}

const get = (id, callback) => {
    db.findOne({_id: id}, callback);
}

const remove = (ids, callback) => {
    log.info('Note remove ids:' + JSON.stringify(ids))
    db.remove({_id: {$in: ids}}, {multi: true}, callback)
}

const removeByNotebookId = (notebookId, callback) => {
    log.info('Note removeByNotebookId notbookId:' + notebookId)
    db.remove({notebookId: notebookId}, {}, callback)
}

const findNotesByNotebookId = (notebookId, callback) => {
    log.info('Note findNotesByNotebookId notebookId:' + notebookId)
    // db.find({notebookId: notebookId}, {}, callback)
    db.find({notebookId: notebookId}).sort({lastUpdateTime: -1}).exec(callback);
}

const findNotesByTags = (tags, callback) => {
    log.info('Note findNotesByTags tags:' + tags)
    db.find({tags: {$in: tags}}, {}, callback)
}

module.exports = {insertOrUpdate, get, remove, removeByNotebookId, findNotesByNotebookId, findNotesByTags}