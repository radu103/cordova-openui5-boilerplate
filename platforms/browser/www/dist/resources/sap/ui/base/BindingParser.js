/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExpressionParser","sap/ui/model/BindingMode","sap/ui/model/Filter","sap/ui/model/Sorter","sap/base/Log","sap/base/util/ObjectPath","sap/base/util/JSTokenizer","sap/base/util/resolveReference"],function(t,e,n,r,i,o,s,a){"use strict";var f={_keepBindingStrings:false};var u=/^\{\s*('|"|)[a-zA-Z$_][a-zA-Z0-9$_]*\1\s*:/;var c=/(\\[\\\{\}])|(\{)/g;var p=/([\\\{\}])/g;function l(t,e){function n(){var n,r=t.length,i=new Array(r);for(n=0;n<r;n+=1){i[n]=t[n].apply(this,arguments)}if(e){return e.apply(this,i)}return r>1?i.join(" "):i[0]}n.textFragments=e&&e.textFragments||"sap.ui.base.BindingParser: composeFormatters";return n}function d(t){var e=function(){var e=[],n=t.length,r;for(r=0;r<n;r++){if(typeof t[r]==="number"){e.push(arguments[t[r]])}else{e.push(t[r])}}return e.join("")};e.textFragments=t;return e}function h(t){var e=t.indexOf(">"),n={path:t};if(e>0){n.model=t.slice(0,e);n.path=t.slice(e+1)}return n}function g(t,e){try{f.mergeParts(t)}catch(t){i.error("Cannot merge parts: "+t.message,e,"sap.ui.base.BindingParser")}}function y(t,e){var o=Object.assign({".":t.oContext},t.mLocals);function s(e,n){if(typeof e[n]==="string"){var r=e[n];e[n]=a(e[n],o,{preferDotContext:t.bPreferContext,bindDotContext:!t.bStaticContext});if(typeof e[n]!=="function"){if(t.bTolerateFunctionsNotFound){t.aFunctionsNotFound=t.aFunctionsNotFound||[];t.aFunctionsNotFound.push(r)}else{i.error(n+" function "+r+" not found!")}}}}function f(t){var e;if(typeof t.type==="string"){e=a(t.type,o,{bindContext:false});if(typeof e==="function"){t.type=new e(t.formatOptions,t.constraints)}else{t.type=e}delete t.formatOptions;delete t.constraints}}function u(t){if(t!=null&&typeof t==="object"){for(var e in t){s(t,e)}}}function c(t,e){var r=t[e];if(Array.isArray(r)){r.forEach(function(t,e){c(r,e)});return}if(r&&typeof r==="object"){s(r,"test");c(r,"filters");c(r,"condition");t[e]=new n(r)}}function p(t,e){var n=t[e];if(Array.isArray(n)){n.forEach(function(t,e){p(n,e)});return}if(n&&typeof n==="object"){s(n,"group");s(n,"comparator");t[e]=new r(n)}}if(typeof e==="object"){if(Array.isArray(e.parts)){e.parts.forEach(function(e){y(t,e)})}f(e);c(e,"filters");p(e,"sorter");u(e.events);s(e,"formatter");s(e,"factory");s(e,"groupHeaderFactory")}return e}function x(t,e,n){var r=s.parseJS,i,o;if(u.test(e.slice(n))){i=r(e,n);y(t,i.result);return i}o=e.indexOf("}",n);if(o<n){throw new SyntaxError("no closing braces found in '"+e+"' after pos:"+n)}return{result:h(e.slice(n+1,o)),at:o+1}}f.simpleParser=function(t,e){if(t.startsWith("{")&&t.endsWith("}")){return h(t.slice(1,-1))}};f.simpleParser.escape=function(t){return t};f.complexParser=function(n,r,i,o,s,a,u){var p=false,l={parts:[]},h=false,y={oContext:r,mLocals:u,aFunctionsNotFound:undefined,bPreferContext:a,bStaticContext:s,bTolerateFunctionsNotFound:o},m=[],b,F=0,v,A;function w(e,i,o){var a=t.parse(x.bind(null,y),n,i,null,u||(s?r:null));function f(t,e){if(t.parts){t.parts.forEach(function(e,n){if(typeof e==="string"){e=t.parts[n]={path:e}}f(e,n)});p=p||e!==undefined}else{t.mode=o}}if(e.charAt(a.at)!=="}"){throw new SyntaxError("Expected '}' and instead saw '"+e.charAt(a.at)+"' in expression binding "+e+" at position "+a.at)}a.at+=1;if(a.result){f(a.result)}else{m[m.length-1]=String(a.constant);b=true}return a}c.lastIndex=0;while((v=c.exec(n))!==null){if(F<v.index){m.push(n.slice(F,v.index))}if(v[1]){m.push(v[1].slice(1));b=true}else{m.push(l.parts.length);if(n.indexOf(":=",v.index)===v.index+1){A=w(n,v.index+3,e.OneTime)}else if(n.charAt(v.index+1)==="="){A=w(n,v.index+2,e.OneWay)}else{A=x(y,n,v.index)}if(A.result){l.parts.push(A.result);h=h||"parts"in A.result}c.lastIndex=A.at}F=c.lastIndex}if(F<n.length){m.push(n.slice(F))}if(l.parts.length>0){if(m.length===1){l=l.parts[0];h=p}else{l.formatter=d(m)}if(h){g(l,n)}if(f._keepBindingStrings){l.bindingString=n}if(y.aFunctionsNotFound){l.functionsNotFound=y.aFunctionsNotFound}return l}else if(i&&b){return m.join("")}};f.complexParser.escape=function(t){return t.replace(p,"\\$1")};f.mergeParts=function(t){var e=[],n=[];t.parts.forEach(function(t){var r,i=function(){return t},o,s=n.length;function a(){return arguments[s]}if(t&&typeof t==="object"){if(t.parts){for(o in t){if(o!=="formatter"&&o!=="parts"){throw new Error("Unsupported property: "+o)}}n=n.concat(t.parts);r=n.length;if(t.formatter){i=function(){return t.formatter.apply(this,Array.prototype.slice.call(arguments,s,r))}}else if(r-s>1){i=function(){return Array.prototype.slice.call(arguments,s,r).join(" ")}}else{i=a}}else if(t.path){n.push(t);i=a}}e.push(i)});t.parts=n;t.formatter=l(e,t.formatter)};f.parseExpression=function(e,n,r,i){r=r||{};if(i){r.mLocals=i}return t.parse(x.bind(null,r),e,n,i)};return f},true);