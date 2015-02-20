/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB        = require('pouchdb'),
    configuration  = require('../configuration'),
    couchUrl       = configuration.couch.dbUrl,
    signIn         = require('./signIn'),
    tellWithModal  = require('../tellWithModal');

module.exports = function (signindata) {
    var remoteDb = new PouchDB('http://' + couchUrl + '/oi');
    // signup, then call signin
    remoteDb.signup(signindata.name, signindata.password, {
        metadata: {
            // bei signup weitere Felder ausfüllen lassen
            // genug, um eine Rechnung schicken zu können?
            /*Nachname: 'Tester',
            Vorname: 'Test',
            Strasse: 'x-str 40',
            PLZ: 8000,
            Ort: 'ort'*/
        }
    }).then(function (response) {
        signIn(signindata);
    }).catch(function (error) {
        // Fehler melden
        tellWithModal('Das Konto konnte nicht erstellt werden', 'Die Datenbank meldete: ' + error);
    });
};