sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("ro.dts.tm3.ui5.controller.BaseController", {
    
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