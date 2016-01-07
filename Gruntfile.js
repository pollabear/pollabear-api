// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

//---------------------------- nodemon ----------------------------//

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

  });

  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['nodemon:dev']); 

};