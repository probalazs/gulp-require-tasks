'use strict';

const path = require('path');

module.exports = { removeExtension: removeExtension };

function removeExtension(filePath) {
    const parts = path.parse(filePath);
    return path.join(parts.dir, parts.name);
}
