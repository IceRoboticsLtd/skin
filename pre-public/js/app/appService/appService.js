/*
 * AppService
 */
define(['./Base'], function (Base) {
    console.log('SKIN: appService called');	
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    	var r = (d + Math.random()*16)%16 | 0;
    	d = Math.floor(d/16);
    	return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });    
    var _AppService = new Base(uuid);

    // following this example, slightly
    // http://sandbox.thewikies.com/javascript-mvc-hello-world/index.2.html

	// The world's simplest subscription
//    var channel = postal.channel("Name.Changed");
    // subscribe
//    var subscription = channel.subscribe(function(data) { $("#example1").html("Name: " + data.name); });
    // And someone publishes a first name change:
//    channel.publish({ name: "Dr. Who" });

	// An appService constructor might have a function that creates new appService instances
	_AppService.find = function (id) {
		console.log('SKIN: appService find(id) called');
		// Data used to create a new appService may come from anywhere
		// but in this case data comes from this inline object.
		var ourData = {
			'123': {
				yourProperty: 'You clicked.'
			},
			'456': {
				yourProperty: 'You pressed a key.'
			},
			'subscribe': {
				yourProperty: 'You suscribe.'
			}
		};
		// Get a new appService instance containing our data.
		var appService = new _AppService(ourData[id]);
		// Return the appService.
		return appService;
	};
	// return the appService instance
    return _AppService;
});
