module.exports = function(grunt) {
    exec = require('child_process').exec;
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '../public/css/style.css': 'styles/main.scss'
                }
            }
        },
        watch: {
            js: {
                files: 'js/**/*.js',
                tasks: ['browserify']
            },
            css: {
                files: 'styles/*.scss',
                tasks: ['sass']
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
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/bootstrap/bootstrap.min.js',
                    'bower_components/jquery/jquery.min.js',
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
                    '../public/css/lib.min.css': ['../public/css/lib.css']
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
                    '../public/js/main.min.js': ['../public/js/main.js']
                }
            }
        },
        eslint: {
            target: ['assets/js/**.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-sass');

    // Default task(s)
    grunt.registerTask('default', []);
    grunt.registerTask('build', ['browserify', 'concat', 'cssmin', 'uglify', 'sass']);

};
