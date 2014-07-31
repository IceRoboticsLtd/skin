/*
 * SERVER - The Server
 */ 
var express = require('express'),
	path = require('path'),
	morgan = require('morgan'),
	partials = require('express-partials'),
	device = require('../lib/device.js'),
	hash = require('../lib/pass.js').hash,	
	redirect = require('express-redirect'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	i18n = require('i18n-2'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler'),
	session = require('express-session'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy;

/*
 * CONFIGS - The Configurations
 */ 	
config = require('../configs/server.js');
var configs = config.configs,
	server_prefix = configs.server_prefix || 'SKIN';

/*
 * ROUTER - The Router
 */
var router = express.Router();

/* 
 * ROUTES - The Routes
 */
var routes = require('../routes'); // it seems that we have to start each required file as its own var 

/*
 * SERVICES - The Services
 */
var services = require('../routes/services'); // it seems that we have to start each required file as its own var

/*
 * SERVER - The Server used for shutdown etc
 * See: https://www.exratione.com/2011/07/running-a-nodejs-server-as-a-service-using-forever/
 */
var server = express();
// Port
if(typeof configs.server_port === 'undefined'){
	var server_port = process.env.PORT || 10080;
}
else {
	var server_port = configs.server_port;
}
server.listen(server_port);
console.log(server_prefix + " - Node Version: " + process.version);
console.log(server_prefix + " - Express server listening on port %d", server_port);
console.log(server_prefix + " - To shutdown server gracefully type: node prepareForStop.js");

server.get('/prepareForShutdown', function(req, res) {
	if(req.connection.remoteAddress == "127.0.0.1"
		|| req.socket.remoteAddress == "127.0.0.1"
		// 0.4.7 oddity in https only
		|| req.connection.socket.remoteAddress == "127.0.0.1")
	{
		managePreparationForShutdown(function() {
			// don't complete the connection until the preparation is done.
			res.statusCode = 200;
			res.end();
		});
	}
	else {
		res.statusCode = 500;
		res.end();
	}
});

var managePreparationForShutdown = function(callback) {
	// perform all the cleanup and other operations needed prior to shutdown,
	// but do not actually shutdown. Call the callback function only when
	// these operations are actually complete.
	try {
		app_server.close();
		console.log(server_prefix + " - Shutdown app successful.");
	}
	catch(ex) {
		console.log(server_prefix + " - Shutdown app failed.");
		console.log(ex);
	}
	try {
		api_server.close();
		console.log(server_prefix + " - Shutdown api successful.");
	}
	catch(ex) {
		console.log(server_prefix + " - Shutdown api failed.");
		console.log(ex);
	}
	console.log(server_prefix + " - All preparations for shutdown completed.");
	callback();
};
/*
 * APP - The Application
 */
var app = express();
// Port
if(typeof configs.app_port === 'undefined'){
	var app_port = process.env.PORT || 3000;
}
else {
	var app_port = configs.app_port;
}
// App List
if(typeof configs.app_list === 'undefined'){
	var app_list = {};
}
else {
	var app_list = configs.app_list;
}
// User List
if(typeof configs.user_list === 'undefined'){
	var user_list = {};
}
else {
	var user_list = configs.user_list;
}
/*
 * API - The Application Programming Interface
 */
var api = express();
// Port
if(typeof configs.api_port === 'undefined'){
	var api_port = app_port+1 || 3001;
}
else {
	var api_port = configs.api_port;
}
// Api List
if(typeof configs.api_list === 'undefined'){
	var api_list = {};
}
else {
	var api_list = configs.api_list;
}
// Action List
if(typeof configs.action_list === 'undefined'){
	var action_list = {};
}
else {
	var action_list = configs.action_list;
}
// Model List
if(typeof configs.model_list === 'undefined'){
	var model_list = {};
}
else {
	var model_list = configs.model_list;
}
// Format List
if(typeof configs.format_list === 'undefined'){
	var format_list = {};
}
else {
	var format_list = configs.format_list;
}
// User List
if(typeof configs.user_list === 'undefined'){
	var user_list = {};
}
else {
	var user_list = configs.user_list;
}
// API All
api.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');  // Accepts requests coming from anyone, replace '*' by configs.allowedHost to restrict it
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.set('X-Powered-By', 'Express');
  res.set('Content-Type', 'application/json; charset=utf8'); 
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});
// API Post
api.post('/login', function(req, res){
  console.log(req.body);
  res.send(201);
});
/*
 * APP DEVELOPMENT
 *
 * .bash_profile contains 
 * NODE_ENV=development
 *
 * or start server as follows
 * NODE_ENV=development node server.js
 *
 * on Windows use
 * set NODE_ENV=development
 * check with
 * echo %NODE_ENV% 
 */
if('development' == app.settings.env){
	console.log(server_prefix + " - Using development configurations");
    app.set('view engine', 'ejs');
    app.set('view options', { 
    	layout: '/../public/layout.ejs', 
    	layout_content_container_no_sidebar: '/../public/layout_content_container_no_sidebar.ejs' 
    });
    app.set('views', __dirname + '/../public');
	/*
	 * bodyParser() is the composition of three middlewares:
	 * - json: parses application/json request bodies
	 * - urlencoded: parses x-ww.form-urlencoded request bodies
	 * - multipart: parses multipart/form-data request bodies
	 */
	app.use(partials());
	app.use(morgan('dev'));		 
    app.use(bodyParser()); // pull information from html in POST
    app.use(methodOverride());
    app.use(cookieParser('s3cr3t')); // TODO get from config
	i18n.expressBind(app, {
		locales: ['nl', 'en'], // TODO get from config
		defaultLocale: 'en',   // TODO get from config
		cookieName: 'locale'
	});
	app.use(function(req, res, next) {
		req.i18n.setLocaleFromQuery();
		req.i18n.setLocaleFromCookie();
		next();
	});	
    app.use(device.capture());    
    app.enableDeviceHelpers();
    app.enableViewRouting();
    app.use('/resources', express.static(path.join(__dirname, '/../public/resources')));
    app.use('/app', express.static(path.join(__dirname, '/../public/app')));
    app.use('/tests', express.static(path.join(__dirname, '/../tests')));
    app.use(express.static(path.join(__dirname, '/../public'))); // Fall back to this as a last resort
    router.use(function(req, res, next) {
    	// process each request
    });    
    app.use(errorHandler({ dumpExceptions: true, showStack: true })); // specific for development
    // These next instructions are placed after express.static to avoid passport.deserializeUser to be called several times
    app.use(session({secret: 'default', saveUninitialized: true, resave: true})); // required by passport, default values required
    app.use(passport.initialize());
    app.use(passport.session());
    /**
     * Passport
     * See http://truongtx.me/2014/03/29/authentication-in-nodejs-and-expressjs-with-passportjs-part-1/
	 */
	passport.serializeUser(function(user, done) {
		console.log(server_prefix + " - Serialize user " + user);
		return done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
		var user = '';
		var user_keys = {};		
		var user_not_found = true; // default to true
		// Lookup user in user list by id, if found set not_found to false
		for (key in user_list) {
			user = key;
			user_keys = user_list[key];
			for(user_key in user_keys) {
				if(user_key == 'id') {
					var id_key = user_key;
					var id_value = user_keys[user_key];
					if(id_value == id) {
						id = id_value;
						user_not_found = false;
						break;
					}
				}
			}
		}//eof for
		if(user_not_found) {
			console.log(server_prefix + " - Deserialize user " + user + " failed: user not found");
			user = 'not_found';
			return done(null, false, {message: "The user " + user + " has not been found."});
		}
		else {
			console.log(server_prefix + " - Deserialize user " + user);
			return done(null, user);
		}
	});
	passport.use(new LocalStrategy({
			// Set the field names here
			usernameField: 'username',
			passwordField: 'password'
		},
		function(username, password, done) {
			console.log(server_prefix + " - Authenticating username " + username + " and password " + password);
			// Get the username and password from the input arguments of the function
			var user_key = '';
			var user_values = {};
			var user_not_found = true; // default to true
			// Lookup user in user list, if found set not_found to false
			for (key in user_list) {
				if(key == username) {
					user_key = key;
					console.log(server_prefix + " - Authenticating found user key:");
					console.log(user_key);
					user_values = user_list[user_key];
					console.log(server_prefix + " - Authenticating found user values:");
					console.log(user_values);
					user_not_found = false;
					break;
				}
			}//eof for
			if(user_not_found) {
				console.log(server_prefix + " - User requested, but not found: " + user);
				user = 'not_found';
				return done(null, false, {message: "The user " + user + " has not been found."});
			}
			else {
				var salt = user_values.salt;
				hash(password, salt, function (err, hash) {
					if(err) {
						console.log(server_prefix + " - Error: " + err);
						return done(err);
					}
					hash = hash.toString('hex'); // NOTE: necessary for string comparison
					if(hash == user_values.hash) {
						console.log(server_prefix + " - Correct password");
						return done(null, user_values);
					}
					console.log(server_prefix + " - Incorrect password");
					return done(null, false, { message: 'Incorrect password.' });
				});
			}
		}
	));
	// TODO:
	// passport.use(new FacebookStrategy({}));   
};
/*
 * APP PRODUCTION
 *
 * .bash_profile contains
 * NODE_ENV=production
 *
 * or start server as follows
 * NODE_ENV=production node server.js
 *
 * on Windows use
 * set NODE_ENV=production
 * check with
 * echo %NODE_ENV% 
 */
if('production' == app.settings.env){
	console.log(server_prefix + " - Using production configurations");
    app.set('view engine', 'ejs');
    app.set('view options', { 
    	layout: '/../public/layout.ejs', 
    	layout_content_container_no_sidebar: '/../public/layout_content_container_no_sidebar.ejs' 
    });
    app.set('views', __dirname + '/../public');
	/*
	 * bodyParser() is the composition of three middlewares:
	 * - json: parses application/json request bodies
	 * - urlencoded: parses x-ww.form-urlencoded request bodies
	 * - multipart: parses multipart/form-data request bodies
	 */
	app.use(partials());
	app.use(morgan('prod'));	
    app.use(bodyParser()); // pull information from html in POST
    app.use(methodOverride());
    app.use(cookieParser('s3cr3t')); // TODO get from config
	i18n.expressBind(app, {
		locales: ['nl', 'en'], // TODO get from config
		defaultLocale: 'en',   // TODO get from config
		cookieName: 'locale'
	});
	app.use(function(req, res, next) {
		req.i18n.setLocaleFromQuery();
		req.i18n.setLocaleFromCookie();
		next();
	});
    app.use(device.capture());   
    app.enableDeviceHelpers();
    app.enableViewRouting();
    app.use('/resources', express.static(path.join(__dirname, '/../public/resources')));
    app.use('/app', express.static(path.join(__dirname, '/../public/app')));
    app.use('/tests', express.static(path.join(__dirname, '/../tests')));    
    app.use(express.static(path.join(__dirname, '/../public'))); // Fall back to this as a last resort
    router.use(function(req, res, next) {
    	// process each request
    });    
    app.use(errorHandler({ dumpExceptions: false, showStack: false })); // specific for production
    // These next instructions are placed after express.static to avoid passport.deserializeUser to be called several times
    app.use(session({secret: 'default', saveUninitialized: true, resave: true})); // required by passport, default values required
    app.use(passport.initialize());
    app.use(passport.session()); 
    /**
     * Passport
     * See http://truongtx.me/2014/03/29/authentication-in-nodejs-and-expressjs-with-passportjs-part-1/
	 */
	passport.serializeUser(function(user, done) {
		console.log(server_prefix + " - Serialize user " + user);
		return done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
		var user = '';
		var user_keys = {};		
		var user_not_found = true; // default to true
		// Lookup user in user list by id, if found set not_found to false
		for (key in user_list) {
			user = key;
			user_keys = user_list[key];
			for(user_key in user_keys) {
				if(user_key == 'id') {
					var id_key = user_key;
					var id_value = user_keys[user_key];
					if(id_value == id) {
						id = id_value;
						user_not_found = false;
						break;
					}
				}
			}
		}//eof for
		if(user_not_found) {
			console.log(server_prefix + " - Deserialize user " + user + " failed: user not found");
			user = 'not_found';
			return done(null, false, {message: "The user " + user + " has not been found."});
		}
		else {
			console.log(server_prefix + " - Deserialize user " + user);
			return done(null, user);
		}
	});
	passport.use(new LocalStrategy({
			// Set the field names here
			usernameField: 'username',
			passwordField: 'password'
		},
		function(username, password, done) {
			console.log(server_prefix + " - Authenticating username " + username + " and password " + password);
			// Get the username and password from the input arguments of the function
			var user_key = '';
			var user_values = {};
			var user_not_found = true; // default to true
			// Lookup user in user list, if found set not_found to false
			for (key in user_list) {
				if(key == username) {
					user_key = key;
					console.log(server_prefix + " - Authenticating found user key:");
					console.log(user_key);
					user_values = user_list[user_key];
					console.log(server_prefix + " - Authenticating found user values:");
					console.log(user_values);
					user_not_found = false;
					break;
				}
			}//eof for
			if(user_not_found) {
				console.log(server_prefix + " - User requested, but not found: " + user);
				user = 'not_found';
				return done(null, false, {message: "The user " + user + " has not been found."});
			}
			else {
				var salt = user_values.salt;
				hash(password, salt, function (err, hash) {
					if(err) {
						console.log(server_prefix + " - Error: " + err);
						return done(err);
					}
					hash = hash.toString('hex'); // NOTE: necessary for string comparison
					if(hash == user_values.hash) {
						console.log(server_prefix + " - Correct password");
						return done(null, user_values);
					}
					console.log(server_prefix + " - Incorrect password");
					return done(null, false, { message: 'Incorrect password.' });
				});
			}
		}
	));
	// TODO:
	// passport.use(new FacebookStrategy({}));    
};

app.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*'); // Accepts requests coming from anyone, replace '*' by configs.allowedHosts to restrict it
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

if(typeof configs.title === 'undefined'){
	var title = 'Untitled';
}
else {
	var title = configs.title;
}

if(typeof configs.access_control_allow_origin === 'undefined'){
	var access_control_allow_origin = '*';
}
else {
	var access_control_allow_origin = configs.access_control_allow_origin;
}

if(typeof configs.web_root === 'undefined'){
	var web_root = '';
}
else {
	var web_root = configs.web_root;
}

if(typeof configs.host === 'undefined'){
	var host = req.host;
}
else {
	var host = configs.host;
}
/** 
 * GET requests
 */
// routing to test, use before '/'
app.get('/test', testGet);
function testGet(req, res) {
	// Distinguish based on an optional key-value parameter in the request url (e.g. '/test/?app=calculator')
	console.log(server_prefix + " - Test requested");
	var app = 'test'; // default
    res.render(app, { title: title, access_control_allow_origin: access_control_allow_origin, host: host, web_root: web_root, layout: false });
};
// routing to login, use before '/'
app.get('/login', loginGet);
function loginGet(req, res) {
	console.log(server_prefix + " - Login requested");	
	if(req.user) {
    	// already logged in
    	res.redirect('/?app=mydefaultstore'); // TODO make dynamic
	} else {
    	// not logged in, show the login form, remember to pass the message
    	// for displaying when error happens
    	console.log(server_prefix + " - Login requested");
		var app = 'login'; // default  
    	res.render(app, { title: title, message: req.session.messages, layout: 'layout_content_container_no_sidebar'});
    	// and then remember to clear the message
    	req.session.messages = null;
	}
};
// routing to logout, use before '/'
app.get('/logout', logoutGet);
function logoutGet(req, res) {
	console.log(server_prefix + " - Logout requested");
	if(req.isAuthenticated()) {
		req.logout();
		req.session.messages = req.i18n.__("Log out successfully.");
	}
	res.redirect('/login'); // TODO Choose what page to go to
}
// routing to admin, use before '/'
app.get('/admin', requireAuth, adminGet);
function adminGet(req, res) {
	console.log(server_prefix + " - Admin requested");
	// TODO	
}
// general function that can be called first
function requireAuth(req, res, next) {
	console.log(server_prefix + " - Require authentication requested");	
	if(!req.isAuthenticated()) {
		req.session.messages = req.i18n.__("You need to login to view this page.");
		res.redirect('/login');
	}
	next();
}
// routing to page
app.get('/', pageGet);
function pageGet(req, res) {
	console.log(server_prefix + " - Page requested");
	// Distinguish based on an optional key-value parameter in the request url (e.g. '/?app=mydefaultstore')
	var app = 'page'; // default
	var app_name = ''; // default
	// Update app_name variable here with value from 'app' key (e.g. app=mydefaultstore) sets app to 'mydefaultstore' 
	if(req.query.app) {
		app_name = req.query.app;
		var app_not_found = true; // default to true
		// Lookup app in app list, if found set not_found to false
		for (key in app_list) {
			if(key == app_name) {
				app_name = key;
				app_not_found = false;
				break;
			}
		}//eof for
		if(app_not_found) {
			console.log(server_prefix + " - App requested, but not found: " + app_name);
			app = 'not_found';
		}
	}
	console.log(server_prefix + " - App requested: " + app_name);
	// Distinguish based on an optional key-value parameter in the request url (e.g. '/?view=0')
	var view = 0; // default
	var views = 'views';
	var view_index = 0; // default
	// Update view_index variable here with value from 'view' key (e.g. view=0) sets view to 0 
	if(req.query.view) {
		view_index = req.query.view;
		var view_not_found = true; // default to true
		// Lookup view in app list, if found set not_found to false
		for (key in app_list) {
			if(key == app_name) {
				app_name = key;
				app_value = app_list[key];
				for(key in app_value) {
					if(key == views) {
						views = key;
						views_value = app_value[key];
						for(key in views_value) {
							if(key == view_index) {
								view_not_found = false;
								break;
							}
						}
					}
				}
			}
		}//eof for
		if(view_not_found) {
			console.log(server_prefix + " - View requested, but not found: " + view_index);
			view = 'not_found';
		}
	}
	console.log(server_prefix + " - View requested: " + view_index);
	if(typeof configs.css_file_location === 'undefined') {
		var css_file_location = 'css/style.css';
	}
	else {
		var css_file_location = configs.css_file_location;
		// replace the css file name by the app name, if provided
		if(typeof app_name === 'undefined'){
			// continue without replacement
		}
		else {
			css_file_location = css_file_location.replace('style', app_name);
		}
	}
    res.render(app, { title: title, css_file_location: css_file_location, access_control_allow_origin: access_control_allow_origin, host: host, web_root: web_root, app_name: app_name, view_index: view_index, layout: false });
};
/** 
 * POST requests
 */
// routing to login, use before '/' 
app.post('/login', loginPost);
function loginPost(req, res, next) {
	console.log(server_prefix + " - Login requested");
	// ask passport to authenticate
	passport.authenticate('local', function(err, username, info) {
	    if (err) {
	    	console.log(server_prefix + " - Login, error: " + err);
	    	// if error happens
	    	return next(err);
	    }
	    if (!username) {
	    	// if authentication fail, get the error message that we set
	    	// from previous (info.message) step, assign it into to
	    	// req.session and redirect to the login page again to display
	    	console.log(server_prefix + " - Login, message: " + info.message);
	    	req.session.messages = req.i18n.__(info.message);
	    	return res.redirect('/login');
	    }
	    // if everything is OK
	    req.logIn(username, function(err) {
	    	if (err) {
	    		console.log(server_prefix + " - Login, error: " + err);
	        	req.session.messages = req.i18n.__("Error");
	        	return next(err);
	    	}
	    	// set the message
	    	console.log(server_prefix + " - Login successful, redirecting ...");
	    	req.session.messages = req.i18n.__("Login successfully.");
	    	return res.redirect('/?app=mydefaultstore'); // TODO make dynamic
	    });
	})(req, res, next);
};
/**
 * LISTEN
 */ 
var app_server = app.listen(app_port, function() {
	console.log(server_prefix + " - Express app server listening on port %d in %s mode", app_port, app.settings.env);
});

var api_server = api.listen(api_port, function() {
	console.log(server_prefix + " - Express api server listening on port %d in %s mode", api_port, api.settings.env);
});
