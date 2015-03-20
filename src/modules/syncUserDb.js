/**
 * syncs data from a user-db with a local user-db in the pouch
 * starts the changes listener
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB       = require('pouchdb'),
    configuration = require('./configuration'),
    couchUrl      = configuration.couch.dbUrl,
    handleChanges = require('./handleChanges'),
    getUserDbName = require('./getUserDbName');

module.exports = function () {
    var dbOptions,
        syncOptions,
        changeOptions,
        localDb,
        remoteDbAddress,
        remoteDb,
        userDbName;

    window.oi.sync = window.oi.sync || {};

    dbOptions = {
        auth: {
            username: window.oi.me.name,
            password: window.oi.me.password
        }
    };
    syncOptions = {
        live:  true,
        retry: true
    };
    changeOptions = {
        since:        'now',
        live:         true,
        include_docs: true
    };
    userDbName      = getUserDbName();
    localDb         = new PouchDB(userDbName);
    remoteDbAddress = 'http://' + couchUrl + '/' + userDbName;
    remoteDb        = new PouchDB(remoteDbAddress, dbOptions);

    // make sure syncing and listening to changes is only started if not already started
    if (remoteDb && !window.oi.sync[userDbName]) {
        // sync but ony one way needed
        window.oi.sync[userDbName] = PouchDB.sync(localDb, remoteDb, syncOptions).setMaxListeners(20);
        // watch changes
        remoteDb.changes(changeOptions).on('change', handleChanges);

        console.log('syncUserDb: syncing ' + userDbName + ' with ' + remoteDbAddress);
    }
};
