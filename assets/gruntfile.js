module.exports = function(grunt) {
    exec = require('child_process').exec;
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: 'js/**/*.js',
                tasks: ['browserify']
            },
            css: {
                files: 'styles/*.scss',
                tasks: ['sass:watch']
            }
        },
        browserify: {
            '../public/js/main.js': [
                'js/modules/main.js',
                'js/custom/*.js',
            ],
            options: {
                debug: true
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            lib: {
                src: [
                    'bower_components/jquery/jquery.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'bower_components/bootstrap/bootstrap.min.js'
                ],
                dest: '../public/js/lib.js'
            },
            css: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/font-awesome/css/font-awesome.css'
                ],
                dest: '../public/css/lib.css'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '../dist/css/lib.css': ['../public/css/lib.css'],
                    '../dist/css/style.css': ['../public/css/style.css']
                }
            }
        },
        uglify: {
            main: {
                options: {
                    mangle: false,
                    define: {
                        DEBUG: false
                    }
                },
                files: {
                    '../dist/js/main.js': ['../public/js/main.js'],
                    '../dist/js/lib.js': ['../public/js/lib.js']
                }
            }
        },
        sass: {
            watch: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '../public/css/style.css': 'styles/main.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    // Default tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['browserify', 'concat', 'sass']);
    grunt.registerTask('pack', ['browserify', 'concat', 'sass', 'cssmin', 'uglify']);

};
