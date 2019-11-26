/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/library","sap/ui/Device"],function(e,t,n){"use strict";var i=t.TextDirection;var a=t.ValueState;var s={apiVersion:2};s.render=function(t,s){var r=s.getValueState(),l=s.getTextDirection(),d=e.getTextAlign(s.getTextAlign(),l),o=sap.ui.getCore().getConfiguration().getAccessibility(),u=s.getAggregation("_beginIcon")||[],c=s.getAggregation("_endIcon")||[],g,p;t.openStart("div",s);this.addOuterStyles(t,s);this.addControlWidth(t,s);t.class("sapMInputBase");this.addPaddingClass(t,s);this.addCursorClass(t,s);this.addOuterClasses(t,s);if(!s.getEnabled()){t.class("sapMInputBaseDisabled")}if(!s.getEditable()){t.class("sapMInputBaseReadonly")}if(r!==a.None){t.class("sapMInputBaseState")}if(u.length){g=u.filter(function(e){return e.getVisible()});g.length&&t.class("sapMInputBaseHasBeginIcons")}if(c.length){p=c.filter(function(e){return e.getVisible()});p.length&&t.class("sapMInputBaseHasEndIcons")}this.writeOuterAttributes(t,s);var f=s.getTooltip_AsString();if(f){t.attr("title",f)}t.openEnd();t.openStart("div",s.getId()+"-content");t.class("sapMInputBaseContentWrapper");if(!s.getEnabled()){t.class("sapMInputBaseDisabledWrapper")}else if(!s.getEditable()){t.class("sapMInputBaseReadonlyWrapper")}if(r!==a.None){this.addValueStateClasses(t,s)}this.writeAccAttributes(t,s);this.addWrapperStyles(t,s);t.openEnd();if(u.length){this.writeIcons(t,u)}this.prependInnerContent(t,s);this.openInputTag(t,s);if(s.getName()){t.attr("name",s.getName())}if(!s.bShowLabelAsPlaceholder&&s._getPlaceholder()){t.attr("placeholder",s._getPlaceholder())}if(s.getMaxLength&&s.getMaxLength()>0){t.attr("maxlength",s.getMaxLength())}if(!s.getEnabled()){t.attr("disabled","disabled")}else if(!s.getEditable()){t.attr("readonly","readonly")}if(s.getRequired()){t.attr("required","required")}if(l!=i.Inherit){t.attr("dir",l.toLowerCase())}this.writeInnerValue(t,s);if(o){this.writeAccessibilityState(t,s)}if(n.browser.mozilla){if(f){t.attr("x-moz-errormessage",f)}else{t.attr("x-moz-errormessage"," ")}}this.writeInnerAttributes(t,s);t.class("sapMInputBaseInner");this.addInnerClasses(t,s);t.style("text-align",d);this.addInnerStyles(t,s);this.endInputTag(t,s);this.writeInnerContent(t,s);this.closeInputTag(t,s);if(c.length){this.writeIcons(t,c)}t.close("div");this.writeDecorations(t,s);if(o){this.renderAriaLabelledBy(t,s);this.renderAriaDescribedBy(t,s)}t.close("div")};s.getAriaRole=function(e){return"textbox"};s.getAriaLabelledBy=function(e){if(this.getLabelledByAnnouncement(e)){return e.getId()+"-labelledby"}};s.getLabelledByAnnouncement=function(e){return""};s.renderAriaLabelledBy=function(e,t){var n=this.getLabelledByAnnouncement(t);if(n){e.openStart("span",t.getId()+"-labelledby");e.attr("aria-hidden","true");e.class("sapUiInvisibleText");e.openEnd();e.text(n.trim());e.close("span")}};s.getAriaDescribedBy=function(e){if(this.getDescribedByAnnouncement(e)){return e.getId()+"-describedby"}};s.getDescribedByAnnouncement=function(e){return""};s.renderAriaDescribedBy=function(e,t){var n=this.getDescribedByAnnouncement(t);if(n){e.openStart("span",t.getId()+"-describedby");e.attr("aria-hidden","true");e.class("sapUiInvisibleText");e.openEnd();e.text(n.trim());e.close("span")}};s.getAccessibilityState=function(e){var t=this.getAriaLabelledBy(e),n=this.getAriaDescribedBy(e),i=this.getAriaRole(e),s={};if(i){s.role=i}if(e.getValueState()===a.Error){s.invalid=true}if(t){s.labelledby={value:t.trim(),append:true}}if(n){s.describedby={value:n.trim(),append:true}}s.disabled=null;s.readonly=null;s.required=null;return s};s.writeAccessibilityState=function(e,t){e.accessibilityState(t,this.getAccessibilityState(t))};s.openInputTag=function(e,t){e.voidStart("input",t.getId()+"-"+this.getInnerSuffix())};s.endInputTag=function(e,t){e.voidEnd()};s.writeInnerValue=function(e,t){e.attr("value",t.getValue())};s.addCursorClass=function(e,t){};s.addPaddingClass=function(e,t){e.class("sapMInputBaseHeightMargin")};s.addOuterStyles=function(e,t){};s.addControlWidth=function(e,t){if(!t.getProperty("width")){e.class("sapMInputBaseNoWidth")}e.style("width",t.getWidth())};s.addOuterClasses=function(e,t){};s.writeOuterAttributes=function(e,t){};s.writeAccAttributes=function(e,t){};s.addInnerStyles=function(e,t){};s.addWrapperStyles=function(e,t){e.style("width","100%")};s.addInnerClasses=function(e,t){};s.writeInnerAttributes=function(e,t){};s.prependInnerContent=function(e,t){};s.writeInnerContent=function(e,t){};s.writeIcons=function(e,t){e.openStart("div");e.attr("tabindex","-1");e.class("sapMInputBaseIconContainer");e.openEnd();t.forEach(e.renderControl,e);e.close("div")};s.writeDecorations=function(e,t){};s.closeInputTag=function(e,t){};s.addPlaceholderStyles=function(e,t){};s.addPlaceholderClasses=function(e,t){};s.addValueStateClasses=function(e,t){e.class("sapMInputBaseContentWrapperState");e.class("sapMInputBaseContentWrapper"+t.getValueState())};s.getInnerSuffix=function(){return"inner"};return s},true);