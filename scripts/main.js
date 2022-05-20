// Faire en sorte qu'on ne peut pas scroller avec les flèches du clavier

window.addEventListener("keydown", function (e) {
	if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
		e.preventDefault();
	}
}, false);

// Animation svg

const logo = document.querySelectorAll("#logo path");

for (let i = 0; i < logo.length; i++) {
	console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
}


changegame = document.getElementById("changegame");
regroupement = document.getElementsByClassName('regroupement');
generalboxtwo = document.getElementsByClassName('generalboxtwo');
let leaderboardContainer = document.getElementById("leaderboard");
let startTime = new Date();

let leaderboard = [];

initLeaderboard();

if (changegame) {
	changegame.addEventListener("click", Changegameprint);
}

function Changegameprint() {
	generalboxtwo[0].classList.toggle("none");
	regroupement[0].classList.toggle("none");
}

if (leaderboardContainer) {
	displayLeaderboard();
}



// ░██████╗░░█████╗░███╗░░░███╗███████╗  ░░███╗░░
// ██╔════╝░██╔══██╗████╗░████║██╔════╝  ░████║░░
// ██║░░██╗░███████║██╔████╔██║█████╗░░  ██╔██║░░
// ██║░░╚██╗██╔══██║██║╚██╔╝██║██╔══╝░░  ╚═╝██║░░
// ╚██████╔╝██║░░██║██║░╚═╝░██║███████╗  ███████╗
// ░╚═════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝  ╚══════╝

/* ------------------------------------------ Création d'un texte random ------------------------------------------ */
var strng = "Along with the standard computer warranty agreement which said that if the machine 1) didn't work, 2) didn't do what the expensive advertisement said, 3) electrocuted the immediate neighbourhood, 4) and in fact failed entirely to be inside the expensive box when you opened it, this was expressly, absolutely, implicitly and in no event the fault or responsibility of the manufacturer, that the purchaser should consider himself lucky to be allowed to give his money to the manufacturer, and that any attempt to treat what had just been paid for as the purchaser's own property would result in the attentions of serious men with menacing briefcases and very thin watches.";

