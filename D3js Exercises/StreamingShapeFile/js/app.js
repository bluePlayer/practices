/**
 * @see http://bl.ocks.org/mbostock/2dd741099154a4da55a7db31fd96a892
 * @param {Object} shapefile
 * @param {Object} d3
 */
(function(shapefile, d3) {
    'use strict';

    var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d"),
        path = d3.geoPath()
            .context(context)
            .projection(d3.geoAlbersUsa()
            .scale(1285)
            .translate([(canvas.width / 2), (canvas.height / 2)]));

    context.lineWidth = 0.5;

    shapefile.open("https://cdn.rawgit.com/matplotlib/basemap/master/lib/mpl_toolkits/basemap/data/UScounties.shp", null)
        .then(function(source) {
            return source.read().then(function next(result) {
                if (result.done) {
                    return;
                }
                context.beginPath();
                path(result.value);
                context.stroke();

                return source.read().then(next);
            });
        })
        .catch(function(error) {
            console.error(error.stack);
        });

}(shapefile, d3));