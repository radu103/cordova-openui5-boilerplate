sap.ui.define(["ro/dts/tm3/ui5/controller/BaseController","sap/ui/model/json/JSONModel","sap/ui/core/Fragment"],function(o,e,n){"use strict";return o.extend("ro.dts.tm3.ui5.controller.Main",{oConfigModel:null,onInit:function(){console.log("Main Controller - onInit");var o=this.getView();var e=o.byId("mainPage");this.oConfigModel=this.getCoreModel("configModel");this.oModulesConfigModel=this.getCoreModel("modulesConfigModel");var t=this.oConfigModel.getData();if(t&&t.modules){for(var l=0;l<t.modules.core.length;l++){var i=n.load({name:"ro.dts.tm3.ui5.modules.core."+t.modules.core[l]+".Launch"}).then(function(o){e.addContent(o)});var r={name:t.modules.core[l],routes:[],i18n:null};this.oModulesConfigModel.setProperty("/"+t.modules.core[l],r)}}},onShellSearch:function(){},onShellConfigurationPress:function(){},onShellUserNamePress:function(){}})});