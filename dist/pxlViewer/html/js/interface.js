// Convert this to set - [array; attribute list], value
Array.prototype.checkAttrs= function(obj){  // Is this even needed?
	//object or string
	if(typeof obj == "string"){
		obj=document.getElementById(obj);
	}
	var has;
	for(x=0; x<this.length; ++x){ // Seemed needed in a set of tests not using jquery.
		has=obj.hasAttribute(this[x]);
		if(!has){
			obj.setAttribute(this[x], "");
		}
		has=obj.hasAttribute(this[x]);
	}
}
// Check not running this in boot.js when jqury fully unimplemented.

//Menu display and mointoring
function menuBarStatus(dist){
	var perc;
	if(dist == -1){
		perc=0;
	}else{
		perc=1-Math.min(1, Math.max(0, dist-5)/15);
	}
	menuDiv=document.getElementById("menuToggleButton");
	menuDiv.style.backgroundColor="rgba(100,100,100,"+perc+")";
}

function setCursor(type){
	if(type=="d"){
		document.body.style.cursor = "default";
	}else if(type=="g"){
		document.body.style.cursor = "move";
	}else if(type=="zi"){
		document.body.style.cursor = "zoom-in";
	}else if(type=="zo"){
		document.body.style.cursor = "zoom-out";
	}else if(type=="c"){
		document.body.style.cursor = "not-allowed";
	}else if(type=="v"){
		//document.body.style.cursor = "ns-resize";
		document.body.style.cursor = "col-resize";
	}else if(type=="h"){
		//document.body.style.cursor = "ew-resize";
		document.body.style.cursor = "row-resize";
	}
	mouseCoordCursor=type;
}

//////////////////////////////////////////////////////////////////////
////// MOUSE CLICK / DRAG FUNCTIONS //////////////////////////////////
//////////////////////////////////////////////////////////////////////
// Thumbnail Start Drag
function startDrag() {
	//getMouseXY;
	mouseX=mouseX;
	mouseY=mouseY;
	prevMouseX = mouseX;
	prevMouseY = mouseY;
	origMouseX = mouseX;
	origMouseY = mouseY;
	imgBlockObj.setAttribute('offX',parseInt(imgBlockObj.style.left));
	imgBlockObj.setAttribute('offY',parseInt(imgBlockObj.style.top));
	imgBlockObj.setAttribute('curSizeW',parseInt(imgBlockObj.offsetWidth));
	imgBlockObj.setAttribute('curSizeH',parseInt(imgBlockObj.offsetHeight));
	// Check mouse postion
	if(mButton == 4){ coordGenerateCheck(1); }
	if(mButton == 1){
		overCloseCoord=coordUpdateCheckAll("close","ret"); 
		if(overCloseCoord == 1){
		}	
	}
}
// Thumbnail Do Drag
function doDrag() {
	dragCount+=1;
	
	if(mButton == 2){ // Right click drag
		zoomLayers("touchData", ["imgBlock","imgOverlay"],[],[],-1,-1);
		//updateCanvas();  // Not using the canvas for anything useful yet, turn off updating it
	}else if(mButton == 4 || mouseCoordCur != -1){ // Mouse Wheel click drag
		coordUpdatePos(mouseCoordCur);
	}else{
		if(dragCount==1){
			setCursor("g");
		}
		var imgW=imgBlockObj.offsetWidth;
		var imgH=imgBlockObj.offsetHeight;
		var imgX=parseInt(imgBlockObj.getAttribute('offX'));
		var imgY=parseInt(imgBlockObj.getAttribute('offY'));
		var xMove=(mouseX-origMouseX);
		var yMove=(mouseY-origMouseY);
			var dragDist=Math.sqrt(Math.pow(xMove,2)+Math.pow(yMove,2));
			dragDist=mouseX-origMouseX;
			calc[0]=(imgX)+xMove;
			calc[1]=(imgY)+yMove;
			imgBlockObj.style.left=calc[0];
			imgBlockObj.style.top=calc[1];
	}
}
// Thumbnail End Drag
function endDrag() {
	imgBlockObj.setAttribute('offX',parseInt(imgBlockObj.style.left));
	imgBlockObj.setAttribute('offY',parseInt(imgBlockObj.style.top));
	imgBlockObj.setAttribute('curSizeW',parseInt(imgBlockObj.offsetWidth));
	imgBlockObj.setAttribute('curSizeH',parseInt(imgBlockObj.offsetHeight));
	document.getElementById("touchData").setAttribute('curScale',dynScale);
	dragCount=0;
	coordUpdateCheckAll("close", "exe");
	if(mouseCoordCur != -1){ mouseCoordCur = -1;}
	if(mouseCoordCursor!="d" && mouseCoordCur == -1){ setCursor('d'); }
	if(mButton == 4){ coordGenerateCheck(0);}
}

