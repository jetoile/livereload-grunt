var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {

 
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  // Configure Grunt 
  grunt.initConfig({

     markdown: {
      all: {
        files: [
          {
            expand: true,
            src: '*.md',
            dest: 'html/',
            ext: '.html'
          }
        ]
      }
    },
 
 
    // grunt-watch will monitor the projects files
    watch: {
      all: {
        // Replace with whatever file you want to trigger the update from
        // Either as a String for a single entry 
        // or an Array of String for multiple entries
        // You can use globing patterns like `css/**/*.css`
        // See https://github.com/gruntjs/grunt-contrib-watch#files
        files: ['*.md','*.html'],
        tasks : ['markdown'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
        livereload: {
             options: {
                 port: 9000,
                 livereload: 35729,
                 hostname: '0.0.0.0',
                 open: true,
                 base: [
                     'html'
                 ],
                 middleware: function (connect) {
                     return [
                         proxySnippet,
                         connect.static(require('path').resolve('html'))
                     ];
                 }
             }
         }
     }
  });
 
  // Creates the `server` task
  grunt.registerTask('default', [
    'markdown',
    'configureProxies',
    'connect',
    'watch'
  ]);
};
