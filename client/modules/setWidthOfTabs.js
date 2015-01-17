/*jslint node: true, browser: true, nomen: true, todo: true, plusplus */
/*global app, me, $*/
'use strict';

var _ = require('underscore');

module.exports = function () {
    var widths         = [],
        parentWidth    = parseInt($('#content').width(), 10),
        tabsTotalWidth = 0,
        totalWidthNew  = 0;

    $('.tab:visible').each(function () {
        var width       = parseInt($(this).width(), 10),
            widthObject = {};

        widthObject.id    = $(this).attr('id');
        widthObject.width = width;

        widths.push(widthObject);

        tabsTotalWidth += width;
    });

    _.each(widths, function (widthObject, index) {
        var widthAfter = (parentWidth - tabsTotalWidth) * (widthObject.width / tabsTotalWidth) + widthObject.width;

        if (index === widths.length -1) {
            // den letzten Tab aufrunden, damit kein einzelner Pixel unbenutzt bleibt
            widthAfter = parentWidth - totalWidthNew;
            $('#' + widthObject.id + 'Separator').hide();
        } else {
            widthAfter     = Math.floor(widthAfter);
            totalWidthNew += Math.floor(widthAfter);
            $('#' + widthObject.id + 'Separator').show();
        }

        $('#' + widthObject.id).css('width', widthAfter);
    });
};
