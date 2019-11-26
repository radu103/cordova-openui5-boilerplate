/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/actions/Action","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery"],function(t,e,i){"use strict";var r=t.extend("sap.ui.test.actions.EnterText",{metadata:{properties:{text:{type:"string"},clearTextFirst:{type:"boolean",defaultValue:true},keepFocus:{type:"boolean",defaultValue:false}},publicMethods:["executeOn"]},init:function(){t.prototype.init.apply(this,arguments);this.controlAdapters=i.extend(this.controlAdapters,r.controlAdapters)},executeOn:function(t){var i=this.$(t),r=i[0];if(!r){return}if(this.getText()===undefined||!this.getClearTextFirst()&&!this.getText()){this.oLogger.error("Please provide a text for this EnterText action");return}var s=this.getUtils();this.oLogger.timestamp("opa.actions.enterText");this.oLogger.debug("Enter text in control "+t);this._tryOrSimulateFocusin(i,t);if(this.getClearTextFirst()){s.triggerKeydown(r,e.DELETE);s.triggerKeyup(r,e.DELETE);i.val("");s.triggerEvent("input",r)}var n=i.val();this.getText().split("").forEach(function(t){n+=t;s.triggerCharacterInput(r,t,n);s.triggerEvent("input",r)});if(!this.getKeepFocus()){this._simulateFocusout(r);s.triggerEvent("search",r)}}});r.controlAdapters={};r.controlAdapters["sap.m.StepInput"]="input-inner";return r});