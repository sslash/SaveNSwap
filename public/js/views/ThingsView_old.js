var app = app || {};


/**
* THIS DOES NOT WORK; IT IS NOT USED
*/
$(function( $ ) {
	'use strict';

    app.ThingsView = Backbone.View.extend({


        initialize : function() {
            // Cache the template function
            this.template = _.template(app.templateFetcher.templates.thingsListView);
            this.collection = new app.ThingCollection(null, {
                page : 1,
                resSize : 100,
                query : this.options.query
            });
        },

        render : function() {
        	console.log("ThingsView, render()");


            // Make sure functions are called in the right scope 
            this.$el.html(this.template({}));
            return this;
        },

        postRender : function() {
            this.collection.fetch();

            _.bindAll(this,'addAll', 'addOne');
            this.collection.bind('reset', this.addAll);

        },

        bindListeners : function() {
            // $('#blogPostAddBtn').on('click', $.proxy(this.newBlogPost, this)); 
        },

        addOne : function(thing) {
            console.log("Addone() :" + JSON.stringify(thing.attributes));
           
        },

        addAll : function() {
            var that = this;
            var htmlstr = "<div class=\"row-fluid\">";
            var i = 1;
            var views =[];
            this.collection.each(function(thing){
                var view = new app.ThingThumbnailView({model:thing});   
                htmlstr += $(view.render().$el).html();
                views.push(view);
               // $('#thumbnails').append($(view.render().$el).html());
                if ( i % 4 == 0) {
                    htmlstr += "</div>\n <div class=\"row-fluid\">";
                }

                i++;
            });
            htmlstr +="</div>";
            $('#thumbnails').append(htmlstr);    

            _.each(views, function(v) {
                v.setListeners();
            });   
        },

        newBlogPost : function() {
            // var name = $('#postName').val();
            // var text = $('#postData').val();

            // app.blogPostList.create({
            //     name : name,
            //     text : text
            // });
},

        // Destroy model when '.post-destroy' is clicked
        destroy: function() {
            // this.model.destroy();
            console.log("ThingsView, destroy()");
        }
    });

});