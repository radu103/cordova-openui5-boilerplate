/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier"],function(e){"use strict";var t={};t.applyChange=function(e,t,r){var o=r.modifier;var n=r.view;var i=r.appComponent;var a=e.getDefinition();var l=o.bySelector(a.content.elementSelector||a.content.sUnhideId,i,n);var p=o.getAggregation(t,"content");var s=-1;if(a.changeType==="unhideSimpleFormField"){e.setRevertData(true);p.some(function(e,t){if(e===l){s=t;o.setVisible(e,true)}if(s>=0&&t>s){if(o.getControlType(e)==="sap.m.Label"||o.getControlType(e)==="sap.ui.comp.smartfield.SmartLabel"||o.getControlType(e)==="sap.ui.core.Title"||o.getControlType(e)==="sap.m.Title"||o.getControlType(e)==="sap.m.Toolbar"||o.getControlType(e)==="sap.m.OverflowToolbar"){return true}else{o.setVisible(e,true)}}})}return true};t.completeChangeContent=function(t,r,o){var n=t.getDefinition();if(r.sUnhideId){var i=sap.ui.getCore().byId(r.sUnhideId);n.content.elementSelector=e.getSelector(i,o.appComponent);t.addDependentControl(i,"elementSelector",o)}else if(r.revealedElementId){var a=sap.ui.getCore().byId(r.revealedElementId||r.sUnhideId);var l=a.getLabel();n.content.elementSelector=e.getSelector(l,o.appComponent);t.addDependentControl(l,"elementSelector",o)}else{throw new Error("oSpecificChangeInfo.revealedElementId attribute required")}};t.revertChange=function(e,t,r){var o=r.modifier;var n=r.view;var i=r.appComponent;var a=e.getDefinition();var l=o.bySelector(a.content.elementSelector||a.content.sUnhideId,i,n);var p=o.getAggregation(t,"content");var s=-1;if(a.changeType==="unhideSimpleFormField"){p.some(function(e,t){if(e===l){s=t;o.setVisible(e,false)}if(s>=0&&t>s){if(o.getControlType(e)==="sap.m.Label"||o.getControlType(e)==="sap.ui.comp.smartfield.SmartLabel"||o.getControlType(e)==="sap.ui.core.Title"||o.getControlType(e)==="sap.m.Title"||o.getControlType(e)==="sap.m.Toolbar"||o.getControlType(e)==="sap.m.OverflowToolbar"){return true}else{o.setVisible(e,false)}}});e.resetRevertData()}return true};return t},true);