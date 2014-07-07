/*
 * AppBase
 */
define(function () {
    console.log('SKIN: appBase called');	
    function appBase(title) {
        this.title = title;
    };
    appBase.prototype = {
        getTitle: function () {
        console.log('SKIN: appBase getTitle() called');         	
            return this.title;
        }
    };
    return appBase;
});
