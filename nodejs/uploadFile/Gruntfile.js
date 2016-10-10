module.exports = function (grunt) {
	grunt.initConfig({
		concat: {
			options: {
				separator: ';',
				process: {
					data: {
						requireJSVersion: +new Date
					}
				}
			},
			js: {
				src: ['config.js', 'node_modules/requirejs/require.js'],
				dest: 'static/js/require.js'
			}
		},
		uglify: {
			buildRequire: {
				files: {
					'static/js/require.js' : 'static/js/require.js'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.registerTask('build', ['concat', 'uglify']);
	grunt.registerTask('default', ['build']);
}