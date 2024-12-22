var menu = document.getElementById("bar");
var item = document.getElementById("linqet_e_navigimit");

item.style.right ='-400px';
menu.onclick = function(){
	if (item.style.right =='-400px') {
	item.style.right ='0';
}
else{
	item.style.right ='-400px';
}
}