sap.ui.define([
	"ro/dts/tm3/ui5/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function(BaseController, JSONModel, Fragment) {
	"use strict";

	return BaseController.extend("ro.dts.tm3.ui5.controller.App", {

		onInit: function() {

			console.log("App Controller - onInit");
			console.log("Connection type : " + navigator.connection.type);

			this.navToHome();
		}
	});

});
