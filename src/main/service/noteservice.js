const NoteDB = require('../db/notedb')

const insertOrUpdate = (content, callback) => {
    NoteDB.insertOrUpdate(content, callback)
}

const remove = (ids, callback) => {
    let arrId = [];
    if (typeof ids === 'string') {
        arrId = [ids];
    }else {
        for(let id of ids){
            arrId.push(id);
        }
    }
    NoteDB.remove(arrId, callback)
}

const removeByNotebookId = (notebookId, callback) => {
    NoteDB.removeByNotebookId(notebookId, callback)
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