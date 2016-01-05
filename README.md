 * jquery table sorter plugin * 
 * =========================================================
 * Ivanenko Danil 
 * ========================================================= 
 
������������ ��� ���������� html ������. ����� ������������ ��� ajax ���������� ������ � �������.
html ������� ������ ���� ��������� ��������� �������:
```
<table id="sortable">
 <tr>
	<th sortby="first_name">User</th>
	<th sortby="date">Date</th>
	<th>Price</th>
 </tr>
  ......
```
� ������� ��������� ������� � ���������� sortby ����� ���������� ������ ����������. ��� ����� �� ������ ����� ��������� ������ ���������� ���� �� ������:
```
 http://server.com/somepage.html?sortby=first_name&sortorder=asc
```

### ������ �������������:
```
$("#sortable").tableSorter();
```

### ������ ������������� ��� ajax-����������, ��� ������������ ��������
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

### ��������� �������

- *callback* - �������, ������� ����� ������� ����� ����������� ������ � ���������, �������� �� ����� �������������. ������� ������ ��������� ��� ��������� - sortby, sortorder
- *saveUrlParams* - true\false. ���������� ������ ��������� � URL �� ������, ����� sortby, sortorder ��� ���
- *sorterDefaultClass* - �����, ������������ ��� ����������� ���������������� ���������, �� ��������� "sorter"
- *sorterAscClass* - �����, ������������ ��� ����������� �������������� �� ����������� ���������. �� ��������� "sorter-asc"
- *sorterDescClass* - �����, ������������ ��� ����������� �������������� �� �������� ���������. �� ��������� "sorter-desc"
 
