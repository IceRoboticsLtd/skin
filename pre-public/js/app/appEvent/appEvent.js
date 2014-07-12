/*
 * AppEvent
 * An event is where something happening is captured.
 */
var AppEvent123 = 1 << 0;
var AppEvent456 = 1 << 1;
var AppEventSubscribe = 1 << 2;

define(['./Base'], function (Base) {
    console.log('SKIN: appEvent called');
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });   
    var _AppEvent = new Base(uuid);

    // following this example, slightly
    // http://sandbox.thewikies.com/javascript-mvc-hello-world/index.2.html

    // An appEvent constructor might have a function that raises an event
	_AppEvent.raiseEvent = function (flag) {
        // Check if AppEvent123 was passed.
        if (flag & AppEvent123) {
            console.log('SKIN: appEvent123 raised');
            // Run the AppController's show function.
            _AppController.loadApp(123);
        }
        // Check if AppEvent456 was passed.
        if (flag & AppEvent456) {
            console.log('SKIN: appEvent456 raised');            
            // Run the AppController's show function.
            _AppController.loadApp(456);
        }
        // Check if AppEventSubscribe was passed
        if (flag & AppEventSubscribe) {
            console.log('SKIN: appEventSubscribe raised');            
            // Subscribe ModelService
            _AppController.subscribeAppService();
        }         
    };
    // return the appEvent instance
    return _AppEvent;
});