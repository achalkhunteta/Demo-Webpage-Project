var xhr

if(window.XMLHttpRequest){

	xhr = new XMLHttpRequest();
}
else{
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

xhr.open('GET', 'C/Users/abc/Desktop/Website/dummy_data/menu.json', true)
xhr.onreadystatechange = function(){
	if(xhr.readyState === 4 && xhr.status === 200){
		var items= JSON.parse(xhr.responseText);
		var output = '<ul>'
		for(var key in items){
			output += '<li><a href="' + items[key].link + '">'+ items[key].title + '</a></li>';
		}
		output += '</ul>';
		document.getElementById("nav").innerHTML = output;
	}

}
xhr.send();