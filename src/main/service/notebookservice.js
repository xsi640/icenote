const NotebookDB = require('../db/notebookdb')

const insertOrUpdate = (notebook, callback) => {
    NotebookDB.insertOrUpdate(notebook, callback)
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
    NotebookDB.remove(arrId, callback)
}

const findAll = (callback) => {
    NotebookDB.findAll(callback);
}

module.exports = {
    insertOrUpdate,
    remove,
    findAll
}