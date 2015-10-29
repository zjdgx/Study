/**
 * Build Date: 15/8/7 13:36.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			bower: ['bower_components'],
			dist: ['static/dist', '<%= dirs.css %>'],
			handlebars: ['static/js/**/templates.js']
		},
		concat: {
			dev: {
				options: {
					separator: ';',
					process: {
						data: {
							baseUrl: '/js',
							requireJSVersion: +new Date
						}
					}
				},
				files: {
					'static/js/common/require.min.js': ['static/js/common/requireConfig.js', 'bower_components/requirejs/require.js']
				}
			},
			main: {
				files: {
					'static/css/common/pages.css': ['node_modules/normalize.css/normalize.css', 'static/css/common/common.css', 'static/css/components/popup.css']
				}
			}
		},
		cssmin: {
			combine: {
				options: {
					expand: true,
					cwd: 'static/css'
				},
				files: {
					'static/dist/index.min.css': ['static/css/common/pages.css', 'static/css/index.css'],
					'static/dist/student.min.css': ['static/css/common/pages.css', 'static/css/student.css'],
					'static/dist/teacher.min.css': ['static/css/common/pages.css', 'static/css/teacher.css'],
					'static/dist/newCourse.min.css': ['static/css/common/pages.css', 'static/css/newCourse.css']
				}
			}
		},
		copy: {
			components: {
				files: [
					{
						src: 'node_modules/backbone.modelbinder/Backbone.ModelBinder.js',
						dest: 'static/js/common/Backbone.ModelBinder.js'
					},
					{
						src: 'bower_components/moment/moment.js',
						dest: 'static/js/common/moment.js'
					}
				]
			}
		},
		handlebars: {
			compile: {
				options: {
					amd: true,
					namespace: 'templates',
					processContent: function (content, filepath) {
						content = content.replace(/^[\x20\t]+/mg, '').replace(/[\x20\t]+$/mg, '');
						content = content.replace(/^[\r\n]+/, '').replace(/[\r\n]*$/, '\n');
						return content;
					},
					processName: function (filePath) {
						return filePath.replace(/(.+\/)*(.*)\.hbs?/, '$2');
					}
				},
				files: grunt.file
					.expand({
						cwd: 'static/js',
						filter: 'isDirectory'
					}, ['**'])
					.map(function (moduleName) {
						return {
							src: ['static/js/' + moduleName + '/*.hb', 'static/js/' + moduleName + '/*.hbs'],
							dest: 'static/js/' + moduleName + '/templates.js'
						};
					})
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-cssshrink');

	grunt.registerTask('css', ['concat', 'cssmin']);
	grunt.registerTask('handlebar', ['handlebars']);
};