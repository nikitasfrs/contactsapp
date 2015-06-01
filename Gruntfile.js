'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        project: {
            app: ['app'],
            scss: ['sass/style.scss']
        },

        sass: {
            dev: {
                options: {
                    style:'expanded',
                    compass: false,
                    
                    // bootstrap requires this
                    precision: 8,
                },
                files: {
                    'css/main.css':'<%= project.scss %>'
                }
            }
        },

        watch: {
            sass: {
                files: 'sass/{,*/}*.{scss,sass}',
                tasks: ['sass:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'watch'
    ]);

};
