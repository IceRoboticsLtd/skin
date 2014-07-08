/*
 * ControllerBase
 */
define(function () {
    console.log('SKIN: controllerBase called');
    function controllerBase(id) {
        this.id = id;
    };
    controllerBase.prototype = {
		setAppController: function (appController) {
			console.log('SKIN: controllerBase setAppController(appController) called');
			this.appController = appController;
			this.appController.setConfig(this.config);
		},
		setAppEvent: function (appEvent) {
			console.log('SKIN: controllerBase setAppEvent(appEvent) called');
			this.appEvent = appEvent;
			this.appController.setAppEvent(appEvent);
		},
		setAppService: function (appService) {
			console.log('SKIN: controllerBase setAppService(appService) called');			
			this.appService = appService;
			this.appController.setAppService(appService);			
		},
        setApp: function (app) {
        	console.log('SKIN: controllerBase setApp(app) called');
            this.app = app;
            this.appController.setApp(app);	
        },
		loadApp: function (id) {
			console.log('SKIN: controllerBase loadApp(id) called');			
			this.appController.loadApp(id);
		},        
        setConfig: function (config) {
        	console.log('SKIN: controllerBase setConfig(config) called');
            this.config = config;
        },	
		setServiceBus: function (serviceBus) {
			console.log('SKIN: controllerBase setServiceBus(serviceBus) called');
			this.serviceBus = serviceBus;
            this.appController.setServiceBus(serviceBus);
            this.viewController.setServiceBus(serviceBus);			
		},
		setViewController: function (viewController) {
			console.log('SKIN: controllerBase setViewController(viewController) called');	
			this.viewController = viewController;
			this.viewController.setConfig(this.config);
		},
		setViewEvent: function (viewEvent) {
			console.log('SKIN: controllerBase setViewEvent(viewEvent) called');
			this.viewEvent = viewEvent;
			this.viewController.setViewEvent(viewEvent);
		},		
		setViewService: function (viewService) {
			console.log('SKIN: controllerBase setViewService(viewService) called');			
			this.viewService = viewService;
			this.viewController.setViewService(viewService);		
		},
		setView: function (view) {
			console.log('SKIN: controllerBase setView(view) called');			
			this.view = view;
			this.viewController.setView(view);
		},
		loadView: function (id) {
			console.log('SKIN: controllerBase loadView(id) called');			
			this.viewController.loadView(id);
		},
        renderView: function (bodyDom) {
        	console.log('SKIN: controllerBase renderView(bodyDom) called');     	
			this.viewController.renderView(bodyDom);
        //    bodyDom.prepend('<h1>Controller ' + this.id + ' says "' +
        //              this.model.getTitle() + '"</h2>');
        }
    };
    return controllerBase;
});
