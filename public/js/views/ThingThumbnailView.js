 var app = app || {};

$(function( $ ) {
    'use strict';

 app.ThingThumbnailView =  Backbone.View.extend({
        className : "span3",
        tagName : "div",

        initialize : function() {
            this.template = _.template(app.templateFetcher.templates.thingThumbnailTmpl);
        },

       

        loveThing : function(event) {
            event.preventDefault();
            console.log("HEI!" + JSON.stringify(this.model.attributes));
            //var thingIndex = event.currentTarget.id.split("_")[1];
            //var thing = this.collection.models[thingIndex];
            this.model.addSomeLove();
        },

        render : function() {
            this.$el.html(this.template(
                {thing:this.model.attributes}
            ));
            //this.setListeners();
            return this;
        },

        setListeners : function() {
            console.log("sap");

            this.delegateEvents({"click .loveTree" : "loveThing"});
            //$('.loveTree').on("click", $.proxy(this.loveThing, this));
            _.bindAll(this);
            _.bind(this, this.loveThing);
        }
    });
});