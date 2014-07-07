/*
 * ViewControllerBase
 */
define(function () {
    console.log('SKIN: viewControllerBase called');
    function viewControllerBase(id) {
        this.id = id;
    };
    viewControllerBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('SKIN: viewControllerBase setServiceBus(serviceBus) called');		
			this.serviceBus = serviceBus;
	        // Get the viewService.
	        var viewService = this.viewService.find(id);
	        // Set the serviceBus.
	        viewService.setServiceBus(serviceBus);			
		},
		setView: function (view) {
			console.log('SKIN: viewControllerBase setView(view) called');		
			this.view = view;
		},	
		setViewService: function (viewService) {
			console.log('SKIN: viewControllerBase setViewService(viewService) called');		
			this.viewService = viewService;
		},
		setViewEvent: function (viewEvent) {
			console.log('SKIN: viewControllerBase setViewEvent(viewEvent) called');			
			this.viewEvent = viewEvent;
		},
		setConfig: function(config) {
			console.log('SKIN: viewControllerBase setConfig(config) called');		
			this.config = config;
		},
    	loadView: function (id) {
			console.log('SKIN: viewControllerBase loadView(id) called');    		
	        // Get the viewService.
	        var viewService = this.viewService.find(id);
	        // Get a new view
	        var view = new this.view(viewService);
	        // do something with the view
	    },
	    subscribeViewService: function(id) {
			console.log('SKIN: viewControllerBase subscribeViewService(id) called');  	    	
	        // Get the viewService.
	        var viewService = this.viewService.find(id);    	
	    	// run the viewService's subscribe function, using config
	    	var config = { channel: 'calculator', viewTopics: ['calculate']}; // to do: get these from this.config
	    	viewService.subscribe(config);
	    },	    
        renderView: function (bodyDom) {
			console.log('SKIN: viewControllerBase renderView(bodyDom) called');
			// Make dynamic
    //        bodyDom.prepend('<h2>ViewController ' + this.id + ' says "' +
    //                  this.app.getTitle() + '"</h2>');
            bodyDom.prepend('Calculator Icon here');
        }
    };
    return viewControllerBase;
});