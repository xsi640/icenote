const NoteDB = require('../db/notedb')
const TagService = require('./tagservice')
const utils = require('../utils/utils')
const _ = require('underscore')
const markdownpdf = require("markdown-pdf")
const {dialog} = require('electron')
const Stream = require('stream');
const fs = require('fs');

const insertOrUpdate = (note, callback) => {
    if (typeof note._id === 'undefined') {
        NoteDB.insert(note, (err, newDoc) => {
            if (err) {
                callback(err, undefined);
            } else {
                TagService.addTags(utils.extract(newDoc.tags, 'text'));
                callback(err, newDoc);
            }
        });
    } else {
        NoteDB.get(note._id, (err, oldDoc) => {
            if (err) {
                callback(err, undefined);
            } else {
                if (oldDoc === null) {
                    NoteDB.insert(note, (err, newDoc) => {
                        if (err) {
                            callback(err, undefined);
                        } else {
                            TagService.addTags(utils.extract(note.tags, 'text'));
                            callback(err, newDoc);
                        }
                    });
                } else {
                    NoteDB.update(note, (err, num) => {
                        if (err) {
                            callback(err, undefined);
                        } else {
                            TagService.deleteTags(utils.extract(oldDoc.tags, 'text'));
                            TagService.addTags(utils.extract(note.tags, 'text'));
                            callback(err, note);
                        }
                    });
                }
            }
        });
    }
}

const remove = (ids, callback) => {
    NoteDB.get(ids, (err, docs) => {
        if (err) {
            callback(err, undefined);
        } else {
            NoteDB.remove(ids, (err, num) => {
                if (err) {
                    callback(err, undefined);
                } else {
                    for (let doc of docs) {
                        TagService.deleteTags(utils.extract(doc.tags, 'text'));
                    }
                    callback(err, num);
                }
            })
        }
    })
}

const removeByNotebookId = (notebookId, callback) => {
    findNotesByNotebookId(notebookId, (err, docs) => {
        if (err) {
            callback(err, docs);
        } else {
            let ids = [];
            for (let doc of docs) {
                ids.push(doc._id);
            }
            remove(ids, callback);
        }
    })
}

const findNotesByNotebookId = (notebookId, callback) => {
    NoteDB.findNotesByNotebookId(notebookId, callback)
}

const findNotesByTags = (tags, callback) => {
    if (!_.isArray(tags)) {
        tags = [tags];
    }
    NoteDB.findNotesByTags(tags, callback)
}

const move = (ids, notebookId, callback) => {
    NoteDB.get(ids, (err, docs) => {
        if (err) {
            callback(err, undefined);
        } else {
            let size = 0;
            utils.loop(0, docs.length - 1, (index, resolve, reject) => {
                let doc = docs[index];
                doc.notebookId = notebookId;
                NoteDB.update(doc, (err, num) => {
                    if (err) {
                        reject(err);
                    } else {
                        size += num;
                        resolve();
                    }
                })
            }, () => {
                callback(undefined, size);
            }, (err) => {
                callback(err, undefined);
            })
        }
    })
}

const exportToPdf = (id) => {
    dialog.showSaveDialog({
        title: 'export to pdf', filters: [
            {name: 'pdf file', extensions: ['pdf']},
        ]
    }, (outputPath) => {
        if (!_.isUndefined(outputPath) && outputPath !== '') {
            NoteDB.get(id, (error, doc) => {
                markdownpdf().from.string(doc.content).to(outputPath);
            })
        }
    })
}

const exportToFile = (id) => {
    dialog.showSaveDialog({
        title: 'export to file', filters: [
            {name: 'markdown file', extensions: ['md']},
        ]
    }, (outputPath) => {
        if (!_.isUndefined(outputPath) && outputPath !== '') {
            NoteDB.get(id, (error, doc) => {
                fs.writeFile(outputPath, doc.content);
            })
        }
    })
}

module.exports = {
    insertOrUpdate,
    remove,
    removeByNotebookId,
    findNotesByNotebookId,
    findNotesByTags,
    move,
    exportToPdf,
    exportToFile
}