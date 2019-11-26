/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/ShortcutHelper","sap/base/assert","sap/ui/dom/jquery/control"],function(e,t,r){"use strict";var o={register:function(t,o,n){if(!t){throw new Error("Shortcut.register: oScopeControl must be given.")}if(typeof n!=="function"){throw new Error("Shortcut.register: a function fnCallback must be given.")}var i=e.getNormalizedShortcutSpec(o);e.validateKeyCombination(i);var a=e.findShortcut(t,i);if(a){throw new Error("Same shortcut is already registered on this element")}function u(){var e=r(document.activeElement),t=e.control(0),o=document.createElement("span"),i=sap.ui.getCore().getStaticAreaRef();o.setAttribute("tabindex",0);o.style.position="absolute";o.style.top="50%";o.style.bottom="50%";o.style.left="50%";o.style.right="50%";i.appendChild(o);o.focus();n.apply(null,arguments);t.focus();i.removeChild(o)}var c={};c["onkeydown"]=e.handleKeydown.bind(null,i,o,u);t.addEventDelegate(c);var s=t.data("sap.ui.core.Shortcut");if(!s){s=[];t.data("sap.ui.core.Shortcut",s)}s.push({shortcutSpec:i,platformIndependentShortcutString:e.getNormalizedShortcutString(i),delegate:c})},isRegistered:function(r,o){t(r,"Shortcut.isRegistered: oScopeControl must be given.");var n=e.getNormalizedShortcutSpec(o);return!!e.findShortcut(r,n)},unregister:function(r,o){t(r,"Shortcut.unregister: oScopeControl must be given.");var n=e.getNormalizedShortcutSpec(o);var i=e.findShortcut(r,n);if(i){r.removeEventDelegate(i.delegate);var a=r.data("sap.ui.core.Shortcut");var u=a.indexOf(i);a.splice(u,1);return true}return false}};return o});