$(document).ready(function() {
	
	$("#load").on("click",function(){
		
		ind_num=$("#ind_num").val();
		if(ind_num==""){
			ind_num="2";
		}
		num=parseInt(ind_num);
		
		var path=$("#input").val();
		var name=getFileName(path);
		$("#hidden").load("test.txt");
		
		if(name==""|name==null){
			alert("file");
			return;
		}
		$("#load").remove();
		
		$.get(name,function(data){
			process(data);
		});
    });
	
	$("#upload").on("click",function(){
		
		ind_num=$("#ind_num").val();
		class_num=$("#class_num").val();
		index_num=$("#index_num").val();
		if(ind_num==""){
			ind_num="2";
		}
		if(class_num==""){
			class_num="2";
		}
		if(index_num==""){
			index_num="0";
		}
		num=parseInt(ind_num);
		classNum=parseInt(class_num);
		indexNum=parseInt(index_num);
		$("#load").remove();
		var data=$("#textarea").val();
		if(data==""|data==null){
			return;
		}
		$("#textarea").remove();
		$("#upload").remove();
		process(data);

    });
	
	$("#result").on("click","span .class_0",function(){
		var text_e=$(this).parent().find("p");
		writFile(text_e,"class_0.txt");
		//console.info('jesdf');
		$(this).parent().remove();
	});
	$("#result").on("click","span .class_1",function(){
		var text_e=$(this).parent().find("p");
		writFile(text_e,"class_1.txt");
		$(this).parent().remove();
	});
	$("#result").on("click","span .class_2",function(){
		var text_e=$(this).parent().find("p");
		writFile(text_e,"class_2.txt");
		$(this).parent().remove();
	});
	$("#result").on("click","span .class_3",function(){
		var text_e=$(this).parent().find("p");
		writFile(text_e,"class_3.txt");
		$(this).parent().remove();
	});
	$("#result").on("click","span .class_4",function(){
		var text_e=$(this).parent().find("p");
		writFile(text_e,"class_4.txt");
		$(this).parent().remove();
	});
	$("#result").on("click","span .class_5",function(){
		var text_e=$(this).parent().find("p");
		writFile(text_e,"class_5.txt");
		$(this).parent().remove();
	});
	$("#result").on("click","span .class_6",function(){
		var text_e=$(this).parent().find("p");
		writFile(text_e,"class_6.txt");
		$(this).parent().remove();
	});
	$("#result").on("click","span .class_7",function(){
		var text_e=$(this).parent().find("p");
		writFile(text_e,"class_7.txt");
		$(this).parent().remove();
	});
	$("#result").on("click","span .class_8",function(){
		var text_e=$(this).parent().find("p");
		writFile(text_e,"class_8.txt");
		$(this).parent().remove();
	});
	$("#result").on("click","span .class_9",function(){
		var text_e=$(this).parent().find("p");
		writFile(text_e,"class_9.txt");
		$(this).parent().remove();
	});
	
	process=function(data){
		var list=data.trim().split("\n");
		var e;
		for (e in list){
			var highlightText=highlight(list[e]);
			var text="<p>"+highlightText+"</p>";
			var text_e=$(text);
			var span=$("<span></span>");
			$("#result").append(span);
			span.append(text_e);
			for (var c=0;c<classNum;c++){
				var line="<button class=\"class_"+c+"\">class_"+c+"</button>";
				var e= $(line);
				span.append(e);
			}
		}
	};
	
	highlight=function(text){
		//var arr=text.split("\t");
		var arr=text.split("\t")[indexNum].split(";");
		var strs=text;
		if(arr.length<num){
			num=arr.length;
			
		}
		for(var i=0;i<num;i++){
			if(arr[i]=="") continue;
			var strs=strs.replaceAll(arr[i],"<span class=\"e"+i+"\">"+arr[i]+"</span>");
			console.info(arr[i]);
		}
		
		//strs=strs.replaceAll(arr[e2_index],"<span class=\"e2\">"+arr[e2_index]+"</span>");
		return strs;
	};
	
	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'gim'), replacement);
	};
	
	
	getFileName=function(path){
		var name=path.replace(new RegExp("^.*\\\\"),"");
		//String name=path.replace(/.*//gim,"");
		return name;
	}
	
	
	
	writFile=function(e,path){
		var blob = new Blob([e.text()], {type: "text/plain;charset=utf-8"});
		saveAs(blob, path);
	};
});
//document.write("<script src='googleAnalytics.js'><\/script>");
 