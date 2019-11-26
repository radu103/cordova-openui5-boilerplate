/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(e){"use strict";var t=e.Categories,i=e.Severity,s=e.Audiences;var r={id:"vsdItemsHaveKeys",audiences:[s.Control],categories:[t.Usage],enabled:true,minversion:"1.28",title:"ViewSettingsDialog: not all items have keys",description:"All items should have keys",resolution:"Provide keys for all items",resolutionurls:[{text:"SAP Fiori Design Guidelines: DatePicker",href:"https://experience.sap.com/fiori-design-web/date-picker/"}],check:function(e,t,s){s.getElementsByClassName("sap.m.ViewSettingsDialog").forEach(function(t){var s=t.getFilterItems();var r=t.getSortItems();var a=t.getGroupItems();var n=function(e){return!e.getKey()};if(s.filter(n).length||r.filter(n).length||a.filter(n).length){var o=t.getId(),l=t.getMetadata().getElementName();e.addIssue({severity:i.High,details:"ViewSettingsDialog '"+l+"' ("+o+")'s items do not have keys",context:{id:o}})}})}};return[r]},true);