/*
 * Main
 */
define(function (require) {
    console.log('SKIN: main called');
    var $ = require('jquery'),
        lib = require('./lib'),
        config = require('./config/config'),        
        controller = require('./controller/controller'),
        app = require('./app/app'),
		appController = require('./appController/appController'),
        appEvent = require('./appEvent/appEvent'),
        appService = require('./appService/appService'),        
		serviceBus = require('./serviceBus/serviceBus'),
		view = require('./view/view'),
		viewController = require('./viewController/viewController'),
		viewService = require('./viewService/viewService'),
        viewEvent = require('./viewEvent/viewEvent'),	
        backbone = require('backbone'),
        underscore = require('underscore'),
        lodash = require('lodash'),
        jquery = require('jquery'),
        bootstrap = require('bootstrap'), // bootstrap extends jquery
        expect = require('expect'),
        mocha = require('mocha'),
        jquerypp = require('jquerypp.custom'),
        framewarp = require('framewarp');

    /*
     * STEP 1: Shared modules
     */
    // Set store
    console.log('SKIN: store:');
    console.log('mydefaultstore'); // TO DO: Make dynamic, not hard-coded
    controller.setStore('mydefaultstore');   
    // Set config
    console.log('SKIN: config:');
    console.log(config);
    controller.setConfig(config);
    // Set serviceBus
    console.log('SKIN: serviceBus:');
    console.log(serviceBus);
    // The same serviceBus is used by both the ViewController and the AppController
    controller.setServiceBus(serviceBus);
    /*
     * STEP 2: Non-shared modules
     */    
    // Set appController, before appService
    console.log('SKIN: appController:');
    console.log(appController);
    controller.setAppController(appController); 
    // Set appService, before app
    console.log('SKIN: appService:');
    console.log(appService); 
    controller.setAppService(appService);    
    // Set app, after appService
    console.log('SKIN: app:');
    console.log(app);
    controller.setApp(app);
    // Set appEvent, after app
    console.log('SKIN: appEvent:');
    console.log(appEvent);
    controller.setAppEvent(appEvent);
    // Set viewController, before viewService
    console.log('SKIN: viewController:');
    console.log(viewController);
    controller.setViewController(viewController);
    // Set viewService, before view
    console.log('SKIN: viewService:');
    console.log(viewService);    
    controller.setViewService(viewService);    
    // Set view, after viewService
    console.log('SKIN: view:');
    console.log(view);    
    controller.setView(view);
    // Set viewEvent, after view
    console.log('SKIN: viewEvent:');
    console.log(viewEvent);
    controller.setViewEvent(viewEvent);

    // TEMPORARILY FOR TESTING
    controller.subscribeAppService();
    controller.subscribeViewService();

    // DOM ready  
    $(function () {
        console.log('SKIN: controller.loadView(0) called');
        controller.loadView(0); // MAKE DYNAMIC, CHOOSE id
        console.log('SKIN: controller.renderView("page") called'); // PROVIDE A PROPER elementId
        controller.renderView('page');
    });
});
