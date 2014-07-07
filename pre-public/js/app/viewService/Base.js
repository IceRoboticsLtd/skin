/*
 * ViewServiceBase
 */
define(function () {
	console.log('SKIN: viewServiceBase called');	
    function viewServiceBase(id) {
        this.id = id;
    }
    viewServiceBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('SKIN: viewServiceBase setServiceBus(serviceBus) called');		
			this.serviceBus = serviceBus;
		}
    };
    return viewServiceBase;
});
