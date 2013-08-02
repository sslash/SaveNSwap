// // Add owner to thing
// //db.things.update({_id:ObjectId("510fccfadd8954fbeae62a56")}, {$set : {owner:ObjectId("5110f9065fc7ca21c2000001")}});
// // add stuff to user
// //db.users.update({username:"Scarlett"}, {$set : {about : "I love lots of stuff. Environment n such"}});
// // Categories:

// module.exports = function() {

// 	return {
// 		categories : [
// 		{
// 			url:"mensFashion",
// 			title:"Mens Fashion",
// 			img:"mensf_c.jpg",
// 			subCategory:[
// 			{
// 				url:"mensJewels",
// 				title:"Jewels",
// 				img:"mensjewels_c.jpg"
// 			},
// 			{
// 				url:"mensAccessories",
// 				title:"Accessories",
// 				img:"mensAccessories_c.jpg"
// 			},
// 			{
// 				url:"mensJeans",
// 				title:"Jeans",
// 				img:"mensjeans_c.jpg"
// 			},
// 			{
// 				url:"mensshirts",
// 				title:"T-shirts",
// 				img:"menstshirt_c.jpg"
// 			},
// 			{
// 				url:"mensDresses",
// 				title:"Dresses",
// 				img:"mensDress_c.jpg"
// 			},
// 			{
// 				url:"mensHats",
// 				title:"Hats",
// 				img:"menshat_c.jpg"
// 			},
// 			{
// 				url:"mensShoes",
// 				title:"Shoes",
// 				img:"mensshoes_c.jpg"
// 			},
// 			{
// 				url:"mensWatches",
// 				title:"Watches",
// 				img:"menswatch_c.jpg"
// 			},
// 			{
// 				url:"mensSweaters",
// 				title:"Sweaters",
// 				img:"menssweater_c.jpg"
// 			},
// 			{
// 				url:"mensJackets",
// 				title:"Jackets",
// 				img:"mensjacket_c.jpg"
// 			}]
// 		},
// 		{
// 			url:"womensFashion",
// 			title:"Women's Fashion",
// 			img:"jewels_c.jpg",
// 			subCategory:[{
// 				url:"womensJewels",
// 				title:"Jewels",
// 				img:"mensjewels_c.jpg"
// 			},
// 			{
// 				url:"womensAccessories",
// 				title:"Accessories",
// 				img:"mensAccessories_c.jpg"
// 			},
// 			{
// 				url:"womensJeans",
// 				title:"Jeans",
// 				img:"mensjeans_c.jpg"
// 			},
// 			{
// 				url:"womensshirts",
// 				title:"T-shirts",
// 				img:"menstshirt_c.jpg"
// 			},
// 			{
// 				url:"womensDresses",
// 				title:"Dresses",
// 				img:"mensDress_c.jpg"
// 			},
// 			{
// 				url:"womensHats",
// 				title:"Hats",
// 				img:"menshat_c.jpg"
// 			},
// 			{
// 				url:"womensShoes",
// 				title:"Shoes",
// 				img:"mensshoes_c.jpg"
// 			},
// 			{
// 				url:"womensWatches",
// 				title:"Watches",
// 				img:"menswatch_c.jpg"
// 			},
// 			{
// 				url:"womensSweaters",
// 				title:"Sweaters",
// 				img:"menssweater_c.jpg"
// 			},
// 			{
// 				url:"womensJackets",
// 				title:"Jackets",
// 				img:"mensjacket_c.jpg"
// 			}
// 			]
// 		},
// 		{
// 			url:"books",
// 			title:"Books",
// 			img:"books.jpg",
// 			subCategory:[
// 			{
// 				url:"schoolBooks",
// 				title:"School books",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"uniBooks",
// 				title:"University books",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"horrorBooks",
// 				title:"Horror books",
// 				img:"books_c.jpg"
// 			}]
// 		},
// 		{
// 			url:"interiour",
// 			title:"Interiour",
// 			img:"interoiur_c.jpg",
// 			subCategory:[
// 			{
// 				url:"chair",
// 				title:"Chair",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"couch",
// 				title:"Couch",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"table",
// 				title:"Table",
// 				img:"books_c.jpg"
// 			}]
// 		},
// 		{
// 			url:"videoGame",
// 			title:"Video Games",
// 			img:"games_c.jpg",
// 			subCategory:[
// 			{
// 				url:"consoles",
// 				title:"Consoles",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"games",
// 				title:"Games",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"controllers",
// 				title:"Controllers",
// 				img:"books_c.jpg"
// 			}]
// 		},
// 		{
// 			url:"instrumnet",
// 			title:"Instrument",
// 			img:"YngwieMalmsteen_c.jpg",
// 			subCategory:[
// 			{
// 				url:"guitar",
// 				title:"Guitar",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"piano",
// 				title:"Piano",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"bass",
// 				title:"Bass",
// 				img:"books_c.jpg"
// 			}]
// 		},
// 		{
// 			url:"hobby",
// 			title:"Hobby",
// 			img:"hobby_c.jpg"
// 		},
// 		{
// 			url:"children",
// 			title:"Childrens",
// 			img:"childrens_c.jpg"
// 		},

