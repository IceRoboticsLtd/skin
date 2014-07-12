/*
 * AppControllerBase
 */
define(function () {
    console.log('SKIN: appControllerBase called');
    function appControllerBase(id) {
        this.id = id;
        this.appArray = {};
    };
    function cloneObject(oldObject) {
    	function F() {}
    	F.prototype = oldObject;
    	return new F();
    };    
    appControllerBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('SKIN: appControllerBase setServiceBus(serviceBus) called');		
			this.serviceBus = serviceBus;
		},
		setStore: function (store) {
			console.log('SKIN: appControllerBase setStore(store) called');
			this.store = store;
		},
		setApp: function (app) {
			console.log('SKIN: appControllerBase setApp(app) called');		
			this.app = app;
			// app is a template, ready to be made specific based on the apps in the config
			var store_not_found = true; // default to true
			// lookup store in store_list
			var configs = this.config.getConfigs();
			var store_list = configs.store_list;
			for (key in store_list) {
				if(key == this.store) {
					console.log('SKIN: appControllerBase store ' + this.store + ' found in store_list');
					store_not_found = false;
					var store_configs = store_list[key];
					console.log('SKIN: appControllerBase store_configs')
					console.log(store_configs);
					// continue for apps ....
					if(typeof store_configs.apps === 'undefined') {
						console.log('SKIN: appControllerBase no apps found for store ' + this.store);
						var apps = {};
					}
					else {
						console.log('SKIN: appControllerBase apps found for store ' + this.store);
						console.log(store_configs.apps);
						var apps = store_configs.apps;
					}
					var i = 0;
					for (key in apps) {
						console.log('SKIN: appControllerBase app ' + key + ' found in apps');
						var app_keyValuePairs = apps[key];
						console.log('SKIN: appControllerBase app ' + key + ' key value pairs:');
						console.log(app_keyValuePairs);
						// create a new app from these keyValuePairs and store in app array
						var newApp = cloneObject(this.app);
						newApp.setKeyValuePairs(app_keyValuePairs);
						this.appArray[i] = newApp;
						console.log('SKIN: appControllerBase appArray [' + i + ']');
						console.log(this.appArray[i]);
					}
					console.log('SKIN: appControllerBase appArray');
					console.log(this.appArray);			
				}
			}// eof for
			if(store_not_found) {
				console.log('SKIN: appControllerBase store ' + this.store + 'not found in store_list');
			}
		},	
		setAppService: function (appService) {
			console.log('SKIN: appControllerBase setAppService(appService) called');		
			this.appService = appService;
			this.appService.setServiceBus(this.serviceBus);
		},
		setAppEvent: function (appEvent) {
			console.log('SKIN: appControllerBase setAppEvent(appEvent) called');			
			this.appEvent = appEvent;
		},
		setConfig: function(config) {
			console.log('SKIN: appControllerBase setConfig(config) called');		
			this.config = config;
		},
    	loadApp: function (id) {
			console.log('SKIN: appControllerBase loadApp(id) called');    		
	        // Get the appService.
	        var appService = this.appService.find(id);
	        // Get a new app
	        var app = new this.app(appService);
	        // run the app's render function
	        app.render();
	    },
	    subscribeAppService: function(id) {
			console.log('SKIN: appControllerBase subscribeAppService(id) called');  	    	
	        // Get the appService.
	        var appService = this.appService.find(id);    	
	    	// run the appService's subscribe function, using config
	    	var config = { channel: 'calculator', appTopics: ['calculate']}; // to do: get these from this.config
	    	appService.subscribe(config);
	    },	    
        renderView: function (bodyDom) {
			console.log('SKIN: appControllerBase renderView(bodyDom) called');    	
            bodyDom.prepend('<h2>AppController ' + this.id + ' says "' +
                      this.app.getTitle() + '"</h2>');
        }
    };
    return appControllerBase;
});