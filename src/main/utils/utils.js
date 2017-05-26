const electron = require('electron')
const path = require('path')
const fs = require('fs')
const _ = require('underscore')

const getUserDataPath = () => {
    return (electron.app || electron.remote.app).getPath('userData');
}

const save = (path, jsonObject) => {
    fs.writeFileSync(path, JSON.stringify(jsonObject));
}

const read = (path) => {
    return JSON.parse(fs.readFileSync(path));
}

const convert = (array, predicate) => {
    let result = [];
    if (_.isArray(array)) {
        for (let item of array) {
            result.push(predicate(item));
        }
    }
    return result;
}

const extract = (array, propName) => {
    let result = [];
    if (_.isArray(array)) {
        for (let item of array) {
            let v = item[propName];
            if (!_.isUndefined(v)) {
                result.push(v);
            }
        }
    }
    return result;
}

const loop = (min, max, func) => {
    new Promise((resolve, reject) => {
        func(min, resolve, reject);
    }).then(() => {
        if (min < max) {
            loop(min + 1, max, func)
        }
    })
}

module.exports = {
    getUserDataPath,
    save,
    read,
    convert,
    extract,
    loop,
}