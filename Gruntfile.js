module.exports = function(grunt) {

  grunt.initConfig({
  	pkg : grunt.file.readJSON('package.json'),

  	uglify : {
  	  options : {
  	  	banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
  	  },
  	  build : {
  	  	src: ['src/<%= pkg.name %>.js','attributes.js', 'operators.js', 'spec.js'],
  	  	dest: 'build/<%= pkg.name %>.min.js'
  	  }	
  	},

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          $: true,
          console: true
        }
      },
      src: [ 'src/**/*.js' ]
    },

    simplemocha : {
      options : {
        globals : ['should'],
        timeout : 2000,
        ignoreleaks : false,
        reporter : 'tap'
      },
      all : { src : ['./test/**/*.js']}
    },

    watch : {
      test : { 
        files : './test/**/*.js',
        tasks : 'simplemocha'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'jshint', 'simplemocha']);

};