function displaywheel(e){ // Scroll wheel
	getMouseXY(e);
	var evt=window.event || e 
	var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta
	scrollGallery(delta,0);
}
if (document.attachEvent)
    document.attachEvent("on"+mousewheelevt, displaywheel)
else if (document.addEventListener)
    document.addEventListener(mousewheelevt, displaywheel, false)

//////////////////////////////////////////////////////////////////////
////// COORD FUNCTIONS ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function coordGenerateCheck(click){
	var rect=document.getElementById("imgBlock").getBoundingClientRect();
	//if(mouseX<rect.left || mouseX>rect.left+rect.width || mouseY<rect.top || mouseY>rect.top+rect.height){ // outside anywhere
	if((mouseX>rect.left && mouseX<rect.left+rect.width) && (mouseY>rect.top && mouseY<rect.top+rect.height)){ // Over Image
		setCursor('d');
		mouseCoordCursor="d";
	}else if((mouseX>rect.left && mouseX<rect.left+rect.width) && (mouseY<rect.top || mouseY>rect.top+rect.height)){ // Outside Top
		setCursor('h'); 
		if(click==1 && mButton == 4){coordGenerateNew(mouseCoordCursor);}
		//updateCurEditCanvas();
	}else if((mouseX<rect.left || mouseX>rect.left+rect.width) && (mouseY>rect.top && mouseY<rect.top+rect.height)){ // Outside Side
		setCursor('v'); 
		if(click==1 && mButton == 4){coordGenerateNew(mouseCoordCursor);}
		//updateCurEditCanvas();
	}
	//if(mButton){}
}
function coordGenerateNew(dir){
	newCoord=document.createElement("div");
	mouseCoordCur=mouseCoordCount;
	mouseCoordActiveArr.push(mouseCoordCount);
	mouseCoordCount+=1;
	newCoord.setAttribute("id", "coord_"+mouseCoordCur);
	newCoord.setAttribute("idValue", mouseCoordCur);
	newCoord.setAttribute("dir", dir);
	//newCoord.setAttribute("del", "0");
	if(dir == "v"){
		htmlStore=document.getElementById("markerTemplate-vertical").innerHTML;
	}else if(dir == "h"){
		htmlStore=document.getElementById("markerTemplate-horizontal").innerHTML;
	}
	newCoord.innerHTML=htmlStore;
	document.getElementById("mouseCoordParent").appendChild(newCoord);	
	child=newCoord.children;
	child[0].setAttribute("id", "coordBlock_"+mouseCoordCur);
	child[0].setAttribute("dir", dir);
	child[0].setAttribute("init", 1);
	child[0].style.zIndex=mouseCoordCount;
	divList=child[0].children;
	divList[0].setAttribute("id", "coordClose_"+mouseCoordCur);
	divList[0].setAttribute("onClick", "coordCheckClose("+mouseCoordCur+", 'force');");
	divList[0].setAttribute("id", "coordClose_"+mouseCoordCur);
	divList[1].setAttribute("id", "coordLine_"+mouseCoordCur);
	divList[2].setAttribute("id", "coordPerc_"+mouseCoordCur);
	divList[2].setAttribute("perc", 0);
	divList[2].setAttribute("pxl", 0);
	coordUpdatePos(mouseCoordCur);
}
function coordUpdateCheckAll(func, method){
	/*var obj=document.getElementById("mouseCoordParent");
	var childArr=obj.children;
	for(x=0; x<childArr.length; ++x){
		if(func=="pos"){
			coordUpdatePos( childArr[x].getAttribute("idValue") );
		}else if(func=="close"){
			coordCheckClose( childArr[x].getAttribute("idValue") );
		}
	}*/
	var ret=0;
	for(x=0; x<mouseCoordActiveArr.length; ++x){
		if(func=="pos"){
			ret=coordUpdatePos( mouseCoordActiveArr[x], method );
		}else if(func=="close"){
			ret=coordCheckClose( mouseCoordActiveArr[x], method );
		}
	}
	
	return ret;
	
}


