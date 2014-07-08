/*
 * View
 */
define(['./Base'], function (Base) {
    console.log('SKIN: view called');	
    var _View = new Base(viewService);

    // following this example, slightly
    // http://sandbox.thewikies.com/javascript-mvc-hello-world/index.2.html

	// A view might have a function that returns the rendered output.
	_View.prototype.output = function() {
		// Data used to create a template may come from anywhere
		// but in this case template comes from the inline string.
		var ourData = '<h1><%= myProperty %></h1>';
		// Store the instance for reference in the replace function below.
		var instance = this;
		// Return the template using the values from the viewService.
		return ourData.replace(/<%=\s+(.*?)\s+%>/g, function (m,m1) {
			return instance.viewService[m1];
		});
	};
	// A view might have a function that renders the output.
	_View.prototype.render = function () {
		// This view renders to the element with the id of "output".
		document.getElementById('output').innerHTML = this.output();
	};
    return _View;
});
