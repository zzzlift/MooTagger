$(document).ready(function() {
	/*
	$("#upload_URL").on("click",function(){
		alert("he");
		var d=$( "#frameDemo" ).contents().find( "body" ).html();
		console.info(d);
		$("#show").append(d);
	});
	*/
	/*
	$.get( "https://github.com/", function( data ) {
	  alert( data );
	});
	*/
	/*
	$("#upload_URL").on("click",function(){
		//$( "#show" ).load( "http://api.jquery.com/load/" );
		$.ajax("https://www.taobao.com/").done(function(responseText) {
		// do something here
		alert(responseText);
		});
	});
	*/
	$("#upload").on("click",function(){
		$("#show").html("");
		var keyword=$("#keyword").val().trim();
		var data=$("#textarea").val().trim();
		data="keywords: "+keyword+"<br><br><br>"+data;
		if(data==""|data==null){
			return;
		}
		/*
		if(keyword==""|keyword==null){
			return;
		}*/
		process(keyword,data);
		appendMap(data);
    });
	
	$("#upload_zh").on("click",function(){
		$("#show").html("");
		var keyword=$("#keyword").val().trim();
		var data=$("#textarea").val().trim();
		data="keywords: "+keyword+"<br><br><br>"+data;
		if(data==""|data==null){
			return;
		}
		/*
		if(keyword==""|keyword==null){
			return;
		}*/
		process(keyword,data);
		//appendMap_zh(data);
    });
	
	/**/
	process=function(keyword,data){
		var list=keyword.split("  ");
		var e;
		var highlightText=highlight(list,data);
		var text="<p>"+highlightText+"</p>";
		var text_e=$(text);
		var span=$("<span></span>");
		$("#result_one").html(span);
		span.html(text_e);
	};
	/*append to map to page*/
	appendMap=function(data){
		var map=maptheData(data);
		
		var sortedMap=sortMap(map);
		var table=$(map2Table(sortedMap));
		var h3=$("<h3>Statistic</h3>");
		$("#dict").html(h3);
		$("#dict").append(table);
	}
	/**/
	appendMap_zh=function(data){
		var map=maptheData(data);
		var table=$(map2Table_zh(map));
		var h3=$("<h3>统计</h3>");
		$("#dict").html(h3);
		$("#dict").append(table);
	}
	/*sort the map according to value*/
	sortMap=function(map){
		
		var sortable = [];
		for (var [key,value] of map){
			if(key==null|key=="") continue;
			if(value==null|value=="") continue;
			sortable.push([key, value]);
			}
		
		sortable.sort(
			function(a, b) {
				return b[1]-a[1]; 
			}
		)
		
		return sortable;
	}
	/*convert the map 2 table*/
	map2Table=function(t){
		
		var table1="<table id=\"students\" border=\"1\">";
		var thead="<thead><tr><th>Word</th><th>Times</th></tr></thead>";
		var tbody1="<tbody>";
		var content="";
		for (var e in t){
			//console.info(t[e][0]);
			var tr1="<tr class=\"student\">"
			var td1="<td>"+t[e][0]+"</td>";
			var td2="<td>"+t[e][1]+"</td>";
			var tr2="</tr>";
			var tr=tr1+td1+td2+tr2;
			content=content+tr;
		}
		var tbody2="</tbody>";
		var table2="</table>";
		var table=table1+thead+tbody1+content+tbody2+table2;
		return table;
	}
	
	map2Table_zh=function(t){
		
		var table1="<table id=\"students\" border=\"1\">";
		var thead="<thead><tr><th>词语</th><th>次数</th></tr></thead>";
		var tbody1="<tbody>";
		var content="";
		for (var [key,value] of t){
			//console.info(t[e][0]);
			var tr1="<tr class=\"student\">"
			var td1="<td>"+key+"</td>";
			var td2="<td>"+value+"</td>";
			var tr2="</tr>";
			var tr=tr1+td1+td2+tr2;
			content=content+tr;
		}
		var tbody2="</tbody>";
		var table2="</table>";
		var table=table1+thead+tbody1+content+tbody2+table2;
		return table;
	}
	/*convert the data to map*/
	maptheData=function(data){
		var map = new Map();
		arr=data.split(" ");
		for(var e in arr){
			if(arr[e]==""|arr[e]==null){
				continue;
			}
			if(map.has(arr[e])){
				var n=map.get(arr[e]);
				var n=n+1;
				map.set(arr[e],n);
			}else{
				map.set(arr[e],1);
			}
		}
		return map;
		
	};
	/*hightlight the keywords*/
	highlight=function(list,text){
		var strs=text;
		for(var i=0;i<list.length;i++){
			var k=i;
			var ch=list[i].trim();
			if(ch==null|ch=="") {list.splice(i,1); i=i-1; continue;}
			console.info(ch);
			var strs=strs.replaceAll(ch,"<span class=\"e"+i+"\">"+list[i]+"</span>");
		}
		return strs;
	};
	/*replaceAll function*/
	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'gim'), replacement);
	};
});