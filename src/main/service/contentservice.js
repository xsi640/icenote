const NoteDB = require('../db/contentdb')

const insertOrUpdate = (note, callback) => {
    NoteDB.insertOrUpdate(note, callback)
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

const removeByNotebookId = (categoryId, callback) => {
    NoteDB.removeByNotebookId(categoryId, callback)
}

const findNotesByNotebookId = (categoryId, callback) => {
    NoteDB.findNotesByNotebookId(categoryId, callback)
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