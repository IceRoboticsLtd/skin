define(function () {
    function appControllerBase(id) {
        this.id = id;
    }
    appControllerBase.prototype = {
		setServiceBus: function (serviceBus) {
			this.serviceBus = serviceBus;
		},
		setApp: function (app) {
			this.app = app;
		},	
		setAppService: function (appService) {
			this.appService = appService;
		},
		setAppEvent: function (appEvent) {
			this.appEvent = appEvent;
		},
	    loadApp: function (id) {
	        // Get the appService.
	        var appService = this.appService.find(id);
	        // Get a new app
	        var app = new this.app(appService);
	        // run the app's render function
	        app.render();
	    },
        render: function (bodyDom) {
            bodyDom.prepend('<h1>AppController ' + this.id + ' says "' +
                      this.app.getTitle() + '"</h2>');
        }
    };
    return appControllerBase;
});
