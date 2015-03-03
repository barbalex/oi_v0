/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol              = require('openlayers'),
    $               = require('jquery'),
    guid            = require('../guid'),
    saveFeatureData = require('./saveFeatureData');

module.exports = function (layer, geometryType) {
    var map = window.oi.olMap.map,
        drawInteraction;

    // create the interaction
    drawInteraction = new ol.interaction.Draw({
        source: layer.getSource(),
        type: /** @type {ol.geom.GeometryType} */ (geometryType)
    });
    // add it to the map
    map.addInteraction(drawInteraction);
    // make it global so it can be cancelled
    window.oi.olMap.map.drawInteraction = drawInteraction;

    // when a new feature has been drawn...
    drawInteraction.on('drawend', function (event) {
        // Two cases:
        // 1. changing geometry of existing object that is shown in form
        //    how to tell: geoJson Field of modifiable layer is empty
        //    - get guid from jstree active node
        //    - set id of feature
        //    - save feature data
        // 2. TODO: creating new geometry for new object
        //    how to tell: geoJson Field of modifiable layer is not empty
        //    - create new guid
        //    - create new doc with sensible nameField and geometry
        //    - refresh jstree and form
        
        
        // give the feature an id
        // it is later needed to delete features
        event.feature.setId(guid());
        // ...save the changed data
        saveFeatureData(event.feature);
    });
};