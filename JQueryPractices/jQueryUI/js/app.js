/**
 * @author vlado
 */
var jQueryUIApp = (function (jq) {'use strict';
    var currentTab = 0,
        numTabs = 3;

    return {

        nextTab: function (e) {
            if (currentTab < numTabs) {
                currentTab += 1;
            }

            if (currentTab === 0) {
                jq("#prevBtn").fadeTo(1, 0);
            } else {
                jq("#prevBtn").fadeTo(1, 1);
            }

            if (currentTab === numTabs - 1) {
                jq("#nextBtn").fadeTo(1, 0);
            } else {
                jq("#nextBtn").fadeTo(1, 1);
            }

            jq('#tabs').tabs({
                active: currentTab
            });
        },

        prevTab: function (e) {
            if (currentTab > 0) {
                currentTab -= 1;
            }

            if (currentTab === 0) {
                jq("#prevBtn").fadeTo(1, 0);
            } else {
                jq("#prevBtn").fadeTo(1, 1);
            }

            if (currentTab === numTabs - 1) {
                jq("#nextBtn").fadeTo(1, 0);
            } else {
                jq("#nextBtn").fadeTo(1, 1);
            }

            jq('#tabs').tabs({
                active: currentTab
            });
        },

        setTab: function (e) {
            currentTab = e.data.tabNum;

            if (currentTab === 0) {
                jq("#prevBtn").fadeTo(1, 0);
            } else {
                jq("#prevBtn").fadeTo(1, 1);
            }

            if (currentTab === numTabs - 1) {
                jq("#nextBtn").fadeTo(1, 0);
            } else {
                jq("#nextBtn").fadeTo(1, 1);
            }

            jq('#tabs').tabs({
                active: currentTab
            });
        },

        ready: function () {
            jq("#tabs").tabs({
                active: currentTab
            });
            jq("#prevBtn").hide();
        }

    };
}($));

$(document).ready(jQueryUIApp.ready);

$("#t1").on("click", {tabNum: 0}, jQueryUIApp.setTab);
$("#t2").on("click", {tabNum: 1}, jQueryUIApp.setTab);
$("#t3").on("click", {tabNum: 2}, jQueryUIApp.setTab);

$("#nextBtn").on("click", jQueryUIApp.nextTab);
$("#prevBtn").on("click", jQueryUIApp.prevTab);