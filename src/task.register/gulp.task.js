'use strict';

const gulp = require('gulp');
const _ = require('lodash');
const path = require('path');
const helper = require('./helper');

module.exports = class GulpTask {
    constructor(loadedModule, options) {
        this._module = loadedModule;
        this._options = options;
    }

    get name() {
        const relativePath = path.relative(this._module.baseFolder, this._module.path);
        return helper.removeExtension(relativePath)
            .split(path.sep)
            .join(this._options.separator);
    }

    get deps() {
        return (this._hasDeps()) ? _.clone(this._module.dep) : [];
    }

    _hasDeps() {
        return _.isArray(this._module.exports.dep);
    }

    get fn() {
        if (this._isNativeTask()) {
            return this._module.exports.nativeTask;
        } else if (this._isNormalTask()) {
            return this._getNormalTask();
        } else {
            return (callback) => callback();
        }
    }

    _isNativeTask() {
        return _.isFunction(this._module.exports.nativeTask);
    }

    _isNormalTask() {
        return this._isTaskExportedFromModule() || _.isFunction(this._module.exports.fn);
    }

    _isTaskExportedFromModule() {
        return _.isFunction(this._module.exports);
    }

    _getNormalTask() {
        const fn = (this._isTaskExportedFromModule()) ?
            this._module.exports :
            this._module.exports.fn.bind(this._module.exports);
        return (callback) => fn(gulp, callback);
    }
};
