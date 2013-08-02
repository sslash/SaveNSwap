var app = app || {}


jQuery( function($) {

	app.templateFetcher = {

        // Object containing preloaded HTML templates
        templates: {},

        // Recursively pre-load all the templates 
        // This implementation should be changed in a production environment:
        // All the template files should be concatenated in a single file.
        loadTemplates: function(names, callback) {

    	   var snap = this;

    	   var loadTemplate = function(index) {
        	   	var name = names[index];
        		$.get('templates/' + name + '.html', function(data) {
        			snap.templates[name] = data;
        			index++;
        			if (index < names.length) {
        				loadTemplate(index);
        			} else {
        				callback();
        			}
        		});
    	   }

    	   loadTemplate(0);
        },

            // Get template by name from hash of preloaded templates
        get: function(name) {
        	return this.templates[name];
        }
    };
})

