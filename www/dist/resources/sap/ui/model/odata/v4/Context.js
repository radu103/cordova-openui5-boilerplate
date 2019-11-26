/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/Context"],function(t,e,n,i){"use strict";var o="sap.ui.model.odata.v4.Context",r,s=0,h=-9007199254740991;function u(t,e,i,o){var r,s=[t.fetchValue(e,null,o)],h=t.getPath(e);if(i){s.push(t.oModel.getMetaModel().fetchUI5Type(h))}return n.all(s).then(function(t){var e=t[1],n=t[0];if(n&&typeof n==="object"){r=new Error("Accessed value is not primitive: "+h);r.isNotPrimitive=true;throw r}return i?e.formatValue(n,"string"):n})}var d=i.extend("sap.ui.model.odata.v4.Context",{constructor:function(t,e,o,r,s,h){if(o[0]!=="/"){throw new Error("Not an absolute path: "+o)}if(o.slice(-1)==="/"){throw new Error("Unsupported trailing slash: "+o)}i.call(this,t,o);this.oBinding=e;this.oCreatePromise=s&&Promise.resolve(s).then(function(){});this.oSyncCreatePromise=s&&n.resolve(s);this.iIndex=r;this.iReturnValueContextId=h}});d.prototype._delete=function(t,e){var n=this;if(this.isTransient()){return this.oBinding._delete(t,"n/a",this)}return this.fetchCanonicalPath().then(function(i){return n.oBinding._delete(t,i.slice(1),n,e)})};d.prototype.adjustPredicate=function(t,e,n){var i=this.sPath;if(i.includes(t)){this.sPath=i.split("/").map(function(n){if(n.endsWith(t)){n=n.slice(0,-t.length)+e}return n}).join("/");if(n){n(i,this.sPath)}this.oModel.getDependentBindings(this).forEach(function(n){n.adjustPredicate(t,e)})}};d.prototype.checkUpdate=function(){return n.all(this.oModel.getDependentBindings(this).map(function(t){return t.checkUpdate()}))};d.prototype.created=function(){return this.oCreatePromise};d.prototype.delete=function(t){var e,n=this.oModel,i=this;n.checkGroupId(t);this.oBinding.checkSuspended();if(!this.isTransient()&&this.hasPendingChanges()){throw new Error("Cannot delete due to pending changes")}e=this.oBinding.lockGroup(t,true,true);return this._delete(e).then(function(){var t=i.sPath.slice(1);n.getAllBindings().forEach(function(e){e.removeCachesAndMessages(t,true)})}).catch(function(t){e.unlock(true);n.reportError("Failed to delete "+i,o,t);throw t})};d.prototype.destroy=function(){this.oModel.getDependentBindings(this).forEach(function(t){t.setContext(undefined)});this.oBinding=undefined;this.oModel=undefined;i.prototype.destroy.apply(this)};d.prototype.doSetProperty=function(e,n,i,r){var s=this.oModel.getMetaModel(),h=this;if(this.oModel.bAutoExpandSelect){e=s.getReducedPath(t.buildPath(this.sPath,e),this.oBinding.getBaseForPathReduction())}return s.fetchUpdateData(e,this).then(function(t){return h.withCache(function(u,d,a){var c=false;function p(t){h.oModel.reportError("Failed to update path "+h.oModel.resolve(e,h),o,t);f(false)}function f(t){if(c){a.firePatchCompleted(t);c=false}}function l(){c=true;a.firePatchSent()}return u.update(i,t.propertyPath,n,r?undefined:p,t.editUrl,d,s.getUnitOrCurrencyPath(h.oModel.resolve(e,h)),a.isPatchWithoutSideEffects(),l).then(function(){f(true)},function(t){f(false);throw t})},t.entityPath)})};d.prototype.fetchCanonicalPath=function(){return this.oModel.getMetaModel().fetchCanonicalPath(this)};d.prototype.fetchValue=function(e,i,o){if(this.iIndex===h){return n.resolve()}if(!e||e[0]!=="/"){e=t.buildPath(this.sPath,e);if(this.oModel.bAutoExpandSelect){e=this.oModel.getMetaModel().getReducedPath(e,this.oBinding.getBaseForPathReduction())}}return this.oBinding.fetchValue(e,i,o)};d.prototype.getBinding=function(){return this.oBinding};d.prototype.getCanonicalPath=t.createGetMethod("fetchCanonicalPath",true);d.prototype.getGroupId=function(){return this.oBinding.getGroupId()};d.prototype.getIndex=function(){if(this.oBinding.bCreatedAtEnd){return this.iIndex<0?this.oBinding.iMaxLength-this.iIndex-1:this.iIndex}return this.getModelIndex()};d.prototype.getModelIndex=function(){if(this.oBinding.iCreatedContexts){return this.iIndex+this.oBinding.iCreatedContexts}return this.iIndex};d.prototype.getObject=function(e){return t.publicClone(this.getValue(e))};d.prototype.getProperty=function(t,n){var i,r;this.oBinding.checkSuspended();r=u(this,t,n,true);if(r.isRejected()){r.caught();i=r.getResult();if(i.isNotPrimitive){throw i}else if(!i.$cached){e.warning(i.message,t,o)}}return r.isFulfilled()?r.getResult():undefined};d.prototype.getReturnValueContextId=function(){if(this.iReturnValueContextId){return this.iReturnValueContextId}if(this.oBinding.bRelative&&this.oBinding.oContext&&this.oBinding.oContext.getReturnValueContextId){return this.oBinding.oContext.getReturnValueContextId()}};d.prototype.getQueryOptionsForPath=function(t){return this.oBinding.getQueryOptionsForPath(t)};d.prototype.getUpdateGroupId=function(){return this.oBinding.getUpdateGroupId()};d.prototype.getValue=function(t){var e,n=this;this.oBinding.checkSuspended();e=this.fetchValue(t,null,true).catch(function(t){if(!t.$cached){n.oModel.reportError("Unexpected error",o,t)}});if(e.isFulfilled()){return e.getResult()}};d.prototype.hasPendingChanges=function(){return this.isTransient()||this.oModel.getDependentBindings(this).some(function(t){return t.hasPendingChanges()})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.sPath.slice(1))};d.prototype.isTransient=function(){return this.oSyncCreatePromise&&this.oSyncCreatePromise.isPending()};d.prototype.patch=function(t){return this.withCache(function(e,n){e.patch(n,t)},"")};d.prototype.refresh=function(t,e){this.oModel.checkGroupId(t);this.oBinding.checkSuspended();if(this.hasPendingChanges()){throw new Error("Cannot refresh entity due to pending changes: "+this)}if(this.oBinding.refreshSingle){this.oBinding.refreshSingle(this,this.oBinding.lockGroup(t,true),e)}else{if(arguments.length>1){throw new Error("Unsupported parameter bAllowRemoval: "+e)}if(!this.oBinding.refreshReturnValueContext(this,t)){this.oBinding.refresh(t)}}this.oModel.withUnresolvedBindings("removeCachesAndMessages",this.sPath.slice(1))};d.prototype.requestCanonicalPath=t.createRequestMethod("fetchCanonicalPath");d.prototype.requestObject=function(e){this.oBinding.checkSuspended();return Promise.resolve(this.fetchValue(e)).then(t.publicClone)};d.prototype.requestProperty=function(t,e){this.oBinding.checkSuspended();return Promise.resolve(u(this,t,e))};d.prototype.requestSideEffects=function(e,n){var i=this,o,r=i,s,h,u,d,a="";this.oBinding.checkSuspended();this.oModel.checkGroupId(n);if(this.isTransient()){throw new Error("Unsupported context: "+this)}if(!e||!e.length){throw new Error("Missing edm:(Navigation)PropertyPath expressions")}if(this.oBinding.isRelative()&&!this.oBinding.getContext()){throw new Error("Cannot request side effects of unresolved binding's context: "+this)}d=e.map(function(t){if(t&&typeof t==="object"){if(t.$PropertyPath){return t.$PropertyPath}if("$NavigationPropertyPath"in t){return t.$NavigationPropertyPath}}throw new Error("Not an edm:(Navigation)PropertyPath expression: "+JSON.stringify(t))});for(;;){o=r.getBinding();u=o.getPath();h=o.getContext();if(o.oCache&&(!s||o.oCache.hasChangeListeners())){s=r}if(s&&u){break}if(!o.getBoundContext){throw new Error("Not a context binding: "+o)}a=t.buildPath(u,a);r=h}if(a){d=d.map(function(t){return t?a+"/"+t:a})}n=n||this.getUpdateGroupId();return Promise.resolve(this.oModel.isAutoGroup(n)?this.oModel.oRequestor.waitForRunningChangeRequests(n).then(function(){i.oModel.oRequestor.relocateAll("$parked."+n,n);return s.getBinding().requestSideEffects(n,d,s)}):s.getBinding().requestSideEffects(n,d,s)).then(function(){})};d.prototype.setProperty=function(t,e,n){var i;this.oBinding.checkSuspended();this.oModel.checkGroupId(n);if(typeof e==="function"||e&&typeof e==="object"){throw new Error("Not a primitive value")}i=this.oModel.lockGroup(n||this.getUpdateGroupId(),this,true,true);return this.doSetProperty(t,e,i,true).catch(function(t){i.unlock(true);throw t})};d.prototype.toString=function(){var t="";if(this.iIndex!==undefined){t="["+this.iIndex+(this.isTransient()?"|transient":"")+"]"}return this.sPath+t};d.prototype.withCache=function(e,i,o){if(this.iIndex===h){return n.resolve()}return this.oBinding.withCache(e,i[0]==="/"?i:t.buildPath(this.sPath,i),o)};r={create:function(t,e,n,i,o){return new d(t,e,n,i,o)},createReturnValueContext:function(t,e,n){s+=1;return new d(t,e,n,undefined,undefined,s)}};Object.defineProperty(r,"VIRTUAL",{value:h});return r},false);