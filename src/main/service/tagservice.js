const TagsCache = require('../cache/tagscache')

const TagsCache = new TagsCache();

const findAll = (callback) => {
    callback(undefined, TagsCache.findAll())
}

const addTags = (tags) => {

}

const deleteTags = (tags) => {

}

module.exports = {
    findAll,
    addTags,
    deleteTags,
}