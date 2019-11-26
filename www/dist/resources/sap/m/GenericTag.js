/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/events/KeyCodes","./library","sap/ui/core/library","sap/ui/core/Icon","./GenericTagRenderer"],function(e,t,o,r,i){"use strict";var n=o.GenericTagDesign,a=o.GenericTagValueState,s=r.ValueState,c={Error:"sap-icon://message-error",Warning:"sap-icon://message-warning",Success:"sap-icon://message-success",Information:"sap-icon://hint"};var l=e.extend("sap.m.GenericTag",{metadata:{library:"sap.m",interfaces:["sap.m.IOverflowToolbarContent","sap.m.IOverflowToolbarFlexibleContent"],properties:{text:{type:"string",defaultValue:""},status:{type:"sap.ui.core.ValueState",defaultValue:s.None},design:{type:"sap.m.GenericTagDesign",defaultValue:n.Full},valueState:{type:"sap.m.GenericTagValueState",defaultValue:a.None}},defaultAggregation:"value",aggregations:{value:{type:"sap.m.ObjectNumber",multiple:false},_statusIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_errorIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{press:{}}}});l.CLASSNAME_OVERFLOW_TOOLBAR="sapMGenericTagOverflowToolbar";l.prototype.setStatus=function(e){this.setProperty("status",e,false);this._getStatusIcon().setSrc(e!==s.None?c[e]:null);return this};l.prototype._getStatusIcon=function(){var e=this.getAggregation("_statusIcon");if(!e){e=new i(this.getId()+"-statusIcon").addStyleClass("sapMGenericTagIcon");this.setAggregation("_statusIcon",e)}return e};l.prototype._getErrorIcon=function(){var e=this.getAggregation("_errorIcon");if(!e){e=new i(this.getId()+"-errorIcon",{src:c[s.Error]}).addStyleClass("sapMGenericTagErrorIcon");this.setAggregation("_errorIcon",e)}return e};l.prototype.ontouchstart=function(){this._toggleActiveGenericTag(true)};l.prototype.ontouchend=function(){this._toggleActiveGenericTag(false)};l.prototype.ontouchcancel=function(){this._toggleActiveGenericTag(false)};l.prototype.onkeydown=function(e){if(e.which===t.SPACE||e.which===t.ENTER){this._toggleActiveGenericTag(true)}if(e.which===t.SPACE){e.preventDefault()}if(e.which===t.ENTER){this.firePress()}};l.prototype.onkeyup=function(e){if(e.which===t.SPACE||e.which===t.ENTER){this._toggleActiveGenericTag(false)}if(e.which===t.SPACE){this.firePress()}};l.prototype.onclick=function(){this.firePress()};l.prototype.onfocusout=function(){this._toggleActiveGenericTag(false)};l.prototype._toggleActiveGenericTag=function(e){this.toggleStyleClass("sapMGenericTagActive",e)};l.prototype._onBeforeEnterOverflow=function(e){e.addStyleClass(l.CLASSNAME_OVERFLOW_TOOLBAR)};l.prototype._onAfterExitOverflow=function(e){e.removeStyleClass(l.CLASSNAME_OVERFLOW_TOOLBAR)};l.prototype.getOverflowToolbarConfig=function(){var e={canOverflow:true};e.onBeforeEnterOverflow=this._onBeforeEnterOverflow;e.onAfterExitOverflow=this._onAfterExitOverflow;return e};return l});