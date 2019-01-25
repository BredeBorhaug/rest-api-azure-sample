// server.js

// BASE SETUP
// ==========================================

// We now call the packages we need for this sample
var express     = require('express');       // we call express
var app         = express();                // we define our app using express
var bodyParser  = require('body-parser');   

// We now set up body parser so that we can get the data from a POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// We now need to set the port. Note that we define both for localhost 
// and env port which we need when we deploy to Azure.

var port = process.env.PORT || 3005;   // local host will be 3005

// ROUTES FOR OUR API
// ==========================================
// First we get an instance of the express Router
var router = express.Router();

// We make a test router to check that everything is OK.
router.get('/', function(req, res){
    res.json({ message: 'You now made your first REST API!'});
});

// You can add more routes underneath here


// We now need to register the routes to get everything running. At the same time
// we prefix all routes with /api to make the url looking good.
app.use('/api', router);


// We add some error handling. This will only be displayed in development

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


// START THE SERVER
app.listen(port);

console.log('Your API is running on port ' + port + '. Check out localhost:' + port + '/API');