define(function () {
    function controllerBase(id) {
        this.id = id;
    }

    controllerBase.prototype = {
        setModel: function (model) {
            this.model = model;
        },

		setModelController: function (modelController) {
			this.modelController = modelController;
		},		

		setModelService: function (modelService) {
			this.modelService = modelService;
		},	
		
		setServiceBus: function (serviceBus) {
			this.serviceBus = serviceBus;
		},

		setView: function (view) {
			this.view = view;
		},
		
		setViewController: function (viewController) {
			this.viewController = viewController;
		},	

		setViewService: function (viewService) {
			this.viewService = viewService;
		},
		
        render: function (bodyDom) {
            bodyDom.prepend('<h1>Controller ' + this.id + ' says "' +
                      this.model.getTitle() + '"</h2>');
        }
    };

    return controllerBase;
});
