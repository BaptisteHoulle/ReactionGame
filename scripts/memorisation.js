function monGestionnaire(id, ereignis, funktion) {
    if (window.addEventListener)
        document.getElementById(id).addEventListener(ereignis, funktion, false);
    else if (window.attachEvent)
        document.getElementById(id).attachEvent("on" + ereignis, funktion);
}

var text, compteur = 1,
    longueur = 3,
    timeout = 1000;

const rules = document.getElementById('rules');
const container = document.getElementById('container');
var input = document.getElementById('input');
var button = document.getElementById('button');
var ausgabe = document.getElementById('numberstext');
var input_correction = document.getElementById('input_correction');
var text_correction = document.getElementById('text_correction');
const barre = document.getElementById('barre');
var launchGame = document.getElementById('launchGame');
var barreFond = document.getElementById('barreFond');
const rejouer = document.getElementById('rejouer');


input.addEventListener('input', function (event) {
    if (isNaN(event.target.value)) {
        event.target.value = "";
    }
});

function newNumbers() {
    input.value = "";
    if (compteur > 1) {
        longueur++;
        compteur = 1;
        timeout += 750;
    }

    text = "";
    for (var i = 0; i < longueur; i++) {
        text += Math.floor(Math.random() * 10);
    }


    ausgabe.innerHTML = text;
    setTimeout(function () {
        ausgabe.innerHTML = "";
        input.classList.remove('none');
        input.focus();
        button.classList.remove('none');

    }, timeout);

    rules.classList.add('none');
    barre.classList.remove('play');
    barre.style.animationDuration = timeout / 1000 + "s";
    setTimeout(function () {
        barre.classList.add('play');
    }, 5);


    compteur++;
};

console.log(launchGame);

launchGame.addEventListener('click', (event) => {

    console.log('oui');

    numberstext = [];
    input_numberstext = [];
    text_correction.innerHTML = "";
    compteur = 1;
    timeout = 750;
    longueur = 3;

    container.classList.remove('none');
    barreFond.classList.remove('none');
    launchGame.classList.add('none');
    rejouer.classList.add('none');


    newNumbers();

    button.addEventListener('click', validate);
    window.onkeypress = function (e) {
        if (e.keyCode === 13)
            validate();
    };
});

rejouer.addEventListener('click', (event) => {

    console.log('oui');

    numberstext = [];
    input_numberstext = [];
    text_correction.innerHTML = "";
    compteur = 1;
    timeout = 750;
    longueur = 3;

    container.classList.remove('none');
    barreFond.classList.remove('none');
    launchGame.classList.add('none');
    rejouer.classList.add('none');

    newNumbers();

    button.addEventListener('click', validate);
    window.onkeypress = function (e) {
        if (e.keyCode === 13)
            validate();
    };
});

function validate() {
    if (input.value == text) {
        newNumbers();
        input.classList.add('none');
        button.classList.add('none');
    } else {

        if (longueur <= 3) {
            ausgabe.innerHTML = 'Tu as même pas réussi à mémoriser' + ' ' + longueur + ' ' + 'chiffres, c\'est pas terrible !';
        } else if (longueur > 3 && longueur <= 5) {
            ausgabe.innerHTML = 'Tu as mémorisé' + ' ' + (longueur - 1) + ' ' + 'chiffres, c\'est pas beaucoup !';
        } else if (longueur >= 6 && longueur <= 7) {
            ausgabe.innerHTML = 'Tu as mémorisé' + ' ' + (longueur - 1) + ' ' + 'chiffres, c\'est pas trop mal !';
        } else if (longueur >= 8 && longueur <= 10) {
            ausgabe.innerHTML = 'Tu as mémorisé' + ' ' + (longueur - 1) + ' ' + 'chiffres, c\'est bien !';
        } else if (longueur >= 11 && longueur <= 13) {
            ausgabe.innerHTML = 'Tu as mémorisé' + ' ' + (longueur - 1) + ' ' + 'chiffres, c\'est très bien !';
        } else if (longueur >= 14) {
            ausgabe.innerHTML = 'Tu as mémorisé' + ' ' + (longueur - 1) + ' ' + 'chiffres, c\'est bon t\'es trop fort, félicitations, mais j\'espère que tu n\'as pas triché !';
        }


        input.classList.add('none');
        button.classList.add('none');
        launchGame.classList.remove('none');
        rejouer.classList.remove('none');

        for (var i = 0; i < text.length; i++) {

            var numberstext = [];
            var input_numberstext = [];

            numberstext[i] = text[i];
            input_numberstext[i] = input.value[i];

            numberstext.splice(i, 0, "<p>" + text[i] + "</p>");
            input_numberstext.splice(i, 0, "<p>" + input.value[i] + "</p>");

            if (input.value[i] == text[i]) {
                numberstext.splice(i, 1, "<strong>" + text[i] + "</strong>")
                input_numberstext.splice(i, 1, "<strong>" + input.value[i] + "</strong>");
            }

            text_correction.innerHTML += numberstext[i];
        }

    }

};