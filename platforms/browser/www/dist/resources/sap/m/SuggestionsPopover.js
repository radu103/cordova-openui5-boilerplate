/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/EventProvider","sap/ui/core/InvisibleText","sap/ui/core/ListItem","sap/ui/core/ResizeHandler","sap/ui/core/ValueStateSupport","sap/m/library","sap/ui/core/library","sap/m/Bar","sap/m/Toolbar","sap/m/Button","sap/m/ToggleButton","sap/m/ColumnListItem","sap/m/GroupHeaderListItem","sap/ui/core/SeparatorItem","sap/m/Dialog","sap/m/DisplayListItem","sap/m/List","sap/m/Popover","sap/m/StandardListItem","sap/m/Table","sap/m/Title","sap/m/Text","sap/ui/core/IconPool","sap/m/SimpleFixFlex","sap/base/security/encodeXML","sap/ui/events/KeyCodes"],function(e,t,o,i,s,n,r,a,u,l,p,h,g,_,d,c,f,S,I,m,T,v,P,b,y,x,L){"use strict";var C=r.ListMode;var w=r.PlacementType;var V=r.ListType;var A=r.ListSeparators;var E="sapMSuggestionsPopover",k="sapUiNoContentPadding";var F=a.ValueState;var D=t.extend("sap.m.SuggestionsPopover",{constructor:function(o){t.apply(this,arguments);this._oInput=o;this._bUseDialog=e.system.phone;this._iPopupListSelectedIndex=-1;this._sPopoverContentWidth=null;this._bEnableHighlighting=true;this._bIsInputIncrementalType=false;this._bAutocompleteEnabled=false;this._sTypedInValue="";this._sOldValueState=F.None;this._oInput.addEventDelegate({onsapup:function(e){this._onsaparrowkey(e,"up",1)},onsapdown:function(e){this._onsaparrowkey(e,"down",1)},onsappageup:function(e){this._onsaparrowkey(e,"up",5)},onsappagedown:function(e){this._onsaparrowkey(e,"down",5)},onsaphome:function(e){if(this._oList){this._onsaparrowkey(e,"up",this._oList.getItems().length)}},onsapend:function(e){if(this._oList){this._onsaparrowkey(e,"down",this._oList.getItems().length)}},onsapright:this._onsapright},this)},destroy:function(){if(this._oPopover){this._oPopover.destroy();this._oPopover=null}if(this._oList){this._oList.destroy();this._oList=null}if(this._oSuggestionTable){this._oSuggestionTable.destroy();this._oSuggestionTable=null}this._oProposedItem=null;this._oInputDelegate=null;if(this._oPickerValueStateText){this._oPickerValueStateText.destroy();this._oPickerValueStateText=null}}});D.M_EVENTS={SELECTION_CHANGE:"selectionChange"};D._wordStartsWithValue=function(e,t){var o;if(!e||!t||typeof e!=="string"||typeof t!=="string"){return false}while(e){if(typeof t==="string"&&t!==""&&e.toLowerCase().indexOf(t.toLowerCase())===0){return true}o=e.indexOf(" ");if(o===-1){break}e=e.substring(o+1)}return false};D._DEFAULTFILTER=function(e,t){if(t instanceof i&&D._wordStartsWithValue(t.getAdditionalText(),e)){return true}return D._wordStartsWithValue(t.getText(),e)};D._DEFAULTFILTER_TABULAR=function(e,t){var o=t.getCells(),i=0;for(;i<o.length;i++){if(o[i].getText){if(D._wordStartsWithValue(o[i].getText(),e)){return true}}}return false};D._DEFAULTRESULT_TABULAR=function(e){var t=e.getCells(),o=0;for(;o<t.length;o++){if(t[o].getText){return t[o].getText()}}return""};D.prototype.isOpen=function(){return this._oPopover&&this._oPopover.isOpen()};D.prototype.setInputLabels=function(e){this._fnInputLabels=e};D.prototype._getInputLabels=function(){return this._fnInputLabels()};D.prototype.updatePickerHeaderTitle=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m"),t=this.getPickerTitle(),o,i;if(!t){return}i=this._getInputLabels();if(i.length){o=i[0];if(o&&typeof o.getText==="function"){t.setText(o.getText())}}else{t.setText(e.getText("COMBOBOX_PICKER_TITLE"))}return t};D.prototype.getPickerTitle=function(){return this._oPopover.getCustomHeader().getContentMiddle()[0]};D.prototype.getOkButton=function(){var e=this._oPopover&&this._oPopover.getBeginButton();return e||null};D.prototype.getCancelButton=function(){var e=this._oPopover&&this._oPopover.getCustomHeader()&&this._oPopover.getCustomHeader().getContentRight()[0];return e||null};D.prototype.getFilterSelectedButton=function(){var e=this._oPopover&&this._oPopover.getSubHeader()&&this._oPopover.getSubHeader().getContent()[1];return e||null};D.prototype._createFilterSelectedButton=function(){var e=b.getIconURI("multiselect-all");return new h({icon:e})};D.prototype._createSuggestionPopup=function(e){e=e||[];var t=this._oInput,i=this,s=t._oRb;this._oPopover=!this._bUseDialog?new I(t.getId()+"-popup",{showArrow:false,placement:w.VerticalPreferredBottom,showHeader:false,initialFocus:t,horizontalScrolling:true}):new c(t.getId()+"-popup",{beginButton:new p(t.getId()+"-popup-closeButton",{text:s.getText("SUGGESTIONSPOPOVER_CLOSE_BUTTON")}),stretch:true,customHeader:new u(t.getId()+"-popup-header",{contentMiddle:new v,contentRight:new p({icon:b.getIconURI("decline")})}),subHeader:this.createSubHeaderContent(e),horizontalScrolling:false,initialFocus:this._oPopupInput,beforeOpen:function(){i.updatePickerHeaderTitle()},afterClose:function(){t.focus();r.closeKeyboard()}});this._registerAutocomplete();this._oPopover.addStyleClass(E);this._oPopover.addStyleClass(k);this._oPopover.addAriaLabelledBy(o.getStaticId("sap.m","INPUT_AVALIABLE_VALUES"));if(!this._bUseDialog){this._overwritePopover()}if(this._oList){this._oPopover.addContent(this._oList)}};D.prototype.createSubHeaderContent=function(e){var t=[this._oPopupInput];if(e.showSelectedButton){t.push(this._createFilterSelectedButton())}return new l({content:t})};D.prototype._createSuggestionPopupContent=function(e,t){var o=this._oInput;if(!t&&!e){this._oList=new S(o.getId()+"-popup-list",{showNoData:false,mode:C.SingleSelectMaster,rememberSelections:false,width:"100%",showSeparators:A.None,busyIndicatorDelay:0});this._oList.addEventDelegate({onAfterRendering:function(){var e,t;if(!this._bEnableHighlighting){return}e=this._oList.$().find(".sapMDLILabel, .sapMSLITitleOnly, .sapMDLIValue");t=(this._sTypedInValue||this._oInput.getValue()).toLowerCase();this.highlightSuggestionItems(e,t)}.bind(this)})}else{this._oList=this._getSuggestionsTable()}this._oSimpleFixFlex=this._createSimpleFixFlex();if(this._oPopover){if(this._bUseDialog){this._oPopover.addAggregation("content",this._oSimpleFixFlex,true);var i=this._oPopover.$("scrollCont")[0];if(i){var s=sap.ui.getCore().createRenderManager();s.renderControl(this._oSimpleFixFlex);s.flush(i);s.destroy()}}else{this._oPopover.addContent(this._oSimpleFixFlex)}}};D.prototype._destroySuggestionPopup=function(){if(this._oPopover){if(this._oList instanceof T){this._oPopover.removeAllContent()}this._oPopover.destroy();this._oPopover=null}if(this._oList instanceof S){this._oList.destroy();this._oList=null}if(this._oPickerValueStateText){this._oPickerValueStateText.destroy();this._oPickerValueStateText=null}this._getInput().removeEventDelegate(this._oInputDelegate,this)};D.prototype._overwritePopover=function(){var e=this._oInput;this._oPopover.open=function(){this.openBy(e,false,true)};this._oPopover.oPopup.setAnimations(function(e,t,o){o()},function(e,t,o){o()})};D.prototype._resizePopup=function(){var e=this._oInput;if(this._oList&&this._oPopover){if(this._sPopoverContentWidth){this._oPopover.setContentWidth(this._sPopoverContentWidth)}else{this._oPopover.setContentWidth(e.$().outerWidth()+"px")}setTimeout(function(){if(this._oPopover&&this._oPopover.isOpen()&&this._oPopover.$().outerWidth()<e.$().outerWidth()){this._oPopover.setContentWidth(e.$().outerWidth()+"px")}}.bind(this),0)}};D.prototype._registerResize=function(){if(!this._bUseDialog){this._sPopupResizeHandler=s.register(this._oInput,this._resizePopup.bind(this))}};D.prototype._deregisterResize=function(){if(this._sPopupResizeHandler){this._sPopupResizeHandler=s.deregister(this._sPopupResizeHandler)}};D.prototype._onsaparrowkey=function(t,o,i){var s=this._oInput,n,r=s.$("inner");if(t.isMarked()){return}if(t.isMarked()){return}if(!s.getEnabled()||!s.getEditable()){return}if(o!=="up"&&o!=="down"){return}if(this._bIsInputIncrementalType){t.setMarked()}if(!this._oPopover||!this._oPopover.isOpen()){return}t.preventDefault();t.stopPropagation();var a=false,u=this._oList,l=u.getItems(),p=this._iPopupListSelectedIndex,h,_=p;if(o==="up"&&p===0){return}if(o=="down"&&p===l.length-1){return}var d;if(i>1){if(o=="down"&&p+i>=l.length){o="up";i=1;l[p].setSelected(false);d=p;p=l.length-1;a=true}else if(o=="up"&&p-i<0){o="down";i=1;l[p].setSelected(false);d=p;p=0;a=true}}if(p===-1){p=0;if(this._isSuggestionItemSelectable(l[p])){_=p;a=true}else{o="down"}}if(o==="down"){while(p<l.length-1&&(!a||!this._isSuggestionItemSelectable(l[p]))){l[p].setSelected(false);p=p+i;a=true;i=1;if(d===p){break}}}else{while(p>0&&(!a||!l[p].getVisible()||!this._isSuggestionItemSelectable(l[p]))){l[p].setSelected(false);p=p-i;a=true;i=1;if(d===p){break}}}if(!this._isSuggestionItemSelectable(l[p])){if(_>=0){l[_].setSelected(true).updateAccessibilityState();r.attr("aria-activedescendant",l[_].getId())}return}else{n=l[p];n.setSelected(true).updateAccessibilityState();if(n.isA("sap.m.GroupHeaderListItem")){r.removeAttr("aria-activedescendant")}else{r.attr("aria-activedescendant",l[p].getId())}}if(e.system.desktop){this._scrollToItem(p)}this._oLastSelectedHeader&&this._oLastSelectedHeader.removeStyleClass("sapMInputFocusedHeaderGroup");if(g&&l[p]instanceof g){h=s._getInputValue(s._fnRowResultFilter(l[p]))}else{if(l[p].isA("sap.m.GroupHeaderListItem")){h="";l[p].addStyleClass("sapMInputFocusedHeaderGroup");this._oLastSelectedHeader=l[p]}else if(l[p]instanceof f){h=s._getInputValue(l[p].getLabel())}else{h=s._getInputValue(l[p].getTitle())}}this._iPopupListSelectedIndex=p;this._bSuggestionItemChanged=true;this.fireEvent(D.M_EVENTS.SELECTION_CHANGE,{newValue:h})};D.prototype._isSuggestionItemSelectable=function(e){var t=this._hasTabularSuggestions()||e.getType()!==V.Inactive||e.isA("sap.m.GroupHeaderListItem");return e.getVisible()&&t};D.prototype._hasTabularSuggestions=function(){if(!this._oSuggestionTable){return}return!!(this._oSuggestionTable.getColumns()&&this._oSuggestionTable.getColumns().length)};D.prototype.setOkPressHandler=function(e){var t=this.getOkButton();t&&t.attachPress(e);return t};D.prototype.setCancelPressHandler=function(e){var t=this.getCancelButton();t&&t.attachPress(e)};D.prototype.setShowSelectedPressHandler=function(e){var t=this.getFilterSelectedButton();t&&t.attachPress(e);return t};D.prototype._scrollToItem=function(e){var t=this._oPopover,o=this._oList,i,s,n,r,a;if(!(t instanceof I)||!o){return}i=t.getScrollDelegate();if(!i){return}var u=o.getItems()[e],l=u&&u.getDomRef();if(!l){return}s=t.getDomRef("cont").getBoundingClientRect();n=l.getBoundingClientRect();r=s.top-n.top;a=n.bottom-s.bottom;if(r>0){i.scrollTo(i._scrollX,Math.max(i._scrollY-r,0))}else if(a>0){i.scrollTo(i._scrollX,i._scrollY+a)}};D.prototype._getSuggestionsTable=function(){var t=this._oInput;if(t._bIsBeingDestroyed){return this._oSuggestionTable}if(!this._oSuggestionTable){this._oSuggestionTable=new T(t.getId()+"-popup-table",{mode:C.SingleSelectMaster,showNoData:false,showSeparators:A.None,width:"100%",enableBusyIndicator:false,rememberSelections:false,itemPress:function(o){if(e.system.desktop){t.focus()}this._bSuggestionItemTapped=true;var i=o.getParameter("listItem");t.setSelectionRow(i,true)}.bind(this)});this._oSuggestionTable.addEventDelegate({onAfterRendering:function(){var e,o;if(!t.getEnableSuggestionsHighlighting()){return}e=this._oSuggestionTable.$().find("tbody .sapMLabel");o=(this._sTypedInValue||this._oInput.getValue()).toLowerCase();this.highlightSuggestionItems(e,o)}.bind(this)});if(this._bUseDialog){this._oSuggestionTable.addStyleClass("sapMInputSuggestionTableHidden")}this._oSuggestionTable.updateItems=function(){T.prototype.updateItems.apply(t,arguments);t._refreshItemsDelayed();return t}}t._oSuggestionTable=this._oSuggestionTable;return this._oSuggestionTable};D.prototype._createHighlightedText=function(e,t,o){var i,s,n,r,a,u=e?e.innerText:"",l="";if(!D._wordStartsWithValue(u,t)){return x(u)}t=t.toLowerCase();n=t.length;while(D._wordStartsWithValue(u,t)){i=u.toLowerCase();s=i.indexOf(t);s=s>0?i.indexOf(" "+t)+1:s;a=u.substring(0,s);u=u.substring(s);l+=x(a);a=u.substring(0,n);u=u.substring(n);l+='<span class="sapMInputHighlight">'+x(a)+"</span>";r=u.indexOf(" ");r=r===-1?u.length:r;a=u.substring(0,r);u=u.substring(r);l+=x(a);if(!o){break}}if(u){l+=x(u)}return l};D.prototype._createSimpleFixFlex=function(){var e=this._oInput.getId()+"-simplefixflex";return new y({id:e,fixContent:this._getPickerValueStateText(),flexContent:this._oList})};D.prototype.highlightSuggestionItems=function(e,t,o){var i;if(!this._bEnableHighlighting||!e&&!e.length){return}for(i=0;i<e.length;i++){e[i].innerHTML=this._createHighlightedText(e[i],t,o)}};D.prototype._registerAutocomplete=function(){var e=this._oPopover,t=this._getInput(),o=this._bUseDialog;if(o){e.addEventDelegate({ontap:function(){if(!this._bSuggestionItemTapped&&this._sProposedItemText){t.setValue(this._sProposedItemText);this._sProposedItemText=null}}},this)}else{e.attachAfterOpen(this._handleTypeAhead,this)}e.attachAfterOpen(this._setSelectedSuggestionItem,this);e.attachAfterClose(this._finalizeAutocomplete,this);this._oInputDelegate={onkeydown:function(e){this._bDoTypeAhead=this._bAutocompleteEnabled&&e.which!==L.BACKSPACE&&e.which!==L.DELETE},oninput:this._handleTypeAhead};t.addEventDelegate(this._oInputDelegate,this)};D.prototype._handleTypeAhead=function(){var t=this._getInput(),o=t.getValue();this._oProposedItem=null;this._sProposedItemText=null;this._sTypedInValue=o;if(!this._bDoTypeAhead||o===""){return}if(!this._oPopover.isOpen()||o.length<this._oInput.getStartSuggestion()){return}if(document.activeElement!==t.getFocusDomRef()){return}var i=o.toLowerCase(),s=this._hasTabularSuggestions(),n=s?this._oInput.getSuggestionRows():this._oInput.getSuggestionItems(),r,a,u,l;n=n.filter(function(e){return!(e.isA("sap.ui.core.SeparatorItem")||e.isA("sap.m.GroupHeaderListItem"))});r=n.length;for(l=0;l<r;l++){u=s?this._oInput._fnRowResultFilter(n[l]):n[l].getText();if(u.toLowerCase().indexOf(i)===0){this._oProposedItem=n[l];a=u;break}}this._sProposedItemText=a;if(a){a=this._formatTypedAheadValue(a);if(!t.isComposingCharacter()){t.updateDomValue(a)}if(e.system.desktop){t.selectText(o.length,a.length)}else{setTimeout(function(){t.selectText(o.length,a.length)},0)}}};D.prototype._setSelectedSuggestionItem=function(){var e;if(this._oList){e=this._oList.getItems();for(var t=0;t<e.length;t++){if((e[t]._oItem||e[t])===this._oProposedItem){e[t].setSelected(true);break}}}};D.prototype._getInput=function(){return this._bUseDialog?this._oPopupInput:this._oInput};D.prototype._finalizeAutocomplete=function(){if(this._oInput.isComposingCharacter()){return}if(!this._bAutocompleteEnabled){return}if(!this._bSuggestionItemTapped&&!this._bSuggestionItemChanged&&this._oProposedItem){if(this._hasTabularSuggestions()){this._oInput.setSelectionRow(this._oProposedItem,true)}else{this._oInput.setSelectionItem(this._oProposedItem,true)}}if(this._oProposedItem&&document.activeElement===this._oInput.getFocusDomRef()){var e=this._oInput.getValue().length;this._oInput.selectText(e,e)}this._resetTypeAhead()};D.prototype._resetTypeAhead=function(){this._oProposedItem=null;this._sProposedItemText=null;this._sTypedInValue="";this._bSuggestionItemTapped=false;this._bSuggestionItemChanged=false};D.prototype._formatTypedAheadValue=function(e){return this._sTypedInValue.concat(e.substring(this._sTypedInValue.length,e.length))};D.prototype._onsapright=function(){var e=this._oInput,t=e.getValue();if(!this._bAutocompleteEnabled){return}if(this._sTypedInValue!==t){this._sTypedInValue=t;e.fireLiveChange({value:t,newValue:t})}};D.prototype.updateValueState=function(e,t,o){var i=o&&e!==F.None;t=t||n.getAdditionalText(e);if(this._oPopupInput){this._oPopupInput.setValueState(e)}this._setValueStateText(t);this._showValueStateText(i);this._alignValueStateStyles(e);return this};D.prototype._getPickerValueStateText=function(){if(!this._oPickerValueStateText){this._oPickerValueStateText=new P({width:"100%"})}return this._oPickerValueStateText};D.prototype._showValueStateText=function(e){if(this._oPickerValueStateText){this._oPickerValueStateText.setVisible(e)}};D.prototype._setValueStateText=function(e){var t;t=this._getPickerValueStateText();if(t){t.setText(e);if(this._oSimpleFixFlex){this._oSimpleFixFlex.setFixContent(this._oPickerValueStateText)}}};D.prototype._alignValueStateStyles=function(e){var t=E+"ValueState",o=E+this._sOldValueState+"State",i=E+e+"State";if(this._oPickerValueStateText){this._oPickerValueStateText.addStyleClass(t);this._oPickerValueStateText.removeStyleClass(o);this._oPickerValueStateText.addStyleClass(i)}this._sOldValueState=e};D.prototype.addFlexContent=function(e){if(this._oSimpleFixFlex){this._oSimpleFixFlex.addFlexContent(e)}};return D});