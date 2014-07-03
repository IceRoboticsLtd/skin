/*
 * AppEvent
 * An event is where something happening is captured.
 */
var AppEvent123 = 1 << 0;
var AppEvent456 = 1 << 1;

define(['./Base'], function (Base) {
    var _AppEvent = new Base(flag);

    // following this example, slightly
    // http://sandbox.thewikies.com/javascript-mvc-hello-world/index.2.html

    _AppEvent.raiseEvent = function ( flag ) {
        // Check if AppEvent123 was passed.
        if (flag & AppEvent123) {
            // Run the AppController's show function.
            _AppController.loadApp(123);
        }
        // Check if AppEvent456 was passed.
        if (flag & AppEvent456) {
            // Run the AppController's show function.
            _AppController.loadApp(456);
        }
    };
    return _AppEvent;
});