sap.ui.define([
	"ro/dts/tm3/ui5/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("ro.dts.tm3.ui5.modules.core.clients.Launch", {

		onInit: function() {
			
			console.log("clients module loaded - onInit");
			
			var that = this;

			this.initModuleData().then(function(res){
				console.log("clients module config OK");
				that.navToHome();
			}).catch(function(err){
				console.log("clients module config error :" + err);
			});
		},

		initModuleData : function(){
			
			return new Promise(function(resolve, reject){
				// TO DO : load module config here

				// in the end resolve
				resolve(true);
				
				// or reject if error
				//reject(err);
			});
		},

		onLaunchPress : function(){
			this.getRouter().navTo("clientsMain");
		}

	});

});