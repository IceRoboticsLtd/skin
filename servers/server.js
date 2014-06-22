var express = require('express');

/*
 * CONFIGS - The Configurations
 */ 	
config = require('../configs/server.js');
var configs = config.configs,
	server_prefix = configs.server_prefix || 'SKIN';

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

app.listen(app_port, function() {
	console.log(server_prefix + " - Express app server listening on port %d in %s mode", app_port, app.settings.env);
});

api.listen(api_port, function() {
	console.log(server_prefix + " - Express api server listening on port %d in %s mode", api_port, api.settings.env);
});
