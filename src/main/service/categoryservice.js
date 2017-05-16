const CategoryDB = require('../db/categorydb')

const insertOrUpdate = (category, callback) => {
    CategoryDB.insertOrUpdate(category, callback)
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