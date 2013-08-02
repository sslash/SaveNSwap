var app = app || {};

$(function() {

  // Kick things off by creating the **App**.

  'use strict';

  // Todo Router
  // ----------
// TODO: Clean up all these if this then close checks!!
app.Workspace = Backbone.Router.extend({

  routes: {
    "" : "frontPage",
    "/" : "frontPage",
    "#" : "frontPage",
    "home" : "frontPage",
    "category/:c" : "category",
    "category/:c/:s" : "subCategory",
    "thing/:id" : "thing",
    "profile" : "showPilotProfile",
    "editProfile/:id" : "editProfile",
    "user/:id" : "profile",
    "search" : "search",
    "addNewGivaAwayThing" : "addNewGivaAwayThing",
    "addNewSwapThing" : "addNewSwapThing",
    "admin" : "admin",

      // Netshop
      "netshop" : "netshop",
      "netshop/cart" : "netshopCart",
      "netshop/:cat" : "netshopCategory"
    },

    admin : function() {
       this.clearMainView();

      var NSItems = new app.NSItemCollection(null, {
        page : 1,
        resSize : 40
      });

      var view = new app.AdminView({collection : NSItems});
      this.showView("#mainContentId", view);
       NSItems.fetch({reset : true});
    },

    netshopCart : function() {
     this.clearMainView();

      // fetch shopping cart
      var view = new app.ShoppingCartView();
      this.showView("#mainContentId", view);
    },

    clearMainView : function() {
      if ( app.currMainView )
        app.currMainView.close();
      if ( app.mainBannerView ) 
        app.mainBannerView.close();
    },

    /* Route functions */
    thing : function(id) {
      new app.ThingView({thingId : id});
    },

    /** Netshop category */

    netshopCategory : function (catId) {
      this.clearMainView();

      var NSItems = new app.NSItemCollection(null, {
        category: catId,
        page : 1,
        resSize : 40
      });

      // fetch shopping cart
      var view = new app.NetshopCatView({catId : catId, collection : NSItems});
      this.showView("#mainContentId", view);
      NSItems.fetch({reset : true});
    },

    netshop : function() {
      this.clearMainView();
      var view = new app.NetshopView();
      this.showView("#mainContentId", view);
    },

    // This view is independent of all other views
    addNewSwapThing : function() {
      var addThingView = new app.AddNewThingView({giveAway: false});
      $('#modalViewId').html(
        addThingView.render().el
        );
      addThingView.bindListeners();
      addThingView.postRender();
    },

    addNewGivaAwayThing : function() {
      var addThingView = new app.AddNewThingView({giveAway: true});
      
      $('#modalViewId').html(
        addThingView.render().el
        );
      addThingView.bindListeners();
      addThingView.postRender();
    },

    frontPage : function() {
      if ( app.navigationView) 
        app.navigationView.close();
      if ( app.mainBannerView) 
        app.mainBannerView.close();
      if ( app.currMainView) 
        app.currMainView.close();

      app.navigationView = new app.NavigationView();
      app.mainBannerView = new app.MainBannerView();
      var frontPageView = new app.FrontPageView();
      this.showView("#mainContentId", frontPageView);
    },

    editProfile : function(id) {
      if ( app.currMainView )
        app.currMainView.close();
      if ( app.mainBannerView ) 
        app.mainBannerView.close();

      var editProfileView = new app.EditProfileView({userId : id});
      this.showView("#mainContentId", editProfileView);
    },

    showPilotProfile : function() {
     console.log("pilot");
     if(app.Registry.isLoggedIn()) {
      console.log("and logged in");
      if ( app.mainBannerView ) {
        app.mainBannerView.close();
      }

      if ( app.navigationView) {
        app.navigationView.close();
      }

      app.navigationView = new app.NavigationView();

      var profileView = new app.ProfileView({
        modelId:app.Registry.getUserId(),
        newlyRegistered : true});
      this.showView("#mainContentId", profileView);
    }
  },

  
  profile : function(id) {
    if ( app.currMainView )
      app.currMainView.close();
    if ( app.mainBannerView ) 
      app.mainBannerView.close();

    var profileView = new app.ProfileView({modelId:id});
    this.showView("#mainContentId", profileView);
  },

  category : function(c) {

    if ( app.CategoryView ){
      //if (app.currMainView)
       // app.currMainView.cleanUp(); // should be Front page content
       var catView = new app.CategoryView({category:c});    
       this.showView("#mainContentId", catView);
     } else {
      if (console)
        console.log("Category not init yet :(");
      } 
    },

    subCategory : function(c,s) {
      // might not have loaded yet
      //if ( app.CategoryView ){
        //app.CategoryView.close(); // should be Front page content

        var subcatView = new app.CategoryView({category:c, subCategory: s});    
        this.showView("#mainContentId", subcatView);
      },

    // Dummy thing, cause the routing is done in MainBannerView
    search : function() {},

    /* Other functions */
    showView: function(selector, view) {
      if ( !app.navigationView) 
        app.navigationView = new app.NavigationView();

      if (this.currMainView)
        this.currMainView.close();

      this.currMainView = view;

      if ( view.preRender ) {
        var that = this;
        view.preRender().done( function() {
          that.doRender(selector, view);
        });
      } else {
        console.log("no prerender, just render");
        this.doRender(selector, view);
      }
      return view;     
    },

    doRender : function(selector, view) {
      $(selector).html(view.render().el);

      if ( view.postRender) {
        view.postRender();
      }

      if(this.currMainView.bindListeners) {
        this.currMainView.bindListeners();
      }
    }

  });


}());