/*
 * passt model und wenn nötig die ui an,
 * wenn in einer anderen DB ein object verändert wurde
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                 = require('jquery'),
    _                 = require('underscore'),
    initiateForm      = require('./form/initiateForm'),
    getLabelForObject = require('./nav/getLabelForObject');

module.exports = function (change) {
    var modelObject,
        correspondingHierarchy,
        $formContent = $('#formContent'),
        tree         = $('#navContent').jstree(true),
        activeNode   = tree.get_selected(true)[0],
        activeId     = activeNode.data.type === 'object' ? activeNode.id : activeNode.data.id;

    // update model of object
    modelObject = _.find(window.oi.objects, function (object) {
        return object._id === change.id;
    });

    // nur weiterfahren, wenn ein model gefunden wurde
    if (modelObject) {
        // replace existing object with new one
        window.oi.objects[window.oi.objects.indexOf(modelObject)] = change.doc;

        // refresh form if this object is shown
        // cant update only changed field because it is unknown (?)
        if ($formContent.html() !== "" && activeId === change.doc._id) {
            initiateForm(change.doc._id, 'object');
        }
        // refresh tree
        correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
            return hierarchy._id === change.doc.hId;
        });
        if (change.doc.data && correspondingHierarchy && correspondingHierarchy.nameField) {
            $('#navContent').jstree().rename_node('#' + change.doc._id, getLabelForObject(change.doc, correspondingHierarchy));
        }
    }
};