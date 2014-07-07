/*
 * ViewServiceBase
 */
define(function () {
	console.log('SKIN: viewServiceBase called');	
    function viewServiceBase(id) {
        this.id = id;
    };
    viewServiceBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('SKIN: viewServiceBase setServiceBus(serviceBus) called');		
			this.serviceBus = serviceBus;
		},     
        subscribe: function (config) {
            console.log('SKIN: viewServiceBase subscribe(config) called'); 
            this.config = config;
            // Subscribe to the serviceBus with channels and topics from config
            // TO DO
        }
    };
    return viewServiceBase;
});
