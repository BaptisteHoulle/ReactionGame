let randomNumber = Math.floor(Math.random() * 10) + 1;
let essais = 3;
let prompt = parseInt(window.prompt("Entrez un nombre entre 0 et 10"));

while (prompt != randomNumber && essais > 0) {
essais--;
    if (prompt < randomNumber) {
        console.log("Le chifffre à trouver est plus grand");
    }

    if (prompt > randomNumber) {
        console.log("Le chifffre à trouver est plus petit");
    }

    if (essais >  0) {
        prompt = window.prompt("Re-essayer");

    }
}

if (prompt == randomNumber) {
    console.log("Bravo, vous avez gagné");
} 

else {
    console.log("Perdu !");
}