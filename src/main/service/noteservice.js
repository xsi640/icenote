const NoteDB = require('../db/notedb')
const TagService = require('./tagservice')

const insertOrUpdate = (note, callback) => {
    if (typeof note._id === 'undefined') {
        NoteDB.insert(note, callback);
    } else {
        NoteDB.get(note._id, (err, doc) => {
            if (err) {
                callback(err, doc);
                return;
            }
            if (doc === null) {
                NoteDB.insert(note, callback);
            } else {
                TagService.deleteTags(getTags(doc.tags));
                NoteDB.update(note, (err, doc) => {
                    if (err) {
                        callback(err, doc);
                        return;
                    }
                    TagService.addTags(getTags(note.tags));
                    TagService.save(callback);
                })
            }
        });
    }
}

const remove = (ids, callback) => {
    let arrId = [];
    if (typeof ids === 'string') {
        arrId = [ids];
    } else {
        for (let id of ids) {
            arrId.push(id);
        }
    }

    NoteDB.get(arrId, (err, docs) => {
        if (err) {
            callback(err, docs);
            return;
        }
        if (docs.length > 0) {
            for (let doc of docs) {
                TagService.deleteTags(getTags(doc.tags));
            }
        }
        TagService.save();
        NoteDB.remove(arrId, callback)
    })
}

const removeByNotebookId = (notebookId, callback) => {
    findNotesByNotebookId(notebookId, (err, docs) => {
        if (err) {
            callback(err, docs);
            return;
        }
        if (docs.length > 0) {
            for (let doc of docs) {
                TagService.deleteTags(getTags(doc.tags));
            }
        }
        TagService.save();
        NoteDB.removeByNotebookId(notebookId, callback)
    })
}

const findNotesByNotebookId = (notebookId, callback) => {
    NoteDB.findNotesByNotebookId(notebookId, callback)
}

const findNotesByTags = (tags, callback) => {
    NoteDB.findNotesByTags(tags, callback)
}

const getTags = (tags) => {
    let result = [];
    for (let tag of tags) {
        result.push(tag.text);
    }
    return result
}

module.exports = {
    insertOrUpdate,
    remove,
    removeByNotebookId,
    findNotesByNotebookId,
    findNotesByTags
}