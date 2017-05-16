const TagsDB = require('../db/tagsdb')

const insertOrUpdate = (tag, callback) => {
    TagsDB.insertOrUpdate(tag, callback)
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
    TagsDB.remove(arrId, callback)
}

const findAll = (callback) => {
    TagsDB.findAll(callback)
}

module.exports = {
    insertOrUpdate,
    remove,
    findAll
}