/*
 * ViewService
 */
define(['./Base'], function (Base) {
    var _ViewService = new Base(serviceBus);
	
    // following this example, slightly
    // http://sandbox.thewikies.com/javascript-mvc-hello-world/index.2.html

    // The viewService instance has a property called "myProperty"
    // created from the serviceBus's "yourProperty".
    this.myProperty = serviceBus.yourProperty;


	// The world's simplest subscription
//    var channel = postal.channel("Name.Changed");
    // subscribe
//    var subscription = channel.subscribe(function(data) { $("#example1").html("Name: " + data.name); });
    // And someone publishes a first name change:
//    channel.publish({ name: "Dr. Who" });
	
	// A viewService constructor might have a function that creates new viewService instances
	_ViewService.find = function ( id ) {
		// Data used to create a new viewService may come from anywhere
		// but in this case data comes from this inline object.
		var ourData = {
			'123': {
				yourProperty: 'You clicked.'
			},
			'456': {
				yourProperty: 'You pressed a key.'
			}
		};
		// Get a new viewService instance containing our data.
		var viewService = new _ViewService(ourData[id]);
		// Return the viewService.
		return viewService;
	};

	// return the viewService instance
    return this;
});
