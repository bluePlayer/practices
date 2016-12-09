/**
 * @param {Object} jq
 * @param {Object} d3
 */
(function(jq, d3) {
    'use strict';

    var request = d3.request("https://finance.google.com/finance/info?client=ig&q=goog", function (error, data) {
        var jsonString = "",
            jsonDataArray = [],
            jsonObject = {};

        if (error) {
            throw error;
        }

        console.dir(data);

        jsonDataArray = data.responseText.split("//");
        jsonString = jsonDataArray[1].trim();
        console.log(jsonString);

        jsonObject = JSON.parse(jsonString);
        console.dir(jsonObject);
    });

}($, d3));