function coordCheckInteract(method){ // Check for mouse location in relation to active coords
	
	var ret=0;
	var coordPiece, id, rect;
	var foundCoord=-1;
	var move=-1;
	for(x=0; x<mouseCoordActiveArr.length; ++x){
		id=mouseCoordActiveArr[x];
		coordPiece=document.getElementById("coordClose_"+id);
		rect=coordPiece.getBoundingClientRect();
		if((mouseX>rect.left && mouseX<rect.left+rect.width) && (mouseY>rect.top && mouseY<rect.top+rect.height)){ // Over Image
			mouseCoordCur=id;
			foundCoord=id;
			move=0;
			break;
		}
		coordPiece=document.getElementById("coordLine_"+id);
		rect=coordPiece.getBoundingClientRect();
		if((mouseX>rect.left && mouseX<rect.left+rect.width) && (mouseY>rect.top && mouseY<rect.top+rect.height)){ // Over Image
			mouseCoordCur=id;
			foundCoord=id;
			move=1;
			break;
		}
		coordPiece=document.getElementById("coordPerc_"+id);
		rect=coordPiece.getBoundingClientRect();
		if((mouseX>rect.left && mouseX<rect.left+rect.width) && (mouseY>rect.top && mouseY<rect.top+rect.height)){ // Over Image
			mouseCoordCur=id;
			foundCoord=id;
			move=2;
			break;
		}
	}
	if( foundCoord != -1 ){
		var dir=document.getElementById("coord_"+foundCoord).getAttribute("dir");
		if(move == 0){
			setCursor("c");
		}else{
			if(method == 0){ // Hover
				setCursor(dir);
			}else if(method == 1){ // Click
				setCursor(dir);
			}
		}
	}else{
		if(mouseCoordCur != -1){
			setCursor("d");
		}
	}

}

// Currently facing a strange issue where it will delete the coord, but is prevented from executing the final IF statement
// This has forced me to be redudant in code usage to clear the coord itself.... 
// I need to fix this for the sake of cleaner code.
function coordCheckClose(id, method){
	 // Mouse Wheel click drag
	//if(document.getElementById("coord_"+id).getAttribute("
	curCoordObj=document.getElementById("coordClose_"+id);
	var ret=typeof curCoordObj;
	returnMessage(id);
	if(typeof curCoordObj != "undefined" && curCoordObj != null){
		var deleted=0;
		var ret=0;
		var obj;
		var delId= mouseCoordActiveArr.indexOf(id);
		if(method != "force"){
			var rect=curCoordObj.getBoundingClientRect();
			if( id >=0){
				if(mouseX>rect.left && mouseX<rect.left+rect.width && mouseY>rect.top && mouseY<rect.top+rect.height){ // outside anywhere
					if(method == "exe"){
						obj=document.getElementById("coord_"+id);
						obj.parentNode.removeChild(obj);
						deleted=1;
						mouseCoordActiveArr.splice(delId,1);
						setCursor("d");
					}else if(method == "ret"){
						ret=1;
					}
				}
				//mouseCoordCur=-1;
			}
			
			rect=document.getElementById("imgBlock").getBoundingClientRect();
			initVal=document.getElementById("coordBlock_"+id).getAttribute("init");
			if( id >=0){
				if(initVal == 1){
					if(method == "exe"){
						if(mouseX<rect.left || mouseX>rect.left+rect.width || mouseY<rect.top || mouseY>rect.top+rect.height){ // outside anywhere
							obj=document.getElementById("coord_"+id);
							obj.parentNode.removeChild(obj);
							deleted=1;
							mouseCoordActiveArr.splice(delId,1);
							setCursor("d");
						}
						mouseCoordCur=-1;
						
						initVal=0;
						document.getElementById("coordBlock_"+id).setAttribute("init", initVal);
					}
				}
			}
		}
		
		if((deleted == 1 && method == "exe") || method == "force"){
			returnMessage("del--"+delId);
			ret=1;
		}
		return ret;
	}
}


