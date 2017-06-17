var profileLaddersApp = (function (jq) {'use strict';
    var apiKey = "3hrfnmq7j2suwu98xy3f43ygyr5n22s9",
        secret = "tMrrJefJqkAps5mX6Uvs6NgpY2SXFTDQ",
        locale = "en_GB",

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
        getProfileLadders: function () {
            jq.ajax({
                type: "GET",
                contentType:"application/json",
                dataType: "json",
                context: profileLaddersApp,
                url: "https://eu.api.battle.net/sc2/profile/" + profileId + "/" + realm + "/" + profileName + "/ladders?locale=" + locale + "&apikey=" + apiKey,

                beforeSend: function (jqXHR, settings) {
                    statusMsg.empty();
                    errorMsg.empty();
                    statusMsg.append("Sending request...");
                },

                success: function (data, textStatus, jqXHR) {
                    console.dir(data);
                },

                /*success: function (data, textStatus, jqXHR) {
                    var cp = null;

                    profileData = data;
                    career = data.career;
                    swarmLevels = data.swarmLevels;
                    campaign = data.campaign;
                    season = data.season;
                    rewards = data.rewards;
                    achievements = data.achievements;

                    console.dir(data);

                    // fill up profile data
                    profileNameTxt.val(data.displayName);
                    profileIdTxt.val(data.id);
                    realmTxt.val(data.realm);
                    clanNameTxt.val(data.clanName);
                    clanTagTxt.val(data.clanTag);
                    profilePathTxt.val(data.profilePath);

                    // fill up career data
                    primaryRaceTxt.val(career.primaryRace);
                    terranWinsTxt.val(career.terranWins);
                    protossWinsTxt.val(career.protossWins);
                    zergWinsTxt.val(career.zergWins);
                    highest1v1RankTxt.val(career.highest1v1Rank);
                    seasonTotalGamesTxt.val(career.seasonTotalGames);
                    careerTotalGamesTxt.val(career.careerTotalGames);

                    // fill up swarm levels data
                    slLevelTxt.val(swarmLevels.level);

                    terranLevelTxt.val(swarmLevels.terran.level);
                    terranTotalLevelXPTxt.val(swarmLevels.terran.totalLevelXP);
                    terranCurrentLevelXPTxt.val(swarmLevels.terran.currentLevelXP);

                    protossLevelTxt.val(swarmLevels.protoss.level);
                    protossTotalLevelXPTxt.val(swarmLevels.protoss.totalLevelXP);
                    protossCurrentLevelXPTxt.val(swarmLevels.protoss.currentLevelXP);

                    zergLevelTxt.val(swarmLevels.zerg.level);
                    zergTotalLevelXPTxt.val(swarmLevels.zerg.totalLevelXP);
                    zergCurrentLevelXPTxt.val(swarmLevels.zerg.currentLevelXP);

                    wolTxt.val(campaign.wol === undefined ? "" : campaign.wol);
                    hotsTxt.val(campaign.hots === undefined ? "" : campaign.hots);
                    lotvTxt.val(campaign.lotv === undefined ? "" : campaign.lotv);

                    // fill up season data
                    seasonIdTxt.val(season.seasonId);
                    seasonNumberTxt.val(season.seasonNumber);
                    seasonYearTxt.val(season.seasonYear);
                    totalGamesThisSeasonTxt.val(season.totalGamesThisSeason);

                    season.stats.forEach(function (cv, index, array) {
                        var newFS = null;

                        statsFS.append("<fieldset id=\"" + cv.type + "FS\"><legend>" + cv.type + "</legend>");

                        newFS = jq("#" + cv.type + "FS");

                        newFS.append("<label for=\"wins"+ index +"Txt\">Wins</label>");
                        newFS.append("<input type=\"text\" id=\"wins"+ index +"Txt\" name=\"wins"+ index + "Txt\" value=\"" + cv.wins + "\" disabled/>");
                        newFS.append("<br/><br/>");
                        newFS.append("<label for=\"games"+ index +"Txt\">Games</label>");
                        newFS.append("<input type=\"text\" id=\"games"+ index +"Txt\" name=\"games"+ index + "Txt\" value=\"" + cv.games + "\" disabled/>");

                    }, this);

                    // fill up rewards data
                    rewards.earned.forEach(function (cv, index, array) {
                        earnedRewardsSel.append("<option value=\"" + cv + "\">" + cv + "</option>");
                    }, this);

                    rewards.selected.forEach(function (cv, index, array) {
                        selectedRewardsSel.append("<option value=\"" + cv + "\">" + cv + "</option>");
                    }, this);

                    // fill up achievements data
                    achievements.achievements.forEach(function (cv, index, array) {
                        achievementsSel.append("<option value=\"" + cv.achievementId + "\">" + cv.achievementId + "-" + cv.completionDate + "</option>");
                    }, this);

                    for (cp in achievements.points.categoryPoints) {
                        if (achievements.points.categoryPoints.hasOwnProperty(cp)) {
                            categoryPointsSel.append("<option value=\"" + cp + "\">" + cp + "</option>");
                        }
                    }

                    totalPointsTxt.val(achievements.points.totalPoints);

                    statusMsg.append("Profile data loaded.");
                },*/

                error: function (jqXHR, textStatus, errorThrown) {
                    errorMsg.append("Porifle data, error status: " + textStatus + ", error thrown: " + errorThrown);
                }
            });
        },

        ready: function () {
            statusMsg = jq("#statusMsg");
            errorMsg = jq("#errorMsg");

            profileLaddersApp.getProfileLadders();
        }
    };
}($));

$(document).ready(profileLaddersApp.ready);
