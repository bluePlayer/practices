/**
 * @module APP
 */
/**
 * This module or rather code snippet is meant to teach you how to structure your future custom JavaScript application. 
 * Several patterns are used, Module, Namespace, immediate functions, returning objects, using subobjects, 
 * using capitalized letters for functions/variables as "Constants", function scope and making accessor methods, JS constructors, 
 * using Yuidoc and Jasmine for better code quality.
 * @class APP
 * @author Vladimir Zakar aka bluePlayer. https://github.com/bluePlayer/practices
 */
window.APP = window.APP || (function (wdo, lib1, lib2, lib3) {'use strict';
    var
        /**
         * Version of the current application object
         * @property version
         * @type String
         */
        version = "1.0.0",

        /**
         * Configuration object for the current application object
         * @property config
         * @type Object
         * @default {}
         */
        config = {},

        /**
         * Reference for the current application object, for easier internal use.
         * @property parent
         * @type Object
         * @default null
         */
        parent = null,

        /**
         * Reference for jquery external library.
         * @property jqueryObj
         * @type Object
         */
        jqueryObj = lib1,

        /**
         * Reference for extJs external library.
         * @property extJSObj
         * @type Object
         */
        extJSObj = lib2,

        /**
         * Reference for expressJs external library.
         * @property expressJsObj
         * @type Object
         */
        expressJsObj = lib3,

        /**
         * Reference for window.document object.
         * @property windowDocumentObject
         * @type Object
         */
        windowDocumentObject = wdo,

        /**
         * Constant
         * @property MY_APP_NAME
         * @type String
         * @default "MyJSApplication"
         * @final
         */
        MY_APP_NAME = "MyJSApplication",

        /**
         * Constant
         * @property MY_EXCEPTION_MESSAGE
         * @type String
         * @default "My exception message"
         * @final
         */
        MY_EXCEPTION_MESSAGE = "My exception message",

        /**
         * Constant
         * @property MY_APP_CONSTANT
         * @type String
         * @default "some message"
         * @final
         */
        MY_APP_CONSTANT = "some message";

    return {

        /**
         * Class exceptions contains custom exceptions for your application
         * @namespace APP
         * @class Exceptions 
         */
        Exceptions: {

            /**
             * This is my first custom exception. For more add new constuctor function inside Exceptions class with similar sturcture as this 
             * exception.
             * @method MyFirstException 
             * @return {Object} contains message and name of the exception
             */
            MyFirstException: function () {
                return {
                    message: MY_EXCEPTION_MESSAGE,
                    name: "MyFirstException"
                };
            }
        },

        /**
         * Class exceptions contains custom exceptions for your application. Using capitalized accessor method that do nothing more 
         * than returning a single value prevents its change inside your app but also from outside. There are other solutions to 
         * create immutable "Constants" using patterns natural to JavaScript but it is overkill to implement and also to use afterwards.
         * @class Constants 
         */
        Constants: {

            /**
             * Function-Constant, returns the name of the application
             * @method MY_APP_NAME
             * @return {String}
             */
            MY_APP_NAME: function () {
                return MY_APP_NAME;
            },

            /**
             * Function-Constant, returns the value of your first constant
             * @method MY_APP_CONSTANT
             * @return {String}
             */
            MY_APP_CONSTANT: function () {
                return MY_APP_CONSTANT;
            }
        },

        /**
         * Class Events contains your custom events for your application.
         * @class Events 
         */
        Events: {

            /**
             * do some stuff when some key is pressed down on 'keydown' event.
             * @event keyDownEvent
             * @param {Object} event
             */
            keyDownEvent: function (event) {

            },

            /**
             * do some stuff when some key is released on 'keyup' event
             * @event keyUpEvent
             * @param {Object} event
             */
            keyUpEvent: function (event) {

            },

            /**
             * do some stuff when 'keypress' event was detected
             * @event keyPressEvent
             * @param {Object} event
             */
            keyPressEvent: function (event) {

            }
        },

        /**
         * Class APP
         * @class APP 
         */

        /**
         * initApp() is a function that is used to initialize the whole application. It is called when the whole DOM tree is fetched with
         * "DOMContentLoaded" event. Its a recursive function and traverses the whole JS application tree searching for subobject that has
         * its own init() function and send config object to it.
         * @method initApp
         * @param {Object} someObject
         * @param {Object} config
         */
        initApp: function (someObject, config) {
            var i;

            for (i in someObject) {
                if (someObject[i] !== null && typeof someObject[i] === 'object') {
                    if (someObject[i].hasOwnProperty('init')) {
                        someObject[i].init(config);
                    }
                    parent.initApp(someObject[i]);
                }
            }
        },

        /**
         * Creates objects and subobjects by using just a string in dotted notation. 
         * Example namespace('my.new.namespace'); will create object 'my' that contains subobject 'new', which contains 
         * subobject 'namespace'. 
         * @method namespace
         * @param {String} nsString String describing the namespace of objects separated by a dots. 
         * @param {Object} newObjectDefinition And object to initialize each of the newly created subobject. If you add a property with all caps 
         * it will consider it as a constant and therefore use Constants object to create new constant that cannot be changed using Firebug 
         * or other browser debugging interface. 
         * @return {Object} Returns the new object that represents the new namespace of objects and subobjects, defined by the dots in the string
         * argument.
         */
        namespace: function (nsString, newObjectDefinition) {
            var parts = nsString.split('.'),
                helperObject = {},
                that = this,
                i = 0,
                field = {};

            if (parts[0] === that.Constants.MY_APP_NAME()) {
                parts = parts.slice(1);
            }

            for (i = 0; i < parts.length; i += 1) {
                if (that[parts[i]] === undefined) {
                    for (field in newObjectDefinition) {
                        if (newObjectDefinition.hasOwnProperty(field)) {
                            helperObject[field] = newObjectDefinition[field];
                        }
                    }
                    that[parts[i]] = helperObject;
                }
                that = that[parts[i]];
            }
            return that;
        },

        /**
         * your custom function
         * @method customFunction
         * @throws {MyFirstException} if b < 0 throws and error
         * @param {Number} a
         * @param {Number} b
         * @return {Number} Returs true if new constant is created or false otherwise.
         */
        customFunction: function (a, b) {
            if (b < 0) {
                throw new parent.Exceptions.MyFirstException();
            } else {
                return 0;
            }
        },

        /**
         * do some stuff with jquery
         * @method doSomeStuffWithJquery
         * @param {String} someUrl
         */
        doSomeStuffWithJquery: function (someUrl) {
            jqueryObj.ajax({
                url: someUrl,
                xhrFields: {
                    withCredentials: true
                }
            });
        },

        /**
         * do some stuff with extJs
         * @method doSomeStuffWithExtJS
         */
        doSomeStuffWithExtJS: function () {
            extJSObj.drawGraph();
        },

        /**
         * do some stuff with expressJS
         * @method doSomeStuffWithExpressJS
         */
        doSomeStuffWithExpressJS: function () {
            expressJsObj.connectWithNodeJS();
        },

        /**
         * initialize the app
         * @method init
         * @param {Object} configObject
         */
        init: function (configObject) {
            config = configObject;
            parent = this;
            parent.initApp(parent, config);
        }
    };
    }(window.document, jquery, extJS, expressJS));

