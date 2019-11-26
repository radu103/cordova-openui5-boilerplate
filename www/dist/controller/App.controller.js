sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,r,i){"use strict";return e.extend("sap.ui.demo.todo.controller.App",{onInit:function(){this.aSearchFilters=[];this.aTabFilters=[];alert(JSON.stringify(navigator.connection))},addTodo:function(){var e=this.getView().getModel();var t=e.getProperty("/todos").map(function(e){return Object.assign({},e)});t.push({title:e.getProperty("/newTodo"),completed:false});e.setProperty("/todos",t);e.setProperty("/newTodo","")},clearCompleted:function(){var e=this.getView().getModel();var t=e.getProperty("/todos").map(function(e){return Object.assign({},e)});var r=t.length;while(r--){var i=t[r];if(i.completed){t.splice(r,1)}}e.setProperty("/todos",t)},updateItemsLeftCount:function(){var e=this.getView().getModel();var t=e.getProperty("/todos")||[];var r=t.filter(function(e){return e.completed!==true}).length;e.setProperty("/itemsLeftCount",r)},onSearch:function(e){var t=this.getView().getModel();this.aSearchFilters=[];var o=e.getSource().getValue();if(o&&o.length>0){t.setProperty("/itemsRemovable",false);var s=new r("title",i.Contains,o);this.aSearchFilters.push(s)}else{t.setProperty("/itemsRemovable",true)}this._applyListFilters()},onFilter:function(e){this.aTabFilters=[];var t=e.getParameter("item").getKey();switch(t){case"active":this.aTabFilters.push(new r("completed",i.EQ,false));break;case"completed":this.aTabFilters.push(new r("completed",i.EQ,true));break;case"all":default:}this._applyListFilters()},_applyListFilters:function(){var e=this.byId("todoList");var t=e.getBinding("items");t.filter(this.aSearchFilters.concat(this.aTabFilters),"todos")}})});