// 		{
// 			url:"art",
// 			title:"Art",
// 			img:"art_c.jpg"
// 		},

// 		{
// 			url:"musicAndFilm",
// 			title:"Music And Film",
// 			img:"music_c.jpg"
// 		},

// 		{
// 			url:"tools",
// 			title:"Tools",
// 			img:"tools_c.jpg",
// 			subCategory:[
// 			{
// 				url:"electric",
// 				title:"Electric",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"saw",
// 				title:"Saw",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"carTools",
// 				title:"Car Tools",
// 				img:"books_c.jpg"
// 			}]
// 		},
// 		{
// 			url:"sport",
// 			title:"Sport",
// 			img:"sport_c.jpg"
// 		},

// 		{
// 			url:"retro",
// 			title:"Retro",
// 			img:"retro_c.jpg",
// 			subCategory:[
// 			{
// 				url:"oldCameras",
// 				title:"Old Cameras",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"retroBikes",
// 				title:"Retro Bikes",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"interiour",
// 				title:"Interiour",
// 				img:"books_c.jpg"
// 			}]

// 		},

// 		{
// 			url:"photo",
// 			title:"Photo",
// 			img:"photo_c.jpg",
// 			subCategory:[
// 			{
// 				url:"camera",
// 				title:"Camera",
// 				img:"school_c.jpg"
// 			},
// 			{
// 				url:"videoCamera",
// 				title:"Video Camera",
// 				img:"school_c.jpg"
// 			}]
// 		}],
// //db.categories.save(categories);


// // Create some things
// 	things: [

// 	// Michaels things
// 	{
// 		title : "Sweet thing",
// 		category : "Mens Fashion",
// 		subCategory : "Jeans",
// 		description : "Super nice pair of jeans description",
// 		imgPath:'dress.jpg',
// 		created : new Date(),
// 		placementCountry : "Norway",
// 		placementCity : "Oslo",
// 		owner : ObjectId('513369bc9ec7d4d401000001'),
// 		likes : 30,
// 		tags : [
// 		"tag1",
// 		"tag2",
// 		"tag4"
// 		],
// 	},{
// 		title : "Nice Couch",
// 		category : "Interiour",
// 		subCategory : "couch",
// 		description : "Super nice pair of Armami jeans description",
// 		imgPath:'key.jpg',
// 		placementCountry : "Norway",
// 		placementCity : "Oslo",
// 		owner : ObjectId('513369bc9ec7d4d401000001'),
// 		created : new Date(),
// 		likes : 40,
// 		tags : [
// 		"tag1",
// 		"tag4"
// 		],
// 	},{
// 		title : "Good shit",
// 		category : "Video Games",
// 		subCategory : "Consoles",
// 		description : "Super nice pair of jeans description",
// 		imgPath:'glass.jpg',
// 		placementCountry : "Norway",
// 		placementCity : "Trondheim",
// 		owner : ObjectId('513369bc9ec7d4d401000001'),
// 		created : new Date(),
// 		likes : 50,
// 		tags : [
// 		"tag1",
// 		"tag2",
// 		"tag3",
// 		"tag4"
// 		],
// 	},{
// 		title : "Super retro thing",
// 		category : "Retro",
// 		subCategory : "Interiour",
// 		description : "Super nice watch description",
// 		imgPath:'piano.jpg',
// 		placementCountry : "Norway",
// 		placementCity : "Skien",
// 		owner : ObjectId('513369bc9ec7d4d401000001'),
// 		created : new Date(),
// 		likes : 20,
// 		tags : [
// 		"tag1",
// 		"tag4"
// 		],
// 	},{
// 		title : "Yeah buddy",
// 		category : "Books",
// 		subCategory : "School books",
// 		description : "Super nice book",
// 		imgPath:'thing.jpg',
// 		placementCountry : "Norway",
// 		placementCity : "Langesund",
// 		owner : ObjectId('513369bc9ec7d4d401000001'),
// 		created : new Date(),
// 		likes : 50,
// 		tags : [
// 		"tag1",
// 		"tag2",
// 		"tag4"
// 		],
// 	}],


