document.getElementById("total").style.display="none";
document.getElementById("hide-new").style.display="none";
document.getElementById("restore-del").style.display="none";
document.getElementById("show-new").addEventListener("click",show, false);
document.getElementById("hide-new").addEventListener("click",hide, false);

for (var i=5;i<=7; i++){document.getElementById("item"+i).style.display="none";}

var delitemsArray=[]; 

for (var i=1; i<=7;i++){
	var deli="del"+i; var likei="like"+i; var plusi="plus"+i; var minusi="minus"+i;
	document.getElementById(deli).addEventListener("click",del, false);
	document.getElementById(likei).addEventListener("click",like, false);
	document.getElementById(plusi).addEventListener("click",plus, false);
	document.getElementById(minusi).addEventListener("click",minus, false);
}

for (var i=1; i<=5;i++){	
	var id="bg-elt-"+i;
	var img=document.getElementById(id);	
	img.addEventListener("animationend", strtnew); 
	img.style.display="none";
	if (i==1){img.style.animation="fadeimg 5s linear 1";img.style.display="block";}	
}
function strtnew(e){
	var imgid=e.target.getAttribute("id");
	var nb=Number(e.target.getAttribute("id").match(/\d+/));
	if (nb==5){nb=0;}
	var nxtimgid="bg-elt-"+(nb+1);
	var img=document.getElementById(imgid); var nxtimg=document.getElementById(nxtimgid);
	nxtimg.style.animation="fadeimg 5s linear 1"; nxtimg.style.display="block"; 
	img.style.display="none";
} 

function show(e){
	for (var i=5;i<=7; i++){
		document.getElementById("item"+i).style.display="flex";	
		document.getElementById("item"+i).style.animation="fade 1s linear 1";
	}
	document.getElementById("show-new").style.display="none";
	document.getElementById("hide-new").style.display="block";
}

function hide(e){
	for (var i=5;i<=7; i++){
		document.getElementById("item"+i).style.display="none";	
	}	
	document.getElementById("show-new").style.display="block";
	document.getElementById("hide-new").style.display="none";
}

function del(e){
	e.preventDefault();	
	var parent = document.getElementById("cart");
	var eltid=e.target.getAttribute("id");
	var childid="item"+eltid.match(/\d+/);
	var contentString=eltid.match(/\d+/)+";item;"+childid+";";
	var inputid="count"+eltid.match(/\d/);
	var subid="sub"+eltid.match(/\d+/);
	var sub=document.getElementById(subid); 
	var child=document.getElementById(childid);
	var content=child.innerHTML; contentString+=content; delitemsArray.push(contentString); 
	var subval=Number(sub.value);	 
	var oldttle=Number(document.getElementById('ttl-price').value.match(/\d+/)); 
	var newttle=oldttle-subval;
	document.getElementById('ttl-price').value=newttle;
	document.getElementById(inputid).value="0"; sub.value="0";
	document.getElementById("restore-del").style.display="block"; 
	document.getElementById("restore-del").addEventListener("click",restore);
	parent.removeChild(child);
	if (newttle==0){
		document.getElementById("total").style.display="none";
		document.getElementById("item1").style.marginTop="0";
	}		
}

function restore(e){
	e.preventDefault();
	var ln=delitemsArray.length;	
	var eltbef=document.getElementById("buttons");
	var parent=document.getElementById("cart");
	for(var i=0;i<ln;i++){
		var str=delitemsArray[i].split(";");
		var elt=document.createElement("div");
		var newclass=document.createAttribute("class");
		var newid=document.createAttribute("id");
		var nb=str[0];
		newclass.value=str[1]; newid.value=str[2];
		elt.setAttributeNode(newclass);
		elt.setAttributeNode(newid);
		elt.innerHTML=str[3];
		parent.insertBefore(elt, eltbef);
		var deli="del"+nb; var likei="like"+nb; var plusi="plus"+nb; var minusi="minus"+nb;
		document.getElementById(deli).addEventListener("click",del, false);
		document.getElementById(likei).addEventListener("click",like, false);
		document.getElementById(plusi).addEventListener("click",plus, false);
		document.getElementById(minusi).addEventListener("click",minus, false);		
	}
	delitemsArray.splice(0, ln); document.getElementById("restore-del").style.display="none";
}
 
function like(e){
	e.preventDefault();
	var color1="rgb(31, 30, 81)";var color2="rgb(255, 0, 0)"; var eltid=e.target.getAttribute("id");
	var styles=window.getComputedStyle(document.getElementById(eltid));
	var color=styles.getPropertyValue("color");
	if (color==color1){document.getElementById(eltid).style.color=color2;} 
	else if(color==color2) {document.getElementById(eltid).style.color=color1;}
}

function plus(e){
	var subttl=0;
	var countid="count"+e.target.getAttribute("id").match(/\d+/);
	var priceid="price"+e.target.getAttribute("id").match(/\d+/);
	var subid="sub"+e.target.getAttribute("id").match(/\d+/);
	var itemprice=Number(document.getElementById(priceid).innerHTML.match(/\d+/));
	var cnt=document.getElementById(countid);
	var sub=document.getElementById(subid); var subval=Number(sub.value);
	var cntval=cnt.value; 
	var oldttle=Number(document.getElementById('ttl-price').value.match(/\d+/)); 
	if (cntval<10){ 
		cnt.value=++cntval; 
		if (document.getElementById("total").style.display=="none"){
			document.getElementById("total").style.display="flex";
			document.getElementById("total").style.position="fixed";
			document.getElementById("total").style.top="0";
			document.getElementById("total").style.left="0";
			document.getElementById("item1").style.marginTop="16%"; 
		}	
		document.getElementById('ttl-price').value=oldttle+itemprice;
		document.getElementById("ttl-price").style.animation="";
		document.getElementById("ttl-price").style.animation="fade .5s linear 2";
		sub.value=subval+itemprice;
	} else {alert("The maximum value is 10");}	
}

function minus(e){	
	var countid="count"+e.target.getAttribute("id").match(/\d+/);
	var priceid="price"+e.target.getAttribute("id").match(/\d+/);
	var subid="sub"+e.target.getAttribute("id").match(/\d+/);
	var itemprice=Number(document.getElementById(priceid).innerHTML.match(/\d+/));
	var cnt=document.getElementById(countid);
	var sub=document.getElementById(subid); var subval=Number(sub.value);
	var cntval=cnt.value; 
	var oldttle=Number(document.getElementById('ttl-price').value.match(/\d+/)); 	
	if(cntval>0){
		cnt.value=--cntval; var newttle=oldttle-itemprice;
		document.getElementById('ttl-price').value=newttle;
		sub.value=subval-itemprice;
		if (newttle==0){document.getElementById("total").style.display="none";}
	} else {alert("You already are at the minimum value");}
}