/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/ComponentContainer","sap/ui/core/library"],function(e,t,n){"use strict";var i=n.ComponentLifecycle;return{display:function(e){var t=Promise.resolve();return this._display(e,t)},_display:function(e,t,n){if(this._oParent){t=this._oParent._display(e,t,n)}return this._place(e,t,n)},suspend:function(){if(this._isLoaded()){var t=this._get(),n;if(t.isA("sap.ui.core.UIComponent")&&(n=t.getRouter())){n.stop()}}else{e.warning("The target with name '"+this._oOptions._name+"' can't be suspended because it's being loaded or not loaded yet")}return this},_isLoaded:function(){return this._bIsLoaded},_get:function(e){var t=this._getEffectiveObjectName(this._oOptions.name),n=this._oOptions,i;switch(n.type){case"View":i={name:t,type:n.viewType,id:n.id,async:true};break;case"Component":i={id:n.id};if(n.usage){i.usage=n.usage}else{i.name=t}i=Object.assign({},n.options||{},i);break;default:throw new Error("The given type "+n.type+" isn't support by sap.ui.core.routing.Target")}return this._oCache._get(i,n.type,this._bUseRawViewId,e)},_load:function(e){var t=this._get(e),n;if(!(t instanceof Promise)){if(t.isA("sap.ui.core.mvc.View")){n=t.loaded()}else{n=Promise.resolve(t)}}else{n=t}return n.then(function(e){this._bIsLoaded=true;return e}.bind(this))},_place:function(n,o,r){if(n instanceof Promise){r=o;o=n;n=undefined}var a=this._oOptions,s=this,c,u,d;if((a.name||a.usage)&&a.type){d=this._load(r);o=o.then(function(e){return d.then(function(t){if(t.isA("sap.ui.core.UIComponent")){var n=t.getRouter();if(n&&n.isStopped()){n.initialize()}}return{object:t,parentInfo:e||{}}})}).then(function(e){var t=s._isValid(e.parentInfo);c=e.object;if(c.isA("sap.ui.core.mvc.View")){s._bindTitleInTitleProvider(c);s._addTitleProviderAsDependent(c)}if(t!==true){u=t;return s._refuseInvalidTarget(a._name,u)}var n=e.parentInfo.view,i=e.parentInfo.control,o=Promise.resolve(i);if(n&&n.isA("sap.ui.core.ComponentContainer")){n=n.getComponentInstance().getRootControl()}if(!n&&a.rootView){n=sap.ui.getCore().byId(a.rootView);if(!n){u="Did not find the root view with the id "+a.rootView;return s._refuseInvalidTarget(a._name,u)}}if(a.controlId){if(n&&n.isA("sap.ui.core.mvc.View")){o=n.loaded().then(function(e){return e.byId(a.controlId)})}o=o.then(function(e){if(!e){e=sap.ui.getCore().byId(a.controlId)}if(!e){u="Control with ID "+a.controlId+" could not be found";return s._refuseInvalidTarget(a._name,u)}else{return e}})}return o}).then(function(o){var r,d,f;if(c.isA("sap.ui.core.UIComponent")){r=c;d=r.getId()+"-container";c=sap.ui.getCore().byId(d);if(!c){var l=Object.assign({component:r,height:"100%",width:"100%",lifecycle:i.Application},a.containerOptions);c=new t(d,l);f=r.exit;r.exit=function(){if(f){f.apply(this)}c.destroy()}}}s._beforePlacingViewIntoContainer({container:o,view:c,data:n});var g=o.getMetadata().getJSONKeys()[a.controlAggregation];if(!g){u="Control "+a.controlId+" does not have an aggregation called "+a.controlAggregation;return s._refuseInvalidTarget(a._name,u)}if(a.clearControlAggregation===true){o[g._sRemoveAllMutator]()}e.info("Did place the "+a.type.toLowerCase()+" target '"+(a.name?s._getEffectiveObjectName(a.name):a.usage)+"' with the id '"+c.getId()+"' into the aggregation '"+a.controlAggregation+"' of a control with the id '"+o.getId()+"'",s);o[g._sMutator](c);s.fireDisplay({view:c.isA("sap.ui.core.mvc.View")?c:undefined,object:c,control:o,config:s._oOptions,data:n});return{name:a._name,view:c,control:o}})}else{o=o.then(function(){return{name:a._name}})}return o},_isValid:function(t){var n=this._oOptions,i=t&&t.control,o=i||n.controlId,r=true,a="";if(!o){a="The target "+n._name+" has no controlId set and no parent so the target cannot be displayed.";r=false}if(!n.controlAggregation){a="The target "+n._name+" has a control id or a parent but no 'controlAggregation' was set, so the target could not be displayed.";r=false}if(a){e.error(a,this)}return r||a},_refuseInvalidTarget:function(e,t){return Promise.reject(new Error(t+" - Target: "+e))}}});