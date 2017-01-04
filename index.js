'use strict';

const Options = require('./src/options');
const TaskRegister = require('./src/task.register');

module.exports = (optionsInput) => {
    const options = new Options(optionsInput);
    const taskRegister = new TaskRegister(options);
    taskRegister.register();
};
