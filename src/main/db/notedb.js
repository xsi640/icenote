const Datastore = require('nedb')
const utils = require('../utils/utils')
const path = require('path')
const _ = require('underscore')

const db = new Datastore({filename: path.join(utils.getUserDataPath(), 'note.db'), autoload: true});

const insertOrUpdate = (note, callback) => {
    if (typeof note._id === 'undefined') {
        db.insert(note, callback);
    } else {
        db.findOne({_id: note._id}, (err, doc) => {
            if (err)
                callback(err, doc)
            if (doc === null) {
                db.insert(note, callback);
            } else {
                db.update({_id: doc._id}, note, {}, () => {
                    callback(undefined, note);
                })
            }
        });
    }
}

const insert = (note, callback) => {
    db.insert(note, callback);
}

const update = (note, callback) => {
    db.update({_id: note._id}, note, {}, callback);
}

const get = (id, callback) => {
    if (_.isArray(id)) {
        db.find({_id: {$in: id}}, callback);
    } else {
        db.findOne({_id: id}, callback);
    }
}

const remove = (id, callback) => {
    if (_.isArray(id)) {
        db.remove({_id: {$in: id}}, {multi: true}, callback)
    } else {
        db.remove({_id: id}, callback);
    }
}

const removeByNotebookId = (notebookId, callback) => {
    db.remove({notebookId: notebookId}, {multi: true}, callback)
}

const findNotesByNotebookId = (notebookId, callback) => {
    db.find({notebookId: notebookId}).sort({createTime: -1}).exec(callback);
}

const findNotesByNotebookIdSort = (notebookId, sort, order, callback) => {
    db.find({notebookId: notebookId}).sort({[sort]: order}).exec(callback);
}

const findNotesByTags = (tags, callback) => {
    db.find({"tags.text": {$in: tags}}).sort({createTime: -1}).exec(callback);
}

const findNotesByTagsSort = (tags, sort, order, callback) => {
    db.find({"tags.text": {$in: tags}}).sort({[sort]: order}).exec(callback);
}

module.exports = {
    insertOrUpdate,
    insert,
    update,
    get,
    remove,
    removeByNotebookId,
    findNotesByNotebookId,
    findNotesByNotebookIdSort,
    findNotesByTags,
    findNotesByTagsSort,
}