function coordUpdatePos(id, method){
	
	curCoordObj=document.getElementById("coordBlock_"+id);
	if(typeof curCoordObj != "undefined" && curCoordObj != null){
		var rect=document.getElementById("imgBlock").getBoundingClientRect();
		var curCoord=curCoordObj.getAttribute("dir");
		if(mouseCoordCur == id){
			//if(mouseX<rect.left || mouseX>rect.left+rect.width || mouseY<rect.top || mouseY>rect.top+rect.height){ // outside anywhere
			if((mouseX>rect.left && mouseX<rect.left+rect.width) && (mouseY>rect.top && mouseY<rect.top+rect.height)){ // Over Image
				var delta,perc;
				if(curCoord=="v"){
					delta=mouseX-rect.left;
					perc=(delta/rect.width);
					curCoordObj.style.left=delta;
				}else if(curCoord=="h"){
					delta=mouseY-rect.top;
					perc=(delta/rect.height);
					perc=(delta/rect.height);
					curCoordObj.style.top=delta;
				}
				perc=parseInt(perc*10000)/100;
				
				document.getElementById("coordPerc_"+id).innerHTML=perc+" % <br>"+delta+" px";
				document.getElementById("coordPerc_"+id).setAttribute("perc", perc);
				document.getElementById("coordPerc_"+id).setAttribute("pxl", delta);
			}
		}else{
			var delta,perc;
			perc=document.getElementById("coordPerc_"+id).getAttribute("perc");
			if(curCoord=="v"){
				delta=rect.width * (perc/100);
				curCoordObj.style.left=delta;
				curCoordObj.style.top=0;
			}else if(curCoord=="h"){
				delta=rect.height * (perc/100);
				curCoordObj.style.left	=0;
				curCoordObj.style.top=delta;
			}
		}
	}
	return 1;
}


//////////////////////////////////////////////////////////////////////
//  ZOOM Related FUNCTIONS ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

////////////////
// More documentation on zooming and panning functions can be found at www.github.com/ProcStack
// Required global variables-
// mouseX, mouseY
////////////////

