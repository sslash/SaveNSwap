var app = app || {};

$(function( $ ) {
	'user strict';

	app.EditProfileView = Backbone.View.extend({

		//el : $('#mainBannerId'),

		template : _.template($('#editProfile-template').html()),

		initialize : function() {
			this.profile = app.Registry.getUser();
			this.interestsArr = this.profile.interests;
		},

		events : {
			'click #saveProfile' : 'saveProfile',
			'keypress #ed_inputInterests' : 'pushInterest',
			'click .mytooltip' : 'removeInterest'
		},

		pushInterest : function (event) {
			if ( event.which === ENTER_KEY ) {
        		event.preventDefault();
        		var interest = $("#ed_inputInterests");
        		var input = interest.val();
        		interest.val('');
				 this.appendInterest(input);
				this.interestsArr.push(input);
      		}			
		},

		appendInterest : function(interest) {
			var span = '<a href="#" class="mytooltip" data-toggle="tooltip"' +
				'title="Click to Remove" id = "tooltip_'+ interest + '">' +
				'<span class="label label-info tag-label">' + interest + '</span>';
			$('.interestsPool').append(span);
		},

		removeInterest : function(event) {
			event.preventDefault();
			var interest = event.currentTarget.id.split('_')[1];
			this.interestsArr = _.without(this.interestsArr, interest);
			$('.interestsPool').empty();
			var that = this;
			_.each(this.interestsArr, function(interest) {
				that.appendInterest(interest);
			});
		},

		saveProfile: function(event) {
			event.preventDefault();
			var data = {};
			if ( $("#ed_inputUsername").val() )			
				data.username = $("#ed_inputUsername").val();
			if ( $("#ed_inputEmail").val() )
				data.email = $("#ed_inputEmail").val();
			if ( $("#ed_inputCountry").val() )
				data.country = $("#ed_inputCountry").val();
			if ( $("#ed_inputZipCode").val() )
				data.zipCode = $("#ed_inputZipCode").val()
			if ( $("#ed_inputAbout").val() )
				data.about = $("#ed_inputAbout").val()
			if ( this.interestsArr.length > 0)
				data.interests = this.interestsArr;
			if ($('#ed_inputCity').val() )
				data.city  = $('#ed_inputCity').val();
			if ( this.imageFile )
				data.imgPath = this.imageFile.name;
			data.id =  this.options.userId;

			var user = new app.User(data);
			var that = this;
			// TODO: improve this to check if there is a file!
			user.save(null,{success: function(model, response){
				app.Registry.setUser(model);
				that.uploadFile({	
					file : that.imageFile,
					handler : that.registerUserSuccess
				});
			}});
		},

		// change to profile
		registerUserSuccess : function(){
			app.Registry.refreshUser();
			app.TodoRouter.navigate("/",
				{trigger: true, replace: true});
		},

		uploadFile : function(obj) {
			var that = this;
			var file = obj.file;
			console.log("SWAPWAPWPA");

			if ( file) {
				var data = new FormData();
				data.append("file", file);

				$.ajax({
					url : '/api/file',
					type : 'POST',
					data : data,
					success : function(res) {
						console.log("handling!");
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

		showImgThmbAndSetFile : function(f){
			var output = [];
			output.push('<li><strong>', escape(f.name), '</strong>',
				'</li>');

			$('#file_list2').html('<ul>' + output.join('') + '</ul>');


			var reader = new FileReader();

      			// Closure to capture the file information.
      			reader.onload = (function(theFile) {
      				return function(e) {
      					$('#profileEditImg').attr('src', e.target.result);
      					$('#dropProfileTxt').remove();
      					$('#chooseNewFile').html('Choose another file');
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

   		render : function() {
   			this.$el.html(this.template({p : this.profile}));
   			return this;
   		},

   		bindListeners : function() {
   			var dropZone = document.getElementById('drop_zone');
   			var btn = document.getElementById('profileImgBtn');

   			dropZone.addEventListener('dragover', $.proxy(this.handleDragOver,this), false);
   			dropZone.addEventListener('drop', $.proxy(this.handleFileDrop,this), false);
   			btn.addEventListener('change', $.proxy(this.handleFileSelect,this), false);
   			$('.mytooltip').tooltip({});
   		},

    });
});