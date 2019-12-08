sap.ui.define([
	"ro/dts/tm3/ui5/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("ro.dts.tm3.ui5.controller.Main", {

		onInit: function() {
			console.log("Main Controller - onInit");

			this.loadModulesModels();
			this.displayModulesControls();
		},

		onShellSearch : function(){

		},

		onShellConfigurationPress : function(){

		},

		onShellUserNamePress: function(){
			
		}

	});

});
