sap.ui.define([
	"ro/dts/tm3/ui5/controller/BaseController",
	"sap/ui/core/Fragment"
], function(BaseController, Fragment) {
	"use strict";

	return BaseController.extend("ro.dts.tm3.ui5.controller.App", {

		oConfigModel : null,
		Modules : {},

		onInit: function() {
			console.log("Connection type : " + navigator.connection.type);
		
			this.oConfigModel = this.getModel("config");
			
			var oView = this.getView();
			var oMainPage = oView.byId("mainPage");

			var modules = this.oConfigModel.getData().modules;
			
			if(modules){
				
				// core modules add
				for(var m=0; m < modules.core.length; m++){
					
					var launchFragment = Fragment.load({ 
						"name" : "ro.dts.tm3.ui5.modules.core." + modules.core[m] + ".Launch" 
					}).then(function(launchFragment){
						oMainPage.addContent(launchFragment);
					});
					
					var newModule = {
						"name": modules.core[m],
						"routes" : [],
						"i18n" : null
					};

					// TO DO : load custom routes to oRouter

					// TO DO : load specific i18n resource bundles

					this.Modules[modules.core[m]] = newModule;
				}

				// plugin modules add
				// TO DO
			}
		}

	});

});
