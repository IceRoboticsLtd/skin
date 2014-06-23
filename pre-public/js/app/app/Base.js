define(function () {
    function appBase(title) {
        this.title = title;
    }

    appBase.prototype = {
        getTitle: function () {
            return this.title;
        }
    };

    return appBase;
});
