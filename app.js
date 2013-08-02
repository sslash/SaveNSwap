var application_root  = __dirname,
port                  = (process.env.VMC_APP_PORT || 40000),
host                  = (process.env.VCAP_APP_HOST || 'localhost'),
http                  = require('http'),
express               = require("express"),
path                  = require("path"),
fs                    = require('fs'),
dbObj                 = require('./DB/initScript.js'),
mongoConfig           = require('./mongoConfig'),
swapController        = require('./api/swapController'),
userController        = require('./api/userController'),
netshopController     = require('./api/netshopController'),
adminController       = require('./api/adminController'),
thingController       = require('./api/thingController'),
_                     = require('underscore')._;

var app = express();

app.configure(function(){
 app.set('views', application_root + '/views'); 
 app.use(express.logger('dev'));
 app.use(express.cookieParser());
 //app.use(express.cookieSession());
 app.use(express.bodyParser({uploadDir:'./uploads'}));
 app.use(express.methodOverride());
 app.use(express.session({ secret: 'swagTownBrowzki', cookie: { maxAge: 60000 } }));
 app.use(app.router);
 app.use(express.static(path.join(application_root, 'public')));
});

mongoConfig.connectToMongo();

// db.categories.update({url: "mensFashion"},{$set: {title: "Men's Fashion"}});


/*****************************       
*   SWAP REQUESTS/RESPONDS   *
******************************/
app.post('/api/swapRequests', swapController.createSwapRequest);
app.post('/api/swapReplies', swapController.createSwapReply);
app.get('/api/swapRequests/:toId', swapController.getSwapRequestsForUserWithId);
app.get('/api/swapReplies/:toId', swapController.getSwapRepliesForUserWithId);
app.delete('/api/swapReplies/:id', swapController.deleteSwapReplyWithId);
app.delete('/api/swapRequests/:id', swapController.deleteSwapRequestWithId);


/********************            
*   USERS          *
*********************/
app.post('/api/users', userController.createUser);
app.get('/api/users/:id', userController.getUserById);
app.get('/api/users', userController.getUsers);
app.put('/api/users/:id', userController.updateUser);
app.post('/authenticate', userController.authenticateUser);


/********************            
*   THINGS          *
*********************/
app.post('/api/things', thingController.createThing);
app.get('/api/things/search/:query', thingController.searchThings); 
app.get('/api/things/user/:id', thingController.getThingsForUserWithId);
app.post('/api/things/:thingId/user/:userId/addLove',thingController.updateThingAddLove);
app.get('/api/things/:cat/:subCat', thingController.getThingsBySubCategory);
app.get('/api/things/:id', thingController.getThingById); 
app.delete('/api/things/:id', thingController.deleteThingWithId); 

/********************            
*   NSThings        *
*********************/
app.get('/api/NSItems/:cat', netshopController.getNSItemsByCategory);
app.get('/api/NSItems/', netshopController.getAllNSItems);
app.post('/api/NSItems/shop/:id', netshopController.shopItem);
app.post('/api/NSItems/shop/:id/delete', netshopController.deleteFromSessionById);
app.post('/admin/NSItems', adminController.addItem);
app.post('/admin/NSItems/:uid/addFile', adminController.addFileToItem);

/********************            
*   LOVE ENV BLOGS  *
*********************/
app.get('/api/loveEnvBlog/:ownerId', userController.getLEBbyOwnerId);
app.put('/api/loveEnvBlog/:ownerId/:blogId', userController.updateLEB);
app.post('/api/loveEnvBlog/:ownerId', userController.addLEB);



/********************            
*   CATEGORIES      *
*********************/
app.get('/api/categories', thingController.getCategories);


/********************            
*   UPLOAD FILE     *
*********************/
app.post('/api/file', function(req, res, next) {

  console.log("/api/file requested!");
     // get the temporary location of the file
     var tmp_path = req.files.file.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './public/img/' + req.files.file.name;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
      if (err) {
        console.log("ERROR: " + JSON.stringify(err));
        throw err;
      }
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
          if (err) throw err;
          res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
        });
      });
  });


app.get('/', function(req, res){
  res.sendfile('./views/home.html');
});


app.listen(port, host, function() {
  console.log("El swappa es ona!");
});
