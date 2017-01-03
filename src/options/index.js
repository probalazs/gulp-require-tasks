'use strict';

const _ = require('lodash');
const path = require('path');
const validator = require('./validator');

const DEFAULT_OPTIONS = Object.freeze({
    separator: ':',
    arguments: [],
    path: [path.join(process.cwd(), 'gulp-tasks')]
});

module.exports = class Options {
    constructor(optionsInput) {
        this._options = this._getOptions(optionsInput);
        validator.validate(this._options);
    }

    get arguments() {
        return _.clone(this._options.arguments);
    }

    get separator() {
        return this._options.separator;
    }

    get path() {
        return _.clone(this._options.path);
    }

    _getOptions(optionsInput) {
        const options = _.merge({}, DEFAULT_OPTIONS, optionsInput);
        if (!_.isArray(options.path)) {
            options.path = [options.path];
        }
        return options;
    }
};
