module.exports = function(grunt) {

	// Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
	
	// Initialize config
	grunt.initConfig({
		// Package
		pkg: grunt.file.readJSON('package.json'),
		// SASS
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/penplate.css': 'sass/penplate.scss'
				}
			}
		}, 
		// End of SASS
		// Uglify
		uglify: {
			// Stack file
			stack: {
				files: {
					'js/min/penplate.min.js': [
						'js/penplate.js'
					]
				}
			},
		},
		// Watch
		watch: {
			// CSS
			css: {
				files: ['**/*.scss'],
				tasks: ['sass']
			},
			// End of CSS
			// Pages
			pages: {
				files: ['*.html']
			},
			// End of Pages
			// Scripts
			scripts: {
				files: ['gruntfile.js', 'js/penplate-editor.js', 'js/penplate.js'],
				tasks: ['uglify']
			},
			// End of scripts
			// Live reload
			options: {
		      livereload: true,
		    } 
		    // End of live reload
		} 
		// End of watch
	});
	// End of initialize config
}