// zoomLayers("touchData", ["imgBlock","imgOverlay"],[],[],1,zoomPerc);
function zoomLayers(id,asset, mPos,cPos,init, zoomOffset){
	// Gather information about the reference object to move the given asset
	// This is a correlative zooming, based on where the mouse is to the reference object, to zoom the given asset
	// Separating this allows for different DOM objects to control the zooming object
	var idObj=document.getElementById(id);
	var asstObj=document.getElementById(asset[0]);
	var overObj=document.getElementById(asset[1]);
	
	var galWidth=idObj.offsetWidth;
	var galHeight=idObj.offsetHeight;
	var galLeft=idObj.offsetLeft;
	var galTop=idObj.offsetTop;
	var imgLeft=asstObj.offsetLeft;  // You'll most likely use offset, not absX and absY
	var imgTop=asstObj.offsetTop;
	var imgHeight=parseInt(asstObj.getAttribute("heightdef"));
	var imgWidth=parseInt(asstObj.getAttribute("widthdef"));
	
	// Prep zoomable asset
	var addAssetCss=0;
	if(!asstObj.hasAttribute("stye")){
		addAssetCss=1;
	}else{
		if(asstObj.getAttribute("stye").indexOf("transform:") == -1 || asstObj.getAttribute("stye").indexOf("transition:") == -1){ // Asset object; Address transform css requirements
			addAssetCss=1;
		}
	}
	if(addAssetCss == 1){
		asstObj.style.transform='scale(1, 1)';
		asstObj.style.webkitTransform='scale(1, 1)';
		asstObj.style.MozTransform='scale(1, 1)';
		asstObj.style.msTransform='scale(1, 1)';
		asstObj.style.OTransform='scale(1, 1)';
		overObj.style.transform='scale(1, 1)';
		overObj.style.webkitTransform='scale(1, 1)';
		overObj.style.MozTransform='scale(1, 1)';
		overObj.style.msTransform='scale(1, 1)';
		overObj.style.OTransform='scale(1, 1)';
	}
	if(idObj.hasAttribute('doubleTouch') == false){ // Reference object; Address double click requirements
		idObj.setAttribute('doubleTouch',0);
	}
	if(idObj.hasAttribute('curScale') == false){  // Reference object; Address current scale requirements
		idObj.setAttribute('curScale',1);
	}
	var curScale=idObj.getAttribute('curScale');

	if(isNaN(curScale)){ // Well this is annoying, this should not return NaN, but does on repetative right click
		curScale=asstObj.offsetHeight/imgHeight;
		idObj.setAttribute('curScale',curScale);
	}
	if(init==-1){
		mPos=[mouseX,mouseY];
		
		// cPos is an array to maintain required math between iterations
		// Doing it this way allows for additional information without needing to update function calls through out the javascript
		// cPos = [ Asset left position, Asset top position, Asset width, Asset height ];
		cPos=[parseInt(asstObj.style.offsetLeft),parseInt(asstObj.style.offsetTop),parseInt(asstObj.style.offsetWidth),parseInt(asstObj.style.offsetHeight)];
		
		// If you are using the zoom function as a scrolling zoom with middle mouse, this sets to apply a zoom and stop the function
		// If you have a zoomOffset of -1, its assuming for a click drag zoom
		// Such as using a wheel to zoom -vs- using two fingers on a phone
		if(zoomOffset != -1){
			storeKeyHold=0;
			idObj.setAttribute('doubleTouch',0);
		}
		init=0;
	}
	var placeX,placeY;
	var mag;
	var minMag=.05;
	if(init > -1){
		if(zoomOffset == -1){
			mag=mouseX-mPos[0]; // Dragging zoom ammount
		}else{
			mag=zoomOffset; // Set zoom ammount
		}
	}
	if(((idObj.getAttribute('doubleTouch')==1 && Math.abs(mag)<10) || init<=-2) && zoomLatch==0){  // Double zoom (Double click, double two-finger tap) to reset zoom
		mag=1;
		var imgRatio=imgHeight/imgWidth;
		var displayRatio=galHeight/galWidth;
		if(init==-3){ // Home Image; 100% scale
			mag=1;
			placeX=-imgWidth/2 + galWidth/2;
			placeY=-imgHeight/2 + galHeight/2;
		}else{ // Fit Image; Scales to window
			if(imgRatio<displayRatio){ // Set img width to display
				mag=galWidth/imgWidth;
				placeX=0;
				placeY=galHeight/2-(imgHeight*mag)/2;
			}else{ // Set img height to display
				mag=galHeight/imgHeight;
				placeX=galWidth/2-(imgWidth*mag)/2;
				placeY=0;
			}
		}
//////////////////////////////////////////////////////////////
	}else{ // Zoom math
		if(mButton!= 2){
			// Set zoom rate
			var distScale=200;
			if(mouseX<mPos[0]){
				distScale=500;
			}
			mag=Math.max(.1,(distScale+mag)/distScale); // Zoom rate math
		}else{
			var dx=origMouseX-mouseX;
			dx= dx==0?.01:dx
			var dy=origMouseY-mouseY;
			dy= dy==0?.01:dy
			mag=dx+dy;
			mag=1-(mag/500);
			mPos=[origMouseX,origMouseY];
			cPos[0]=parseInt(asstObj.getAttribute('offX'));
			cPos[1]=parseInt(asstObj.getAttribute('offY'));
			cPos[2]=asstObj.getAttribute('curSizeW');
			cPos[3]=asstObj.getAttribute('curSizeH');
			zoomLatch=1;
			if(mag<1){
				setCursor("zi");
			}else{
				setCursor("zo");
			}
		}
		var curPercX=(mPos[0]-cPos[0])/cPos[2];
		var curPercY=(mPos[1]-cPos[1])/cPos[3];
		
		
		var origPosX=cPos[2]*curPercX;
		var origPosY=cPos[3]*curPercY;
		var offX=-origPosX*mag+mPos[0];
		var offY=-origPosY*mag+mPos[1];
		var mult=Math.sin( Math.min(1,Math.max(0,(mag-curScale)/3)) * (3.14159265/2) );
		placeX= offX;
		placeY= offY;
		mag=Math.max(minMag,mag*curScale);

		dynScale=mag;
	}
	
	if(!isNaN(mag)){ // This should be fixed now, leaving in just in case
		if(mag != minMag){
			asstObj.style.left=(placeX)+'px';
			asstObj.style.top=(placeY)+'px';
			asstObj.style.height=(imgHeight*mag)+'px';
			asstObj.style.width=(imgWidth*mag)+'px';
			overObj.style.height=(imgHeight*mag)+'px';
			overObj.style.width=(imgWidth*mag)+'px';
		}
		var dispPerc=(parseInt(mag*100*100)/100);
		document.getElementById("scalePerc").innerText=(dispPerc+" %");
		//document.getElementById("scaleRes").innerText=((parseInt(cPos[2]*mag*100)/100)+" x "+(parseInt(cPos[3]*mag*100)/100)); // Return Float

		document.getElementById("scaleRes").innerText=((parseInt(imgWidth*mag))+" x "+(parseInt(imgHeight*mag)));
		coordUpdateCheckAll("pos", "exe");
	}
	
	if(storeKeyHold==1 && document.getElementById(id).getAttribute('doubleTouch')==0){
		setTimeout(function(){zoomLayers(id,asset, mPos,cPos,init, zoomOffset);},100);
	}else{
		zoomLatch=0;
		dynScale=mag;
		returnMessage("scalePerc:"+mag);
		if(Math.abs(curScale-mag)<.05){
			document.getElementById(id).setAttribute('doubleTouch',0);
		}
		if(mButton!=2 && !isNaN(mag)){
			document.getElementById(id).setAttribute('curScale',mag);
		}
	}
}
function resize(full){
	var sW=window.innerWidth;
	var sH=window.innerHeight;
	var pwidth=document.documentElement.clientWidth;
	var pheight=document.documentElement.clientHeight;
	var valW,valH,valLeft,valTop;
	lw=imgBlockObj.offsetWidth;
	lh=imgBlockObj.offsetHeight;
	
	var viewPaneObj=document.getElementById("viewPane");
	viewPaneObj.style.height=pheight;
	viewPaneObj.style.width=pwidth;
	viewPaneObj.style.left="0";
	viewPaneObj.style.top="0";

	var iheight=imgBlockObj.offsetHeight	;
	var topMove=Math.max(0,parseInt((pheight-iheight)/2));
	////
	imgBlockObj.style.width=lw;
	imgBlockObj.style.height=lh;
	imgBlockObj.style.top=valTop;
	imgBlockObj.style.left=valLeft;
	imgBlockObj.style.visibility="visible";
	imgBlockObj.setAttribute("topDef",0);
	imgBlockObj.setAttribute("leftDef",0);
	
	var touchDataObj=document.getElementById("touchData");
	touchDataObj.style.width=pwidth;
	touchDataObj.style.height=pheight;
	touchDataObj.style.left="0";
	touchDataObj.style.top="0"; 
	
	origImgW=valW;
	origImgH=valH;
	origImgX=imgBlockObj.offsetLeft;
	origImgY=imgBlockObj.offsetTop;
	//var pos=imgBlockObj.getBoundingClientRect();
	//origImgX=pos.left;
	//origImgY=pos.top;
	curScale=1;
	if(full == 0){
		zoomLayers("touchData", ["imgBlock","imgOverlay"],[],[],-2,0);
	}else{
		zoomLayers("touchData", ["imgBlock","imgOverlay"],[],[],-3,0);
	}
}

