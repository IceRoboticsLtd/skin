/*
 * ViewBase
 */
define(function () {
    console.log('SKIN: viewBase called');	
    function viewBase(id) {
        this.id = id;      
    };
    viewBase.prototype = {
		setViewService: function (viewService) {
			console.log('CORE: ViewBase setViewService(viewService) called');
    		// The view instance has a property called "viewService"
    		// created from the viewService.					
			this.viewService = viewService;
		}
    };
    return viewBase;
});
