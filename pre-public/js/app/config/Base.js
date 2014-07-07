/*
 * ConfigBase
 */
define(function () {
    console.log('configBase called');	
    function configBase(config) {
        this.config = config;
    };
    configBase.prototype = {
        getConfig: function () {
            console.log('configBase getConfig() called');
            return this.config;
        }
    };
    return configBase;
});
