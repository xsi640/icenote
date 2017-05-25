const NoteDB = require('../db/notedb')
const TagService = require('./tagservice')

const insertOrUpdate = (note, callback) => {
    if (typeof note._id === 'undefined') {
        NoteDB.insert(note, (err, newDoc) => {
            if (err) {
                callback(err, undefined);
            } else {
                TagService.addTags(newDoc.tags);
                callback(err, newDoc);
            }
        });
    } else {
        NoteDB.get(note._id, (err, oldDoc) => {
            if (err) {
                callback(err, undefined);
            } else {
                if (oldDoc === null) {
                    NoteDB.insert(note, (err, newDoc) => {
                        if (err) {
                            callback(err, undefined);
                        } else {
                            TagService.addTags(note.tags);
                            callback(err, newDoc);
                        }
                    });
                } else {
                    NoteDB.update(note, (err, newDoc) => {
                        if (err) {
                            callback(err, undefined);
                        } else {
                            TagService.deleteTags(oldDoc.tags);
                            TagService.addTags(newDoc.tags);
                            callback(err, newDoc);
                        }
                    });
                }
            }
        });
    }
}

const remove = (ids, callback) => {
    NoteDB.get(ids, (err, docs) => {
        if (err) {
            callback(err, undefined);
        } else {
            NoteDB.remove(ids, (err, num) => {
                if (err) {
                    callback(err, undefined);
                } else {
                    for (let doc of docs) {
                        TagService.deleteTags(doc.tags);
                    }
                    callback(err, num);
                }
            })
        }
    })
}

const removeByNotebookId = (notebookId, callback) => {
    findNotesByNotebookId(notebookId, (err, docs) => {
        if (err) {
            callback(err, docs);
        } else {
            let ids = [];
            for (let doc of docs) {
                ids.push(doc._id);
            }
            this.remove(ids, callback);
        }
    })
}

const findNotesByNotebookId = (notebookId, callback) => {
    NoteDB.findNotesByNotebookId(notebookId, callback)
}

const findNotesByTags = (tags, callback) => {
    NoteDB.findNotesByTags(tags, callback)
}

module.exports = {
    insertOrUpdate,
    remove,
    removeByNotebookId,
    findNotesByNotebookId,
    findNotesByTags
}