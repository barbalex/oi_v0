/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function (name) {
    name = name || window.oi.me.name;
    return 'user_' + name.toLowerCase().replace('@', '_at_').replace('.', '_p_');
};