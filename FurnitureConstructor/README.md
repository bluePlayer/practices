Furniture Constructor
=====================

Contains files, scripts, images that were created for a client, but he could not afford the rest 
of it so now the project belongs to me. Could have been a nice application.

It is a tool that can create cabinets with 10 parts inside. The user can design his own cabinets
with shelves, drawers, ties, shoes, pantographs, trousers etc...

This application was made using Phaser 2.6.1 simply because Pixi.js cannot manage scenes but can render canvas graphics. 

I also started my own QA with automatic tests made in QUnit and run by KarmaJS test runner inside NodeJS and the project was build with Jenkins Ci server. I set Jenkins to create test reports using JUnit reporter and also added code coverage "Coverage" plugin for Karma. I planned to add testing in Firefox and Chrome when the build was run by Jenkins but the project failed until I add this feature. Now Jenkins runs only Phantom JS builds.

[Jenkins Build configuration and QUnit parametric tests explanation](http://tunephp.blogspot.mk/2016/11/qunit-parameterize-plugin.html)

I also planned user interaction testing with QUnit and JQuery trigger but also this feature was canceled. :)

I will try to maintain the demo application live here: [Furniture Constructor](http://myconstructor-phasertest.rhcloud.com/)
Hosted on OpenShift server, but the free membership puts the app. into idle state once it is not used for few days.

![All parts exercise](https://github.com/bluePlayer/practices/blob/master/FurnitureConstructor/dev/other_assets/AllPartsExercise5.png)





