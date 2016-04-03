module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc : '.jshintrc'
      },
      all: [ 'lib/**/*.js', 'test/**/*.js', 'gruntfile.js' ]
    },

    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'spec'
      },
      all: 'test/**/*.js'
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('default', [ 'jshint', 'simplemocha' ]);

};
