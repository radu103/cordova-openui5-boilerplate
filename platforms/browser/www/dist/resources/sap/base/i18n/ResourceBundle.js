/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/Log","sap/base/strings/formatMessage","sap/base/util/Properties"],function(e,r,t,n){"use strict";var i=/^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;var s={he:"iw",yi:"ji",id:"in",sr:"sh",nb:"no"};var o={iw:"he",ji:"yi",in:"id",sh:"sr",no:"nb"};var u={en_US_saptrc:"1Q",en_US_sappsd:"2Q"};var a=/(?:^|-)(saptrc|sappsd)(?:-|$)/i;function l(e){var r;if(typeof e==="string"&&(r=i.exec(e.replace(/_/g,"-")))){var t=r[1].toLowerCase();t=s[t]||t;var n=r[2]?r[2].toLowerCase():undefined;var o=r[3]?r[3].toUpperCase():undefined;var u=r[4]?r[4].slice(1):undefined;var l=r[6];if(l&&(r=a.exec(l))||u&&(r=a.exec(u))){return"en_US_"+r[1].toLowerCase()}if(t==="zh"&&!o){if(n==="hans"){o="CN"}else if(n==="hant"){o="TW"}}return t+(o?"_"+o+(u?"_"+u.replace("-","_"):""):"")}}function f(){var e;if(window.sap&&window.sap.ui&&sap.ui.getCore){e=sap.ui.getCore().getConfiguration().getLanguage();e=l(e)}return e||"en"}function c(e){if(!e){return null}if(e==="zh_HK"){return"zh_TW"}var r=e.lastIndexOf("_");if(r>=0){return e.slice(0,r)}return e!=="en"?"en":""}function p(e){var r;if(typeof e==="string"&&(r=i.exec(e.replace(/_/g,"-")))){var t=r[1].toLowerCase();t=o[t]||t;return t+(r[3]?"-"+r[3].toUpperCase()+(r[4]?"-"+r[4].slice(1).replace("_","-"):""):"")}}var h=/^((?:[^?#]*\/)?[^\/?#]*)(\.[^.\/?#]+)((?:\?([^#]*))?(?:#(.*))?)$/;var g=[".properties",".hdbtextbundle"];function d(e){var r=h.exec(e);if(!r||g.indexOf(r[2])<0){throw new Error("resource URL '"+e+"' has unknown type (should be one of "+g.join(",")+")")}return{url:e,prefix:r[1],ext:r[2],query:r[4],hash:r[5]||"",suffix:r[2]+(r[3]||"")}}function _(e,r,t,n){this.sLocale=this._sNextLocale=l(r)||f();this.oUrlInfo=d(e);this.bIncludeInfo=t;this.aCustomBundles=[];this.aPropertyFiles=[];this.aLocales=[];if(n){var i=function(){return this}.bind(this);return x(this).then(i,i)}y(this)}_.prototype._enhance=function(e){if(e instanceof _){this.aCustomBundles.push(e)}else{r.error("Custom resource bundle is either undefined or not an instanceof sap/base/i18n/ResourceBundle. Therefore this custom resource bundle will be ignored!")}};_.prototype.getText=function(r,t,n){var i=this._getTextFromProperties(r,t);if(i!=null){return i}i=this._getTextFromFallback(r,t);if(i!=null){return i}e(false,"could not find any translatable text for key '"+r+"' in bundle '"+this.oUrlInfo.url+"'");if(n){return undefined}else{return this._formatValue(r,r,t)}};_.prototype._formatValue=function(e,r,n){if(typeof e==="string"){if(n){e=t(e,n)}if(this.bIncludeInfo){e=new String(e);e.originInfo={source:"Resource Bundle",url:this.oUrlInfo.url,locale:this.sLocale,key:r}}}return e};_.prototype._getTextFromFallback=function(e,r){var t,n;for(n=this.aCustomBundles.length-1;n>=0;n--){t=this.aCustomBundles[n]._getTextFromFallback(e,r);if(t!=null){return t}}while(typeof t!=="string"&&this._sNextLocale!=null){var i=y(this);if(i){t=i.getProperty(e);if(typeof t==="string"){return this._formatValue(t,e,r)}}}return null};_.prototype._getTextFromProperties=function(e,r){var t=null,n;for(n=this.aCustomBundles.length-1;n>=0;n--){t=this.aCustomBundles[n]._getTextFromProperties(e,r);if(t!=null){return t}}for(n=0;n<this.aPropertyFiles.length;n++){t=this.aPropertyFiles[n].getProperty(e);if(typeof t==="string"){return this._formatValue(t,e,r)}}return null};_.prototype.hasText=function(e){return this.aPropertyFiles.length>0&&typeof this.aPropertyFiles[0].getProperty(e)==="string"};function x(e){if(e._sNextLocale!=null){return b(e,true).then(function(r){return r||x(e)})}return Promise.resolve(null)}function y(e){while(e._sNextLocale!=null){var r=b(e,false);if(r){return r}}return null}function v(e,r){return!r||r.length===0||r.indexOf(e)>=0}function b(e,r){var t=e._sNextLocale;e._sNextLocale=c(t);var i=window.sap&&window.sap.ui&&sap.ui.getCore&&sap.ui.getCore().getConfiguration().getSupportedLanguages();if(t!=null&&v(t,i)){var s=e.oUrlInfo,o,a;if(s.ext===".hdbtextbundle"){if(u[t]){o=s.prefix+s.suffix+"?"+(s.query?s.query+"&":"")+"sap-language="+u[t]+(s.hash?"#"+s.hash:"")}else{o=s.url}a={"Accept-Language":p(t)||""}}else{o=s.prefix+(t?"_"+t:"")+s.suffix}var l=n.create({url:o,headers:a,async:!!r,returnNullIfMissing:true});var f=function(r){if(r){e.aPropertyFiles.push(r);e.aLocales.push(t)}return r};return r?l.then(f):f(l)}return r?Promise.resolve(null):null}_.create=function(e){e=Object.assign({url:"",locale:undefined,includeInfo:false},e);return new _(e.url,e.locale,e.includeInfo,!!e.async)};_._getFallbackLocales=function(e,r){var t=l(e),n=[];while(t!=null){if(v(t,r)){n.push(t)}t=c(t)}return n};return _});