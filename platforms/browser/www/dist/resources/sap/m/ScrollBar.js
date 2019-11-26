/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./ScrollBarRenderer"],function(o,t){"use strict";var l=o.extend("sap.m.ScrollBar",{metadata:{library:"sap.m",properties:{scrollPosition:{type:"int",group:"Behavior",defaultValue:0},contentSize:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null}},events:{scroll:{}}}});l.prototype.init=function(){this._onScrollHandler=this._onscroll.bind(this)};l.prototype.onBeforeRendering=function(){if(this._$ScrollRef&&this._$ScrollRef.length){this._$ScrollRef.off("scroll",this._onScrollHandler);this._$ScrollRef=null}};l.prototype.onAfterRendering=function(){this._$ScrollRef=this.$("sb");this._$ScrollRef.on("scroll",this._onScrollHandler);this._setScrollPosition(this.getScrollPosition())};l.prototype.onThemeChanged=function(){this.invalidate()};l.prototype.setScrollPosition=function(o){var t=Math.round(Math.max(o,0));this._setScrollPosition(t);return this.setProperty("scrollPosition",t,true)};l.prototype._onscroll=function(o){var t=Math.abs(Math.round(this._$ScrollRef.scrollTop()));this.setProperty("scrollPosition",t,true);this.fireScroll({pos:t});o.preventDefault();o.stopPropagation();return false};l.prototype._setScrollPosition=function(o){if(this._$ScrollRef&&this._$ScrollRef.length){this._$ScrollRef.scrollTop(o)}};return l});