/*
 * SERVER - The Server
 */ 
var express = require('express'),
	device = require('../lib/device.js'),
	redirect = require('express-redirect'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler');

/*
 * CONFIGS - The Configurations
 */ 	
config = require('../configs/server.js');
var configs = config.configs,
	server_prefix = configs.server_prefix || 'SKIN';

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
    app.set('view options', { layout: true });
    app.set('views', __dirname + '/../public');
	/*
	 * bodyParser() is the composition of three middlewares:
	 * - json: parses application/json request bodies
	 * - urlencoded: parses x-ww.form-urlencoded request bodies
	 * - multipart: parses multipart/form-data request bodies
	 */
    app.use(bodyParser()); // pull information from html in POST
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(device.capture());
    app.enableDeviceHelpers();
    app.enableViewRouting();
    app.use('/resources', express.static(__dirname + '/../public/resources'));
    app.use('/app', express.static(__dirname + '/../public/app'));
    app.use(express.static(__dirname + '/../public')); // Fall back to this as a last resort
    app.use(errorHandler({ dumpExceptions: true, showStack: true })); // specific for development
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
    app.set('view options', { layout: true });
    app.set('views', __dirname + '/../public');
	/*
	 * bodyParser() is the composition of three middlewares:
	 * - json: parses application/json request bodies
	 * - urlencoded: parses x-ww.form-urlencoded request bodies
	 * - multipart: parses multipart/form-data request bodies
	 */
    app.use(bodyParser()); // pull information from html in POST
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(device.capture());
    app.enableDeviceHelpers();
    app.enableViewRouting();
    app.use('/resources', express.static(__dirname + '/../public/resources'));
    app.use('/app', express.static(__dirname + '/../public/app'));
    app.use(express.static(__dirname + '/../public')); // Fall back to this as a last resort
    app.use(errorHandler({ dumpExceptions: false, showStack: false })); // specific for production
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
// routing to pages
app.get('/', function(req, res) {
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
});

var app_server = app.listen(app_port, function() {
	console.log(server_prefix + " - Express app server listening on port %d in %s mode", app_port, app.settings.env);
});

var api_server = api.listen(api_port, function() {
	console.log(server_prefix + " - Express api server listening on port %d in %s mode", api_port, api.settings.env);
});
