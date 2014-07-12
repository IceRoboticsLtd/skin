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
        bootstrap = require('bootstrap'); // bootstrap extends jquery
        expect = require('expect'),
        mocha = require('mocha');
        //conduitjs = require('conduit'), // depends on bootstrap, expect, and mocha
        //postal = require('postal'),
        //postaldiags = require('postaldiags');

    // Backbone check
    console.log('SKIN: backbone:');
    console.log(backbone);
    // JQuery check
    console.log('SKIN: jquery:');
    console.log(jquery); 
    jquery.VERSION = jquery.fn.jquery;
    // Bootstrap check
    console.log('SKIN: bootstrap:');
    console.log(bootstrap);
    // Expect check
    console.log('SKIN: expect:');
    console.log(expect);
    expect.VERSION = expect.version;
    // Mocha check
    console.log('SKIN: mocha:');
    console.log(mocha);
    // ConduitJS check
//    console.log('conduitjs:');
//    console.log(conduitjs);
    // Postal check
//    console.log('postal');
//    console.log(postal);
    // PostalDiags check
//    console.log('postaldiags:');
//    console.log(postaldiags);
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
    // assign postal to the serviceBus's serviceBus property
//    serviceBus.serviceBus = postal; 
    // The same serviceBus is used by both the ViewController and the AppController
    controller.setServiceBus(serviceBus);
    /*
     * STEP 2: Non-shared modules
     */    
    // Set appController
    console.log('SKIN: appController:');
    console.log(appController);
    controller.setAppController(appController); 
    // Set app
    console.log('SKIN: app:');
    console.log(app);
    controller.setApp(app);
    // Set appEvent
    console.log('SKIN: appEvent:');
    console.log(appEvent);
    controller.setAppEvent(appEvent);
    // Set appService
    console.log('SKIN: appService:');
    console.log(appService); 
    controller.setAppService(appService);
    // Set viewController
    console.log('SKIN: viewController:');
    console.log(viewController);
    controller.setViewController(viewController);
    // Set view
    console.log('SKIN: view:');
    console.log(view);    
    controller.setView(view);
    // Set viewEvent
    console.log('SKIN: viewEvent:');
    console.log(viewEvent);
    controller.setViewEvent(viewEvent);
    // Set viewService
    console.log('SKIN: viewService:');
    console.log(viewService);    
    controller.setViewService(viewService);

    //A fabricated API to show interaction of
    //common and specific pieces. 

    // DOM ready  
    $(function () {
        controller.renderView(lib.getBody());
        //Display backbone and underscore versions
        $('body')
            .append('<div>backbone version: ' + backbone.VERSION + '</div>')
            .append('<div>underscore version: ' + underscore.VERSION + '</div>')
            .append('<div>lodash version: ' + lodash.VERSION + '</div>')
            .append('<div>jquery version: ' + jquery.VERSION + '</div>')
            .append('<div>expect version: ' + expect.VERSION + '</div>')
            .append('<div>mocha version: ' + mocha.VERSION + '</div>') 
        //    .append('<div>conduitjs version: ' + conduitjs.VERSION + '</div>')
        //    .append('<div>postal version: ' + postal.VERSION + '</div>')              
        //    .append('<div>postaldiags version: ' + postaldiags.VERSION + '</div>')                        
		//	.append('<div>Example 1 - The World\'s Simplest Subscription<div class="results" id="example1"></div></div>');
    });
});
