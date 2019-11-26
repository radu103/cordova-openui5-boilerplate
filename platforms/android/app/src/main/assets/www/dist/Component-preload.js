//@ui5-bundle sap/ui/demo/todo/Component-preload.js
sap.ui.require.preload({
	"sap/ui/demo/todo/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/core/ComponentSupport"],function(e){"use strict";return e.extend("sap.ui.demo.todo.Component",{metadata:{manifest:"json"}})});
},
	"sap/ui/demo/todo/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,r,i){"use strict";return e.extend("sap.ui.demo.todo.controller.App",{onInit:function(){this.aSearchFilters=[];this.aTabFilters=[]},addTodo:function(){var e=this.getView().getModel();var t=e.getProperty("/todos").map(function(e){return Object.assign({},e)});t.push({title:e.getProperty("/newTodo"),completed:false});e.setProperty("/todos",t);e.setProperty("/newTodo","")},clearCompleted:function(){var e=this.getView().getModel();var t=e.getProperty("/todos").map(function(e){return Object.assign({},e)});var r=t.length;while(r--){var i=t[r];if(i.completed){t.splice(r,1)}}e.setProperty("/todos",t)},updateItemsLeftCount:function(){var e=this.getView().getModel();var t=e.getProperty("/todos")||[];var r=t.filter(function(e){return e.completed!==true}).length;e.setProperty("/itemsLeftCount",r)},onSearch:function(e){var t=this.getView().getModel();this.aSearchFilters=[];var o=e.getSource().getValue();if(o&&o.length>0){t.setProperty("/itemsRemovable",false);var s=new r("title",i.Contains,o);this.aSearchFilters.push(s)}else{t.setProperty("/itemsRemovable",true)}this._applyListFilters()},onFilter:function(e){this.aTabFilters=[];var t=e.getParameter("item").getKey();switch(t){case"active":this.aTabFilters.push(new r("completed",i.EQ,false));break;case"completed":this.aTabFilters.push(new r("completed",i.EQ,true));break;case"all":default:}this._applyListFilters()},_applyListFilters:function(){var e=this.byId("todoList");var t=e.getBinding("items");t.filter(this.aSearchFilters.concat(this.aTabFilters),"todos")}})});
},
	"sap/ui/demo/todo/i18n/i18n.properties":'TITLE=todos\nINPUT_PLACEHOLDER=What needs to be done?\nITEM_LEFT=item left\nITEMS_LEFT=items left\nCLEAR_COMPLETED=Clear completed\n',
	"sap/ui/demo/todo/i18n/i18n_de.properties":'TITLE=Todos\nINPUT_PLACEHOLDER=Was muss getan werden?\nITEM_LEFT=Eintrag \\u00fcbrig\nITEMS_LEFT=Eintr\\u00e4ge \\u00fcbrig\nCLEAR_COMPLETED=Erledigte Eintr\\u00e4ge entfernen\n',
	"sap/ui/demo/todo/i18n/i18n_en.properties":'TITLE=todos\nINPUT_PLACEHOLDER=What needs to be done?\nITEM_LEFT=item left\nITEMS_LEFT=items left\nCLEAR_COMPLETED=Clear completed\n',
	"sap/ui/demo/todo/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"sap.ui.demo.todo","type":"application"},"sap.ui5":{"dependencies":{"minUI5Version":"1.60.0","libs":{"sap.ui.core":{},"sap.m":{}}},"rootView":{"viewName":"sap.ui.demo.todo.view.App","type":"XML","async":true,"id":"app"},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"sap.ui.demo.todo.i18n.i18n"}},"":{"type":"sap.ui.model.json.JSONModel","uri":"model/todoitems.json"}},"resources":{"css":[{"uri":"css/styles.css"}]}}}',
	"sap/ui/demo/todo/model/todoitems.json":'{"newTodo":"","todos":[{"title":"Start this app","completed":true},{"title":"Learn OpenUI5","completed":false}],"itemsRemovable":true,"completedCount":1}',
	"sap/ui/demo/todo/view/App.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" controllerName="sap.ui.demo.todo.controller.App" displayBlock="true"><Shell><App><Page title="{i18n>TITLE}" backgroundDesign="List"><subHeader><Toolbar><SearchField\n\t\t\t\t\t\t\tid="searchTodoItemsInput"\n\t\t\t\t\t\t\tliveChange=".onSearch"\n\t\t\t\t\t\t\twidth="100%"/></Toolbar></subHeader><content><Input class="todoInput" id="addTodoItemInput" value="{/newTodo}" placeholder="{i18n>INPUT_PLACEHOLDER}" change=".addTodo"/><List id="todoList"\n\t\t\t\t\t\titems="{ path: \'/todos\', events: { change: \'.updateItemsLeftCount\' } }"\n\t\t\t\t\t\tmode="MultiSelect"\n\t\t\t\t\t\tgrowing="true"\n\t\t\t\t\t\tgrowingScrollToLoad="true"\n\t\t\t\t\t\tshowNoData="false"\n\t\t\t\t\t\tshowSeparators="None"\n\t\t\t\t\t\trememberSelections="false"><infoToolbar><Toolbar><Label id="itemsLeftLabel" text="{= ${/itemsLeftCount} === 1 ? ${/itemsLeftCount} + \' \' + ${i18n>ITEM_LEFT} : ${/itemsLeftCount} + \' \' + ${i18n>ITEMS_LEFT} }"/></Toolbar></infoToolbar><CustomListItem class="todoListItem" selected="{completed}"><Input enabled="{=!${completed}}" value="{title}"/></CustomListItem></List></content><footer><Bar><contentMiddle><SegmentedButton selectedKey="all" selectionChange=".onFilter" class="sapMSegmentedButtonNoAutoWidth"><items><SegmentedButtonItem id="filterButton-all" text="All" key="all"/><SegmentedButtonItem id="filterButton-active" text="Active" key="active"/><SegmentedButtonItem id="filterButton-completed" text="Completed" key="completed"/></items></SegmentedButton></contentMiddle><contentRight><Button id="clearCompleted" enabled="{/itemsRemovable}" icon="sap-icon://delete" text="{i18n>CLEAR_COMPLETED}" press=".clearCompleted"/></contentRight></Bar></footer></Page></App></Shell></mvc:View>\n'
});
