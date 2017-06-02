/**
 * @author vlado
 */
var jQueryUIApp = (function (jq) {'use strict';
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
        errorMsg = null,

        // profile data html tags
        profileNameTxt = null,
        profileIdTxt = null,
        realmTxt = null,
        clanNameTxt = null,
        clanTagTxt = null,
        profilePathTxt = null,

        // career data html tags
        primaryRaceTxt = null,
        terranWinsTxt = null,
        protossWinsTxt = null,
        zergWinsTxt = null,
        highest1v1RankTxt = null,
        seasonTotalGamesTxt = null,
        careerTotalGamesTxt = null,

        // swarm levels
        slLevelTxt = null,

        terranLevelTxt = null,
        terranTotalLevelXPTxt = null,
        terranCurrentLevelXPTxt = null,

        protossLevelTxt = null,
        protossTotalLevelXPTxt = null,
        protossCurrentLevelXPTxt = null,

        zergLevelTxt = null,
        zergTotalLevelXPTxt = null,
        zergCurrentLevelXPTxt = null,

        // campaign
        wolTxt = null,
        hotsTxt = null,
        lotvTxt = null,

        // season
        seasonIdTxt = null,
        seasonNumberTxt = null,
        seasonYearTxt = null,
        totalGamesThisSeasonTxt = null,

        statsFS = null,

        // rewards
        earnedRewardsSel = null,
        selectedRewardsSel = null,

        // achievements
        achievementsSel = null,
        categoryPointsSel = null,
        totalPointsTxt = null;

    return {
        getProfileData: function () {
            jq.ajax({
                type: "GET",
                contentType:"application/json",
                dataType: "json",
                context: jQueryUIApp,
                url: "https://eu.api.battle.net/sc2/profile/" + profileId + "/" + realm + "/" + profileName + "/?locale=" + locale + "&apikey=" + apiKey,

                beforeSend: function (jqXHR, settings) {
                    statusMsg.empty();
                    errorMsg.empty();
                    statusMsg.append("Sending request...");
                },

                success: function (data, textStatus, jqXHR) {
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
                },

                error: function (jqXHR, textStatus, errorThrown) {
                    errorMsg.append("Porifle data, error status: " + textStatus + ", error thrown: " + errorThrown);
                }
            });
        },

        ready: function () {
            statusMsg = jq("#statusMsg");
            errorMsg = jq("#errorMsg");

            profileNameTxt = jq("#profileNameTxt");
            profileIdTxt = jq("#profileIdTxt");
            realmTxt = jq("#realmTxt");
            clanNameTxt = jq("#clanNameTxt");
            clanTagTxt = jq("#clanTagTxt");
            profilePathTxt = jq("#profilePathTxt");

            primaryRaceTxt = jq("#primaryRaceTxt");
            terranWinsTxt = jq("#terranWinsTxt");
            protossWinsTxt = jq("#protossWinsTxt");
            zergWinsTxt = jq("#zergWinsTxt");
            highest1v1RankTxt = jq("#highest1v1RankTxt");
            seasonTotalGamesTxt = jq("#seasonTotalGamesTxt");
            careerTotalGamesTxt = jq("#careerTotalGamesTxt");

            slLevelTxt = jq("#slLevelTxt");

            terranLevelTxt = jq("#terranLevelTxt");
            terranTotalLevelXPTxt = jq("#terranTotalLevelXPTxt");
            terranCurrentLevelXPTxt = jq("#terranCurrentLevelXPTxt");

            protossLevelTxt = jq("#protossLevelTxt");
            protossTotalLevelXPTxt = jq("#protossTotalLevelXPTxt");
            protossCurrentLevelXPTxt = jq("#protossCurrentLevelXPTxt");

            zergLevelTxt = jq("#zergLevelTxt");
            zergTotalLevelXPTxt = jq("#zergTotalLevelXPTxt");
            zergCurrentLevelXPTxt = jq("#zergCurrentLevelXPTxt");

            wolTxt = jq("#wolTxt");
            hotsTxt = jq("#hotsTxt");
            lotvTxt = jq("#lotvTxt");

            seasonIdTxt = jq("#seasonIdTxt");
            seasonNumberTxt = jq("#seasonNumberTxt");
            seasonYearTxt = jq("#seasonYearTxt");
            totalGamesThisSeasonTxt = jq("#totalGamesThisSeasonTxt");

            statsFS = jq("#statsFS");

            earnedRewardsSel = jq("#earnedRewardsSel");
            selectedRewardsSel = jq("#selectedRewardsSel");

            achievementsSel = jq("#achievementsSel");
            categoryPointsSel = jq("#categoryPointsSel");
            totalPointsTxt = jq("#totalPointsTxt");

            jQueryUIApp.getProfileData();
        }

    };
}($));

$(document).ready(jQueryUIApp.ready);
