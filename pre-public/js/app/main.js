/*
 * Main
 */

// NOTE: The below fails because requirejs needs to be sure to load and execute 
//       all dependencies before calling the factory function below

define(function (require) {

    console.log('main');

    var $ = require('jquery'),
        lib = require('./lib'),
        controller = require('./controller/controller'),
        app = require('./app/app'),
		appController = require('./appController/appController'),
		appService = require('./appService/appService'),
        appEvent = require('./appEvent/appEvent'),
		serviceBus = require('./serviceBus/serviceBus'),
		view = require('./view/view'),
		viewController = require('./viewController/viewController'),
		viewService = require('./viewService/viewService'),
        viewEvent = require('./viewEvent/viewEvent'),	
        backbone = require('backbone'),
        underscore = require('underscore'),
		//OLD postal = require('postal/src/postal')
        // lodash = require('./../../../bower_components/lodash/dist/lodash'),
        postal = require('postal');
        //postaldiags = require('./../../../bower_components/postal.diagnostics/lib/postal.diagnostics.min');
        //conduit = require('./../../../bower_components/conduitjs/lib/conduit.min');

    //A fabricated API to show interaction of
    //common and specific pieces.
    controller.setViewController(viewController);
    controller.setView(view);   
    controller.setViewEvent(viewEvent);
    controller.setViewService(viewService);
    $(function () {
        controller.renderView(lib.getBody());
        //Display backbone and underscore versions
        $('body')
            .append('<div>backbone version: ' + backbone.VERSION + '</div>')
            .append('<div>underscore version: ' + underscore.VERSION + '</div>')
			.append('<div>Example 1 - The World\'s Simplest Subscription<div class="results" id="example1"></div></div>');
    });
    //A fabricated API to show interaction of
    //common and specific pieces.
    controller.setAppController(appController); 
    controller.setApp(app);      
    controller.setAppEvent(appEvent);
    controller.setAppService(appService);
    $(function () {
        controller.renderApp(lib.getBody());
        //Display backbone and underscore versions
        $('body')
            .append('<div>backbone version: ' + backbone.VERSION + '</div>')
            .append('<div>underscore version: ' + underscore.VERSION + '</div>')
            .append('<div>Example 1 - The World\'s Simplest Subscription<div class="results" id="example1"></div></div>');
    });
    // assign postal to the serviceBus's serviceBus property
    serviceBus.serviceBus = postal; 
    // The same serviceBus is used by both the ViewController and the AppController    
    controller.setServiceBus(serviceBus);
});
