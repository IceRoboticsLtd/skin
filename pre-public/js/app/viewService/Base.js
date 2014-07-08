/*
 * ViewServiceBase
 */
define(function () {
	console.log('SKIN: viewServiceBase called');	
    function viewServiceBase(id) {
        this.id = id;
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
        subscribe: function (config) {
            console.log('SKIN: viewServiceBase subscribe(config) called'); 
            this.config = config;
            // Subscribe to the serviceBus with channels and topics from config
            // TO DO
        }
    };
    return viewServiceBase;
});
