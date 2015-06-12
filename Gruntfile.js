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
            },
            browserify: {
                files: ['js/**'],
                tasks: ['browserify']
            }
        },

        browserify: {
            dist: {
                src: ['./js/*.js'],
                dest: 'dist-js/main-build.js',
            },
            options: {
                transform: ['jstify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', [
        'watch',
        'browserify'
    ]);

};
