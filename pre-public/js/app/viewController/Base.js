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
						// viewService is a template, ready to be made specific based on the new view's keyValuePairs
						// Create a new viewService
						var newViewService = cloneObject(this.viewService);
						newViewService.setServiceBus(this.serviceBus);
						// Set subscriptions to newViewService
						for(key in view_keyValuePairs) {
							if(key == 'subscriptions') {
								var subscriptions = view_keyValuePairs[key];
								console.log('SKIN: viewControllerBase subscriptions in key value pairs:');
								console.log(subscriptions);
								newViewService.setSubscriptions(subscriptions);
							}
						}
						// Create a new view for these keyValuePairs
						var newView = cloneObject(this.view);
						newView.setKeyValuePairs(view_keyValuePairs);
						// Set new view service on the new view
						newView.setViewService(newViewService);
						// Add new view to view array
						this.viewArray[i] = newView;
						console.log('SKIN: viewControllerBase viewArray [' + i + ']');
						console.log(this.viewArray[i]);
						// Increase i by 1
						i++;
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
	        try {
	        	this.loadedView = this.viewArray[id];
				console.log('SKIN: viewControllerBase loadedView:');
	        	console.log(this.loadedView);
	        }
	        catch(e) {
	        	console.log('SKIN: viewControllerBase loadView(id) error:');
	        	console.log(e);
	        }
	    },
	    subscribeViewService: function() {
			console.log('SKIN: viewControllerBase subscribeViewService() called');  	    	
	        for (key in this.viewArray) {
	        	console.log('SKIN: viewControllerBase view ' + key + ' in viewArray');
	        	var view = this.viewArray[key];
	        	console.log(view);
	        	for (key in view) {
	        		if (key == 'viewService') {
	        			var viewService = view[key];
	        			viewService.subscribe();
	        		}
	        	}
	        }
	    },	    
        renderView: function (elementId) {
			console.log('SKIN: viewControllerBase renderView(elementId) called');
			this.loadedView.renderView(elementId); // NOTE: Use the loaded View !!
        }
    };
    return viewControllerBase;
});