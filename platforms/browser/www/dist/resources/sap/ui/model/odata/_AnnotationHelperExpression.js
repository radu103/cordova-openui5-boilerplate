/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AnnotationHelperBasics","sap/base/Log","sap/ui/base/BindingParser","sap/ui/base/ManagedObject","sap/ui/core/CalendarType","sap/ui/core/format/DateFormat","sap/ui/model/odata/ODataUtils","sap/ui/performance/Measurement"],function(e,t,a,r,n,i,s,o){"use strict";var u="sap.ui.model.odata.AnnotationHelper",l,p,c="\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])",d="[-+]?\\d+(?:\\.\\d+)?",m="9007199254740991",f="-"+m,g=[u],y=u+"/getExpression",E,v="(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(\\.\\d{1,12})?)?",T={Bool:/^true$|^false$/i,Float:new RegExp("^"+d+"(?:[eE][-+]?\\d+)?$|^NaN$|^-INF$|^INF$"),Date:new RegExp("^"+c+"$"),DateTimeOffset:new RegExp("^"+c+"T"+v+"(?:Z|[-+](?:0\\d|1[0-3]):[0-5]\\d|[-+]14:00)$","i"),Decimal:new RegExp("^"+d+"$"),Guid:/^[A-F0-9]{8}-(?:[A-F0-9]{4}-){3}[A-F0-9]{12}$/i,Int:/^[-+]?\d{1,19}$/,TimeOfDay:new RegExp("^"+v+"$")},D,x=/^\{@i18n>[^\\\{\}:]+\}$/,S=/^\d+$/,h={And:"&&",Eq:"===",Ge:">=",Gt:">",Le:"<=",Lt:"<",Ne:"!==",Not:"!",Or:"||"},O=/^(\/dataServices\/schema\/\d+)(?:\/|$)/,b={"Edm.Boolean":"boolean","Edm.Byte":"number","Edm.Date":"date","Edm.DateTime":"datetime","Edm.DateTimeOffset":"datetime","Edm.Decimal":"decimal","Edm.Double":"number","Edm.Float":"number","Edm.Guid":"string","Edm.Int16":"number","Edm.Int32":"number","Edm.Int64":"decimal","Edm.SByte":"number","Edm.Single":"number","Edm.String":"string","Edm.Time":"time","Edm.TimeOfDay":"time"},P={Bool:"Edm.Boolean",Float:"Edm.Double",Date:"Edm.Date",DateTimeOffset:"Edm.DateTimeOffset",Decimal:"Edm.Decimal",Guid:"Edm.Guid",Int:"Edm.Int64",String:"Edm.String",TimeOfDay:"Edm.TimeOfDay"},w={boolean:false,date:true,datetime:true,decimal:true,number:false,string:false,time:true};D={_setDateTimeFormatter:function(){l=i.getDateInstance({calendarType:n.Gregorian,pattern:"yyyy-MM-dd",strictParsing:true,UTC:true});p=i.getDateTimeInstance({calendarType:n.Gregorian,pattern:"yyyy-MM-dd'T'HH:mm:ss.SSSX",strictParsing:true});E=i.getTimeInstance({calendarType:n.Gregorian,pattern:"HH:mm:ss.SSS",strictParsing:true,UTC:true})},adjustOperands:function(e,t){if(e.result!=="constant"&&e.category==="number"&&t.result==="constant"&&t.type==="Edm.Int64"){t.category="number"}if(e.result!=="constant"&&e.category==="decimal"&&t.result==="constant"&&t.type==="Edm.Int32"){t.category="decimal";t.type=e.type}if(e.result==="constant"&&e.category==="date"&&t.result!=="constant"&&t.category==="datetime"){t.category="date"}},apply:function(t,a){var r=e.descend(a,"Name","string"),n=e.descend(a,"Parameters");switch(r.value){case"odata.concat":return D.concat(t,n);case"odata.fillUriTemplate":return D.fillUriTemplate(t,n);case"odata.uriEncode":return D.uriEncode(t,n);default:e.error(r,"unknown function: "+r.value)}},concat:function(t,a){var r=a.asExpression,n=[],i,s=[];e.expectType(a,"array");a.value.forEach(function(e,n){i=D.parameter(t,a,n);r=r||i.result==="expression";s.push(i)});s.forEach(function(t){if(r){D.wrapExpression(t)}if(t.type!=="edm:Null"){n.push(e.resultToString(t,r,a.withType))}});i=r?{result:"expression",value:n.join("+")}:{result:"composite",value:n.join("")};i.type="Edm.String";return i},conditional:function(t,a){var r=D.parameter(t,a,0,"Edm.Boolean"),n=D.parameter(t,a,1),i=D.parameter(t,a,2),s=n.type,o=a.withType;if(n.type==="edm:Null"){s=i.type}else if(i.type!=="edm:Null"&&n.type!==i.type){e.error(a,"Expected same type for second and third parameter, types are '"+n.type+"' and '"+i.type+"'")}return{result:"expression",type:s,value:e.resultToString(D.wrapExpression(r),true,false)+"?"+e.resultToString(D.wrapExpression(n),true,o)+":"+e.resultToString(D.wrapExpression(i),true,o)}},constant:function(t,a,r){var n=a.value;e.expectType(a,"string");if(r==="String"){if(x.test(n)){return{ignoreTypeInPath:true,result:"binding",type:"Edm.String",value:n.slice(1,-1)}}else if(t.getSetting&&t.getSetting("bindTexts")){return{result:"binding",type:"Edm.String",ignoreTypeInPath:true,value:"/##"+D.replaceIndexes(t.getModel(),a.path)}}r="Edm.String"}else if(!T[r].test(n)){e.error(a,"Expected "+r+" value but instead saw '"+n+"'")}else{r=P[r];if(r==="Edm.Int64"&&s.compare(n,f,true)>=0&&s.compare(n,m,true)<=0){r="Edm.Int32"}}return{result:"constant",type:r,value:n}},expression:function(t,a){var r=a.value,n,i;e.expectType(a,"object");if(r.hasOwnProperty("Type")){i=e.property(a,"Type","string");n=e.descend(a,"Value")}else{["And","Apply","Bool","Date","DateTimeOffset","Decimal","Float","Eq","Ge","Gt","Guid","If","Int","Le","Lt","Ne","Not","Null","Or","Path","PropertyPath","String","TimeOfDay"].forEach(function(t){if(r.hasOwnProperty(t)){i=t;n=e.descend(a,t)}})}switch(i){case"Apply":return D.apply(t,n);case"If":return D.conditional(t,n);case"Path":case"PropertyPath":return D.path(t,n);case"Bool":case"Date":case"DateTimeOffset":case"Decimal":case"Float":case"Guid":case"Int":case"String":case"TimeOfDay":return D.constant(t,n,i);case"And":case"Eq":case"Ge":case"Gt":case"Le":case"Lt":case"Ne":case"Or":return D.operator(t,n,i);case"Not":return D.not(t,n);case"Null":return{result:"constant",value:"null",type:"edm:Null"};default:e.error(a,"Unsupported OData expression")}},formatOperand:function(t,a,r,n){var i;if(r.result==="constant"){switch(r.category){case"boolean":case"number":return r.value;case"date":i=D.parseDate(r.value);if(!i){e.error(e.descend(t,a),"Invalid Date "+r.value)}return String(i.getTime());case"datetime":i=D.parseDateTimeOffset(r.value);if(!i){e.error(e.descend(t,a),"Invalid DateTime "+r.value)}return String(i.getTime());case"time":return String(D.parseTimeOfDay(r.value).getTime())}}if(n){D.wrapExpression(r)}return e.resultToString(r,true)},getExpression:function(n,i,s){var l;if(i===undefined){return undefined}o.average(y,"",g);if(!D.simpleParserWarningLogged&&r.bindingParser===a.simpleParser){t.warning("Complex binding syntax not active",null,u);D.simpleParserWarningLogged=true}try{l=D.expression(n,{asExpression:false,path:n.getPath(),value:i,withType:s});o.end(y);return e.resultToString(l,false,s)}catch(t){o.end(y);if(t instanceof SyntaxError){return"Unsupported: "+a.complexParser.escape(e.toErrorString(i))}throw t}},fillUriTemplate:function(t,a){var r,n,i=[],s="",o,u=a.value,l,p=D.parameter(t,a,0,"Edm.String");i.push("odata.fillUriTemplate(",e.resultToString(p,true),",{");for(r=1;r<u.length;r+=1){o=e.descend(a,r,"object");n=e.property(o,"Name","string");l=D.expression(t,e.descend(o,"Value"),true);i.push(s,e.toJSON(n),":",e.resultToString(l,true));s=","}i.push("})");return{result:"expression",value:i.join(""),type:"Edm.String"}},not:function(t,a){var r;a.asExpression=true;r=D.expression(t,a);return{result:"expression",value:"!"+e.resultToString(D.wrapExpression(r),true),type:"Edm.Boolean"}},operator:function(t,a,r){var n=r==="And"||r==="Or"?"Edm.Boolean":undefined,i=D.parameter(t,a,0,n),s=D.parameter(t,a,1,n),o,u,l,p;if(i.type!=="edm:Null"&&s.type!=="edm:Null"){i.category=b[i.type];s.category=b[s.type];D.adjustOperands(i,s);D.adjustOperands(s,i);if(i.category!==s.category){e.error(a,"Expected two comparable parameters but instead saw "+i.type+" and "+s.type)}o=i.category==="decimal"?",true":"";u=w[i.category]}l=D.formatOperand(a,0,i,!u);p=D.formatOperand(a,1,s,!u);return{result:"expression",value:u?"odata.compare("+l+","+p+o+")"+h[r]+"0":l+h[r]+p,type:"Edm.Boolean"}},parameter:function(t,a,r,n){var i=e.descend(a,r),s;i.asExpression=true;s=D.expression(t,i);if(n&&n!==s.type){e.error(i,"Expected "+n+" but instead saw "+s.type)}return s},parseDate:function(e){return l.parse(e)},parseDateTimeOffset:function(e){var t=T.DateTimeOffset.exec(e);if(t&&t[1]&&t[1].length>4){e=e.replace(t[1],t[1].slice(0,4))}return p.parse(e.toUpperCase())},parseTimeOfDay:function(e){if(e.length>12){e=e.slice(0,12)}return E.parse(e)},path:function(a,r){var n=r.value,i={},s,o,l,p=a.getModel(),c={getModel:function(){return p},getPath:function(){return r.path}},d,m={result:"binding",value:n},f;e.expectType(r,"string");f=e.followPath(c,{Path:n});if(f&&f.resolvedPath){d=p.getProperty(f.resolvedPath);m.type=d.type;switch(d.type){case"Edm.DateTime":i.displayFormat=d["sap:display-format"];break;case"Edm.Decimal":if(d.precision){i.precision=d.precision}if(d.scale){i.scale=d.scale}l=d["Org.OData.Validation.V1.Minimum"];if(l&&(l.Decimal||l.String)){i.minimum=l.Decimal||l.String;s=l["Org.OData.Validation.V1.Exclusive"];if(s){i.minimumExclusive=s.Bool||"true"}}l=d["Org.OData.Validation.V1.Maximum"];if(l&&(l.Decimal||l.String)){i.maximum=l.Decimal||l.String;s=l["Org.OData.Validation.V1.Exclusive"];if(s){i.maximumExclusive=s.Bool||"true"}}break;case"Edm.String":i.maxLength=d.maxLength;o=d["com.sap.vocabularies.Common.v1.IsDigitSequence"];if(o){i.isDigitSequence=o.Bool||"true"}break}if(d.nullable==="false"){i.nullable="false"}m.constraints=i}else{t.warning("Could not find property '"+n+"' starting from '"+r.path+"'",null,u)}return m},replaceIndexes:function(t,a){var r,n=a.split("/"),i,s;function o(a,r){var s=t.getProperty(i+"/"+a);if(typeof s==="string"){n[r]="[${"+a+"}==="+e.toJSON(s)+"]";return true}return false}r=O.exec(a);if(!r){return a}i=r[1];if(!o("namespace",3)){return a}for(var u=4;u<n.length;u+=1){i=i+"/"+n[u];if(S.test(n[u])&&!o("name",u)){s=t.getProperty(i+"/RecordType");if(s){if(s==="com.sap.vocabularies.UI.v1.DataFieldForAction"){o("Action/String",u)}else if(s==="com.sap.vocabularies.UI.v1.DataFieldForAnnotation"){o("Target/AnnotationPath",u)}else if(s.indexOf("com.sap.vocabularies.UI.v1.DataField")===0){o("Value/Path",u)}}}}return n.join("/")},simpleParserWarningLogged:false,uriEncode:function(t,a){var r=D.parameter(t,a,0);if(r.result==="constant"){if(r.type==="Edm.Date"){r.type="Edm.DateTime";r.value=r.value+"T00:00:00Z"}else if(r.type==="Edm.TimeOfDay"){r.type="Edm.Time";r.value="PT"+r.value.slice(0,2)+"H"+r.value.slice(3,5)+"M"+r.value.slice(6,8)+"S"}}return{result:"expression",value:"odata.uriEncode("+e.resultToString(r,true)+","+e.toJSON(r.type)+")",type:"Edm.String"}},wrapExpression:function(e){if(e.result==="expression"){e.value="("+e.value+")"}return e}};D._setDateTimeFormatter();return D},false);