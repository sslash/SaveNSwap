var app = app || {};

$(function( $ ) {
	'user strict';

	app.AdminView = Backbone.View.extend({

		//el : $('#mainBannerId'),

		initialize : function() {
			this.template = _.template(app.templateFetcher.templates.adminTmpl);
			this.listenTo(this.collection, 'reset', this.render);
		},

		events : {
			'submit #vareForm' : 'vareSubmitted',
			'change #bilde'    : 'bildeSelected',
		},

		bildeSelected : function(e) {
			console.log("Profile img sel");
			var f = this.getImgFile(e);
			if ( f ) {
				this.image = f;
			}
		},

		getImgFile : function(e) {
			var files = e.target.files;
			var f = files[0];

			if ( f && f.type.match('image.*')){
				return f;
			} else {
				return null;
			}
		},

		vareSubmitted : function(e) {
			e.preventDefault();
			var data = {}
			data.title = $('#inputTittel').val();
			data.description = $('#inputBeskrivelse').val();
			data.category = $('#inputCategory option:selected').val();
			data.price = $('#inputPris').val();
			var that = this;
			$.ajax({
				url: '/admin/NSItems',
				type: 'POST',
				data : JSON.stringify(data),
				contentType : 'application/json',
				success:function(res){
					console.log(JSON.stringify(res));
					that.uploadFile({
						file : that.image,
						url : '/admin/NSItems/' + res._id + '/addFile'
					});
				},
				error: function(res){console.log(res);}
			});
		},

		uploadFile : function(obj) {
			var that = this;
			var file = obj.file;
			if ( file ) {
				var data = new FormData();
				data.append("file", file);

				$.ajax({
					url : obj.url,
					type : 'POST',
					data : data,
					success : function(res) {
						//obj.handler(res);
						alert("var lagt til!");
					},
					error : function(res) {	},
							//Options to tell JQuery not to process data or worry about content-type
							cache : false,
							contentType : false,
							processData : false
						});
			} else {
				obj.handler();
			}
		},

		render : function() {
			this.$el.html(
				this.template({
					items : this.collection.toJSON()
				})
			);	
			return this;	
		}
	});
});