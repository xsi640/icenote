const Datastore = require('nedb')
const log = require('electron-log');

const db = new Datastore({filename: 'database/content.db', autoload: true});

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

const remove = (ids, callback) => {
    log.info('Note remove ids:' + JSON.stringify(ids))
    db.remove({_id: {$in: ids}}, {}, callback)
}

const removeByNotebookId = (notebookId, callback) => {
    log.info('Note removeByNotebookId categoryId:' + notebookId)
    db.remove({categoryId: notebookId}, {}, callback)
}

const findNotesByNotebookId = (notebookId, callback) => {
    log.info('Note findNodesByCategoryId categoryId:' + notebookId)
    db.find({categoryId: notebookId}, {}, callback)
}

const findNotesByTags = (tags, callback) => {
    log.info('Note findNodesByTags tags:' + tags)
    db.find({tags: {$in: tags}}, {}, callback)
}

module.exports = {insertOrUpdate, remove, removeByNotebookId, findNotesByNotebookId, findNotesByTags}