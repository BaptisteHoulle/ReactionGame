var start = new Date().getTime();

var item = document.getElementById("shape");

function randomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function newShape() {
    var top = Math.random() * 400;
    var left = Math.random() * 1000;
    var width = (Math.random() * 100) + 50;
    if (Math.random() > 0.5) {
        item.style.borderRadius = "50%";
    } 
    
    else {
        item.style.borderRadius = "0%";
    }

    item.style.backgroundColor = randomColor();
    item.style.left = left + "px";
    item.style.top = top + "px";
    item.style.width = width + "px";
    item.style.height = width + "px";
    item.style.display = "block";
    start = new Date().getTime();
}

function appearDelay() {
    setTimeout(newShape, Math.random() * 2500);
}

appearDelay();

item.onclick = function () {
    item.style.display = "none";
    var end = new Date().getTime();
    var time = (end - start) / 1000;
    document.getElementById("time").innerHTML = time + "s";
    appearDelay();
}