/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Item","sap/ui/core/Icon","./NavigationList","sap/ui/core/InvisibleText","sap/ui/core/Renderer","sap/ui/core/IconPool","sap/ui/events/KeyCodes","sap/ui/core/library","sap/ui/dom/jquery/Aria"],function(t,e,i,a,s,n,r,o,p,l){"use strict";var d=l.TextAlign;var c=l.TextDirection;var g=i.extend("sap.tnt.NavigationListItem",{metadata:{library:"sap.tnt",properties:{icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:""},expanded:{type:"boolean",group:"Misc",defaultValue:true},hasExpander:{type:"boolean",group:"Misc",defaultValue:true},visible:{type:"boolean",group:"Appearance",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.tnt.NavigationListItem",multiple:true,singularName:"item"},_expandIconControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{select:{parameters:{item:{type:"sap.ui.core.Item"}}}}}});g.expandIcon="sap-icon://navigation-right-arrow";g.collapseIcon="sap-icon://navigation-down-arrow";g._getInvisibleText=function(){return this._invisibleText||(this._invisibleText=(new n).toStatic())};g.prototype.init=function(){this._resourceBundle=e.getLibraryResourceBundle("sap.ui.core");this._resourceBundleMLib=e.getLibraryResourceBundle("sap.m")};g.prototype._getUniqueKey=function(){var t=this.getKey();if(t){return t}return this.getId()};g.prototype._getExpandIconControl=function(){var t=this.getAggregation("_expandIconControl");if(!t){var e=this.getExpanded();t=new a({src:e?g.collapseIcon:g.expandIcon,visible:this.getItems().length>0&&this.getHasExpander(),useIconTooltip:false,tooltip:this._getExpandIconTooltip(!e)}).addStyleClass("sapTntNavLIExpandIcon");this.setAggregation("_expandIconControl",t,true)}return t};g.prototype._getExpandIconTooltip=function(t){if(!this.getEnabled()){return""}var e=t?"Icon.expand":"Icon.collapse";return this._resourceBundle.getText(e)};g.prototype.getLevel=function(){var t=0;var e=this.getParent();if(e.getMetadata().getName()=="sap.tnt.NavigationListItem"){return e.getLevel()+1}return t};g.prototype.getNavigationList=function(){var t=this.getParent();while(t&&t.getMetadata().getName()!="sap.tnt.NavigationList"){t=t.getParent()}return t};g.prototype.createPopupList=function(){var t=[],e=this.getNavigationList(),i=e.getSelectedItem(),a,n,r,o=this.getItems();for(var p=0;p<o.length;p++){n=o[p];if(n.getVisible()){r=new g({key:n.getId(),text:n.getText(),textDirection:n.getTextDirection(),enabled:n.getEnabled()});t.push(r);if(i==n){a=r}}}var l=new g({expanded:true,hasExpander:false,key:this.getId(),text:this.getText(),enabled:this.getEnabled(),textDirection:this.getTextDirection(),items:t});var d=new s({itemSelect:this.onPopupItemSelect.bind(this),items:[l]}).addStyleClass("sapTntNavLIPopup");if(i==this){a=l;d.isGroupSelected=true}d.setSelectedItem(a);return d};g.prototype.onPopupItemSelect=function(t){var e=t.getParameter("item");e=sap.ui.getCore().byId(e.getKey());e._selectItem(t)};g.prototype._selectItem=function(t){var e={item:this};this.fireSelect(e);var i=this.getNavigationList();i._selectItem(e)};g.prototype.onkeydown=function(t){if(t.isMarked("subItem")){return}t.setMarked("subItem");if(this.getLevel()>0){return}var e=sap.ui.getCore().getConfiguration().getRTL();if(t.shiftKey&&t.which==189||t.which==p.NUMPAD_MINUS||t.which==p.ARROW_RIGHT&&e||t.which==p.ARROW_LEFT&&!e){if(this.collapse()){t.preventDefault();t.target=null}}else if(t.which==p.NUMPAD_PLUS||t.shiftKey&&t.which==p.PLUS||t.which==p.ARROW_LEFT&&e||t.which==p.ARROW_RIGHT&&!e){if(this.expand()){t.preventDefault();t.target=null}}};g.prototype.expand=function(t){if(this.getExpanded()||!this.getHasExpander()||this.getItems().length==0||this.getLevel()>0){return}this.setProperty("expanded",true,true);this.$().find(".sapTntNavLIGroup").attr("aria-expanded",true);var e=this._getExpandIconControl();e.setSrc(g.collapseIcon);e.setTooltip(this._getExpandIconTooltip(false));var i=this.$().find(".sapTntNavLIGroupItems");i.stop(true,true).slideDown(t||"fast",function(){i.toggleClass("sapTntNavLIHiddenGroupItems")});this.getNavigationList()._updateNavItems();return true};g.prototype.collapse=function(t){if(!this.getExpanded()||!this.getHasExpander()||this.getItems().length==0||this.getLevel()>0){return}this.setProperty("expanded",false,true);this.$().find(".sapTntNavLIGroup").attr("aria-expanded",false);var e=this._getExpandIconControl();e.setSrc(g.expandIcon);e.setTooltip(this._getExpandIconTooltip(true));var i=this.$().find(".sapTntNavLIGroupItems");i.stop(true,true).slideUp(t||"fast",function(){i.toggleClass("sapTntNavLIHiddenGroupItems")});this.getNavigationList()._updateNavItems();return true};g.prototype.ontap=function(t){if(t.isMarked("subItem")||!this.getEnabled()){return}t.setMarked("subItem");t.preventDefault();var e=this.getNavigationList();var i=sap.ui.getCore().byId(t.target.id);var a=this.getLevel();if(a==1){var s=this.getParent();if(this.getEnabled()&&s.getEnabled()){this._selectItem(t)}return}if(e.getExpanded()||this.getItems().length==0){if(!i||i.getMetadata().getName()!="sap.ui.core.Icon"||!i.$().hasClass("sapTntNavLIExpandIcon")){this._selectItem(t);return}if(this.getExpanded()){this.collapse()}else{this.expand()}}else{var n=this.createPopupList();e._openPopover(this,n)}};g.prototype.onsapenter=g.prototype.ontap;g.prototype.onsapspace=g.prototype.ontap;g.prototype.render=function(t,e){if(!this.getVisible()){return}if(this.getLevel()===0){this.renderFirstLevelNavItem(t,e)}else{this.renderSecondLevelNavItem(t,e)}};g.prototype.renderGroupItem=function(t,e){var i=e.getExpanded(),a=this.getExpanded(),s=this.getText(),n,r={level:"1"};if(i&&this.getItems().length!==0){r.expanded=a}t.openStart("div");t.class("sapTntNavLIItem");t.class("sapTntNavLIGroup");if(!this.getEnabled()){t.class("sapTntNavLIItemDisabled")}else{t.attr("tabindex","-1")}if(!i||e.hasStyleClass("sapTntNavLIPopup")){n=this.getTooltip_AsString()||s;if(n){t.attr("title",n)}r.role="menuitem";if(!e.hasStyleClass("sapTntNavLIPopup")){r.haspopup=true}}else{r.role="treeitem"}t.accessibilityState(r);if(e.getExpanded()){n=this.getTooltip_AsString()||s;if(n){t.attr("title",n)}}t.openEnd();this._renderIcon(t);if(e.getExpanded()){var o=this._getExpandIconControl();o.setVisible(this.getItems().length>0&&this.getHasExpander());o.setSrc(this.getExpanded()?g.collapseIcon:g.expandIcon);o.setTooltip(this._getExpandIconTooltip(!this.getExpanded()));this._renderText(t);t.renderControl(o)}t.close("div")};g.prototype.renderFirstLevelNavItem=function(t,e){var i,a=this._getVisibleItems(this),s=a.length,n=this.getExpanded(),r=e.getExpanded();t.openStart("li",this);if(this.getEnabled()&&!r){t.attr("tabindex","-1")}t.openEnd();this.renderGroupItem(t,e);if(r){t.openStart("ul");t.attr("aria-hidden","true");t.attr("role","group");t.class("sapTntNavLIGroupItems");if(!n){t.class("sapTntNavLIHiddenGroupItems")}t.openEnd();for(var o=0;o<s;o++){i=a[o];i.render(t,e,o,s)}t.close("ul")}t.close("li")};g.prototype.renderSecondLevelNavItem=function(t,e){var i=this.getParent();t.openStart("li",this);t.class("sapTntNavLIItem");t.class("sapTntNavLIGroupItem");if(!this.getEnabled()||!i.getEnabled()){t.class("sapTntNavLIItemDisabled")}else{t.attr("tabindex","-1")}var a=this.getText();var s=this.getTooltip_AsString()||a;if(s){t.attr("title",s)}t.accessibilityState({role:e.hasStyleClass("sapTntNavLIPopup")?"menuitem":"treeitem",level:"2"});t.openEnd();this._renderText(t);t.close("li")};g.prototype._renderIcon=function(t){var e=this.getIcon(),i=o.getIconInfo(e);if(e){t.openStart("span");t.class("sapUiIcon");t.class("sapTntNavLIGroupIcon");t.attr("aria-hidden",true);if(i&&!i.suppressMirroring){t.class("sapUiIconMirrorInRTL")}if(i){t.attr("data-sap-ui-icon-content",i.content);t.style("font-family","'"+i.fontFamily+"'")}t.openEnd();t.close("span")}else{t.openStart("span");t.class("sapUiIcon");t.class("sapTntNavLIGroupIcon");t.attr("aria-hidden",true);t.openEnd();t.close("span")}};g.prototype._renderText=function(t){t.openStart("span");t.class("sapMText");t.class("sapTntNavLIText");t.class("sapMTextNoWrap");var e=this.getTextDirection();if(e!==c.Inherit){t.attr("dir",e.toLowerCase())}var i=r.getTextAlign(d.Begin,e);if(i){t.style("text-align",i)}t.openEnd();t.text(this.getText());t.close("span")};g.prototype._unselect=function(){var t=this.$(),e=this.getNavigationList();if(!e){return}t.removeClass("sapTntNavLIItemSelected");if(e.getExpanded()){if(this.getLevel()===0){t=t.find(".sapTntNavLIGroup")}t.removeAttr("aria-selected")}else{t.removeAttr("aria-pressed")}};g.prototype._select=function(){var t=this.$(),e=this.getNavigationList();if(!e){return}t.addClass("sapTntNavLIItemSelected");if(e.getExpanded()){if(this.getLevel()===0){t=t.find(".sapTntNavLIGroup")}t.attr("aria-selected",true)}else{t.attr("aria-pressed",true);e._closePopover()}};g.prototype._getDomRefs=function(){var t=[];if(!this.getEnabled()){return t}var e=this.$();t.push(e.find(".sapTntNavLIGroup")[0]);if(this.getExpanded()){var i=e.find(".sapTntNavLIGroupItem");for(var a=0;a<i.length;a++){t.push(i[a])}}return t};g.prototype._getVisibleItems=function(t){var e=[];var i=t.getItems();var a;for(var s=0;s<i.length;s++){a=i[s];if(a.getVisible()){e.push(a)}}return e};g.prototype.onfocusin=function(t){if(t.srcControl!==this){return}this._updateAccessibilityText()};g.prototype._updateAccessibilityText=function(){var t=g._getInvisibleText(),e=this.getNavigationList(),i=this._resourceBundleMLib,a=e.getExpanded()?i.getText("ACC_CTR_TYPE_TREEITEM"):"",s=this._getAccessibilityItem(),n=this._getAccessibilityPosition(),r=i.getText("LIST_ITEM_POSITION",[n.index,n.size]),o=e._selectedItem===this?i.getText("LIST_ITEM_SELECTED"):"",p=e.getExpanded()?this.getText():"",l=a+" "+r+" "+o+" "+p;t.setText(l);s.addAriaLabelledBy(t.getId())};g.prototype._getAccessibilityPosition=function(){var t=this.getParent(),e=this._getVisibleItems(t),i=e.length,a=e.indexOf(this)+1;return{index:a,size:i}};g.prototype._getAccessibilityItem=function(){var t=this.$();if(this.getLevel()===0){t=t.find(".sapTntNavLIGroup")}return t};return g});