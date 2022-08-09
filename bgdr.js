const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 1024;

class Player {
  constructor({ position, velocity, keys }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 500;
    this.width = 80;
    this.gravity = 9.81;
    this.keys = keys;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  move() {
    if (this.position.x + this.velocity.x < 0) {
      this.position.x = 0;
      this.velocity.x = 0;
    } else if (this.position.x + this.velocity.x + this.width >= canvas.width) {
      this.position.x = canvas.width - this.width;
      this.velocity.x = 0;
    } else {
      this.position.x += this.velocity.x;
    }

    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 100) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += this.gravity;
    }
    this.draw();
  }

  setSpeed(key) {
    switch (key) {
      case this.keys[0]:
      case this.keys[4]:
        this.velocity.x = -20;
        break;
      case this.keys[1]:
      case this.keys[5]:
        this.velocity.y = -70;
        break;
      case this.keys[3]:
      case this.keys[7]:
        this.height = 222;
        break;
      case this.keys[2]:
      case this.keys[6]:
        this.velocity.x = 20;
        break;
      default:
        break;
    }
  }

  stop(key) {
    switch (key) {
      case this.keys[3]:
      case this.keys[7]:
        this.position.y -= 500;
        this.height = 500;

        break;
      case this.keys[0]:
      case this.keys[2]:
      case this.keys[4]:
      case this.keys[6]:
        this.velocity.x = 0;
        break;
      case this.keys[1]:
      case this.keys[5]:
        this.velocity.y = 60;
        this.position.y -= 60;
    }
  }
}

const player1 = new Player({
  position: {
    x: 320,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  keys: ["q", "z", "d", "s"],
});

const player2 = new Player({
  position: {
    x: 960,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  keys: ["j", "i", "l", "k"],
});

function startGame() {
  window.requestAnimationFrame(startGame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player1.move();
  player2.move();
}

startGame();
timer();
const insideTimer = document.getElementById("timer");

function timer() {
  let i = 3;

  setInterval(() => {
    insideTimer.textContent = `${i}`;
    if (i > 0) {
      i--;
    } else {
      endGame();
    }
  }, 1000);
}

function endGame() {
  const endMessage = document.querySelector(".endMessage");

  if (insideTimer.textContent === "0") {
    endMessage.classList.remove("invisible");
  } else {
    endMessage.classList.add("invisible");
    console.log("letsgo");
  }
}

window.addEventListener("keydown", (event) => {
  player1.setSpeed(event.key);
  player2.setSpeed(event.key);
});

window.addEventListener("keyup", (event) => {
  player1.stop(event.key);
  player2.stop(event.key);
});
