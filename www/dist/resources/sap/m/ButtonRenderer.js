/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/library","sap/ui/core/IconPool","sap/m/library","sap/ui/core/InvisibleText"],function(e,t,n,s,a){"use strict";var i=s.ButtonType;var r=t.TextDirection;var c={apiVersion:2};c.render=function(t,s){var a=s.getType();var l=s.getEnabled();var p=s.getWidth();var d=s._getTooltip();var I=s._getText();var b=s.getTextDirection();var f=e.browser.internet_explorer||e.browser.edge;var u=b===r.Inherit&&!f;var g=n.getIconURI("nav-back");t.openStart("button",s);t.class("sapMBtnBase");if(!s._isUnstyled()){t.class("sapMBtn");if((a===i.Back||a===i.Up)&&s.getIcon()&&!I){t.class("sapMBtnBack")}}var B={};var v=s.getId()+"-tooltip";var T=c.getButtonTypeAriaLabelId(a);if(T&&d){B["describedby"]={value:v+" "+T,append:true}}else if(T){B["describedby"]={value:T,append:true}}else if(d){B["describedby"]={value:v,append:true}}if(s._determineSelfReferencePresence()){B["labelledby"]={value:s.getId()+"-content",append:true}}B["disabled"]=null;if(this.renderAccessibilityAttributes){this.renderAccessibilityAttributes(t,s,B)}t.accessibilityState(s,B);if(!l){t.attr("disabled","disabled");if(!s._isUnstyled()){t.class("sapMBtnDisabled")}}else{switch(a){case i.Accept:case i.Reject:case i.Emphasized:t.class("sapMBtnInverted");break;default:break}}if(d){t.attr("title",d)}if(p!=""||p.toLowerCase()==="auto"){t.style("width",p)}o(s,t);t.openEnd();t.openStart("span",s.getId()+"-inner");if(!s._isUnstyled()){t.class("sapMBtnInner")}if(s._isHoverable()){t.class("sapMBtnHoverable")}if(l){t.class("sapMFocusable");if(f){t.class("sapMIE")}}if(!s._isUnstyled()){if(I){t.class("sapMBtnText")}if(a===i.Back||a===i.Up){t.class("sapMBtnBack")}if(s.getIcon()){if(s.getIconFirst()){t.class("sapMBtnIconFirst")}else{t.class("sapMBtnIconLast")}}}if(this.renderButtonAttributes){this.renderButtonAttributes(t,s)}if(!s._isUnstyled()&&a!==""){t.class("sapMBtn"+a)}o(s,t);t.openEnd();if(a===i.Back||a===i.Up){this.writeInternalIconPoolHtml(t,s,g)}if(s.getIcon()){this.writeImgHtml(t,s)}if(I){t.openStart("span",s.getId()+"-content");t.class("sapMBtnContent");if(b!==r.Inherit){t.attr("dir",b.toLowerCase())}t.openEnd();if(u){t.openStart("bdi",s.getId()+"-BDI-content");t.openEnd()}t.text(I);if(u){t.close("bdi")}t.close("span")}if(f&&l){t.openStart("span");t.class("sapMBtnFocusDiv");t.openEnd();t.close("span")}t.close("span");if(d){t.openStart("span",v);t.class("sapUiInvisibleText");t.openEnd();t.text(d);t.close("span")}t.close("button")};c.writeImgHtml=function(e,t){e.renderControl(t._getImage(t.getId()+"-img",t.getIcon(),t.getActiveIcon(),t.getIconDensityAware()))};c.writeInternalIconPoolHtml=function(e,t,n){e.renderControl(t._getInternalIconBtn(t.getId()+"-iconBtn",n))};function o(e,t){if(e._bExcludeFromTabChain){t.attr("tabindex",-1)}}var l={Accept:"BUTTON_ARIA_TYPE_ACCEPT",Reject:"BUTTON_ARIA_TYPE_REJECT",Emphasized:"BUTTON_ARIA_TYPE_EMPHASIZED"};c.getButtonTypeAriaLabelId=function(e){return a.getStaticId("sap.m",l[e])};return c},true);