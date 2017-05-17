const CategoryDB = require('../db/notebookdb')

const insertOrUpdate = (notebook, callback) => {
    CategoryDB.insertOrUpdate(notebook, callback)
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
    CategoryDB.remove(arrId, callback)
}

const findAll = (callback) => {
    CategoryDB.findAll(callback);
}

module.exports = {
    insertOrUpdate,
    remove,
    findAll
}