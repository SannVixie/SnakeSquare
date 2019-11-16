var snakeX = 2;
var snakeY = 2;
var height = 42;
var width = 42;
var interval = 250;
var increment = 1;

var tailX = [snakeX];
var tailY = [snakeY];
var apX;
var apY;
var pX;
var pY;
var sbX;
var sbY;
var wmX;
var wmY;
var poiX;
var poiY;
var running = false;
var gameOver = false;
var direction = -1; // up = 0, down = -1, left = 1, right = 2
var int;
var score = 0;
var apple = 2;
var pineapple = 4;
var strawberry = 8;
var watermelon = 16;
var poison;

//game starts
function run(){
	init();
	unitpine();
	int = setInterval(gameLoop, interval);
}

function init(){
	createMap();
	createSnake();
	createApple();

}

function unitpine(){
	createPine();
	createStraw();
	createWaterMelon();
	createPoison();
}

//generate Map
function createMap(){
	document.write("<table>");
	for( var y = 0; y < height; y++){
		document.write("<tr>");
		for( var x = 0; x < width; x++){
			if( x == 0 || x == width - 1 || y == 0 || y == height -1){
				document.write("<td class='wall' id='"+ x + "-" + y +"'></td>")
			}else{
				document.write("<td class='blank' id='"+ x + "-" + y +"'></td>")
			}
		}
		document.write("</tr>");
	}
	document.write("</table>");
}

//generate snake
function createSnake(){
	set(snakeX, snakeY, "snake");
}

function get(x,y){
	return document.getElementById(x+"-"+y);
}

function set(x, y, value){
	if(x != null && y != null)
		get(x,y).setAttribute("class", value);
}

//generate fruits
function rand(min, max){
	return Math.floor(Math.random()* (max - min) + min);
}

function getType(x,y){
	return get(x,y).getAttribute("class");
}

function createApple(){
 		var found = false;
		while(!found && (length < (width - 2)*(height - 2)+1)){
			var appleX = rand(1,width-1);
			var appleY = rand(1, height-1);
			if(getType(appleX, appleY) == "blank"){
				found = true;
			}
		}
		set(appleX, appleY, "apple");
		apX = appleX;
		apY = appleY;
}


function createPine(){
	var found = false;
	while(!found && (length < (width - 2)*(height - 2)+1)){
		var pineX = rand(1,width-1);
		var pineY = rand(1, height-1);
		if(getType(pineX, pineY) == "blank"){
			found = true;
		}
	}
	set(pineX, pineY, "pineapple");
	pX = pineX;
	pY = pineY;
}

function createStraw(){
	var found = false;
	while(!found && (length < (width - 2)*(height - 2)+1)){
		var strawX = rand(1,width-1);
		var strawY = rand(1, height-1);
		if(getType(strawX, strawY) == "blank"){
			found = true;
		}
	}
	set(strawX, strawY, "strawberry");
	sbX = strawX;
	sbY = strawY;
}

function createWaterMelon(){
	var found = false;
	while(!found && (length < (width - 2)*(height - 2)+1)){
		var melonX = rand(1,width-1);
		var melonY = rand(1, height-1);
		if(getType(melonX, melonY) == "blank"){
			found = true;
		}
	}
	set(melonX, melonY, "watermelon");
	wmX = melonX;
	wmY = melonY;
}

function createPoison(){
	var found = false;
	while(!found && (length < (width - 2)*(height - 2)+1)){
		var poisonX = rand(1,width-1);
		var poisonY = rand(1, height-1);
		if(getType(poisonX, poisonY) == "blank"){
			found = true;
		}
	}
	set(poisonX, poisonY, "poison");
	poiX = poisonX;
	poiY = poisonY;
}

//generate key
window.addEventListener("keypress", function key(){
	var key = event.keyCode;
	//if key is W set direction up
	if(direction !=-1 && (key == 119 || key == 87 || key == 56 || key == 38))
		direction = 0;
	//if key is S set direction down
	else if(direction !=0 && (key == 115 || key == 83 || key == 53 || key == 40))
		direction = -1;
	//if key is A set direction left
	else if(direction != 2 && (key == 97 || key == 65 || key == 52 || key == 37))
		direction = 1;
	//if key is D set direction right
	else if(direction != 1 && (key == 100 || key == 68 || key == 54 || key == 39))
		direction = 2;
	if(!running){
		running = true;}
	else if(key == 32){
		running = false;}
});

function gameLoop(){
	if(running && !gameOver){
		update();
	}else if(gameOver){
		clearInterval(int);
	}
}

function update(){
	set(apX, apY, "apple");

	// if (score > 15) {

		set(pX, pY, "pineapple");
	// }

	// set(sbX, sbY, "strawberry");
	// set(wmX, wmY, "watermelon");
	// set(poiX, poiY, "poison");
	updateTail();
	set(tailX[length], tailY[length], "blank");
	if (direction == 0){
		snakeY--;}
	else if (direction == -1){
		snakeY++;}
	else if (direction == 1){
		snakeX--;}
	else if (direction == 2){
		snakeX++;}
	set(snakeX, snakeY, "snake");
	for(var i = tailX.length-1; i >=0; i--){
		if(snakeX == tailX[i] && snakeY == tailY[i]){
			gameOver = true;
			break;
		}
	}

	if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1){
		gameOver = true;
	}
	else if(snakeX == apX && snakeY == apY){
		createApple();
		length+=increment;
		score+=apple;
	}
	else if(snakeX == pX && snakeY == pY){
		createPine();
		length+=increment;
		score+=pineapple;
	}
	else if(snakeX == sbX && snakeY == sbY){
		createStraw();
		length+=increment;
		score+=strawberry;
	}
	else if(snakeX == wmX && snakeY == wmY){
		createWaterMelon();
		createPoison();
		length+=increment;
		score+=watermelon;
	}
	else if(snakeX == poiX && snakeY == poiY){
		createPoison();
		gameOver = true
		// score = 0;
	}



	var scoreEle = document.getElementById("score");
	scoreEle.innerText = score;

	if (gameOver == true){
		var gamestat = document.getElementById("gamestatus");
		gamestat.innerText = "Game Over!";
	}
}

function updateTail(){
	for(var i = length; i > 0; i--){
		tailX[i] = tailX[i-1];
		tailY[i] = tailY[i-1];
	}
	tailX[0] = snakeX;
	tailY[0] = snakeY;
}

run();
