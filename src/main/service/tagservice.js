const TagsCache = require('../cache/tagscache')
const _ = require('underscore')

const _TagsCache = new TagsCache();

const findAll = (callback) => {
    callback(undefined, _TagsCache.findAll())
}

const addTags = (tags) => {
    if (_.isUndefined(tags))
        return;
    if (_.isArray(tags)) {
        for (let tag of tags) {
            console.log(tag);
            _TagsCache.add(tag);
        }
    } else {
        _TagsCache.add(tags);
    }
}

const deleteTags = (tags) => {
    if (_.isUndefined(tags))
        return;
    if (_.isArray(tags)) {
        for (let tag of tags) {
            _TagsCache.remove(tag);
        }
    } else {
        _TagsCache.remove(tags);
    }
}

module.exports = {
    findAll,
    addTags,
    deleteTags,
}