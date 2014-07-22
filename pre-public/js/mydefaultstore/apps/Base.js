/*
 * Base
 */
define(function () {
    console.log('CORE: Base called');	
    function Base(configs) {
        this.configs = configs;
    };
    configBase.prototype = {
        getConfigs: function () {
            console.log('CORE: Base getConfigs() called');            
            return this.configs;
        }
    };
    return configBase;
});
