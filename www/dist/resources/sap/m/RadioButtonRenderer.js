/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ValueStateSupport","sap/ui/core/library","sap/ui/Device"],function(e,t,i){"use strict";var r=t.ValueState;var a={};a.render=function(e,t){this.addWOuterDivStyles(e,t);this.addInnerDivStyles(e,t);this.renderSvg(e,t);this.renderInput(e,t);this.closeDiv(e);e.renderControl(t._oLabel);this.renderTooltip(e,t);this.closeDiv(e)};a.addWOuterDivStyles=function(t,i){var a=i.getId(),s=i.getEnabled(),d=!i.getProperty("editableParent"),n=!i.getEditable()||d,l=r.Error===i.getValueState(),o=r.Warning===i.getValueState(),u=r.Success===i.getValueState(),c=r.Information===i.getValueState(),p=i.getUseEntireWidth();t.addClass("sapMRb");t.write("<div");t.writeControlData(i);if(p){t.addStyle("width",i.getWidth());t.writeStyles()}var b=e.enrichTooltip(i,i.getTooltip_AsString());if(b){t.writeAttributeEscaped("title",b)}t.writeAccessibilityState(i,{role:"radio",readonly:null,selected:null,checked:i.getSelected(),disabled:n?true:undefined,labelledby:{value:a+"-label",append:true},describedby:{value:b?a+"-Descr":undefined,append:true}});if(i.getSelected()){t.addClass("sapMRbSel")}if(!s){t.addClass("sapMRbDis")}if(n){t.addClass("sapMRbRo")}if(l){t.addClass("sapMRbErr")}if(o){t.addClass("sapMRbWarn")}if(u){t.addClass("sapMRbSucc")}if(c){t.addClass("sapMRbInfo")}t.writeClasses();if(s){t.writeAttribute("tabindex",i.hasOwnProperty("_iTabIndex")?i._iTabIndex:0)}t.write(">")};a.addInnerDivStyles=function(e,t){var r=this.isButtonReadOnly(t);e.write("<div ");e.addClass("sapMRbB");if(!r&&i.system.desktop){e.addClass("sapMRbHoverable")}e.writeClasses();e.write(">")};a.renderSvg=function(e,t){var i=t.getId();e.write("<svg xmlns='http://www.w3.org/2000/svg' version='1.0'");e.addClass("sapMRbSvg");e.writeClasses();e.writeAttribute("role","presentation");e.write(">");e.write('<circle stroke="black" r="50%" stroke-width="2" fill="none"');e.addClass("sapMRbBOut");e.writeAttribute("id",i+"-Button");e.writeClasses();e.write(">");e.write("</circle>");e.write('<circle r="22%" stroke-width="10"');e.addClass("sapMRbBInn");e.writeClasses();e.write(">");e.write("</circle>");e.write("</svg>")};a.renderInput=function(e,t){var i=t.getId(),r=this.isButtonReadOnly(t);e.write("<input type='radio' tabindex='-1'");e.writeAttribute("id",i+"-RB");e.writeAttributeEscaped("name",t.getGroupName());if(t.getSelected()){e.writeAttribute("checked","checked")}if(r){e.writeAttribute("readonly","readonly");e.writeAttribute("disabled","disabled")}e.write(" />")};a.renderTooltip=function(t,i){var r=i.getId(),a=e.enrichTooltip(i,i.getTooltip_AsString());if(a&&sap.ui.getCore().getConfiguration().getAccessibility()){t.write('<span id="'+r+'-Descr" style="display: none;">');t.writeEscaped(a);t.write("</span>")}};a.isButtonReadOnly=function(e){var t=e.getEnabled(),i=!e.getProperty("editableParent"),r=!e.getEditable()||i;return!t||r};a.closeDiv=function(e){e.write("</div>")};return a},true);