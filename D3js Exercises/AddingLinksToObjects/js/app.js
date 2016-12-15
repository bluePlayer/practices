/**
 * @see http://bl.ocks.org/d3noob/8150631
 * @param {Object} d3
 */
window.AddingLinksToObjects = window.AddingLinksToObjects || (function(d3, jq) {
    'use strict';

    var width = 450,
        height = 250,
        word = "house",
     
        holder = d3.selectAll("body")
            .append("svg")
            .attr("width", width)    
            .attr("height", height); 

    return {
        run: function () {
            // draw a rectangle
            holder.append("a")
                .attr("xlink:href", "http://en.wikipedia.org/wiki/"+word)
                .attr("target", "_blank")
                .append("rect")  
                .attr("x", 100)
                .attr("y", 50)
                .attr("height", 100)
                .attr("width", 200)
                .style("fill", "lightgreen")
                .attr("rx", 10)
                .attr("ry", 10)
                .on("click", function (d) {
                    console.dir(d);
                });

            // draw text on the screen
            holder = holder.append("text")
                .attr("x", 200)
                .attr("y", 100)
                .style("fill", "black")
                .style("font-size", "20px")
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .style("pointer-events", "none")
                .text(word);
            
            /*jq("#keyword").focus(function () {
                jq("#keyword").val("");
            });
            
            jq("#keyword").keypress(function () {
                word = jq("#keyword").val();
                holder.text(word);
                holder.select("a")
                    .attr("xlink:href", "http://en.wikipedia.org/wiki/"+word);
            });*/
        }
    };

}(d3, $));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var AddingLinksToObjects = window.AddingLinksToObjects;

    AddingLinksToObjects.run();
});