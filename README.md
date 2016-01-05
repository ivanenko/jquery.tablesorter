 * jquery table sorter plugin * 
 * =========================================================
 * Ivanenko Danil 
 * ========================================================= 
 
»спользуетс€ дл€ сортировки html таблиц. ћожно использовать дл€ ajax сортировки данных в таблице.
html таблица должна быть оформлена следующим образом:
```
<table id="sortable">
 <tr>
	<th sortby="first_name">User</th>
	<th sortby="date">Date</th>
	<th>Price</th>
 </tr>
  ......
```
¬ €чейках заголовка таблицы с параметром sortby будет отображена иконка сортировки. ѕри клике на €чейке будет отправлен запрос следующего вида на сервер:
```
 http://server.com/somepage.html?sortby=first_name&sortorder=asc
```

### ѕример использовани€:
```
$("#sortable").tableSorter();
```

### ѕример использовани€ дл€ ajax-сортировки, без перезагрузки страницы
```
$("#sortable").tableSorter({
		callback: function(sortBy, sortOrder){
			$.getJSON(getDataURL, {
				parameter1 : 0,
				sortby: sortBy,
				sortorder: sortOrder
			}, some_Function_Redrawing_Your_Table_Body);
		}
	});
```

### ѕараметры плагина

- *callback* - функци€, котора€ будет вызвана после перерисовки иконок в заголовке, страница не будет перезагружена. ‘ункци€ должна принимать два параметра - sortby, sortorder
- *saveUrlParams* - true\false. ѕередавать другие параметры в URL на сервер, кроме sortby, sortorder или нет
- *sorterDefaultClass* - класс, используемый дл€ отображени€ несортированного заголовка, по умолчанию "sorter"
- *sorterAscClass* - класс, используемый дл€ отображени€ сортированного по возрастанию заголовка. ѕо умолчанию "sorter-asc"
- *sorterDescClass* - класс, используемый дл€ отображени€ сортированного по убыванию заголовка. ѕо умолчанию "sorter-desc"
 
