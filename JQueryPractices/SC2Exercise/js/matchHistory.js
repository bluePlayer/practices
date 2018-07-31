/**
 * @author vlado
 */
var matchHistoryApp = (function (jq) {'use strict';
    var dataTable = null,
        statusMsg = null,
        errorMsg = null,
        profileIdText = null,

        // messages
        profileIdMsg = "Open your SC2 profile and copy your profile ID in the URL",

        apiKey = "3hrfnmq7j2suwu98xy3f43ygyr5n22s9",
        secret = "",
        locale = "en_GB",
        ladderId = "192779",

        profileId = "2758381",
        profileName = "VladDTerran",
        realm = "1";

    return {
        loadData: function (e) {
            dataTable = jq('#dataTable').DataTable({
                "ajax": {
                    url: "https://eu.api.battle.net/sc2/profile/" + profileId + "/" + realm + "/"+ profileName + "/matches?locale=" + locale + "&apiKey=" + apiKey,
                    dataSrc: 'matches'
                 },

                 columns: [
                    { data: 'map' },
                    { data: 'type' },
                    { data: 'decision' },
                    { data: 'speed' },
                    { data: 'date' }
                 ]
            });
        },

        ready: function () {
            statusMsg = jq("#statusMsg");
            errorMsg = jq("#errorMsg");

            profileIdText = jq("#profileIdText");
            profileIdText.attr('title', profileIdMsg);

            matchHistoryApp.loadData();
        }
    };
}($));

$(document).ready(matchHistoryApp.ready);