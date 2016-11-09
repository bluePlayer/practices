module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify : {
            build : {
                files : [{
                    "src" : [
                                'js/FrnConstr.js',
                                'js/utils/Constants.js',
                                'js/utils/FrnConstrMessages.js',
                                'js/utils/FrnConstrErrors.js',
                                'js/utils/Utility.js',
                                'js/utils/InnerSlotMatrixUtility.js',
                                'js/utils/GraphicsUtility.js',
                                'js/utils/ProcessDataUtility.js',
                                'js/State.js',
                                'js/Screens/Boot.js',
                                'js/UI/FrnConstrButton.js',
                                'js/UI/GoToScreen.js',
                                'js/UI/GoToUrl.js',
                                'js/Screens/Screen.js',
                                'js/Screens/Preloader.js',
                                'js/Screens/EnteriorScreen.js',
                                'js/Screens/ExteriorScreen.js',
                                'js/Screens/SendApplicationScreen.js',
                                'js/InitFrnConstrForm.js'
                            ],
                    "dest" : "js/FrnConstr.min.js"
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};