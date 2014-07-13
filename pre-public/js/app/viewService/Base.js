/*
 * ViewServiceBase
 */
define(function () {
	console.log('SKIN: viewServiceBase called');	
    function viewServiceBase(id) {
        this.id = id;
        this.title = 'viewService default title';
        this.myProperty = {};         
    };
    viewServiceBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('SKIN: viewServiceBase setServiceBus(serviceBus) called');		
			this.serviceBus = serviceBus;
            // The viewService instance has a property called "myProperty"
            // created from the serviceBus's "yourProperty".
            this.myProperty = this.serviceBus.yourProperty;              
		}, 
        setSubscriptions: function (subscriptions){
            console.log('SKIN: viewServiceBase setSubscriptions(subscriptions) called');
            this.subscriptions = subscriptions;
        },            
        subscribe: function () {
            console.log('SKIN: viewServiceBase subscribe() called'); 
            // Subscribe to the serviceBus with channels and topics from subscriptions
            this.subscriptions.forEach( function (subscription) {
                for (key in subscription) {
                    if(key == 'channel') {
                        var channel = subscription[key];
                        console.log('SKIN: viewServiceBase channel:');
                        console.log(channel);
                        // TO DO
                    }
                }
            });
        },
        getTitle: function () {
            console.log('SKIN: viewServiceBase getTitle() called');            
            return this.title;
        },
        setTitle: function (title) {
            console.log('SKIN: viewServiceBase setTitle(title) called');            
            this.title = title;
        }
    };
    return viewServiceBase;
});
