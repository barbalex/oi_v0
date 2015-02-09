/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB                     = require('pouchdb'),
    handleExternalObjectChanges = require('../handleExternalObjectChanges'),
    foreignChangedIndex         = require('./foreignChangedIndex'),
    pouchDbOptions              = require('../pouchDbOptions');

module.exports = function () {
    var db = new PouchDB('oi', pouchDbOptions);

    // TODO: watch changes to hierarchies
    // when changes happen in DB, update model and when necessary ui
    // create filter function
    // should filter: 
    // - doc.lastEdited.database !== window.oi.databaseId
    // - user is in users
    db.changes({
        since: 'now',
        live: true,
        include_docs: true/*,
        view: foreignChangedIndex(),
        key: [window.oi.loginName, 'object']*/
    }).on('change', handleExternalObjectChanges);
};