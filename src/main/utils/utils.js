const electron = require('electron')
const path = require('path')
const fs = require('fs')

const getUserDataPath = () => {
    return (electron.app || electron.remote.app).getPath('userData');
}

const save = (path, jsonObject) => {
    fs.writeFileSync(path, jsonObject);
}

const read = (path) => {
    return JSON.stringify(fs.readFileSync(path));
}

const compare = (name) => {
    return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        }
        else {
            throw ("error");
        }
    }
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
    compare,
    loop,
}