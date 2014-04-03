module.exports=function (grunt) {
	'use strict';
	var ipAddress = require('network-address')();
	var info = require('./package.json');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat:{
			dist: {
				src:["src/js/<%= pkg.name %>/*.js"],
				dest:"dest/js/<%= pkg.name %>/all.js"
			},
			templates:{
				src:["src/js/<%= pkg.name %>/*.js"],
				dest:"dest/js/<%= pkg.name %>/<%= grunt.template.today('yyyy-mm-dd') %>.js"
			},
			 trans_url: {
	            options: {
	                process: function(src, filepath) {
	                    var regex = new RegExp("../../images/"+info.name,"g");
	                    return src.replace(regex, 'http://res.m.yystatic.com/act/images/'+info.name);
	                }
	            },
	            files: [{
	                expand: true,
	                cwd: 'dest/css/<%= pkg.name %>/',
	                src: '*.css',
	                dest:"dest/css/<%= pkg.name %>/"
	            }]
	        }
		},
		uglify:{
			build:{

				 files:[
				 	{
				 		src:["dest/js/<%= pkg.name %>/all.js"],
				 		dest:"dest/js/<%= pkg.name %>/all.min.js"
				 	}
				 ]
			}
		},
		cssmin: {
            options: {
                banner: '<%= banner %>'
            },
            minify: {
                expand: true,
                cwd: 'dest/css/<%= pkg.name %>/',
                src: ['*.css', '!*.min.css'],
                dest: 'dest/css/<%= pkg.name %>/',
                ext: '.css'
            }
        },
		clean:{
			src:["dest/**/*","dest/*"]
		},
		copy:{
			main: {
				expand:"true",
				cwd:"src/",
			    src: '**/*.*',
			    dest: 'dest/'
			  }
		},
		useminPrepare: {
		  src: ['dest/html/<%= pkg.name %>/*.html',"! dest/js/<%= pkg.name %>/*.js"]
		},
		usemin:{
			html: 'dest/html/<%= pkg.name %>/*.html',
			css:"dest/css/<%= pkg.name %>/*.css"
		},
		rev:{
			options: {
		      encoding: 'utf8',
		      algorithm: 'md5',
		      length: 4
		    },
		    assets: {
		      files: [{
		        src: [
		          // 'dest/js/<%= pkg.name %>/*.js',
		          'dest/css/<%= pkg.name %>/*.css',
		          'dest/images/<%= pkg.name %>/{,*/}*.{png,jpg,jpeg,gif}',
		        ]
		      }]
		    }
		},
		autoprefixer:{
			options: {
                 browsers: ['> 1%', 'last 2 versions', 'ff 24', 'opera 12.1', 'ie 6']
            },
            dist: {
                expand: true,
                flatten: true,
                src: 'dest/css/<%= pkg.name %>/*.css',
                dest: 'dest/css/<%= pkg.name %>/'
            }
		},
		imagemin: {
			options: { // Target options
				optimizationLevel: 3
			},
            dist: {
                expand: true,
                cwd: 'dest/images/<%= pkg.name %>/',
                src: '*',
                dest: 'dest/images/<%= pkg.name %>/'
            }
        },
        connect: {
		    server: {
		      options: {
		      	keepalive:true,
		        port: 9001,
		        hostname:ipAddress,
		        base:"src/html/<%= pkg.name %>",
		        open: true, //打开默认浏览器
		      }
		    }
		  },
	});
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-usemin");
	grunt.loadNpmTasks("grunt-rev");
	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-imagemin");
	grunt.loadNpmTasks('grunt-contrib-connect');


	grunt.registerTask('co',"concat");
	grunt.registerTask('ug',"uglify:build");
	grunt.registerTask("cl","clean");
	grunt.registerTask("cp","copy");
	grunt.registerTask("up","useminPrepare");
	grunt.registerTask("us","usemin");
	grunt.registerTask("revision","rev");
	grunt.registerTask("pre","autoprefixer");
	grunt.registerTask("img","imagemin");
	grunt.registerTask("server","connect");

	grunt.registerTask("yyent",["clean","copy","autoprefixer","rev","useminPrepare","usemin","url"]);

	// release后，修改资源路径
    grunt.registerTask('url',['concat:trans_url']);
}