var app = app || {};
var ENTER_KEY = 13;

// $(function() {

// 	// Kick things off by creating the **App**.
// 	//new app.NavigationView();
// 	//new app.MainBannerView();
// 	//app.currMainView = new app.FrontPageView();

// 	/**
//     * Extension to add a zombie cleaner to every view!
//     */
Backbone.View.prototype.close = function () {
    if (this.beforeClose) {
        this.beforeClose();
    }
        //this.remove();
        this.unbind();
        this.$el.empty();
    };
    

    require([], function() {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".

    /* Fire off the application! */
    app.templateFetcher.loadTemplates(
        ['thingsListView', 'thingThumbnailTmpl', 'listOfThingsTmpl',
        'addThingTmpl', 'netshopTmpl','ns_category', 'ns_shoppingCart', 'adminTmpl'],
        function() {
            // Start the browser history
            app.TodoRouter = new app.Workspace();
            Backbone.history.start();
        });
});
