/*
 * AppBase
 */
define(function () {
    console.log('SKIN: appBase called');	
    function appBase(id) {
        this.id = id;
    };
    appBase.prototype = {
        getTitle: function () {
            console.log('SKIN: appBase getTitle() called');         	
            return this.title;
        },
        setTitle: function (title) {
            console.log('SKIN: appBase setTitle(title) called');             
            this.title = title;
        }
    };
    return appBase;
});
