var jqDeferredApp = (function (jq, mm) {'use strict';
    var deferred = null,
        filtered = null,

        deferred1 = null,
        filtered1 = null,

        deferred2 = null,
        filtered2 = null,

        separator = "<p>-----------------------------------------------------------------------------------------</p>",

        c = 1000000000,
        e = 500000000,
        f = 250000000,

        myParam = 0;

    return {
        init: function () {
            jq("#myp").append("<p>Init!</p>");
            jq("#myp").append("<p>myParam in init(): " + myParam + "</p>");
            jq("#myp").append("<p>Calculating sum of first: " + c + ", " + e + ", and " + f +" natural numbers</p>");
            jq("#myp").append(separator);

            // ---------------------------- deferred ----------------------------------
            deferred = jq.Deferred(function (d) {
                jq("#def").append("<p>Constructing first Deffered object</p>");
            });

            filtered = deferred.then(this.sum);

            deferred.resolveWith(this, [c, 10, 20, 30, "Marco", 47, "Male"]);

            deferred.always(function () {
                jq("#output").append("<p>The first deferred object was accepted</p>");
            });

            deferred.reject();

            filtered.done(function( value ) {
                jq("#output").append("<p>Sum of first " + c + " natural numbers is: " + value + "</p>");
                jq("#output").append(separator);
            })
            .fail(function () {
                jq("#output").append("<p>The first deferred object was failure</p>");
            });



            // ---------------------------- deferred1 ----------------------------------
            deferred1 = jq.Deferred(function (d) {
                jq("#def").append("<p>Constructing second Deffered object</p>");
            });

            filtered1 = deferred1.then(this.sum);

            deferred1.resolveWith(this, [e, 20, 30, 40, "Nina", 25, "Female"]);

            deferred1.always(function () {
                jq("#output").append("<p>The second deferred object was accepted</p>");
            });

            filtered1.done(function( value ) {
                jq("#output").append("<p>Sum of first " + e + " natural numbers is: " + value + "</p>");
                jq("#output").append(separator);
            })
            .fail(function () {
                jq("#output").append("<p>The second deferred object was failure</p>");
            });

            // ---------------------------- deferred2 ----------------------------------
            deferred2 = jq.Deferred(function (d) {
                jq("#def").append("<p>Constructing third Deffered object</p>");
            });

            filtered2 = deferred2.then(this.sum);

            deferred2.resolveWith(this, [f, 40, 50, 60, "Victor", 30, "Male"]);

            deferred2.always(function () {
                jq("#output").append("<p>The third deferred object was accepted</p>");
            });

            filtered2.done(function( value ) {
                jq("#output").append("<p>Sum of first " + f + " natural numbers is: " + value + "</p>");
                jq("#output").append(separator);
            })
            .fail(function () {
                jq("#output").append("<p>The third deferred object was failure</p>");
            });

            jq("#def").append(separator);

            jq.when(deferred, deferred1, deferred2).then(this.printFinished);
        },

        printFinished: function () {
            jq("#output").append("<p>Finished!</p>");
        },

        printName: function (name) {
            jq("#output").append("<p>Name: " + name + "</p>");
        },

        printAge: function (age) {
            jq("#output").append("<p>Age: " + age + "</p>");
        },

        doSomeStuff: function (a, b, c, age, gender) {
            myParam += 10;

            this.printAge(age);

            mm.mainFunc(a, b, c, gender);
        },

        sum: function (c, p1, p2, p3, name, age, gender) {
            var i = 0,
                sum = 0;

            myParam += 10;

            for (i = 1; i <= c; i += 1) {
                sum += i;
            }

            jq("#output").append("<p>myParam in sum(): " + myParam + "</p>");

            this.printName(name);

            this.doSomeStuff(p1, p2, p3, age, gender);

            return sum;
        }
    };

}($, MyModule));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var jqDeferredApp = window.jqDeferredApp,
        config = {
        "event" : event
    };

    jqDeferredApp.init(config);
});
