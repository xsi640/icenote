const TagsCache = require('../cache/tagscache')
const _ = require('underscore')

const TagsCache = new TagsCache();

const findAll = (callback) => {
    callback(undefined, TagsCache.findAll())
}

const addTags = (tags) => {
    if (_.isArray(tags)) {
        for (let tag of tags) {
            TagsCache.add(tag);
        }
    } else {
        TagsCache.add(tags);
    }
}

const deleteTags = (tags) => {
    if (_.isArray(tags)) {
        for (let tag of tags) {
            TagsCache.remove(tag);
        }
    } else {
        TagsCache.remove(tags);
    }
}

module.exports = {
    findAll,
    addTags,
    deleteTags,
}