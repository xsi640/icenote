const NoteDB = require('../db/notedb')

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

const removeByCategoryId = (categoryId, callback) => {
    NoteDB.removeByCategoryId(categoryId, callback)
}

const findNotesByCategoryId = (categoryId, callback) => {
    NoteDB.findNotesByCategoryId(categoryId, callback)
}

const findNotesByTags = (tags, callback) => {
    NoteDB.findNotesByTags(tags, callback)
}

module.exports = {
    insertOrUpdate,
    remove,
    removeByCategoryId,
    findNotesByCategoryId,
    findNotesByTags
}