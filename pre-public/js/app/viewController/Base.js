/*
 * ViewControllerBase
 */
define(function () {
    function viewControllerBase(id) {
        this.id = id;
    }
    viewControllerBase.prototype = {
		setServiceBus: function (serviceBus) {
			this.serviceBus = serviceBus;
		},
		setView: function (view) {
			this.view = view;
		},	
		setViewService: function (viewService) {
			this.viewService = viewService;
		},
		setViewEvent: function (viewEvent) {
			this.viewEvent = viewEvent;
		},
    	loadView: function (id) {
	        // Get the viewService.
	        var viewService = this.viewService.find(id);
	        // Get a new view
	        var view = new this.view(viewService);
	        // run the view's render function
	        view.render();
	    },
        render: function (bodyDom) {
            bodyDom.prepend('<h1>ViewController ' + this.id + ' says "' +
                      this.app.getTitle() + '"</h2>');
        }
    };
    return viewControllerBase;
});
