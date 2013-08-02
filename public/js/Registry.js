var app = app || {};


// Make sure jquery har arrived
$(function($) {
	'use strict'

	app.Registry = (function(){


		var getApiObject = function(key) {
			var toRet;
			$.ajax({
				type: 'GET',
				url: '/api/' + key,
				dataType: 'json',
				success: function(res) {
					toRet = JSON.stringify(res);
				},
				data: {},
				async: false
			});
			return toRet;
		},

		refreshUser = function() {
			var refreshedUser = getApiObject('users/' + getUserId());
			sessionStorage['user'] = refreshedUser;
			console.log("refreshed user: " + sessionStorage['user'] );
		},

		toJson = function(val) {
			if (val) {
				return JSON.parse(val);			
			}
		},
		jsonToStr = function(val) {
			if ( val ) return JSON.stringify(val);
		},

		getObject = function(key) {

			if(typeof(Storage)!=="undefined"){

				if (sessionStorage[key]){
					return toJson(sessionStorage[key]);
				} else {
					var value = getApiObject(key);
					sessionStorage[key] = value;
					return toJson(value);
				}

			} else {
				return toJson(getApiObject(key));
			}
		},

		setUsersThings = function(things) {
			sessionStorage['usersThings'] = jsonToStr(things);
		},

		getUsersThings = function() {
			return toJson( sessionStorage['usersThings'] );
		},

		getCategoryFor = function(category) {
			var categories = getObject('categories');
			return _.findWhere(categories, {url : category});
		},

		setUser = function(user) {
			sessionStorage['user'] = jsonToStr(user);
		},

		getUserId = function() {
			if (sessionStorage['user']!= null )
				return toJson(sessionStorage['user'])._id;
			else 
				return null;
		},

		isLoggedIn = function() {
			return sessionStorage['user'] != null;
		},

		logOut = function() {
			sessionStorage.removeItem('user');
			sessionStorage.removeItem('usersThings');
		},

		isSameAsUser = function(otherId) {
			return otherId == getUserId();
		},

		getUser = function (){
			return toJson(sessionStorage['user']);
		}


		return {
			refreshUser : refreshUser,
			getObject : getObject,
			getUser : getUser,
			getCategoryFor : getCategoryFor,
			setUser : setUser,
			getUserId : getUserId,
			isLoggedIn : isLoggedIn,
			setUsersThings : setUsersThings,
			getUsersThings : getUsersThings,
			logOut : logOut,
			isSameAsUser : isSameAsUser
		}

	})();

});