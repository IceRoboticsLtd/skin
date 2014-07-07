/*
 * Lib
 */
define(['jquery'], function ($) {
	console.log('SKIN: lib called');
    return {
        getBody: function () {
        	console.log('SKIN: lib getBody called');       	
            return $('body');
        }
    }
});
