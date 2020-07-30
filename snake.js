window.onkeydown = detectKey
let snake = document.querySelector('.snake')
let main = document.querySelector('main')
let ngbtn = document.querySelector('.ngbtn')
let ngdiv = document.querySelector('.newGame')
let cntrdiv = document.querySelector('.counter')
let upbtn = document.querySelector('.up')
let downbtn = document.querySelector('.down')
let leftbtn = document.querySelector('.left')
let rightbtn = document.querySelector('.right')
let score = document.querySelector('.score')

upbtn.addEventListener('click', goUp)
downbtn.addEventListener('click', goDown)
leftbtn.addEventListener('click', goLeft)
rightbtn.addEventListener('click', goRight)

var counter = 0
var scl = 5
var x = 0
var y = 0
var xfood, yfood
let tailElmnts = []
let headPos = []
var interval
var direction
var xMove = 0
var yMove = 0

function goUp() {
	if (direction !== 'down') {
		[xMove, yMove] = [0, -1]
		direction = 'up'
	}
}

function goDown() {
	if (direction !== 'up') {
		[xMove, yMove] = [0, 1]
		direction = 'down'
	}
}

function goLeft() {
	if (direction !== 'right') {
		[xMove, yMove] = [-1, 0]
		direction = 'left'
	}
}

function goRight() {
	if (direction !== 'left') {
		[xMove, yMove] = [1, 0]
		direction = 'right'
	}
}

function detectKey(e) {
	if (e.key == 'ArrowUp') goUp();
	else if (e.key == 'ArrowDown') goDown();
	else if (e.key == 'ArrowLeft') goLeft();
	else if (e.key == 'ArrowRight') goRight();
}

function setMove() {
	interval = setInterval(() => {
		x += xMove * scl
		y += yMove * scl
		if (scl != 0) {
			x = getIntoWall(x)
			y = getIntoWall(y)
			moveHead(x, y)
			eatFood()
			eatSelf()
			moveTail()
		}
	}, 115)
}

function getIntoWall(a) {
	if (a > 95)
		a = 0
	else if (a < 0)
		a = 95
	return a
}

function moveHead(x, y) {
	snake.style.left = `${x}%`
	snake.style.top = `${y}%`
}

function moveTail() {
	headPos.push({'x':x, 'y':y})
	if (headPos.length-1 > tailElmnts.length)
		headPos.splice(0, 1)
	for (let k = 0; k < tailElmnts.length; k++) {
		var xpo = headPos[headPos.length - (k+2)].x
		var ypo = headPos[headPos.length - (k+2)].y
		tailElmnts[k].style.left = `${xpo}%`
		tailElmnts[k].style.top = `${ypo}%`
	}
}

function createFood() {
	xfood = Math.floor(Math.random()*20) * scl
	yfood = Math.floor(Math.random()*20) * scl
	for (let i = 0; i < headPos.length; i++) {
		if(xfood == headPos[i].x && yfood == headPos[i].y) {
			createFood()
			return
		}
	}
	const food = main.appendChild(document.createElement('div'))
	food.classList.add('food')
	food.style.left = `${xfood}%`
	food.style.top = `${yfood}%`
}

function eatFood () {
const f = document.querySelector('.food')
	if (x == xfood && y == yfood) {
		[xfood, yfood] = [null, null]
		f.remove()
		createTail()
		createFood()
		counter++
		score.textContent = counter
	}
}

function createTail() {
	const tail = main.appendChild(document.createElement('div'))
	tail.classList.add('tail')
	tailElmnts.push(tail)
}

function eatSelf() {
	for (let i = 1; i < headPos.length-1; i++) {
		if(x == headPos[i].x && y == headPos[i].y) {
			cntrdiv.textContent = counter
			ngdiv.classList.toggle('newgm')
			scl = 0
			counter = 0
			ngbtn.addEventListener('click', newGame)
		}
	}
}

function newGame() {
	scl = 5
	ngdiv.classList.toggle('newgm');
	ngbtn.removeEventListener('click', newGame);
	[x , y] = [0, 0];
	[xMove, yMove] = [0, 0];
	score.textContent = counter
	moveHead(x, y)
	headPos = []
	for (let i = 0; i < tailElmnts.length; i++)
		tailElmnts[i].remove()
	tailElmnts = []
	direction = null
}

createFood()
setMove()