/**
  * Class MySubObject contains custom properties/methods but it is subobject of APP. You can create more of these 
  * sumobjects with APP.namespace() function and keep the global JavaScript namespace clean.
  * @class MySubObject 
  */
window.APP.namespace('MySubObject', (function (lib) {'use strict';
    var
        /**
         * configuration object for MySubObject
         * @property config
         * @type Object
         * @default {}
         */
        config = {},

        /**
         * contains reference for MySubObject for easy using inside MySubObject
         * @property parent
         * @type Object
         * @default null
         */
        parent = null,

        /**
         * someLibrary is internal reference for some external library so that you don't have to use dots or reall library name.
         * @property someLibrary
         * @type Object
         */
        someLibrary = lib,

        /**
         * Constant
         * @property MY_CONSTANT
         * @type String
         * @default "my constant"
         * @final
         */
        MY_CONSTANT = "my constant",

        /**
         * Constant
         * @property MY_EXCEPTION
         * @type String
         * @default "my exception"
         * @final
         */
        MY_EXCEPTION = "my exception";

    return {

        /**
         * Class exceptions contains custom exceptions for your application
         * @namespace MySubObject
         * @class Exceptions 
         */
        Exceptions: {

            /**
             * MyNewException() constructor. For more add new constuctor function inside Exceptions class with similar sturcture as this exception.
             * @method MyNewException 
             * @return {Object} contains message and name of the exception
             */
            MyNewException: function () {
                return {
                    message: MY_EXCEPTION,
                    name: "MyNewException"
                };
            }
        },

        /**
         * Class exceptions contains custom exceptions for your application. Using capitalized accessor method that do nothing more 
         * than returning a single value prevents its change inside your app but also from outside. There are other solutions to 
         * create immutable "Constants" using patterns natural to JavaScript but it is overkill to implement and also to use afterwards.
         * @class Constants 
         */
        Constants: {

            /**
             * Function-Constant, returns the value of MY_CONSTANT
             * @method MY_CONSTANT
             * @return {String}
             */
            MY_CONSTANT: function () {
                return MY_CONSTANT;
            }
        },

        /**
         * Class Events
         * @class Events 
         */
        Events: {

            /**
             * myNewEvent
             * @event myNewEvent
             * @param {Object} event
             */
            myNewEvent: function (event) {

            },
        },

        /**
         * Class Events
         * @class MySubObject 
         */

        /**
         * Name of the current application object
         * @property name
         * @type String
         * @default "MySubObject"
         */
        name: "MySubObject",

        /**
         * your custom function
         * @method myCustomFunction
         */
        myCustomFunction: function () {

        },

        /**
         * initialize this object, MySubObject
         * @method init
         * @param {Object} configObj
         */
        init: function (configObj) {
            config = configObj;
            parent = this;
        }
    };
    }(externalJSLibrary)));

var externalJSLibrary = {},
    jquery = {},
    extJS = {},
    expressJS = {};

window.document.addEventListener("DOMContentLoaded", function (event) {'use strict';

    var myApp = window.APP;

    myApp.init({
        "event": event,
        otherConfig: {}
    });

    window.document.addEventListener('keydown', myApp.Events.keyDownEvent);
    window.document.addEventListener('keyup', myApp.Events.keyUpEvent);
    window.document.addEventListener('keypress', myApp.Events.keyPressEvent);

    });
