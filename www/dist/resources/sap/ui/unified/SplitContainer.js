/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/theming/Parameters","./library","sap/ui/core/library","./SplitContainerRenderer","sap/base/Log"],function(t,e,n,o,r,i){"use strict";var a=o.Orientation;var s=t.extend("sap.ui.unified.SplitContainer",{metadata:{library:"sap.ui.unified",properties:{showSecondaryContent:{type:"boolean",group:"Appearance",defaultValue:null},secondaryContentSize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"250px"},secondaryContentWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"250px",deprecated:true},orientation:{type:"sap.ui.core.Orientation",group:"Appearance",defaultValue:a.Horizontal}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},secondaryContent:{type:"sap.ui.core.Control",multiple:true,singularName:"secondaryContent"}}}});(function(t){s.prototype.init=function(){this.bRtl=sap.ui.getCore().getConfiguration().getRTL();this._paneRenderer=new n._ContentRenderer(this,this.getId()+"-panecntnt","secondaryContent");this._canvasRenderer=new n._ContentRenderer(this,this.getId()+"-canvascntnt","content");this._moveContent=true};s.prototype.exit=function(){this._paneRenderer.destroy();delete this._paneRenderer;this._canvasRenderer.destroy();delete this._canvasRenderer;if(this._closeContentDelayId){clearTimeout(this._closeContentDelayId);delete this._closeContentDelayId}delete this._contentContainer;delete this._secondaryContentContainer};s.prototype.onAfterRendering=function(){this.bRtl=sap.ui.getCore().getConfiguration().getRTL();this._contentContainer=this.$("canvas");this._secondaryContentContainer=this.$("pane");this._applySecondaryContentSize()};s.prototype._applySecondaryContentSize=function(){if(this.getDomRef()){var t=this.getOrientation()==a.Vertical;var n,o;var r,i;var s=this.getSecondaryContentSize();var d=this.getShowSecondaryContent();if(t){n="height";o="width";r="top";i=this.bRtl?"right":"left"}else{n="width";o="height";r=this.bRtl?"right":"left";i="top"}if(this._closeContentDelayId){clearTimeout(this._closeContentDelayId);delete this._closeContentDelayId}this._secondaryContentContainer.css(n,s);this._secondaryContentContainer.css(o,"");this._secondaryContentContainer.css(r,d?"0":"-"+s);this._secondaryContentContainer.css(i,"");if(this._moveContent){this._contentContainer.css(r,d?s:"0")}else{this._contentContainer.css(r,"0")}if(!d){var c=parseInt(e.get("_sap_ui_unified_SplitContainer_AnimationDuration"));this._closeContentDelayId=setTimeout(function(){this._secondaryContentContainer.toggleClass("sapUiUfdSplitContSecondClosed",true)}.bind(this),c)}else{this._secondaryContentContainer.toggleClass("sapUiUfdSplitContSecondClosed",false)}}};s.prototype._mod=function(t,e){var n=!!this.getDomRef();var o=t.apply(this,[n]);if(n&&e){e.render()}return o};s.prototype.setShowSecondaryContent=function(t){var e=this.getDomRef();this.setProperty("showSecondaryContent",!!t,e);this._applySecondaryContentSize();return this};s.prototype.setSecondaryContentSize=function(t){this.setProperty("secondaryContentSize",t,true);this._applySecondaryContentSize();return this};s.prototype.getSecondaryContentWidth=function(){i.warning('SplitContainer: Use of deprecated property "SecondaryContentWidth", please use '+'"SecondaryContentSize" instead.');return this.getSecondaryContentSize.apply(this,arguments)};s.prototype.setSecondaryContentWidth=function(){i.warning('SplitContainer: Use of deprecated property "SecondaryContentWidth", please use '+'"SecondaryContentSize" instead.');return this.setSecondaryContentSize.apply(this,arguments)};s.prototype.insertContent=function(t,e){return this._mod(function(n){return this.insertAggregation("content",t,e,n)},this._canvasRenderer)};s.prototype.addContent=function(t){return this._mod(function(e){return this.addAggregation("content",t,e)},this._canvasRenderer)};s.prototype.removeContent=function(t){return this._mod(function(e){return this.removeAggregation("content",t,e)},this._canvasRenderer)};s.prototype.removeAllContent=function(){return this._mod(function(t){return this.removeAllAggregation("content",t)},this._canvasRenderer)};s.prototype.destroyContent=function(){return this._mod(function(t){return this.destroyAggregation("content",t)},this._canvasRenderer)};s.prototype.insertSecondaryContent=function(t,e){return this._mod(function(n){return this.insertAggregation("secondaryContent",t,e,n)},this._paneRenderer)};s.prototype.addSecondaryContent=function(t){return this._mod(function(e){return this.addAggregation("secondaryContent",t,e)},this._paneRenderer)};s.prototype.removeSecondaryContent=function(t){return this._mod(function(e){return this.removeAggregation("secondaryContent",t,e)},this._paneRenderer)};s.prototype.removeAllSecondaryContent=function(){return this._mod(function(t){return this.removeAllAggregation("secondaryContent",t)},this._paneRenderer)};s.prototype.destroySecondaryContent=function(){return this._mod(function(t){return this.destroyAggregation("secondaryContent",t)},this._paneRenderer)}})(window);return s});