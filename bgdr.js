const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 1024;

class Player {
  constructor({ position, velocity, keys, turnBack }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 500;
    this.width = 80;
    this.gravity = 6.81;
    this.keys = keys;
    this.arm = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 0,
      height: 80,
    };
    this.turnBack = turnBack;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillRect(this.arm.position.x, this.arm.position.y, this.arm.width, this.arm.height);
    this.arm.position.x = this.position.x + this.turnBack.x;
    this.arm.position.y = this.position.y;
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
        this.velocity.x = -20;
        break;
      case this.keys[1]:
        this.velocity.y = -70;
        break;
      case this.keys[3]:
        this.height = 222;
        break;
      case this.keys[2]:
        this.velocity.x = 20;
        break;
      default:
        break;
    }
  }

  stop(key) {
    switch (key) {
      case this.keys[3]:
        this.position.y -= 500;
        this.height = 500;

        break;
      case this.keys[0]:
      case this.keys[2]:
        this.velocity.x = 0;
        break;
      case this.keys[1]:
        this.velocity.y = 60;
        this.position.y -= 60;
    }
  }

  attack(key) {
    switch (key) {
      case this.keys[4]:
        this.arm.width = 250;
        break;
    }
  }

  cover(key) {
    switch (key) {
      case this.keys[4]:
        this.arm.width = 0;
        break;
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
  keys: ["q", "z", "d", "s", "r"],
  turnBack: {
    x: 0,
    y: 0,
  },
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
  keys: ["j", "i", "l", "k", "p"],
  turnBack: {
    x: -250,
    y: 0,
  },
});

const insideTimer = document.getElementById("timer");

function timer() {
  let i = 120;

  setInterval(() => {
    insideTimer.textContent = `${i}`;
    if (i > 0) {
      i--;
    } else {
      endGame();
    }
  }, 1000);
}

function initiateGame() {
  window.requestAnimationFrame(initiateGame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player1.move();
  player2.move();

  // player1 punch
  if (
    player1.position.x + player1.arm.width >= player2.position.x &&
    player1.position.x + player1.width <= player2.position.x &&
    player1.position.x + player1.width <= player2.position.x &&
    player1.position.y + player1.arm.height >= player2.position.y
  ) {
    console.log("aïe");
    player1.arm.width = 0;
  }
}

function endGame() {
  // const endMessage = document.querySelector(".endMessage");
  // if (insideTimer.textContent === "0") {
  //   endMessage.classList.remove("invisible");
  // } else {
  //   endMessage.classList.add("invisible");
  //   console.log("letsgo");
  // }
}

//initiate game and timer
initiateGame();
timer();

// all the event listener
window.addEventListener("keydown", (event) => {
  player1.setSpeed(event.key);
  player2.setSpeed(event.key);
});

window.addEventListener("keyup", (event) => {
  player1.stop(event.key);
  player2.stop(event.key);
});

window.addEventListener("keydown", (event) => {
  setTimeout(() => {
    player1.attack(event.key);
    player2.attack(event.key);
  }, "100");
});

window.addEventListener("keyup", (event) => {
  setTimeout(() => {
    player1.cover(event.key);
    player2.cover(event.key);
  }, "200");
});
