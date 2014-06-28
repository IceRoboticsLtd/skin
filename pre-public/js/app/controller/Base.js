define(function () {
    function controllerBase(id) {
    	console.log('controller: controllerBase(id) called');
    	console.log('id: ' + id);
        this.id = id;
    }
    controllerBase.prototype = {
		setAppController: function (appController) {
			console.log('controller: setAppController(appController) called');
			this.appController = appController;
		},
		setAppEvent: function (appEvent) {
			console.log('controller: setAppEvent(appEvent) called');
			this.appEvent = appEvent;
			this.appController.setAppEvent(appEvent);
		},
		setAppService: function (appService) {
			console.log('controller: setAppService(appService) called');			
			this.appService = appService;
			this.appController.setAppService(appService);			
		},
		setApp: function (app) {
			console.log('controller: setApp(app) called');			
			this.app = app;
			this.appController.setApp(app);			
		},
		setServiceBus: function (serviceBus) {
			console.log('controller: setServiceBus(serviceBus) called');				
			this.serviceBus = serviceBus;
			this.appController.setServiceBus(serviceBus);
			this.viewController.setServiceBus(serviceBus);					
		},		
		setViewController: function (viewController) {
			console.log('controller: setViewController(viewController) called');				
			this.viewController = viewController;
		},
		setViewEvent: function (viewEvent) {
			console.log('controller: setViewEvent(viewEvent) called');				
			this.viewEvent = viewEvent;
			this.viewController.setViewEvent(viewEvent);			
		},		
		setViewService: function (viewService) {
			console.log('controller: setViewService(viewService) called');				
			this.viewService = viewService;
			this.viewController.setViewService(viewService);			
		},
		setView: function (view) {
			console.log('controller: setView(view) called');				
			this.view = view;
			this.viewController.setView(view);		
		},
		loadView: function ( id ) {
			console.log('controller: loadView(id) called');			
			this.viewController.loadView(id);
		},
		loadApp: function ( id ) {
			console.log('controller: loadApp(id) called');				
			this.appController.loadApp(id);
		}
	};
    return controllerBase;
});
