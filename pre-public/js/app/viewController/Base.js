/*
 * ViewControllerBase
 */
define(function () {
    console.log('SKIN: viewControllerBase called');
    function viewControllerBase(id) {
        this.id = id;
        this.viewArray = {};        
    };
    function cloneObject(oldObject) {
    	function F() {}
    	F.prototype = oldObject;
    	return new F();
    };    
    viewControllerBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('SKIN: viewControllerBase setServiceBus(serviceBus) called');		
			this.serviceBus = serviceBus;			
		},
		setStore: function (store) {
			console.log('SKIN: viewControllerBase setStore(store) called');
			this.store = store;
		},		
		setView: function (view) {
			console.log('SKIN: viewControllerBase setView(view) called');			
			this.view = view;
			// view is a template, ready to be made specific based on the views in the config
			var store_not_found = true; // default to true
			// lookup app in app_list
			var configs = this.config.getConfigs();
			var store_list = configs.store_list;
			for (key in store_list) {
				if(key == this.store) {
					console.log('SKIN: viewControllerBase store ' + this.store + ' found in app_list');
					store_not_found = false;
					var store_configs = store_list[key];
					console.log('SKIN: viewControllerBase store_configs')
					console.log(store_configs);
					// continue for views ....
					if(typeof store_configs.views === 'undefined') {
						console.log('SKIN: viewControllerBase no views found for store ' + this.store);
						var views = {};
					}
					else {
						console.log('SKIN: viewControllerBase views found for store ' + this.store);
						console.log(store_configs.views);
						var views = store_configs.views;
					}
					var i = 0;
					for (key in views) {
						console.log('SKIN: viewControllerBase view ' + key + ' found in views');
						var view_keyValuePairs = views[key];
						console.log('SKIN: viewControllerBase view ' + key + ' key value pairs:');
						console.log(view_keyValuePairs);
						// create a new view from these keyValuePairs and store in view array
						var newView = cloneObject(this.view);
						newView.setKeyValuePairs(view_keyValuePairs);
						this.viewArray[i] = newView;
						console.log('SKIN: viewControllerBase viewArray [' + i + ']');
						console.log(this.viewArray[i]);
					}
					console.log('SKIN: viewControllerBase viewArray');
					console.log(this.viewArray);			
				}
			}// eof for
			if(store_not_found) {
				console.log('SKIN: viewControllerBase store ' + this.store + 'not found in store_list');
			}
		},	
		setViewService: function (viewService) {
			console.log('SKIN: viewControllerBase setViewService(viewService) called');		
			this.viewService = viewService;
			this.viewService.setServiceBus(this.serviceBus);
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
            bodyDom.prepend('<h2>ViewController ' + this.id + ' says "' +
                      this.viewService.getTitle() + '"</h2>');
        }
    };
    return viewControllerBase;
});