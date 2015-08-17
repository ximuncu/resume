
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      scripts: {
        src:[
          'scripts/resume.js',
          'scripts/drawing.js',
          'scripts/point.js',
          'scripts/color.js',
          'scripts/dot.js',
          'scripts/action.js',
          'scripts/builder.js',
          'scripts/shape.js'
        ],
        dest: 'release/resume.js'
      }
    },

    watch: {
      scripts: {
        files: ['scripts/*.js'],
        tasks: ['clean:scripts', 'concat', 'jshint']
      },
      css: {
        files: ['styles/*.css'],
        tasks: ['clean:css', 'cssmin']
      }
    },

    clean: {
      scripts: ['release/*.js'],
      css: ['release/*.css']
    },

    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      combine: {
        files: {
          'release/style.min.css': ['styles/style.css']
        }
      }
    },

    jshint: {
      files: ['scripts/*.js'],
      options: {
        'globalstrict': true,
        'strict': false,
        'white': true,
        'indent': 2,
        'curly': true,
        'eqnull': true,
        'latedef': true,
        'newcap': true,
        'noarg': true,
        'eqeqeq': true,
        'immed': true,
        'undef': true,
        'unused': true,
        'browser': true
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('release', ['clean', 'cssmin', 'concat', 'jshint']);

};