// 	things2: [
// 	{
// 		title : "Finns Sweet thing",
// 		category : "Mens Fashion",
// 		subCategory : "Jeans",
// 		description : "Super nice pair of jeans description",
// 		imgPath:'dress.jpg',
// 		created : new Date(),
// 		placementCountry : "USA",
// 		placementCity : "San Fransisco",
// 		owner : ObjectId('513369bc9ec7d4d401000001'),
// 		likes : 30,
// 		tags : [
// 		"tag1",
// 		"tag2",
// 		"tag4"
// 		]
// 	},{
// 		title : "Finns Nice Couch",
// 		category : "Interiour",
// 		subCategory : "couch",
// 		description : "Super nice pair of Armami jeans description",
// 		imgPath:'key.jpg',
// 		placementCountry : "USA",
// 		placementCity : "San Fransisco",
// 		owner : ObjectId('513369bc9ec7d4d401000001'),
// 		created : new Date(),
// 		likes : 40,
// 		tags : [
// 		"tag1",
// 		"tag4"
// 		]
// 	},{
// 		title : "Toralds Good shit",
// 		category : "Video Games",
// 		subCategory : "Consoles",
// 		description : "Super nice pair of jeans description",
// 		imgPath:'glass.jpg',
// 		placementCountry : "Spain",
// 		placementCity : "Barcelona",
// 		owner : ObjectId("5110f9065fc7ca21c2000001"),
// 		created : new Date(),
// 		likes : 50,
// 		tags : [
// 		"tag1",
// 		"tag2",
// 		"tag3",
// 		"tag4",
// 		"gitar"
//  		]
// }
//,{
// 		title : "Finns Super camera",
// 		category : "Photo",
// 		subCategory : "Camera",
// 		description : "Super nice cam description",
// 		imgPath:'piano.jpg',
// 		owner : ObjectId("5110f9065fc7ca21c2000001"),
// 		placementCountry : "Spain",
// 		placementCity : "Barcelona",
// 		created : new Date(),
// 		likes : 20,
// 		tags : [
// 		"tag1",
// 		"tag4"
// 		]
// 	},{
// 		title : "Finns electric tool",
// 		category : "Tools",
// 		subCategory : "Electric",
// 		description : "Super nice book",
// 		imgPath:'thing.jpg',
// 		owner : ObjectId("5110f9065fc7ca21c2000001"),
// 		placementCountry : "Spain",
// 		placementCity : "Barcelona",
// 		created : new Date(),
// 		likes : 50,
// 		tags : [
// 		"tag1",
// 		"tag2",
// 		"tag4"
// 		]
// 	}
// 	];
// //db.things.save(things);
// db.things.save(things2);



// // love environment blogs
//  imgs : ["h.jpg", "i2.jpeg", "i3.jpg", "images.jpeg", "images1.jpeg"]
//  //envBlog : {
// 	//owner: ObjectId("5110f9065fc7ca21c2000001"),
// 	//posts : new Array()
//  //}


// // for ( var i = 0; i < 20; i ++ ) {
// // 	var img = Math.floor((Math.random()*imgs.length));
// // 	envBlog.posts.push({
// // 		imgPath : imgs[img],
// // 		text : "I just love the environment. Look at this picture I took today. Really neat. #love #care " + i,
// // 		likes : ["5110f9065fc7ca21c2000001", "5110f9065fc7ca21c2000001","5110f9065fc7ca21c2000001"],
// // 		created : new Date()
// // 	});
// // }
// //db.loveEnvBlog.save(envBlog);
// }
// }