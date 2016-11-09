window.FrnConstr.namespace('GoToUrl', window.FrnConstr.FrnConstrButton, (function (windowObject) {'use strict';
    var phaserButton = null,
        clickHandler = null;

    return {
        Button: function (urlLink, linkName, btnContext, x, y, key, context, overHandler, outHandler, downHandler, upHandler,
                            overFrame, outFrame, downFrame, upFrame) {
            clickHandler = this.CreateGoToUrlClickHandler(urlLink, linkName, btnContext);
            phaserButton =
                this.FrnConstrButton(x, y, key, context, clickHandler, overHandler, outHandler, downHandler, upHandler,
                                null, null, overFrame, outFrame, downFrame, upFrame);
            return phaserButton;
        },
        CreateGoToUrlClickHandler: function (urlLink, linkName, btnContext) {
            return function () {
                switch (btnContext) {
                case 'TWITTER_URL':
                    windowObject.open('https://twitter.com/share?url=' + urlLink, linkName, []);
                    break;
                case 'FACEBOOK_URL':
                    windowObject.open('https://www.facebook.com/sharer/sharer.php?u=' + urlLink, linkName, []);
                    break;
                case 'BLOG_URL':
                    windowObject.open(urlLink, linkName, []);
                    break;
                case 'GALLERY_LINK':
                    windowObject.open(urlLink, linkName, []);
                    break;
                }
            };
        }
    };
    }(window)));