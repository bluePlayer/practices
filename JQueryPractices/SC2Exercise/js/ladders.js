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
        dataTable = null,
        noLadderIdDialog = null,
        ladderIdText = null,
        loadDataBtn = null,
        statusMsg = null,
        errorMsg = null;

    return {
        checkLadderId: function (e) {
            ladderId = jq("#ladderId").val();

            if (ladderId === "" || ladderId === null || ladderId === undefined) {
                noLadderIdDialog.dialog("open");
                loadDataBtn.button("disable");
            } else {
                noLadderIdDialog.dialog("close");
                loadDataBtn.button("enable");
            }
        },

        reloadData: function (e) {
            ladderId = jq("#ladderId").val();
            dataTable.ajax.url("https://eu.api.battle.net/sc2/ladder/" + ladderId + "?locale=" + locale + "&apiKey=" + apiKey).load(function () {
                console.log("loaded new data");
            }, true);
        },

        loadData: function (e) {
            dataTable = jq('#dataTable').DataTable({
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
        },

        ready: function () {
            statusMsg = jq("#statusMsg");
            errorMsg = jq("#errorMsg");

            ladderId = jq("#ladderId").val();

            loadDataBtn = jq("#loadDataBtn").button();
            loadDataBtn.on('click', laddersApp.reloadData);

            ladderIdText = jq("#ladderId");
            ladderIdText.on('input', laddersApp.checkLadderId);

            noLadderIdDialog = jq("#dialog").dialog({
                buttons: [
                    {
                        text: "Ok",
                        icon: "ui-icon-info",
                        click: function() {
                            jq(this).dialog("close");
                        }
                    }
                ],
                modal: true
            });

            noLadderIdDialog.dialog("close");

            if (ladderId === "" || ladderId === null || ladderId === undefined) {
                noLadderIdDialog.dialog("open");
                loadDataBtn.button("disable");
            } else {
                noLadderIdDialog.dialog("close");
                loadDataBtn.button("enable");

                laddersApp.loadData();
            }
        }
    };
}($));

$(document).ready(laddersApp.ready);
