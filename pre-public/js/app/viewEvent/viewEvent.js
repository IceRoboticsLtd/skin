/*
 * ViewEvent
 * An event is where something happening is captured.
 */

var ViewEvent123 = 1 << 0;
var ViewEvent456 = 1 << 1;

define(['./Base'], function (Base) {
    console.log('viewEvent called');     
    var _ViewEvent = new Base('');

    // following this example, slightly
    // http://sandbox.thewikies.com/javascript-mvc-hello-world/index.2.html

    _ViewEvent.raiseEvent = function ( flag ) {
        // Check if ViewEvent123 was passed.
        if (flag & ViewEvent123) {
            // Run the ViewController's show function.
            _ViewController.loadView(123);
        }
        // Check if ViewEvent456 was passed.
        if (flag & ViewEvent456) {
            // Run the ViewController's show function.
            _ViewController.loadView(456);
        }
    };
    return _ViewEvent;
});
