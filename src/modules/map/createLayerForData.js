/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _  = require('underscore'),
    ol = require('openlayers');

function enlargenExtent(extent, meters) {
    var enlangenedExtent = [];
    meters = meters || 50;

    console.log('extent before: ', extent);

    enlangenedExtent.push(extent[2] + meters);
    enlangenedExtent.push(extent[3] + meters);
    enlangenedExtent.push(extent[0] - meters);
    enlangenedExtent.push(extent[1] - meters);

    console.log('extent after: ', enlangenedExtent);

    return enlangenedExtent;
}

module.exports = function (selectedObject) {
    var vectorLayer,
        vectorSource,
        vectorSourceObjects,
        olFeatureArray = [],
        hId            = selectedObject.hId,
        label          = selectedObject.label,
        selectedFeature,
        featuresExtent;

    // extract all objects with this hId from Model
    vectorSourceObjects = _.filter(window.oi.objects, function (object) {
        return object.hId === hId;
    });

    _.each(vectorSourceObjects, function (object) {
        var geomData,
            feature;

        geomData = object.data[label];
        if (geomData) {
            feature  = new ol.Feature();
            feature.setGeometry(new ol.geom[geomData.type](geomData.coordinates));
            olFeatureArray.push(feature);
            if (object._id === selectedObject._id) {
                selectedFeature = feature;
            }
        }
    });

    vectorSource = new ol.source.Vector();
    vectorSource.addFeatures(olFeatureArray);

    vectorLayer = new ol.layer.Vector({
        title:  label,
        source: vectorSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 4
            }),
            fill: new ol.style.Fill({
                color: 'red'
            }),
            image: new ol.style.Circle({
                radius: 5,
                fill: null,
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 4
                })
            })
        }),
        group: 'project'
    });

    window.oi.olMap.map.addLayer(vectorLayer);

    // zoom to selected
    featuresExtent = ol.extent.createEmpty();
    ol.extent.extend(featuresExtent, selectedFeature.getGeometry().getExtent());
    window.oi.olMap.map.getView().fitExtent(featuresExtent, window.oi.olMap.map.getSize());
};