/* =========================================================
 * jquery table sorter plugin * 
 * =========================================================
 * Ivanenko Danil 
 * ========================================================= 
 * Используется для сортировки html таблиц. Можно использовать для ajax сортировки данных в таблице.
 * html таблица должна быть оформлена следующим образом:
 * <table id="sortable">
 *	 <tr>
 *		<th sortby="first_name">User</th>
 *		<th sortby="date">Date</th>
 *		<th>Price</th>
 *   </tr>
 *   ......
 * В ячейках заголовка таблицы с параметром sortby будет отображена иконка сортировки. При клике на ячейке будет отправлен запрос следующего вида на сервер:
 * http://server.com/somepage.html?sortby=first_name&sortorder=asc
 *
 * Пример использования:
 * $("#sortable").tableSorter();
 *
 * Пример использования для ajax-сортировки, без перезагрузки страницы
 * $("#sortable").tableSorter({
 *			callback: function(sortBy, sortOrder){
 *				$.getJSON(getDataURL, {
 *					parameter1 : 0,
 *					sortby: sortBy,
 *					sortorder: sortOrder
 *				}, some_Function_Redrawing_Your_Table_Body);
 *			}
 *		});
 *
 * Параметры плагина
 * callback - функция, которая будет вызвана после перерисовки иконок в заголовке, страница не будет перезагружена. Функция должна принимать два параметра - sortby, sortorder
 * saveUrlParams - true\false. Передавать другие параметры в URL на сервер, кроме sortby, sortorder или нет
 * sorterDefaultClass - класс, используемый для отображения несортированного заголовка, по умолчанию "sorter"
 * sorterAscClass - класс, используемый для отображения сортированного по возрастанию заголовка. По умолчанию "sorter-asc"
 * sorterDescClass - класс, используемый для отображения сортированного по убыванию заголовка. По умолчанию "sorter-desc"
 * 
 */

(function($) {
	
	getParameterByName = function(name) {
	    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	},	
	
	removeURLParam = function (url, param)
	{
		 var urlparts= url.split('?');
		 if (urlparts.length>=2)
		 {
			  var prefix= encodeURIComponent(param)+'=';
			  var pars= urlparts[1].split(/[&;]/g);
			  for (var i=pars.length; i-- > 0;)
				  if (pars[i].indexOf(prefix, 0)==0)
					  pars.splice(i, 1);
			  if (pars.length > 0)
				  return urlparts[0]+'?'+pars.join('&');
			  else
				  return urlparts[0];
		 }
		 else
			 return url;
	},
	
	$.fn.tableSorter = function( options ) {
		
		// Establish our default settings
        var settings = $.extend({
            saveUrlParams: false,
            callback: null,
			sorterDefaultClass: "sorter",
			sorterAscClass: "sorter-asc",
			sorterDescClass: "sorter-desc"
        }, options);
        
		this.find("th").addClass("header");
		this.find("[sortby]").append('  <i class="'+settings.sorterDefaultClass+'"></i>');        
        var sortBy = getParameterByName("sortby");
        var sortOrder = getParameterByName("sortorder");
        if(sortBy!=null){
        	var strIcon = '<i class="'+settings.sorterAscClass+'"></i>';
        	if(sortOrder==null)
        		sortOrder = "asc";
        	if(sortOrder=="desc")
        		strIcon = '<i class="'+settings.sorterDescClass+'"></i>';
        		
        	this.find("[sortby="+sortBy+"]").find("i").replaceWith(strIcon);
        	this.find("[sortby="+sortBy+"]").attr("sortorder", sortOrder).addClass("sorted-column");
        }        
        var sorter = this;
        
        this.on("click", "[sortby]", function(){
        	
        	var sortOrder = $(this).attr("sortorder");
        	var sortBy = $(this).attr("sortby");
        	sortOrder = (sortOrder=="asc" ? "desc" : "asc");
        	
        	if ( $.isFunction( settings.callback ) ) {
        		var strIcon = '<i class="sorter-asc"></i>';            	
            	if(sortOrder=="desc")
            		strIcon = '<i class="sorter-desc"></i>';
            	
            	sorter.find("[sortby]")
            		.removeClass("sorted-column")
            		.removeAttr("sortorder")
            		.find("i").replaceWith('<i class="sorter"></i>');
        		$(this).find("i").replaceWith(strIcon);
        		$(this).attr("sortorder", sortOrder).addClass("sorted-column");
        		        		
		        settings.callback.call( this, sortBy, sortOrder );
		        return;
		    }
        	
        	if(settings.saveUrlParams==true){
        		var url = removeURLParam(window.location.href, "sortby");
            	url = removeURLParam(url, "sortorder");
            	
            	var start = url.indexOf("?")>0 ? '&': '?' ;
            	window.location = url + start+"sortby="+$(this).attr("sortby")+"&sortorder="+sortOrder;
        	} else {
        		var url = window.location.href.split("?")[0];        	
            	window.location = url + "?sortby="+$(this).attr("sortby")+"&sortorder="+sortOrder;
        	}
        	
        });
		
	}
}(jQuery));