function resetZoomPan(){
	touchDataObj.setAttribute('doubleTouch',0);
	touchDataObj.setAttribute('curScale',1);

	imgBlockObj.style.transform='scale(1, 1)';
	imgBlockObj.style.webkitTransform='scale(1, 1)';
	imgBlockObj.style.MozTransform='scale(1, 1)';
	imgBlockObj.style.msTransform='scale(1, 1)';
	imgBlockObj.style.OTransform='scale(1, 1)';
	imgBlockObj.style.left=parseInt(imgBlockObj.getAttribute("leftDef"))+'px';
	imgBlockObj.style.top=parseInt(imgBlockObj.getAttribute("topDef"))+'px';

	imgOverlayObj.style.transformOrigin='top left';
	imgOverlayObj.style.transform='scale(1, 1)';
	imgOverlayObj.style.webkitTransform='scale(1, 1)';
	imgOverlayObj.style.MozTransform='scale(1, 1)';
	imgOverlayObj.style.msTransform='scale(1, 1)';
	imgOverlayObj.style.OTransform='scale(1, 1)';
	
}

function scrollGallery(delta, abs){ // Ran as event
	var toScroll;
	dragCount=0;
	var imgW=origImgW;
	var imgH=origImgH;
	var imgX=origImgX;
	var imgY=origImgY;
	var xMove=(delta);
	var yMove=(delta);
	scroller+=delta;
	scroller=Math.max(-1800,scroller);
	dragCount+=scroller/120;
	dragDist=scroller;
	var zoomPerc=delta/10;
	zoomLayers("touchData", ["imgBlock","imgOverlay"],[],[],-1,zoomPerc);
	//updateCanvas();  // Not using the canvas for anything useful yet, turn off updating it
	return false;
}

