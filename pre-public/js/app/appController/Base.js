/*
 * AppControllerBase
 */
define(function () {
    console.log('SKIN: appControllerBase called');
    function appControllerBase(id) {
        this.id = id;
    };
    appControllerBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('SKIN: appControllerBase setServiceBus(serviceBus) called');		
			this.serviceBus = serviceBus;
		},
		setApp: function (app) {
			console.log('SKIN: appControllerBase setApp(app) called');		
			this.app = app;
		},	
		setAppService: function (appService) {
			console.log('SKIN: appControllerBase setAppService(appService) called');		
			this.appService = appService;
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