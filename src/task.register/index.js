'use strict';

const gulp = require('gulp');
const requireDirectory = require('require-directory');
const GulpTask = require('./gulp.task');

module.exports = class TaskRegister {
    constructor(options) {
        this._options = options;
    }

    register() {
        this._options.path.forEach((path) => this._loadTasksFrom(path));
    }

    _loadTasksFrom(folder) {
        requireDirectory(module, folder, {
            visit: (loadedModule, modulePath) => this._loadTask({
                content: loadedModule,
                path: modulePath,
                baseFolder: folder
            })
        });
    }

    _loadTask(loadedModule) {
        const task = new GulpTask(loadedModule, this._options);
        gulp.task(task.name, task.deps, task.fn);
    }
};
