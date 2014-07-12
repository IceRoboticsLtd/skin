/*
 * AppEventBase
 */
define(function () {
    console.log('SKIN: appEventBase called');
    function appEventBase(id) {
        this.id = id;
    };
    appEventBase.prototype = {
    	// 
    };
    return appEventBase;
});
