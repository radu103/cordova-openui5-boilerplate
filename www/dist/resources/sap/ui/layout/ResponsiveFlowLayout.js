/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./ResponsiveFlowLayoutData","./library","sap/ui/core/ResizeHandler","sap/ui/Device","./ResponsiveFlowLayoutRenderer","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/rect"],function(t,e,i,r,n,o,a){"use strict";var s=t.extend("sap.ui.layout.ResponsiveFlowLayout",{metadata:{library:"sap.ui.layout",properties:{responsive:{type:"boolean",group:"Misc",defaultValue:true}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});(function(){s.prototype.init=function(){this._rows=[];this._bIsRegistered=false;this._proxyComputeWidths=a.proxy(l,this);this._iRowCounter=0};s.prototype.exit=function(){delete this._rows;if(this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}if(this._resizeHandlerComputeWidthsID){r.deregister(this._resizeHandlerComputeWidthsID)}delete this._resizeHandlerComputeWidthsID;delete this._proxyComputeWidths;if(this.oRm){this.oRm.destroy();delete this.oRm}delete this._$DomRef;delete this._oDomRef;delete this._iRowCounter};var t=function(t){var i=t.getContent();var r=[];var n=-1;var o={},a={};var s="";var h;var l=0,u=0,f=0;var g=false,p=false,c=false;for(var v=0;v<i.length;v++){l=e.MIN_WIDTH;u=e.WEIGHT;g=e.LINEBREAK;p=e.MARGIN;c=e.LINEBREAKABLE;h=d(i[v]);if(h instanceof e){g=h.getLinebreak();l=h.getMinWidth();u=h.getWeight();p=h.getMargin();c=h.getLinebreakable()}if(n<0||g){n++;r.push({height:-1,cont:[]})}f=r[n].cont.length;s=i[v].getId()+"-cont"+n+"_"+f;o={minWidth:l,weight:u,linebreakable:c,padding:p,control:i[v],id:s,breakWith:[]};var m=false;if(!c){for(var C=f;C>0;C--){a=r[n].cont[C-1];if(a.linebreakable){a.breakWith.push(o);m=true;break}}}if(!m){r[n].cont.push(o)}}t._rows=r};var i=function(t,e,i){var r=[];var n=1e7;var o=-1;var s=function(e){var i=a(document.getElementById(t.cont[e].id));if(i.length>0){var s=i[0].offsetLeft;if(n>=s){r.push({cont:[]});o++}n=s;r[o].cont.push(t.cont[e])}};if(sap.ui.getCore().getConfiguration().getRTL()){for(var h=t.cont.length-1;h>=0;h--){s(h)}}else{for(var h=0;h<t.cont.length;h++){s(h)}}return r};var o=function(t,e){var i=[];var r=-1;var n=0;var o=0;var a=0;var s=0,h=0;var l=0,d=0;for(l=0;l<t.cont.length;l++){n=0;o=0;for(d=a;d<=l;d++){o=o+t.cont[d].weight}for(d=a;d<=l;d++){s=e/o*t.cont[d].weight;s=Math.floor(s);h=t.cont[d].minWidth;n+=Math.max(s,h)}if(r==-1||n>e){i.push({cont:[]});if(r!==-1){a=l}r++}i[r].cont.push(t.cont[l])}return i};var h=function(t,e){if(t.length!=e.length){return true}for(var i=0;i<t.length;i++){if(t[i].cont.length!=e[i].cont.length){return true}}return false};s.prototype.renderContent=function(t,e){var i=t,r=0,n=[],o=0,a=0,s=0,h=0,l=0,d=0,u,f=0,g=0,p=[],c=[],v=this.getId(),m="",C=this._getRenderManager();for(o=0;o<i.length;o++){d=0;n.length=0;r=100;c.length=0;c.push("sapUiRFLRow");if(i[o].cont.length<=1){c.push("sapUiRFLCompleteRow")}var _=v+"-row"+this._iRowCounter;var w={};C.writeHeader(_,w,c);l=0;for(a=0;a<i[o].cont.length;a++){l+=i[o].cont[a].weight}for(s=0;s<i[o].cont.length;s++){u=i[o].cont[s];f=0;g=0;if(u.breakWith.length>0){f=u.weight;g=u.minWidth;for(var R=0;R<u.breakWith.length;R++){f+=u.breakWith[R].weight;g+=u.breakWith[R].minWidth}}m=i[o].cont[s].id;c.length=0;w={"min-width":u.breakWith.length>0?g:u.minWidth};d=100/l*u.weight;var y=w["min-width"]/e*100;var W=Math.ceil(y);var D=Math.floor(d);if(D!==100&&W>D){d=W}else{d=D}d=r<d?r:d;r-=d;n.push(d);if(r>0&&s===i[o].cont.length-1){d+=r}c.push("sapUiRFLContainer");w["width"]=d+"%";w["min-width"]=w["min-width"]+"px";C.writeHeader(m,w,c);c.length=0;c.push("sapUiRFLContainerContent");if(u.breakWith.length>0){c.push("sapUiRFLMultiContainerContent")}if(u.padding){c.push("sapUiRFLPaddingClass")}var I=this._addContentClass(u.control,s);if(I){c.push(I)}w={};C.writeHeader("",w,c);if(u.breakWith.length>0){m=i[o].cont[s].id+"-multi0";c.length=0;w={"min-width":g+"px"};var L=100/f*u.weight;L=Math.floor(L);p.push(L);c.push("sapUiRFLMultiContent");w["width"]=L+"%";if(i[o].cont[s].padding){c.push("sapUiRFLPaddingClass")}C.writeHeader(m,w,c);var b=L;C.renderControl(u.control);C.write("</div>");for(h=0;h<u.breakWith.length;h++){m=u.breakWith[h].id+"-multi"+(h+1);c.length=0;w={"min-width":u.breakWith[h].minWidth+"px"};L=100/f*u.breakWith[h].weight;L=Math.floor(L);p.push(L);b+=L;if(b<100&&h===u.breakWith.length-1){L+=100-b}c.push("sapUiRFLMultiContent");w["width"]=L+"%";if(u.breakWith[h].padding){c.push("sapUiRFLPaddingClass")}C.writeHeader(m,w,c);C.renderControl(u.breakWith[h].control);C.write("</div>")}}else{C.renderControl(u.control)}C.write("</div>");C.write("</div>")}C.write("</div>");this._iRowCounter++}};var l=function(t){this._iRowCounter=0;this._oDomRef=this.getDomRef();if(this._oDomRef){var e=this.getId();var s=a(this._oDomRef).width();var l=false;if(this._rows){for(var d=0;d<this._rows.length;d++){var u=a(document.getElementById(e+"-row"+d));var f=o(this._rows[d],s);var g=i(this._rows[d],u,this);l=h(g,f);var p=this._getElementRect(u);var c=this._rows[d].oRect;if(p&&c){l=l||p.width!==c.width&&p.height!==c.height}l=l||typeof t==="boolean"&&t;if(this._bLayoutDataChanged||l){if(n.browser.internet_explorer){a(this._oDomRef).empty()}else{this._oDomRef.innerHTML=""}this._bLayoutDataChanged=false;this.renderContent(f,s)}}if(this._oDomRef.innerHTML===""){this._getRenderManager().flush(this._oDomRef);for(var d=0;d<this._rows.length;d++){var v=this._getElementRect(a(document.getElementById(e+"-row"+d)));this._rows[d].oRect=v}}if(this._rows.length===0){if(this._resizeHandlerComputeWidthsID){r.deregister(this._resizeHandlerComputeWidthsID);delete this._resizeHandlerComputeWidthsID}}}}};s.prototype.onBeforeRendering=function(){t(this);if(this._resizeHandlerFullLengthID){r.deregister(this._resizeHandlerFullLengthID);delete this._resizeHandlerFullLengthID}};s.prototype.onAfterRendering=function(t){this._oDomRef=this.getDomRef();this._$DomRef=a(this._oDomRef);this._proxyComputeWidths(true);if(this.getResponsive()){if(!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=r.register(this,this._proxyComputeWidths)}}else{if(this._resizeHandlerComputeWidthsID){r.deregister(this._resizeHandlerComputeWidthsID);delete this._resizeHandlerComputeWidthsID}}};s.prototype.onThemeChanged=function(e){if(e.type==="LayoutDataChange"){this._bLayoutDataChanged=true}if(!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=r.register(this,this._proxyComputeWidths)}t(this);this._proxyComputeWidths()};s.prototype.onLayoutDataChange=s.prototype.onThemeChanged;var d=function(t){var i=t.getLayoutData();if(!i){return undefined}else if(i instanceof e){return i}else if(i.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){var r=i.getMultipleLayoutData();for(var n=0;n<r.length;n++){var o=r[n];if(o instanceof e){return o}}}};s.prototype.addContent=function(t){if(t&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}this.addAggregation("content",t);return this};s.prototype.insertContent=function(t,e){if(t&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}this.insertAggregation("content",t,e);return this};s.prototype.removeContent=function(t){if(t&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}this.removeAggregation("content",t)};s.prototype._getAccessibleRole=function(){return null};s.prototype._addContentClass=function(t,e){return null};s.prototype._getElementRect=function(t){var e=t&&t.rect();if(e){e.height=e.height.toFixed(1);e.width=e.width.toFixed(1)}return e};s.prototype._getRenderManager=function(){if(!this.oRm){this.oRm=sap.ui.getCore().createRenderManager();this.oRm.writeStylesAndClasses=function(){this.writeStyles();this.writeClasses()};this.oRm.writeHeader=function(t,e,i){this.write('<div id="'+t+'"');if(e){for(var r in e){if(r==="width"&&e[r]==="100%"){this.addClass("sapUiRFLFullLength")}this.addStyle(r,e[r])}}for(var n=0;n<i.length;n++){this.addClass(i[n])}this.writeStylesAndClasses();this.write(">")}}return this.oRm}})();return s});