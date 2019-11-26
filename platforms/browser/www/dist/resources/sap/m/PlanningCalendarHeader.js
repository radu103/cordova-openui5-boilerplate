/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./library","./Toolbar","./AssociativeOverflowToolbar","./Button","./AccButton","./Title","./ToolbarSpacer","./SegmentedButton","sap/ui/unified/Calendar","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CustomMonthPicker","sap/ui/unified/calendar/CustomYearPicker","sap/ui/core/format/DateFormat","sap/ui/core/Popup","sap/ui/core/IconPool","sap/ui/core/InvisibleText","./PlanningCalendarHeaderRenderer"],function(t,e,i,o,n,r,a,s,c,l,p,h,u,d,g,_,f,T){"use strict";var P=e.ToolbarDesign;var C=t.extend("sap.m.PlanningCalendarHeader",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:""},startDate:{type:"object",group:"Data"},pickerText:{type:"string",group:"Data"}},aggregations:{actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action"},_actionsToolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_navigationToolbar:{type:"sap.m.Toolbar",multiple:false,visibility:"hidden"},_calendarPicker:{type:"sap.ui.unified.Calendar",multiple:false,visibility:"hidden"},_monthPicker:{type:"sap.ui.unified.internal.CustomMonthPicker",multiple:false,visibility:"hidden"},_yearPicker:{type:"sap.ui.unified.internal.CustomYearPicker",multiple:false,visibility:"hidden"}},events:{pressPrevious:{},pressToday:{},pressNext:{},dateSelect:{},cancel:{},viewChange:{}},associations:{currentPicker:{type:"sap.ui.core.Control",multiple:false}}}});var y=3;C.prototype.init=function(){var t=this.getId(),e=t+"-NavToolbar",a=sap.ui.getCore().getLibraryResourceBundle("sap.m"),s,c,p,d,g,T;this.setAggregation("_actionsToolbar",new o(t+"-ActionsToolbar",{design:P.Transparent}).addStyleClass("sapMPCHeadActionsToolbar").addContent(this._getOrCreateTitleControl()).addContent(this._getOrCreateToolbarSpacer()).addContent(this._getOrCreateViewSwitch()));s=new n(e+"-PrevBtn",{icon:_.getIconURI("slim-arrow-left"),tooltip:a.getText("PCH_NAVIGATE_BACKWARDS"),press:function(){this.firePressPrevious()}.bind(this)});this._oTodayBtn=new n(e+"-TodayBtn",{text:a.getText("PLANNINGCALENDAR_TODAY"),ariaLabelledBy:f.getStaticId("sap.m","PCH_NAVIGATE_TO_TODAY"),press:function(){this.firePressToday()}.bind(this)});c=new n(e+"-NextBtn",{icon:_.getIconURI("slim-arrow-right"),tooltip:a.getText("PCH_NAVIGATE_FORWARD"),press:function(){this.firePressNext()}.bind(this)});d=new l(t+"-Cal",{ariaLabelledBy:f.getStaticId("sap.ui.unified","CALENDAR_DIALOG")});d.attachEvent("select",this._handlePickerDateSelect,this);d.attachEvent("cancel",this._handlePickerCancelEvent,this);this.setAggregation("_calendarPicker",d);this.setAssociation("currentPicker",d);g=new h(t+"-MonthCal",{ariaLabelledBy:f.getStaticId("sap.ui.unified","CALENDAR_DIALOG")});g.attachEvent("select",this._handlePickerDateSelect,this);g.attachEvent("cancel",this._handlePickerCancelEvent,this);this.setAggregation("_monthPicker",g);T=new u(t+"-YearCal",{ariaLabelledBy:f.getStaticId("sap.ui.unified","CALENDAR_DIALOG")});T.attachEvent("select",this._handlePickerDateSelect,this);T.attachEvent("cancel",this._handlePickerCancelEvent,this);this.setAggregation("_yearPicker",T);this._oPickerBtn=new r(e+"-PickerBtn",{text:this.getPickerText(),ariaHaspopup:"dialog",ariaLabelledBy:f.getStaticId("sap.m","PCH_SELECT_RANGE"),press:function(){var t=this.getStartDate()||new Date,e=this.getAssociation("currentPicker");p=sap.ui.getCore().byId(e);p.displayDate(t);this._openCalendarPickerPopup(p)}.bind(this)});this.setAggregation("_navigationToolbar",new i(e,{design:P.Transparent,content:[s,this._oTodayBtn,c,this._oPickerBtn]}).addStyleClass("sapMPCHeadNavToolbar"))};C.prototype.exit=function(){this._getActionsToolbar().removeAllContent();if(this._oTitle){this._oTitle.destroy();this._oTitle=null}if(this._oToolbarSpacer){this._oToolbarSpacer.destroy();this._oToolbarSpacer=null}if(this._oViewSwitch){this._oViewSwitch.destroy();this._oViewSwitch=null}if(this._oPopup){this._oPopup.destroy();this._oPopup=null}};C.prototype.onBeforeRendering=function(){var t=!!this.getActions().length||!!this.getTitle()||this._getOrCreateViewSwitch().getItems().length>1;this._getActionsToolbar().setProperty("visible",t,true)};C.prototype.setTitle=function(t){this._getOrCreateTitleControl().setText(t).setVisible(!!t);return this.setProperty("title",t)};C.prototype.addAction=function(t){if(!t){return this}this._getActionsToolbar().addContent(t);return this.addAggregation("actions",t)};C.prototype.insertAction=function(t,e){if(!t){return this}this._getActionsToolbar().insertContent(t,e+y);return this.insertAggregation("actions",t,e)};C.prototype.removeAction=function(t){if(!t){return this}this._getActionsToolbar().removeContent(t);return this.removeAggregation("actions",t)};C.prototype.removeAllActions=function(){var t=this._getActionsToolbar(),e=t.getContent();for(var i=y;i<e.length;i++){t.removeContent(e[i])}return this.removeAllAggregation("actions")};C.prototype.destroyActions=function(){var t=this._getActionsToolbar(),e=t.getContent(),i;for(var o=y;o<e.length;o++){i=t.removeContent(e[o]);i.destroy()}return this};C.prototype.setPickerText=function(t){this.setProperty("pickerText",t);this._oPickerBtn.setText(t);return this};C.prototype._getOrCreateTitleControl=function(){if(!this._oTitle){this._oTitle=new a(this.getId()+"-Title",{visible:false})}return this._oTitle};C.prototype._getOrCreateToolbarSpacer=function(){if(!this._oToolbarSpacer){this._oToolbarSpacer=new s(this.getId()+"-Spacer")}return this._oToolbarSpacer};C.prototype._getOrCreateViewSwitch=function(){if(!this._oViewSwitch){this._oViewSwitch=new c(this.getId()+"-ViewSwitch");this._oViewSwitch.attachEvent("selectionChange",this._handleViewSwitchChange,this);this.addDependent(this._oViewSwitch)}return this._oViewSwitch};C.prototype._convertViewSwitchToSelect=function(){this._oViewSwitch._toSelectMode()};C.prototype._convertViewSwitchToSegmentedButton=function(){this._oViewSwitch._toNormalMode()};C.prototype._getTodayButton=function(){return this._oTodayBtn};C.prototype._handlePickerDateSelect=function(){var t=this.getAssociation("currentPicker"),e=sap.ui.getCore().byId(t),i=e.getSelectedDates()[0].getStartDate();this.setStartDate(i);this._closeCalendarPickerPopup();this.fireDateSelect()};C.prototype._handleViewSwitchChange=function(){this.fireViewChange()};C.prototype._openCalendarPickerPopup=function(t){var e;if(!this._oPopup){this._oPopup=this._createPopup()}this._oPopup.setContent(t);e=g.Dock;this._oPopup.open(0,e.CenterTop,e.CenterTop,this._oPickerBtn,null,"flipfit",true)};C.prototype._createPopup=function(){var t=new g;t.setAutoClose(true);t.setDurations(0,0);t.onsapescape=function(t){this.onsapescape(t)}.bind(this);return t};C.prototype.onsapescape=function(){if(this._oPopup){this._closeCalendarPickerPopup();if(this._oPickerBtn.getDomRef()){this._oPickerBtn.getDomRef().focus()}}};C.prototype._closeCalendarPickerPopup=function(){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close()}};C.prototype._handlePickerCancelEvent=function(){var t=this._oPickerBtn.getDomRef();this.fireCancel();t&&t.focus()};C.prototype._getActionsToolbar=function(){return this.getAggregation("_actionsToolbar")};C.prototype._getNavigationToolbar=function(){return this.getAggregation("_navigationToolbar")};return C});