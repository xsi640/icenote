const Datastore = require('nedb')
const log = require('electron-log');

const db = new Datastore({filename: 'database/content.db', autoload: true});

const insertOrUpdate = (content, callback) => {
    log.info('Content insertOrUpdate Note:' + JSON.stringify(content))
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
    log.info('Content remove ids:' + JSON.stringify(ids))
    db.remove({_id: {$in: ids}}, {}, callback)
}

const removeByNotebookId = (notebookId, callback) => {
    log.info('Content removeByNotebookId categoryId:' + notebookId)
    db.remove({notebookId: notebookId}, {}, callback)
}

const findNotesByNotebookId = (notebookId, callback) => {
    log.info('Content findNotesByNotebookId categoryId:' + notebookId)
    db.find({notebookId: notebookId}, {}, callback)
}

const findNotesByTags = (tags, callback) => {
    log.info('Content findNotesByTags tags:' + tags)
    db.find({tags: {$in: tags}}, {}, callback)
}

module.exports = {insertOrUpdate, remove, removeByNotebookId, findNotesByNotebookId, findNotesByTags}