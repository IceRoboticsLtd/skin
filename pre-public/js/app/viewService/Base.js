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
                var topicArray = new Array();
                for (key in subscription) {
                    // One subscription has one channel                    
                    if(key == 'channel') {
                        var channel = subscription[key];
                        console.log('SKIN: viewServiceBase channel:');
                        console.log(channel);
                    }
                    // One channel has one or more topics
                    if(key == 'topic') {
                        var topic = subscription[key];
                        console.log('SKIN: viewServiceBase topic:');
                        console.log(topic);
                        topicArray.push(topic);
                    }                     
                }
                console.log('SKIN: viewServiceBase topicArray:');
                console.log(topicArray);
                // Now we should have one channel and one or more topics
                // TO DO: subscribe to the channel+topic for each topic
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
