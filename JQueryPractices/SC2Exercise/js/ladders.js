var laddersApp = (function (jq) {'use strict';
    var apiKey = "3hrfnmq7j2suwu98xy3f43ygyr5n22s9",
        secret = "tMrrJefJqkAps5mX6Uvs6NgpY2SXFTDQ",
        locale = "en_GB",
        ladderId = "192779",

        // profile data
        profileData = {},
        career = {},
        swarmLevels = {},
        campaign = {},
        season = {},
        rewards = {},
        achievements = {},

        profileId = "2758381",
        profileName = "VladDTerran",
        realm = "1",

        // general html tags
        statusMsg = null,
        errorMsg = null;

    return {
        getLadders: function () {
            jq.ajax({
                type: "GET",
                contentType:"application/json",
                dataType: "json",
                context: laddersApp,

                url: "https://eu.api.battle.net/sc2/ladder/" + ladderId,

                data: {
                    locale: locale,
                    apiKey: apiKey
                },

                beforeSend: function (jqXHR, settings) {
                    statusMsg.empty();
                    errorMsg.empty();
                    statusMsg.append("Sending request...");
                },

                success: function (data, textStatus, jqXHR) {
                    console.dir(data);
                },

                error: function (jqXHR, textStatus, errorThrown) {
                    errorMsg.append("Profile ladders data, error status: " + textStatus + ", error thrown: " + errorThrown);
                }
            });
        },

        ready: function () {
            statusMsg = jq("#statusMsg");
            errorMsg = jq("#errorMsg");

            laddersApp.getLadders();

            jq('#example').DataTable({
                "ajax": {
                    url: "https://eu.api.battle.net/sc2/ladder/" + ladderId + "?locale=" + locale + "&apiKey=" + apiKey,
                    dataSrc: 'ladderMembers'
                },

                columns: [
                    { data: 'character.displayName' },
                    { data: 'character.clanName' },
                    { data: 'character.clanTag' },
                    { data: 'points' },
                    { data: 'wins' },
                    { data: 'losses' },
                    { data: 'highestRank' },
                    { data: 'previousRank' },
                    { data: 'favoriteRaceP1' }
                ]
            });
        }
    };
}($));

$(document).ready(laddersApp.ready);
