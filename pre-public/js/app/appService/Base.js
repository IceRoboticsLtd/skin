/*
 * AppServiceBase
 */
define(function () {
    console.log('SKIN: appServiceBase called');
    function appServiceBase(id) {
        this.id = id;
    };
    appServiceBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('SKIN: appServiceBase setServiceBus(serviceBus) called');		
			this.serviceBus = serviceBus;
		},    	
		subscribe: function (config) {
			console.log('SKIN: appServiceBase subscribe(config) called');	
			this.config = config;
			// Subscribe to the serviceBus with channels and topics from config
			// TO DO
		}
    };
    return appServiceBase;
});
