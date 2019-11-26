/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/Device","sap/ui/core/LocaleData","sap/ui/core/delegate/ItemNavigation","sap/ui/unified/library","sap/ui/core/Locale","./MonthPickerRenderer","sap/ui/thirdparty/jquery"],function(t,e,a,i,s,o,n,r){"use strict";var h=t.extend("sap.ui.unified.calendar.MonthPicker",{metadata:{library:"sap.ui.unified",properties:{month:{type:"int",group:"Data",defaultValue:0},months:{type:"int",group:"Appearance",defaultValue:12},columns:{type:"int",group:"Appearance",defaultValue:3},primaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"}},events:{select:{},pageChange:{}}}});h.prototype.init=function(){var t=sap.ui.getCore().getConfiguration().getCalendarType();this.setProperty("primaryCalendarType",t);this._iMinMonth=0;this._iMaxMonth=11};h.prototype.onAfterRendering=function(){l.call(this);p.call(this)};h.prototype.setMonth=function(t){this.setProperty("month",t,true);t=this.getProperty("month");if(t<0||t>11){throw new Error("Property month must be between 0 and 11; "+this)}if(this.getDomRef()){if(this.getMonths()<12){var e=this.getStartMonth();if(t>=e&&t<=e+this.getMonths()-1){v.call(this,t,true);this._oItemNavigation.focusItem(t-e)}else{d.call(this,t)}}else{v.call(this,t,true);this._oItemNavigation.focusItem(t)}}return this};h.prototype._getLocale=function(){var t=this.getParent();if(t&&t._getLocale){return t._getLocale()}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()}return this._sLocale};h.prototype._getLocaleData=function(){var t=this.getParent();if(t&&t._getLocaleData){return t._getLocaleData()}else if(!this._oLocaleData){var e=this._getLocale();var i=new o(e);this._oLocaleData=a.getInstance(i)}return this._oLocaleData};h.prototype.onsapspace=function(t){t.preventDefault()};h.prototype.onsapselect=function(t){var e=this._oItemNavigation.getFocusedIndex();var a=e+this.getStartMonth();if(a>=this._iMinMonth&&a<=this._iMaxMonth){v.call(this,a);this.fireSelect()}};h.prototype.onmousedown=function(t){this._oMousedownPosition={clientX:t.clientX,clientY:t.clientY}};h.prototype.onmouseup=function(t){if(this._bMousedownChange){this._bMousedownChange=false;this.fireSelect()}else if(e.support.touch&&this._isValueInThreshold(this._oMousedownPosition.clientX,t.clientX,10)&&this._isValueInThreshold(this._oMousedownPosition.clientY,t.clientY,10)){var a=this._oItemNavigation.getFocusedIndex();var i=a+this.getStartMonth();v.call(this,i);this.fireSelect()}};h.prototype.onThemeChanged=function(){if(this._bNoThemeChange){return}if(!this.getDomRef()){return}this._bNamesLengthChecked=undefined;var t=this._oItemNavigation.getItemDomRefs();this._bLongMonth=false;var e=this._getLocaleData();var a=e.getMonthsStandAlone("wide",this.getPrimaryCalendarType());for(var i=0;i<t.length;i++){var s=r(t[i]);s.text(a[i])}p.call(this)};h.prototype.nextPage=function(){var t=this.getStartMonth();var e=this._oItemNavigation.getFocusedIndex();var a=e+t;var i=this.getMonths();a=a+i;if(a>11){a=11}d.call(this,a);return this};h.prototype.previousPage=function(){var t=this.getStartMonth();var e=this._oItemNavigation.getFocusedIndex();var a=e+t;var i=this.getMonths();a=a-i;if(a<0){a=0}d.call(this,a);return this};h.prototype.setMinMax=function(t,e){if(t==this._iMinMonth&&e==this._iMaxMonth){return this}t=parseInt(t);if(isNaN(t)||t<0||t>11){t=0}e=parseInt(e);if(isNaN(e)||e<0||e>11){e=11}if(t<=e){this._iMinMonth=t;this._iMaxMonth=e}else{this._iMaxMonth=t;this._iMinMonth=e}if(this.getDomRef()){var a=this._oItemNavigation.getItemDomRefs();var i=this.getId().length+2;for(var s=0;s<a.length;s++){var o=r(a[s]);var n=parseInt(o.attr("id").slice(i));if(n<this._iMinMonth||n>this._iMaxMonth){o.addClass("sapUiCalItemDsbl");o.attr("aria-disabled",true)}else{o.removeClass("sapUiCalItemDsbl");o.removeAttr("aria-disabled")}}}return this};h.prototype.getStartMonth=function(){if(this.getMonths()<12){var t=this._oItemNavigation.getItemDomRefs()[0];return parseInt(t.id.slice(this.getId().length+2))}else{return 0}};h.prototype._isValueInThreshold=function(t,e,a){var i=t-a,s=t+a;return e>=i&&e<=s};h.prototype.ontouchstart=function(t){if(!e.system.desktop&&t.target.classList.contains("sapUiCalItem")){t.target.classList.add("sapUiCalItemSel")}};function l(){var t=this.getDomRef();var e=this.$().find(".sapUiCalItem");var a=this.getColumns();var s=this.getMonths();var o=true;if(s<12){o=false}if(!this._oItemNavigation){this._oItemNavigation=new i;this._oItemNavigation.attachEvent(i.Events.AfterFocus,g,this);this._oItemNavigation.attachEvent(i.Events.FocusAgain,u,this);this._oItemNavigation.attachEvent(i.Events.BorderReached,c,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setHomeEndColumnMode(true,true);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]})}this._oItemNavigation.setRootDomRef(t);this._oItemNavigation.setItemDomRefs(e);this._oItemNavigation.setCycling(o);this._oItemNavigation.setColumns(a,true);var n=this.getMonth()-this.getStartMonth();this._oItemNavigation.setFocusedIndex(n);this._oItemNavigation.setPageSize(e.length)}function g(t){var e=t.getParameter("index");var a=t.getParameter("event");if(!a){return}if(a.type=="mousedown"){f.call(this,a,e)}}function u(t){var e=t.getParameter("index");var a=t.getParameter("event");if(!a){return}if(a.type=="mousedown"){f.call(this,a,e)}}function f(t,a){if(t.button||e.support.touch){return}var i=a+this.getStartMonth();if(i>=this._iMinMonth&&i<=this._iMaxMonth){v.call(this,i);this._bMousedownChange=true}t.preventDefault();t.setMark("cancelAutoClose")}function c(t){var e=t.getParameter("event");if(e.type){var a=this.getStartMonth();var i=this._oItemNavigation.getFocusedIndex();var s=i+a;var o=this.getMonths();switch(e.type){case"sapnext":case"sapnextmodifiers":if(s<11){s++;d.call(this,s,true)}break;case"sapprevious":case"sappreviousmodifiers":if(s>0){s--;d.call(this,s,true)}break;case"sappagedown":if(s<12-o){s=s+o;d.call(this,s,true)}else if(o===12){this.firePageChange({offset:1})}break;case"sappageup":if(s>o){s=s-o;d.call(this,s,true)}else if(o===12){this.firePageChange({offset:-1})}break;default:break}}}function v(t,e){var a=this._oItemNavigation.getItemDomRefs();var i;var s=this.getId()+"-m"+t;for(var o=0;o<a.length;o++){i=r(a[o]);if(i.attr("id")==s){i.addClass("sapUiCalItemSel");i.attr("aria-selected","true")}else{i.removeClass("sapUiCalItemSel");i.attr("aria-selected","false")}}if(!e){this.setProperty("month",t,true)}}function p(){if(!this._bNamesLengthChecked){var t=0;var e=this._oItemNavigation.getItemDomRefs();var a=false;var i=this.getMonths();var s=Math.ceil(12/i);var o=i-1;for(var n=0;n<s;n++){if(i<12){d.call(this,o);o=o+i;if(o>11){o=11}}for(t=0;t<e.length;t++){var h=e[t];if(Math.abs(h.clientWidth-h.scrollWidth)>1){a=true;break}}if(a){break}}if(i<12){o=this.getMonth();d.call(this,o)}if(a){this._bLongMonth=false;var l=this._getLocaleData();var g=this.getPrimaryCalendarType();var u=l.getMonthsStandAlone("abbreviated",g);var f=l.getMonthsStandAlone("wide",g);for(t=0;t<e.length;t++){var c=r(e[t]);c.text(u[t]);c.attr("aria-label",f[t])}}else{this._bLongMonth=true}this._bNamesLengthChecked=true}}function d(t,e){var a=this._oItemNavigation.getItemDomRefs();if(a.length>11){return}var i=a.length;var s=Math.floor(t/i)*i;if(s+i>12){s=12-i}var o=this._getLocaleData();var n=[];var h=[];var l=this.getPrimaryCalendarType();if(this._bLongMonth||!this._bNamesLengthChecked){n=o.getMonthsStandAlone("wide",l)}else{n=o.getMonthsStandAlone("abbreviated",l);h=o.getMonthsStandAlone("wide",l)}var g=this.getMonth();for(var u=0;u<a.length;u++){var f=u+s;var c=r(a[u]);c.text(n[u+s]);c.attr("id",this.getId()+"-m"+(u+s));if(!this._bLongMonth){c.attr("aria-label",h[u+s])}if(f==g){c.addClass("sapUiCalItemSel");c.attr("aria-selected","true")}else{c.removeClass("sapUiCalItemSel");c.attr("aria-selected","false")}if(f<this._iMinMonth||f>this._iMaxMonth){c.addClass("sapUiCalItemDsbl");c.attr("aria-disabled",true)}else{c.removeClass("sapUiCalItemDsbl");c.removeAttr("aria-disabled")}}this._oItemNavigation.focusItem(t-s);if(e){this.firePageChange()}}return h});