//////////////////////////////////////////////////////////////////////
//  MISC FUNCTIONS ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function tickVerboseCounter(){
	var curcount=document.getElementById("verbText").textContent;
	if(curcount==""){
		curcount=0;
	}
	curcount=parseInt(curcount)+1;
	document.getElementById("verbText").innerHTML=curcount;
}

function print(){
	if(arguments.length>1){
		for(var x=0;x<arguments.length/2;++x){
			console.log("-- -- "+arguments[x*2]+" -- --");
			console.log(arguments[x*2+1]);
		}
	}else{
		console.log(arguments[0]);
	}
}

function keyHoldCheck(runFunc){
	if(storeKeyHold>0){
		storeKeyHold+=1;
		if(storeKeyHold==20){
			storeKeyHit=1;
			eval(runFunc);
		}else{
			setTimeout(function(){keyHoldCheck(runFunc);},35);
		}
	}
}

// Function for timed countdown to run a function; used for double click detection on this site
function countdown(func,countDown){
	var exitVal=1;
	countDown-=1;
	if(countDown==0){
		eval(func);
	}else{
		setTimeout(function(){countdown(func,countDown)},100);
	}
}

function checkExt(){
	imgPath=document.getElementById("imgBlock").getAttribute("src");
}

function setEntryImage(imgPath, w,h){
	imgPathDate=imgPath+"?"+new Date().getTime();
	
	var curObj=document.getElementById("imgBlock");
	curObj.setAttribute("src", imgPath);
	curObj.style.backgroundImage="url('"+imgPathDate+"')";
	curObj.style.width=w;
	curObj.style.height=h;
	curObj.setAttribute("widthDef", w);
	curObj.setAttribute("heightDef", h);
			
	curObj=document.getElementById("imgOverlay");
	curObj.style.width=w;
	curObj.style.height=h;
	curObj.setAttribute("widthDef", w);
	curObj.setAttribute("heightDef", h);

	var imgName=imgPath.split("/")
	imgName=imgName[imgName.length-1];
	imgName+=" - ";
	imgName+=w+"x"+h;
	setEntryText(imgName);
	
	resetZoomPan();
	//updateCanvas();  // Not using the canvas for anything useful yet, turn off updating it
	resize(0);
}
function refreshImage(){ // Remove resize(0) once inner message windows are implemented
	var curObj=document.getElementById("imgBlock");
	var curImg=curObj.getAttribute("src");
	var tm=new Date().getTime();
	imgPathDate=curImg+"?"+tm;
	curObj.setAttribute("src", imgPathDate);
	curObj.style.backgroundImage="url('"+imgPathDate+"')";
	resize(0);
}
function setEntryText(txt){
	document.getElementById("entryText").innerHTML=txt;
}
function returnValue(variable,value){
	opWin.varValue("["+variable+","+value+"]");
}
function returnMessage(msg){
	opWin.showMessage(msg);
}
//Not implemented yet
function toggleInfoWindow(){
	document.getElementById("verbText").innerHTML=" -  -- ";
}

//////////////////////////////////////////////////////////////////////
//  MOVE TO {draw,drawing}.js ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function updateCanvas(){
	var curScale=parseFloat(document.getElementById("touchData").getAttribute('curScale'));
	var canvas=document.getElementById("imgOverlay");
	canvas.style.transformOrigin='top left'
	canvas.style.transform='scale('+curScale+', '+curScale+')';
	canvas.style.webkitTransform='scale('+curScale+', '+curScale+')';
	canvas.style.MozTransform='scale('+curScale+', '+curScale+')';
	canvas.style.msTransform='scale('+curScale+', '+curScale+')';
	canvas.style.OTransform='scale('+curScale+', '+curScale+')';
	
}
function updateCurEditCanvas(){
	imgCurEditOverlayObj.style.transformOrigin='top left'
	imgCurEditOverlayObj.style.transform='scale('+curScale+', '+curScale+')';
	imgCurEditOverlayObj.style.webkitTransform='scale('+curScale+', '+curScale+')';
	imgCurEditOverlayObj.style.MozTransform='scale('+curScale+', '+curScale+')';
	imgCurEditOverlayObj.style.msTransform='scale('+curScale+', '+curScale+')';
	imgCurEditOverlayObj.style.OTransform='scale('+curScale+', '+curScale+')';
	
}

