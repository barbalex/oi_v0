/*jslint node: true, browser: true, nomen: true, todo: true */
/*global app, me, $*/
'use strict';

var _                 = require('underscore'),
    alsoResizeReverse = require('./alsoResizeReverse'),
    setWidthOfTabs    = require('./setWidthOfTabs'),
    showTab           = require('./showTab');

module.exports = function () {
    var zaehler;

    window.oi = window.oi || {};

    // add plugin to resize folowing tab
    alsoResizeReverse();

    $('#nav').resizable({
        handles: { 'e': '#navSeparator' },
        alsoResizeReverse: '#form',
        containment: '#content'
    });

    $('#form').resizable({
        handles: { 'e': '#formSeparator' },
        alsoResizeReverse: '#map',
        containment: '#content'
    });

    $('#map').resizable({
        handles: { 'e': '#mapSeparator' },
        alsoResizeReverse: '#utils',
        containment: '#content'
    });

    $('.nav').on('click', 'li', function () {
        var id = $(this).attr('id'),
            tab = id.substring(0, id.length - 4);

        showTab(tab);
        setWidthOfTabs();
    });

    // zählt, wieviele male .on('change') ausgelöst wurde
    window.oi.resizeWindowZaehler = 0;

    $(window).on('resize', function (event) {
        // resize wird auch beim Verändern der Tabs-Breiten ausgelöst!
        if (event.target === window) {
            window.oi.resizeWindowZaehler++;
            // speichert, wieviele male .on('change') ausgelöst wurde, bis setTimout aufgerufen wurde
            zaehler = window.oi.resizeWindowZaehler;
            setTimeout(function () {
                if (zaehler === window.oi.resizeWindowZaehler) {
                    // in den letzten 400 Millisekunden hat sich nichts geändert > reagieren
                    setWidthOfTabs();
                    window.oi.resizeWindowZaehler = 0;
                }
            }, 500);
        }
    });
};
