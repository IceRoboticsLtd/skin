define(function (require) {
    var $ = require('jquery'),
        lib = require('./lib'),
        controller = require('./controller/controller'),
        app = require('./app/app'),
		appController = require('./appController/appcontroller'),
		appService = require('./appService/appService'),
		serviceBus = require('./serviceBus/serviceBus'),
		view = require('./view/view'),
		viewController = require('./viewController/viewController'),
		viewService = require('./viewService/viewService'),		
        backbone = require('backbone'),
        underscore = require('underscore'),
		postal = require('postal/src/postal'); // TO DO: Make this variable's name non-postal for independence

    //A fabricated API to show interaction of
    //common and specific pieces.
    controller.setModel(model);
    $(function () {
        controller.render(lib.getBody());

        //Display backbone and underscore versions
        $('body')
            .append('<div>backbone version: ' + backbone.VERSION + '</div>')
            .append('<div>underscore version: ' + underscore.VERSION + '</div>')
			.append('<div>Example 1 - The World\'s Simplest Subscription<div class="results" id="example1"></div></div>');
    });
});
