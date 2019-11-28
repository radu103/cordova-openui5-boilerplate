sap.ui.define([
	"ro/dts/tm3/ui5/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function(BaseController, JSONModel, Fragment) {
	"use strict";

	return BaseController.extend("ro.dts.tm3.ui5.controller.Main", {

		oConfigModel : null,

		onInit: function() {
			console.log("Main Controller - onInit");

			var oView = this.getView();
			var oMainPage = oView.byId("mainPage");

			this.oConfigModel = this.getCoreModel("configModel");
			this.oModulesConfigModel = this.getCoreModel("modulesConfigModel");

			var oModules = this.oConfigModel.getData();	

			if(oModules && oModules.modules){

				// core modules add
				for(var m=0; m < oModules.modules.core.length; m++){
					
					var launchFragment = Fragment.load({ 
						"name" : "ro.dts.tm3.ui5.modules.core." + oModules.modules.core[m] + ".Launch" 
					}).then(function(launchFragment){
						oMainPage.addContent(launchFragment);
					});
					
					var newModule = {
						"name": oModules.modules.core[m],
						"routes" : [],
						"i18n" : null
					};

					// TO DO : load custom routes to oRouter

					// TO DO : load specific i18n resource bundles

					this.oModulesConfigModel.setProperty("/" + oModules.modules.core[m], newModule);
				}

				// plugin modules add
				// TO DO
			}
		},

		onShellSearch : function(){

		},

		onShellConfigurationPress : function(){

		},

		onShellUserNamePress: function(){
			
		}

	});

});
