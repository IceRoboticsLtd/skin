/*
 * ServiceBus
 */
define(['./Base'], function (Base) {
    console.log('SKIN: serviceBus called');	
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    	var r = (d + Math.random()*16)%16 | 0;
    	d = Math.floor(d/16);
    	return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });    
    var _ServiceBus = new Base(uuid);

    /*
     * Conduit
	 */
	function Conduit(options) { 
		console.log('SKIN: ServiceBus Conduit(options) called');
		if (typeof options.target !== "function") {
            throw new Error("You can only make functions into Conduits.");
        }
        var _steps = {
            pre: options.pre || [],
            post: options.post || [],
            all: []
        };
        var _defaultContext = options.context;
        var _target = options.target;
        var _targetStep = {
            isTarget: true,
            fn: options.sync ?
            function () {
                var args = Array.prototype.slice.call(arguments, 0);
                var result = _target.apply(_defaultContext, args);
                return result;
            } : function (next) {
                var args = Array.prototype.slice.call(arguments, 1);
                args.splice(1, 1, _target.apply(_defaultContext, args));
                next.apply(this, args);
            }
        };
        var _genPipeline = function () {
            _steps.all = _steps.pre.concat([_targetStep].concat(_steps.post));
        };
        _genPipeline();
		var conduit = function () {
            var idx = 0;
            var retval;
            var phase;
            var next = function next() {
                var args = Array.prototype.slice.call(arguments, 0);
                var thisIdx = idx;
                var step;
                var nextArgs;
                idx += 1;
                if (thisIdx < _steps.all.length) {
                    step = _steps.all[thisIdx];
                    phase = (phase === "target") ? "after" : (step.isTarget) ? "target" : "before";
                    if (options.sync) {
                        if (phase === "before") {
                            nextArgs = step.fn.apply(step.context || _defaultContext, args);
                            next.apply(this, nextArgs || args);
                        } else {
                            retval = step.fn.apply(step.context || _defaultContext, args) || retval;
                            next.apply(this, [retval].concat(args));
                        }
                    } else {
                        step.fn.apply(step.context || _defaultContext, [next].concat(args));
                    }
                }
            };
            next.apply(this, arguments);
            return retval;
		};
        conduit.steps = function () {
            return _steps.all;
        };
        conduit.context = function (ctx) {
            if (arguments.length === 0) {
                return _defaultContext;
            } else {
                _defaultContext = ctx;
            }
        };
        conduit.before = function (step, options) {
            step = typeof step === "function" ? {
                fn: step
            } : step;
            options = options || {};
            if (options.prepend) {
                _steps.pre.unshift(step);
            } else {
                _steps.pre.push(step);
            }
            _genPipeline();
        };
        conduit.after = function (step, options) {
            step = typeof step === "function" ? {
                fn: step
            } : step;
            options = options || {};
            if (options.prepend) {
                _steps.post.unshift(step);
            } else {
                _steps.post.push(step);
            }
            _genPipeline();
        };
        conduit.clear = function () {
            _steps = {
                pre: [],
                post: [],
                all: []
            };
            _genPipeline();
        };
        conduit.target = function (fn) {
            if (fn) {
                _target = fn;
            }
            return _target;
        };
		return conduit;
    };// eof Conduit
	Conduit.Sync = function (options) {
    	console.log('SKIN: ServiceBus Conduit.Sync(options) called');
        options.sync = true;
        return Conduit.call(this, options)
    };
	Conduit.Async = function (options) {
    	console.log('SKIN: ServiceBus Conduit.Async(options) called');
        return Conduit.call(this, options);
    };

    /*
     * Functions
     */
    function subscribe(options) {
    	console.log('SKIN: ServiceBusBase subscribe(options) called');
        var subDef = new SubscriptionDefinition(options.channel || _ServiceBus.configuration.DEFAULT_CHANNEL, options.topic, options.callback);    	
		// to do

        return subDef;
    };

    /*
     * ServiceBus Functions
	 */
	_ServiceBus.subscribe = new Conduit.Sync({
        target: subscribe,
        context: _ServiceBus
    });

    return _ServiceBus;
});
