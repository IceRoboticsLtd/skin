/*
 * ConfigBase
 */
define(function () {
    console.log('SKIN: configBase called');	
    function configBase(configs) {
        this.configs = configs;
    };
    configBase.prototype = {
        getConfigs: function () {
            console.log('SKIN: configBase getConfigs() called');
            return this.configs;
        }
    };
    return configBase;
});
