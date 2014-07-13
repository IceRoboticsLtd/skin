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
                var topicArray = new Array();
                for (key in subscription) {
                    // One subscription has one channel
                    if(key == 'channel') {
                        var channel = subscription[key];
                        console.log('SKIN: appServiceBase channel:');
                        console.log(channel);
                    }
                    // One channel has one or more topics
                    if(key == 'topic') {
                        var topic = subscription[key];
                        console.log('SKIN: appServiceBase topic:');
                        console.log(topic);
                        topicArray.push(topic);
                    }
                }
                console.log('SKIN: appServiceBase topicArray:');
                console.log(topicArray);
                // Now we should have one channel and one or more topics
                for(topic in topicArray) {
                    var topic = topicArray[topic];
                    var callback = function(data, envelope){
                        // empty for now
                        console.log(data);
                    };
                    // Subscribe to the channel+topic for each topic, 
                    // with callback for processing of received data            
                    var options = { channel: channel, topic: topic, callback: callback};
                    console.log('SKIN: appServiceBase options:');
                    console.log(options);
                    this.serviceBus.subscribe(options); // NOTE: For some reason this.serviceBus is undefined
                }
            });
		}
    };
    return appServiceBase;
});
