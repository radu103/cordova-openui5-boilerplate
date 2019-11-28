sap.ui.define([
	"ro/dts/tm3/ui5/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function(BaseController, JSONModel, Fragment) {
	"use strict";

	return BaseController.extend("ro.dts.tm3.ui5.controller.App", {

		oConfigModel : null,
		oModulesConfigModel : null,

		onInit: function() {

			console.log("App Controller - onInit");
			console.log("Connection type : " + navigator.connection.type);
		
			this.oConfigModel = new JSONModel();
			this.oConfigModel.loadData("config.json", null, false);
			this.setCoreModel(this.oConfigModel, "configModel");

			this.oModulesConfigModel = new JSONModel();
			this.oModulesConfigModel.loadData("modulesConfig.json", null, false);
			this.setCoreModel(this.oModulesConfigModel, "modulesConfigModel");

			this.navToHome();
		}
	});

});
