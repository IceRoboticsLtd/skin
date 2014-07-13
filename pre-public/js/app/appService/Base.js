/*
 * AppServiceBase
 */
define(function () {
    console.log('SKIN: appServiceBase called');
    function appServiceBase(id) {
        this.id = id;
        this.myProperty = {};          
    };
    appServiceBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('SKIN: appServiceBase setServiceBus(serviceBus) called');		
			this.serviceBus = serviceBus;
            // The appService instance has a property called "myProperty"
            // created from the serviceBus's "yourProperty".
            this.myProperty = this.serviceBus.yourProperty;			
		},
        setSubscriptions: function (subscriptions){
            console.log('SKIN: appServiceBase setSubscriptions(subscriptions) called');
            this.subscriptions = subscriptions;
        },           	
		subscribe: function () {
			console.log('SKIN: appServiceBase subscribe() called');	
			// Subscribe to the serviceBus with channels and topics from subscriptions
            this.subscriptions.forEach( function (subscription) {
                for (key in subscription) {
                    if(key == 'channel') {
                        var channel = subscription[key];
                        console.log('SKIN: appServiceBase channel:');
                        console.log(channel);
                        // TO DO
                    }
                }
            });
		}
    };
    return appServiceBase;
});
