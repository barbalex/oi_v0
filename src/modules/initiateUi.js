/*
 * initiates the ui
 * 
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                = require('jquery'),
    syncProjectDbs   = require('../syncProjectDbs'),
    syncUserDb       = require('../syncUserDb'),
    createDatabaseId = require('./createDatabaseId'),
    getModelData     = require('./getModelData');

module.exports = function (projectNames, login) {
    // every database gets a locally saved id
    // this id is added to every document changed
    // with it the changes feed can ignore locally changed documents
    createDatabaseId();

    console.log('initiate: projectNames: ', projectNames);

    // build model
    // model is added to window.oi.objects and window.oi.hierarchies
    // then creates tree
    getModelData(projectNames, login);

    // start syncing projects
    syncProjectDbs(projectNames);

    // set navUser
    // add a space to space the caret
    $('#navUserText').text(window.oi.me.name + ' ');

    // sync user db
    syncUserDb();
};