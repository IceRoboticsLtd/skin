var express = require('express');

/*
 * CONFIGS - The Configurations
 */ 	
config = require('../configs/server.js');
var configs = config.configs,
	server_prefix = configs.server_prefix || 'SKIN';

/*
 * SERVER - The Server used for shutdown etc
 * See: https://www.exratione.com/2011/07/running-a-nodejs-server-as-a-service-using-forever/
 */
var server = express();
//Port
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

var app_server = app.listen(app_port, function() {
	console.log(server_prefix + " - Express app server listening on port %d in %s mode", app_port, app.settings.env);
});

var api_server = api.listen(api_port, function() {
	console.log(server_prefix + " - Express api server listening on port %d in %s mode", api_port, api.settings.env);
});
