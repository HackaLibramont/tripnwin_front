'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      production: {
        files: {
          'css/main.css': 'less/main.less',
        }
      }
    },

    watch: {
      less: {
        files: 'less/*.less',
        tasks: ['less']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less', 'watch']);
};