//drawGeo("geoDrawTest",[100,100],3,10,[0,0,255],1,1);
//drawGeo("geoDrawTest",[100,100],0,10,[0,0,255],1,1);
function drawGeo(canvas,loc,eCount,size,color,alpha,filled){
	var comp=0;
	var flip=0;
	var x=loc[0];
	var y=loc[1];
	var R=color[0];
	var G=color[1];
	var B=color[2];
	hex="rgb("+Math.floor(R)+","+Math.floor(G)+","+Math.floor(B)+")"; // Prep for coloring solid geometry
	var csW=document.getElementById(canvas).offsetWidth;
	var csH=document.getElementById(canvas).offsetHeight;
	
	docCanvas=document.getElementById(canvas);
	draw=docCanvas.getContext('2d');
	var runCount=1;
	var flippers=[1,1];
	draw.globalAlpha=alpha;
	draw.beginPath();
	draw.lineWidth=Math.max(1,filled);
	if(filled==1){
		draw.fillStyle=hex;
	}else{
		draw.strokeStyle=hex;
	}
	if(eCount<=2){ // Draw a circle
		if(eCount==1){ // Draw a circle fading out
			var grad=draw.createRadialGradient(x,y,1,x,y,size/2);
			grad.addColorStop(0,'rgba('+Math.floor(color[0])+','+Math.floor(color[1])+','+Math.floor(color[2])+',1)');
			if(color.length>4){
				grad.addColorStop(1,'rgba('+Math.floor(color[3])+','+Math.floor(color[4])+','+Math.floor(color[5])+',0)');
			}else{
				grad.addColorStop(1,'rgba('+Math.floor(color[0])+','+Math.floor(color[1])+','+Math.floor(color[2])+',0)');
			}
			draw.fillStyle=grad;
		}else if(eCount==2){ // Draw a circle fading in
			var grad=draw.createRadialGradient(x,y,1,x,y,size/2);
			grad.addColorStop(0,'rgba('+Math.floor(color[0])+','+Math.floor(color[1])+','+Math.floor(color[2])+',0)');
			if(color.length>4){
				grad.addColorStop(1,'rgba('+Math.floor(color[3])+','+Math.floor(color[4])+','+Math.floor(color[5])+',1)');
			}else{
				grad.addColorStop(1,'rgba('+Math.floor(color[0])+','+Math.floor(color[1])+','+Math.floor(color[2])+',1)');
			}
			draw.fillStyle=grad;
		}
		draw.arc(x,y,size/2,0,Math.PI*2); // Draw circle
	}else{ // Draw lines
		if(loc.length>2){ // Make sure its not a single point
			if(eCount==3){ // Draw a linear curve
				draw.moveTo(x,y);
				for(var v=2; v<loc.length; v+=2){
					draw.lineTo(loc[v],loc[v+1]);
				}
				draw.lineJoin = 'round';
				if(size==1 && filled!=-1){
					draw.closePath();
				}else{
					draw.lineJoin = 'miter';
				}
			}else{ // Draw a quadratic curve
				draw.lineJoin = 'round';
				draw.moveTo(x,y);
				for(var v=2; v<loc.length; v+=4){
					draw.quadraticCurveTo(loc[v],loc[v+1], loc[v+2],loc[v+3]);
				}
				if(size==1){
					draw.quadraticCurveTo(loc[loc.length-2],loc[loc.length-1], loc[0],loc[1]);
				}
				if(size==1 && filled!=-1){
					draw.closePath();
				}else{
					draw.lineJoin = 'miter';
				}
			}
		}
	}
	if(filled==1){ // Fill object
		draw.fill();
	}else{ // Stroke object
		draw.stroke();
	}
}
