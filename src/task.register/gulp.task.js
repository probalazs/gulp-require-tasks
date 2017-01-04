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
        return (this._hasDeps()) ? [] : _.clone(this._module.dep);
    }

    _hasDeps() {
        return _.isUndefined(this._module.dep);
    }

    get fn() {
        if (this._isNativeTask()) {
            return this._module.content.nativeTask;
        } else if (this._isNormalTask()) {
            return this._getNormalTask();
        } else {
            return (callback) => callback();
        }
    }

    _isNativeTask() {
        return _.isFunction(this._module.content.nativeTask);
    }

    _isNormalTask() {
        return this._isTaskExportedFromModule() || _.isFunction(this._module.content.fn);
    }

    _isTaskExportedFromModule() {
        return _.isFunction(this._module.content);
    }

    _getNormalTask() {
        const fn = (this._isTaskExportedFromModule()) ?
            this._module.content :
            this._module.content.fn.bind(this._module.content);
        return (callback) => fn(gulp, callback);
    }
};
