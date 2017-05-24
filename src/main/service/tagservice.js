const TagsDB = require('../db/tagsdb')
const log = require('electron-log');

let TagCache = null;

const load = (callback) => {
    if (TagCache === null) {
        TagsDB.findAll((err, docs) => {
            if (docs.length > 0) {
                TagCache = new Set(docs);
            } else {
                TagCache = new Set();
            }
            callback(err, docs);
        })
    } else {
        callback(undefined, Array.from(TagCache));
    }
}

const save = (callback) => {
    TagsDB.clear((err, num) => {
        if (err) {
            callback(err);
            return;
        }
        TagsDB.insert(Array.from(TagCache), (err, docs) => {
            if (err) {
                callback(err);
                return;
            }
            TagCache = new Set(docs);
            if (typeof callback === 'function')
                callback(undefined, docs);
        });
    });
}

const addTags = (tags) => {
    for (let tag of tags) {
        let currTag = get(tag);
        if (currTag != null) {
            currTag.count += 1;
        } else {
            TagCache.add({text: tag, count: 1});
        }
    }
}

const deleteTags = (tags) => {
    for (let tag of tags) {
        let currTag = get(tag);
        if (currTag != null) {
            currTag.count -= 1;
            if (currTag.count === 0) {
                TagCache.delete(currTag);
            }
        }
    }
}

const get = (text) => {
    let result = null;
    for (let tag of TagCache) {
        if (tag.text === text) {
            result = tag;
            break;
        }
    }
    return result;
}

const findAll = (callback) => {
    load((err, docs) => {
        if (docs.length > 0) {
            docs.sort((a, b) => {
                return b.count - a.count;
            })
        }
        callback(err, docs);
    })
}

module.exports = {
    load,
    save,
    addTags,
    deleteTags,
    get,
    findAll,
}