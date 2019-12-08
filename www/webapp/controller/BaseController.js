sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/core/Fragment"
], function (Controller, History, JSONModel, ResourceModel, Fragment) {
    "use strict";

    return Controller.extend("ro.dts.tm3.ui5.controller.BaseController", {
    
        // dynamic module framework functions

		oModulesModel : null,
		oModulesConfigModel : null,

        loadModulesModels: function(){

            this.oModulesModel = this.getCoreModel("modulesModel");
            
            if(!this.oModulesModel){
                this.oModulesModel = new JSONModel();
                this.oModulesModel.loadData("modules.json", null, false);
                this.setCoreModel(this.oModulesModel, "modulesModel");
            }

            this.oModulesConfigModel = this.getCoreModel("modulesConfigModel");

            if(!this.oModulesConfigModel){
                this.oModulesConfigModel = new JSONModel();
                this.oModulesConfigModel.loadData("modulesConfig.json", null, false);
                this.setCoreModel(this.oModulesConfigModel, "modulesConfigModel");
            }
        },

        displayModulesControls: function(){
            
			var oModules = this.oModulesModel.getData();	

			if(oModules.core || oModules.plugins){

				// core modules add
				this.loadCoreModules(oModules.core);

				// plugin modules add
				this.loadPluginModules(oModules.plugins);
			} 
        },

        loadCoreModules: function(modules){
			
			var oView = this.getView();

			for(var m = 0; m < modules.length; m++){
					
				var oModule = modules[m];
				
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
			// TO DO
		},    

        // generic controller functions

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        navTo: function (route, object) {
            
            var obj = object;
            
            if (!obj) {
                obj = {};
            }
            
            this.getRouter().navTo(route, obj, false);
        },

        navBack: function (route) {
            
            var sPreviousHash = History.getInstance().getPreviousHash();
            
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                //Validate route.
                var oRoute = this.getRouter().getRoute(route);
                if (oRoute) {
                    this.getRouter().navTo(route, {}, true);
                } else {
                    this.getRouter().navTo("fileList", {}, true);
                }
            }
        },

        getCoreModel: function(sName){
            return sap.ui.getCore().getModel(sName);
        },
    
        setCoreModel: function(oModel, sName) {
            sap.ui.getCore().setModel(oModel, sName);
        },

        getModel: function(sName){
            return this.getView().getModel(sName);
        },
    
        setModel: function(oModel, sName) {
            var oView = this.getView();
            oView.setModel(oModel, sName);
            return oView;
        },
    
        getResourceBundle: function(){
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        navToHome : function(){
            var oRouter =  this.getRouter();
            oRouter.navTo("home");
        }

    });
}
);			