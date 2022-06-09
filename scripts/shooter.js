const options = {
  game: {
    container: "canvasShooter",
    width: innerWidth,
    height: innerHeight,
    fps: 60,
    text: {
      score: "Score",
      points: "POINTS",
      startbtn: "Start Game",
    },
  },
  player: {
    size: 20,
    color: "white",
  },
  projectiles: {
    size: 5,
    color: "white",
    speed: 6,
  },
  enemies: {
    interval: 1000,
    size: [5, 20],
    decrease: 10,
    speed: 1,
    hitPoints: 100,
    diePoints: 250,
  },
};

class Player {
  constructor(x, y, radius, color, score = 0) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.score = score;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
  }
}

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
    this.friction = 0.99;
  }

  update() {
    this.draw();
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }
}



const gameContainer = document.getElementById(options.game.container);
gameContainer.classList.add("canvasshooter_container");
const canvas = document.createElement("canvas");
gameContainer.append(canvas);
const c = canvas.getContext("2d");
canvas.width = options.game.width;
canvas.height = options.game.height;
canvas.style.position = "relative";
let player = new Player(canvas.width / 2, canvas.height / 2, 20, "white");
let loopId, projectiles, enemies, particles, scoreBoardScore, ui, uiScore;
let score = 0;

createUI();

// ---------------------------------

function init() {
  ui.style.display = "none";
  scoreBoardScore.innerHTML = 0;
  uiScore.innerHTML = 0;
  score = 0;
  projectiles = [];
  enemies = [];
  particles = [];
  canvas.addEventListener("click", shoot);
  drawCanvas();
  player.draw();
  spawnEnemies();
  gameLoop();
}

function gameLoop() {
  loopId = setInterval(() => {
    drawCanvas();
    player.draw();
    projectiles.forEach((projectile, projectile_index) => {
      projectile.update();
      if (checkOffScreen(projectile)) {
        projectiles.splice(projectile_index, 1);
      }
    });
    enemies.forEach((enemy, enemy_index) => {
      enemy.update();
      projectiles.forEach((projectile, projectile_index) => {
        if (checkCollision(projectile, enemy)) {
          increaseScore(options.enemies.hitPoints);
          createParticles(enemy);
          removeFromArray(projectiles, projectile_index);
          gsap.to(enemy, { radius: enemy.radius - options.enemies.decrease });
          if (
            enemy.radius - options.enemies.decrease <=
            options.enemies.size[0]
          ) {
            removeFromArray(enemies, enemy_index);
            increaseScore(options.enemies.diePoints);
          }
        }
      });
      if (checkCollision(player, enemy)) {
        clearInterval(loopId);
        clearInterval(enemiesLoop);
        ui.style.display = "flex";
      }
    });
    particles.forEach((particle, particle_index) => {
      if (particle.alpha <= 0) {
        removeFromArray(particles, particle_index);
      } else {
        particle.update();
      }
    });
  }, 1000 / options.game.fps);
}

// ------------------------------------------------

function drawCanvas() {
  c.fillStyle = "rgba(0,0,0, 0.25)";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function shoot(e) {
  const velocity = getVelocityBetweenPoints(
    player.x,
    player.y,
    e.clientX,
    e.clientY,
    options.projectiles.speed
  );
  projectiles.push(
    new Projectile(
      player.x,
      player.y,
      options.projectiles.size,
      "white",
      velocity
    )
  );
}

function spawnEnemies() {
  enemiesLoop = setInterval(() => {
    const radius =
      Math.random() * (options.enemies.size[1] - options.enemies.size[0]) +
      options.enemies.size[0];
    let x, y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    const color = `hsl(${Math.random() * 360},50%,50%`;
    const velocity = getVelocityBetweenPoints(
      x,
      y,
      player.x,
      player.y,
      options.enemies.speed
    );
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, options.enemies.interval);
}

function getVelocityBetweenPoints(startX, startY, targetX, targetY, speed = 1) {
  const angle = Math.atan2(targetY - startY, targetX - startX);
  return { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
}

function checkCollision(obj1, obj2) {
  const dist = Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y);
  return dist - obj1.radius - obj2.radius < 1;
}

function checkOffScreen(obj) {
  return (
    obj.x + obj.radius < 0 ||
    obj.x - obj.radius > canvas.width ||
    obj.y + obj.radius < 0 ||
    obj.y - obj.radius > canvas.height
  );
}

function removeFromArray(array, index) {
  setTimeout(() => {
    array.splice(index, 1);
  }, 0);
}

function createParticles(enemy) {
  for (let i = 0; i < enemy.radius * 2; i++) {
    particles.push(
      new Particle(enemy.x, enemy.y, Math.random() * 2, enemy.color, {
        x: (Math.random() - 0.5) * (Math.random() * 6),
        y: (Math.random() - 0.5) * (Math.random() * 6),
      })
    );
  }
}
function increaseScore(points) {
  score += points;
  scoreBoardScore.innerHTML = score.toLocaleString("en");
  uiScore.innerHTML = score.toLocaleString("en");
}

function createUI() {
  gameContainer.style.position = "relative";

  // scoreboard container
  let scoreBoard = document.createElement("div");
  scoreBoard.id = "canvasshooter_scoreboard_container";
  // scoreboard text
  let scoreBoardText = document.createElement("span");
  scoreBoardText.id = "canvasshooter_scoreboard_text";
  scoreBoardText.innerHTML = `${options.game.text.score}: `;
  // scoreboard points
  scoreBoardScore = document.createElement("span");
  scoreBoardScore.id = "canvasshooter_scoreboard_score";
  scoreBoardScore.innerHTML = score;

  scoreBoard.append(scoreBoardText, scoreBoardScore);

  // ui container
  ui = document.createElement("div");
  ui.id = "canvasshooter_ui_container";
  // points
  uiScore = document.createElement("div");
  uiScore.id = "canvasshooter_ui_score";
  uiScore.innerHTML = score;
  // text
  let uiText = document.createElement("p");
  uiText.id = "canvasshooter_ui_text";
  uiText.innerHTML = options.game.text.points;
  //button
  let uiBtn = document.createElement("div");
  uiBtn.id = "canvasshooter_ui_btn";
  uiBtn.innerHTML = options.game.text.startbtn;
  uiBtn.addEventListener("click", init);

  ui.append(uiScore, uiText, uiBtn);

  gameContainer.append(scoreBoard, ui);
}