var parseCorpus = function (strng) {
	var res = strng.split(/[^\w']+/);
	return res;
};
var markovChain = function (strng) {
	var obj1 = {};
	var arr = [];
	var parse = parseCorpus(strng);
	for (i = 0; i < parse.length; i++) {
		if (obj1.hasOwnProperty(parse[i])) {
			arr = obj1[parse[i]];
		} else {
			arr = [];
		}
		if (parse[i + 1] !== undefined) {
			arr.push(parse[i + 1]);
		}
		obj1[parse[i]] = arr;
	}

	return obj1;
};
var randomWord = function (obj1) {
	var keys = Object.keys(obj1);
	var arr = obj1[keys[keys.length * Math.random() << 0]];

	if (arr[0] === undefined || arr[0] === '' || arr[0] === ' ') {
		return randomWord(obj1);
	}
	return arr[0];
};

var writeLine = function (n) {
	var chain = markovChain(strng);
	var retStrng = "";
	for (i = 0; i < n; i++) {
		var word = randomWord(chain);
		retStrng += word + " ";

	}
	return retStrng;

};
writeLine(5);

/* ------------------------------------------ Création d'un timer lorsqu'on commence à écrire dnas le input #usertext ------------------------------------------ */
let chrono = document.getElementById("chrono");
let resetBtn = document.getElementById("reset");
let stopBtn = document.getElementById("stop");
let startBtn = document.getElementById("start");

let millisecondes = 0;
let secondes = 0;
let minutes = 0;
let record = 0;

let estArrete = true;
let timeout;

const demarrer = () => {
	if (estArrete) {
		estArrete = false;
		startTime = new Date();
		defilerTemps();
	}
};

const arreter = () => {
	if (!estArrete) {
		estArrete = true;
		startTime = new Date();
		clearTimeout(timeout);
	}
};

const defilerTemps = () => {
	if (estArrete) return;

	const ms = Date.now() - startTime.getTime()
	const res = getDuration(ms);

	/* 	secondes = parseInt(secondes);
		minutes = parseInt(minutes);
		millisecondes = parseInt(millisecondes);
		millisecondes += 4;

		if (millisecondes == 1000) {
			secondes++;
			millisecondes = 0;
		}

		if (secondes == 60) {
			minutes++;
			secondes = 0;
		}

		//   affichage
		if (millisecondes < 10) {
			millisecondes = "0" + millisecondes;
		}

		if (millisecondes < 100) {
			millisecondes = "0" + millisecondes;
		}

		if (minutes < 10) {
			minutes = "0" + minutes;
		}

		if (secondes < 10) {
			secondes = "0" + secondes;
		} */

	/* chrono.textContent = `${minutes}:${secondes}:${millisecondes}`; */
	chrono.textContent = res;
	timeout = setTimeout(defilerTemps, 1);
};

const reset = () => {
	chrono.textContent = "00:00:00";
	estArrete = true;
	millisecondes = 0;
	secondes = 0;
	minutes = 0;
	clearTimeout(timeout);
};


var usertext = document.querySelector("[name=usertext]");

if (usertext.value.length >= 0 && usertext.keyCode !== 9) {
	usertext.addEventListener("keyup", demarrer);
}

/* ------------------------------------------ Lancer l'action de génerer un texte avec génére ou entrer de l'input, idem pour I finished et son input ------------------------------------------ */

const finished = document.getElementById("finished");
finished.addEventListener("click", getValueUserText);

usertext.addEventListener("keypress", (event) => {
	if (event.keyCode === 13) {
		getValueUserText();
	}
});

const number = document.getElementById("number");

number.addEventListener("keypress", (event) => {
	if (event.keyCode === 13) {
		document.getElementById('text').innerHTML = writeLine(document.getElementById('number').value)
	}
});

/* ------------------------------------------ Comparer ce que l'utilisateur écrit avec le texte généré ------------------------------------------ */

const generate = document.getElementById("generate");
let message = document.querySelector(".message");
var textgenere = document.getElementById("text");

function getValueUserText() {


	if (textgenere.innerText !== "") {
		let textgenereValue = textgenere.innerText;
		// Sélectionner l'élément input et récupérer sa valeur
		var SaisieUserText = usertext.value;

		// Afficher la valeur
		if (SaisieUserText == textgenereValue) {
			const ms = Date.now() - startTime.getTime()
			message.textContent = "Congratulations, your score is " + getDuration(ms);
			ChronoValue = chrono.innerText;
			console.log(ChronoValue);

			updateLeaderboard(ms);

			if (ChronoValue < record) {
				ChronoValue = record;
				message.textContent = "New record : " + record;
			}

			millisecondes = 0;
			secondes = 0;
			minutes = 0;
			clearTimeout(timeout);
			clearInterval();
			chrono.textContent = "00:00:00";
			usertext.value = "";
			textgenere.innerText = "";
		} else {
			message.textContent = "The text entered is different";
		}
	} else {
		message.textContent = "please first generate a text";
	}
}

function displayLeaderboard() {

	// Trier
	const sorted = leaderboard.sort((a, b) => a - b);

	// Afficher
	for (const score of sorted) {
		leaderboardContainer.insertAdjacentHTML(
			'beforeend',
			`<li>${getDuration(score)}</li>`
		);
	}
}

const generatetext = () => {
	document.getElementById('text').innerHTML = writeLine(document.getElementById('number').value);
	let estArrete = true;
	usertext.value = "";
	message.textContent = "";
	reset();
}

generate.addEventListener("click", generatetext);

function getDuration(ms) {
	const h = Math.floor(ms / 3600000)
	const m = Math.floor((ms / 3600000 - h) * 60)
	const s = Math.floor((((ms / 3600000 - h) * 60) - m) * 60)
	const milliseconds = Math.floor((ms % 1000))

	const res = (m < 10 ? '0' + m : m) + (m < 1 ? ':' : ':') + (s < 10 ? '0' + s : s) + ':' + (milliseconds < 100 ? '0' + milliseconds : +'0' + milliseconds);
	return res
}

function updateLeaderboard(value) {
	leaderboard.push(value);
	displayLeaderboard();
	localStorage.setItem('leaderboard', JSON.stringify({
		leaderboard
	}));
}

function initLeaderboard() {
	const localLeaderboard = localStorage.getItem('leaderboard');
	if (localLeaderboard) {
		const {
			leaderboard: result
		} = JSON.parse(localLeaderboard);
		leaderboard = result;
		displayLeaderboard();
	}
}

/* ------------------------------------------ Comparer lettre par lettre ------------------------------------------ */

usertext.addEventListener("input", function (event) {
	let self = this;
	console.log(self)
	var targetValue = event.target.value;

	var targetValueSplit = targetValue.split("");

	var lengthTextGenerate = document.getElementById('text').innerHTML.split("");

	for (let i = 0; i < targetValueSplit.length; i++) {

			if (targetValueSplit[i] === lengthTextGenerate[i]) {
				self.style.color = "green";
				
			} else {
				self.style.color = "red";
			}

		}
});


// ░██████╗░░█████╗░███╗░░░███╗███████╗  ██████╗░
// ██╔════╝░██╔══██╗████╗░████║██╔════╝  ╚════██╗
// ██║░░██╗░███████║██╔████╔██║█████╗░░  ░░███╔═╝
// ██║░░╚██╗██╔══██║██║╚██╔╝██║██╔══╝░░  ██╔══╝░░
// ╚██████╔╝██║░░██║██║░╚═╝░██║███████╗  ███████╗
// ░╚═════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝  ╚══════╝

const GAME_SIZE = 600;
const SQUARE_SIZE = 20;
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const snake = new Snake(SQUARE_SIZE);
const food = new Food();
let CurrentDirection = 'right';

function deteckKeyPressed() {
	document.addEventListener('keydown', function (event) {
		switch (event.key) {
			case 'ArrowLeft':
				CurrentDirection = 'left';
				break;
			case 'ArrowRight':
				CurrentDirection = 'right';
				break;
			case 'ArrowUp':
				CurrentDirection = 'up';
				break;
			case 'ArrowDown':
				CurrentDirection = 'down';
				break;
			default:
				break;
		}
	});
}

function clearScreen() {
	ctx.clearRect(0, 0, GAME_SIZE, GAME_SIZE);
}

function update() {

	clearScreen();
	food.draw();
	snake.update();


	if (snake.alive) {
		setTimeout(update, 100);
	}
}

function start() {
	deteckKeyPressed();
	update();
}

if (deteckKeyPressed) {
	start();
}

var scoresnake = document.getElementById('scoresnake');
scoresnake.innerHTML = "Score : " + snake.blocks.length;


