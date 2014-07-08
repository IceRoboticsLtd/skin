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
		},
		// A view might have a function that returns the rendered output.
		output = function() {
			// Data used to create a template may come from anywhere
			// but in this case template comes from the inline string.
			var ourData = '<h1><%= myProperty %></h1>';
			// Store the instance for reference in the replace function below.
			var instance = this;
			// Return the template using the values from the viewService.
			return ourData.replace(/<%=\s+(.*?)\s+%>/g, function (m,m1) {
				return instance.viewService[m1];
			});
		},
		// A view might have a function that renders the output.
		render = function () {
			// This view renders to the element with the id of "output".
			document.getElementById('output').innerHTML = this.output();
		}
    };
    return viewBase;
});
