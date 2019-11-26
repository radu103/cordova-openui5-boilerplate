sap.ui.define([
	"ro/dts/tm3/ui5/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("ro.dts.tm3.ui5.modules.core.clients.Launch", {

		onInit: function() {
			console.log("clients Launch controller onInit")
		}

	});

});