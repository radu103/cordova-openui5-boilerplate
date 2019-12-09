sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
    "sap/ui/core/Fragment",
    "ro/dts/tm3/ui5/Component"
], function (Controller, History, JSONModel, ResourceModel, Fragment, Component) {
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
                newModuleConfig.routes = this.loadModuleRoutes(oModule);
				
				// load specific i18n resource bundles
				newModuleConfig.i18n = this.loadModuleTexts(oModule);

				// save module configuration
				this.oModulesConfigModel.setProperty("/" + oModule.name, newModuleConfig);

                // load launch fragment controller
                var launchFragmentController = sap.ui.controller("ro.dts.tm3.ui5.modules.core." + oModule.name + ".Launch");

                // create launch fragment
				var launchFragment = Fragment.load({ 
                    "type" : "XML",
                    "name" : "ro.dts.tm3.ui5.modules.core." + oModule.name + ".Launch",
                    "controller" : launchFragmentController
                }).then(function(launchFragment){
					var oControl = oView.byId(oModule.controlId);
                    oControl.addContent(launchFragment);
                });
            }
        },
        
        loadModuleTexts: function(oModule){
            
            var oModuleTexts = new ResourceModel({
                "bundleName" : "ro.dts.tm3.ui5.modules.core.clients.i18n.i18n",
                "defaultBindingMode" : "OneWay",
                "async" : false
            });

            this.setModel(oModuleTexts, oModule.name + "_i18n");

            return oModuleTexts.getResourceBundle();
        },

        loadModuleRoutes: function(oModule){

            var oModuleRoutes = new JSONModel();
            oModuleRoutes.loadData("modules/core/" + oModule.name + "/routes.json", null, false);
            
            var routesData = oModuleRoutes.getData();
            console.log(routesData);
            
            var oRouter = this.getRouter();
            
            for(var r = 0; r < routesData.length; r++){

                var newRoute = routesData[r];
            
                var targetName = newRoute.name + "Target";
                var routeName = newRoute.name;

                var oTarget = new sap.ui.core.routing.Target({
                    "name" : targetName,
                    "viewType" : "XML",
                    "viewLevel" : newRoute.target.viewLevel,
                    "viewName" :  newRoute.target.viewName,
                    "viewPath" :  newRoute.target.viewPath
                });

                var oRoute = new sap.ui.core.routing.Route(oRouter, 
                    {
                        "name" : routeName,
                        "pattern" : newRoute.pattern,
                        "target" :  targetName
                    }
                );
                oRoute.name = routeName;

                //oRouter._oTargets._mTargets[targetName] = oTarget;
                oRouter.addRoute(oRoute);
            }

            return routesData;
        },

		loadPluginModules: function(plugins){
			// TO DO
		},    

        // generic controller functions

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
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