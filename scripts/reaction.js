const play = document.getElementById("play");
const container = document.getElementById("container");
const game = document.getElementById("game");
const greendiv = document.getElementById("greendiv");
const gameOver = document.getElementById("gameOver");
const playAgain = document.getElementById("playAgain");
const score = document.querySelector(".score");
var clickRed = false;
var elapsedTime;
var interval;

play.addEventListener("click", misEnPlaceJeu);

function lancerTimer(){

    var startTime = Date.now();
    
    interval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        container.innerHTML = (elapsedTime / 1000).toFixed(3);
    }, 1);
}

greendiv.addEventListener("click", function() {
    clearInterval(interval);
    score.innerHTML = 'Bravo, vous avez un temps de réaction de ' + (elapsedTime / 1000).toFixed(3) + 's';
});

function startGame() {
    if(clickRed === false){
        greendiv.classList.remove("none");
        game.classList.add("none");
        lancerTimer();
    } else {
        gameOver.classList.remove("none");
        playAgain.classList.remove("none");

        playAgain.addEventListener("click", function() { 
            location.reload();
        } );
    }
    
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

game.addEventListener("click", function() {
    clearTimeout
    clickRed = true;
});


function misEnPlaceJeu() {
    container.classList.toggle("none");
    game.classList.toggle("none");
    setTimeout(startGame, randomNumber(1500, 3000));
}