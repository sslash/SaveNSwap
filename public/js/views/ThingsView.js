var app = app || {};

$(function( $ ) {
    'use strict';

    // TODO: Events are added each time the page renders
    // Might consider unbind when the page is to render again
    app.ThingsView = Backbone.View.extend({

        //el: '#mainContentId',
        thingsDiv : "#listOfThings",

        //template: _.template( $('#things-template').html()),

        initialize : function() {
            this.template = _.template(app.templateFetcher.templates.thingsListView);
            this.thingsTemplate = _.template(app.templateFetcher.templates.listOfThingsTmpl);
            this.category = 'All Categories';
        },

        events : {
            "click input[type=checkbox]" : "checkboxClicked",
            "click input[type=radio]" : "radioClicked",
            'keypress #countryFilter' : "filterByCountry",
            'keypress #cityFilter' : "filterByCity",

        },

        checkboxClicked : function(event) {},

        filterByCity : function (event) {
            if ( event.which === ENTER_KEY ) {
                event.preventDefault();
                var city = $('#cityFilter').val();
                this.collection.urlParams['city'] = city;
                this.refreshCollection();

            }
        },

        filterByCountry : function (event) {
            if ( event.which === ENTER_KEY ) {
                event.preventDefault();
                var country = $('#countryFilter').val();
                this.collection.urlParams['country'] = country;
                this.refreshCollection();

            }
        },

        refreshCollection : function() {
          this.unbindListeners();
          var that = this;
          this.fetchCollection().done( function() {
            that.postRender();
            that.bindListeners();
        });
      },

      radioClicked : function(event) {
        var category = event.currentTarget.value;
        console.log(event.currentTarget.value);
        this.collection.urlParams['searchCategory'] = category;
        this.refreshCollection();          
    },

    preRender : function() {
        var dfr = $.Deferred();
        this.fetchQueryResult().done(dfr.resolve);
        return dfr.promise();
    },

    postRender : function() {
      $(this.thingsDiv).html(this.thingsTemplate({
        things : this.collection.models
        }));  
      return this;      
  },

  render : function() {
    this.$el.html(this.template({
               // things : this.collection.models,
               query : this.options.query,
               country : this.options.country,
               city : this.options.city
           }));  
    return this;      
},

fetchQueryResult : function() {
    var dfr = $.Deferred();
    this.collection = new app.ThingCollection(null, {
        page : 1,
        resSize : 100,
        query : this.options.query,
        country : this.options.country,
        city:this.options.city
    });

    this.fetchCollection().done(function() {
        dfr.resolve();
    });

    return dfr.promise();
},

fetchCollection : function() {
    var dfr = $.Deferred();

    this.collection.fetch({
        success: function() {
            dfr.resolve();
        },error : function() {
            dfr.resolve();
        }
    });
    return dfr.promise();
},

loveThing : function(event) {
    event.preventDefault();
    var thingIndex = event.currentTarget.id.split("_")[1];
    var thing = this.collection.models[thingIndex];
    thing.addSomeLove();
},

howerTree : function(event) {
    var i = event.currentTarget.id.split("_")[1];
    $('#thingBtn_' + i).show();
    $('#thingImg_' + i).css('opacity:0.6;filter:alpha(opacity=60)');
}, 

unHowerTree : function(event) {
    var i = event.currentTarget.id.split("_")[1];
    $('#thingBtn_' + i).hide();
    $('#thingImg_' + i).css('opacity:1;filter:alpha(opacity=100)');
},

showThing : function(event) {
    event.preventDefault();
    if ( app.Registry.isLoggedIn()){
        var thingId = event.currentTarget.id.split("_")[2];
        new app.ThingView({thingId : thingId});
    } else {
        $('#mustBeLoggedInModal').modal('show');
    }
},

bindListeners : function() {            
    $('.artifact-imgsap').on("mouseenter", this.howerTree);
    $('.artifact-imgsap').on("mouseleave", this.unHowerTree);
    $('.artifact-imgsap').on("click", this.showThing);
    $('.loveTree').on("click", $.proxy(this.loveThing, this));
},

unbindListeners : function() {    
    console.log("unbinf");        
    $('.artifact-imgsap').off("mouseenter", this.howerTree);
    $('.artifact-imgsap').off("mouseleave", this.unHowerTree);
    $('.artifact-imgsap').off("click", this.showThing);
    $('.loveTree').off("click", $.proxy(this.loveThing, this));
}

});
});