'use strict';

const fs = require('fs');
const _ = require('lodash');
const VALIDATORS = [
    pathValidator,
    separatorValidator
];

module.exports = { validate: validate };

function validate(options) {
    VALIDATORS.forEach((validator) => validator(options));
}

function pathValidator(options) {
    options.path.forEach((path) => {
        if (!fs.existsSync(path)) {
            throw new Error(`path is not exists: ${path}!`);
        }
    });
}

function separatorValidator(options) {
    if (!_.isString(options.separator) || _.isEmpty(options.separator)) {
        throw new Error(`separator is not String or empty: ${options.separator}!`);
    }
}
