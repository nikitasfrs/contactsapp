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

            js: {
                files: ['./js/**/*.js'],
                tasks: ['browserify', 'mochaTest']
            },

            mochaTest: {
                files: ['./specs/**/*.spec.js'],
                tasks: ['mochaTest']
            }
        },

        browserify: {
            dist: {
                src: ['./js/*.js'],
                dest: './bundle.js',
            },
            options: {
                transform: ['brfs']
            }
        },

        mochaTest: {
            specs: {
                options: {
                    ui: 'bdd',
                    reporter: 'spec',
                    require: './specs/helpers/config'
                },
                src: ['specs/**/*.spec.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', [
        'watch',
        'browserify'
    ]);

    grunt.registerTask('mocha', [
        'mochaTest'
    ]);

};
