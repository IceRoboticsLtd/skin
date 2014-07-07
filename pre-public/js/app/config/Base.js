/*
 * ConfigBase
 */
define(function () {
    console.log('SKIN: configBase called');	
    function configBase(config) {
        this.config = config;
    };
    configBase.prototype = {
        getConfig: function () {
            console.log('SKIN: configBase getConfig() called');
            return this.config;
        }
    };
    return configBase;
});
