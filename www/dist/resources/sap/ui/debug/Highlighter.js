/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define("sap/ui/debug/Highlighter",["sap/ui/thirdparty/jquery","sap/base/util/uid","sap/ui/dom/jquery/rect"],function(t,i){"use strict";var e=function(t,e,s,r){this.sId=t||i();this.bFilled=e==true;this.sColor=s||"blue";if(isNaN(r)){this.iBorderWidth=2}else if(r<=0){this.iBorderWidth=0}else{this.iBorderWidth=r}};e.prototype.highlight=function(i){if(!i||!i.parentNode){return}var e=this.sId?window.document.getElementById(this.sId):null;if(!e){e=i.ownerDocument.createElement("DIV");e.setAttribute("id",this.sId);e.style.position="absolute";e.style.border=this.iBorderWidth+"px solid "+this.sColor;e.style.display="none";e.style.margin="0px";e.style.padding="0px";if(this.bFilled){e.innerHTML="<div style='background-color:"+this.sColor+";opacity:0.2;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=20);height:100%;width:100%'>&nbsp;</div>"}i.ownerDocument.body.appendChild(e)}var s=t(i).rect();e.style.top=s.top-this.iBorderWidth+"px";e.style.left=s.left-this.iBorderWidth+"px";e.style.width=s.width+"px";e.style.height=s.height+"px";e.style.display="block"};e.prototype.hide=function(){var t=this.sId?window.document.getElementById(this.sId):null;if(!t){return}t.style.display="none"};return e},true);