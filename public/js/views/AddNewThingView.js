var app = app || {};

$(function( $ ) {
	'use strict';

	// Just holds events that belongs to the navigation!
	app.AddNewThingView = Backbone.View.extend({

		events : {
			'submit #addForm' : 'saveThing'
		},

		initialize : function() {
			this.template = _.template(app.templateFetcher.templates.addThingTmpl);
			this.categories = app.Registry.getObject('categories');
			this.interestsArr = [];
		},

		render : function() {
			this.$el.html(this.template({
				categories : this.categories,
				subCategories : this.categories[0].subCategory || "-",
				giveAway : this.options.giveAway
			}));	
			return this;	
		},

		postRender : function() {
			$('#addThingModal').modal('show');
		},

		showImgThmbAndSetFile : function(f){
			var output = [];
			output.push('<li><strong>', escape(f.name), '</strong>',
				'</li>');

			$('#file_list1').html('<ul>' + output.join('') + '</ul>');


			var reader = new FileReader();

      			// Closure to capture the file information.
      			reader.onload = (function(theFile) {
      				return function(e) {
      					$('#addThingImg').attr('src', e.target.result);
      					$('#dropThingImgTxt').remove();
      					$('#chooseNewThingFile').html('Choose another file');
      				};
      			})(f);

      			// Read in the image file as a data URL.
      			reader.readAsDataURL(f);
      		},

      		handleFileDrop: function(evt) {
      			evt.stopPropagation();
      			evt.preventDefault();

			// files is a FileList of File objects. List some properties.
			var files = evt.dataTransfer.files; 
			var f = files[0];
			if ( f && f.type.match('image.*')) {
				this.imageFile = f;
				this.showImgThmbAndSetFile(f);
			}
		},

		handleFileSelect : function(evt) {
			var files = evt.target.files;
			var f = files[0];

			if ( f && f.type.match('image.*')){
				this.showImgThmbAndSetFile(f);
				this.imageFile = f;
			}
		},

		handleDragOver : function (evt) {
			evt.stopPropagation();
			evt.preventDefault();
    		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    	},

		saveThing : function(event) {
			event.preventDefault();

			if ( this.imageFile == null ) {
				$('#addImageWarning').text("Please, add an image file!");
				return;
			}
			// TODO: create error message or some shiet!
			if ( !app.Registry.isLoggedIn()) {return false;}
			var file = this.imageFile;

			var thing = new app.Thing({
				title : $('#thingTitle').val(),
				category : $('#categorySelect option:selected').val(),
				subCategory : $('#subCategorySelect option:selected').val(),
				tags : this.interestsArr,
				giveAway : this.options.giveAway,
				description: $('#descForNewThing').val(),
				created : new Date(),
				placementCountry : $('#placementCountry').val(),
				placementCity : $('#placementCity').val(),
				owner : app.Registry.getUserId(),
				imgPath : file.name || 'unknown.gif'
			});

			var that = this;
			thing.save({
				success: that.uploadFile( {
					file : file,
					handler : that.addThingSuccess
				})				
			});
		}, 


		addThingSuccess : function() {
			$('#addThingModal').modal('hide');
		},

		uploadFile : function(obj) {
			var that = this;
			var file = obj.file;

			if ( file ) {

				var data = new FormData();
				data.append("file", file);

				$.ajax({
					url : '/api/file',
					type : 'POST',
					data : data,
					success : function(res) {
						obj.handler();
					},
					error : function(res) {
						console.log('error occured: ' + res);
					},
				//Options to tell JQuery not to process data or worry about content-type
				cache : false,
				contentType : false,
				processData : false
			});
			} else {
				obj.handler();
			}
		},

		pushInterest : function (event) {
			if ( event.which === ENTER_KEY ) {
        		event.preventDefault();
        		var interest = $("#ed_inputTags");
        		var input = interest.val();
        		interest.val('');
				 this.appendInterest(input);
				this.interestsArr.push(input);
      		}			
		},

		appendInterest : function(interest) {
			var span = '<a href="#" class="tagTooltip" data-toggle="tooltip"' +
				'title="Click to Remove" id = "tooltipTag_'+ interest + '">' +
				'<span class="label label-info tag-label">' + interest + '</span>';
			$('.tagPool').append(span);
		},


		hideThisView : function() {
			console.log("will lok");
			this.close();
			app.TodoRouter.navigate("", {trigger: true, replace: true});
		},	

		addSubCategory : function() {
			var catname = $('#categorySelect option:selected').val();

			// get all subcategires
			var cat = _.findWhere(this.categories, {title : catname});

			// Swap the existing list of subcategories
			$('#subCategorySelect')
			.empty()
			.append (_.map(cat.subCategory, function(c){
				return "<option>" + c.title + "</option>";
			}));
		},

		bindListeners : function() {
   			var dropZone = document.getElementById('thing_drop_zone');
   			var btn = document.getElementById('newThingImg');
   			$('#categorySelect').on('change', $.proxy(this.addSubCategory, this));
   			$('#addThingModal').on('hide', $.proxy(this.hideThisView,this));
   			$('#ed_inputTags').on('keypress', $.proxy(this.pushInterest,this));
   			dropZone.addEventListener('dragover', $.proxy(this.handleDragOver,this), false);
   			dropZone.addEventListener('drop', $.proxy(this.handleFileDrop,this), false);
   			btn.addEventListener('change', $.proxy(this.handleFileSelect,this), false);
   			return this;
   		},
	});
});
