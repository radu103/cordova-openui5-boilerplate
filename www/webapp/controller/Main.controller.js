sap.ui.define([
	"ro/dts/tm3/ui5/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/core/Fragment"
], function(BaseController, JSONModel, ResourceModel, Fragment) {
	"use strict";

	return BaseController.extend("ro.dts.tm3.ui5.controller.Main", {

		oConfigModel : null,

		onInit: function() {
			console.log("Main Controller - onInit");

			this.oConfigModel = this.getCoreModel("configModel");
			this.oModulesConfigModel = this.getCoreModel("modulesConfigModel");

			var oModules = this.oConfigModel.getData();	

			if(oModules && oModules.modules){


				// core modules add
				this.loadCoreModules(oModules.modules);

				// plugin modules add
				this.loadPluginModules(oModules.plugins);
			}
		},

		loadCoreModules: function(modules){
			
			var oView = this.getView();

			for(var m = 0; m < modules.core.length; m++){
					
				var oModule = modules.core[m];
				
				var newModuleConfig = {
					"name": oModule.name,
					"routes" : [],
					"i18n" : null
				};

				// load custom routes to oRouter
				var oModuleRoutes = new JSONModel();
				oModuleRoutes.loadData("modules/core/" + oModule.name + "/routes.json", null, false);
				var routes = oModuleRoutes.getData();
				newModuleConfig.routes = routes;
				console.log(routes);
				
				// TO DO : create routes in main router

				// load specific i18n resource bundles
				var oModuleTexts = new ResourceModel({
					"bundleName" : "ro.dts.tm3.ui5.modules.core.clients.i18n.i18n",
					"defaultBindingMode" : "OneWay",
					"async" : false
				});

				newModuleConfig.i18n = oModuleTexts.getResourceBundle();
				this.setModel(oModuleTexts, oModule.name + "_i18n");

				// save module configuration
				this.oModulesConfigModel.setProperty("/" + oModule.name, newModuleConfig);

				// create launch fragment
				var launchFragment = Fragment.load({ 
					"name" : "ro.dts.tm3.ui5.modules.core." + oModule.name + ".Launch" 
				}).then(function(launchFragment){
					var oControl = oView.byId(oModule.controlId);
					oControl.addContent(launchFragment);
				});
			}
		},

		loadPluginModules: function(plugins){
			// TO DOs
		},

		onShellSearch : function(){

		},

		onShellConfigurationPress : function(){

		},

		onShellUserNamePress: function(){
			
		}

	});

});
