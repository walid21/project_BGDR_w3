const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 500;
    this.gravity = 9.81;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, 50, this.height);
  }
  drop() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 100) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += this.gravity;
    }
  }
  move() {
    window.addEventListener("keydown", (keys) => {
      console.log(keys.key);
      switch (keys.key) {
        case "q":
          this.velocity.x = -20;
          break;
        case "z":
          this.velocity.y = -70;
          break;
        case "s":
          this.height = 222;
          break;
        case "d":
          this.velocity.x = 20;
          break;
        default:
          this.position.x += 0;
          this.position.y += 0;
          this.velocity.x += 0;
          this.velocity.y += 0;
      }
    });
    window.addEventListener("keyup", (keys) => {
      switch (keys.key) {
        case "s":
          this.position.y -= 500;
          this.height = 500;

          break;
        case "q":
        case "d":
          this.velocity.x = 0;
          break;
        case "z":
          this.velocity.y = 60;
          this.position.y -= 60;
      }
    });
  }
  move2() {
    window.addEventListener("keydown", (keys) => {
      console.log(keys.key);
      switch (keys.key) {
        case "j":
          this.velocity.x = -20;
          break;
        case "i":
          this.velocity.y = -60;
          break;
        case "k":
          this.height = 222;
          break;
        case "l":
          this.velocity.x = 20;
          break;
        default:
          this.position.x += 0;
          this.position.y += 0;
          this.velocity.x += 0;
          this.velocity.y += 0;
      }
    });
    window.addEventListener("keyup", (keys) => {
      switch (keys.key) {
        case "k":
          this.position.y -= 500;
          this.height = 500;

          break;
        case "j":
        case "l":
          this.velocity.x = 0;
          break;
        case "i":
          this.velocity.y = 60;
          this.position.y -= 60;
      }
    });
  }
}

const player1 = new Player({
  position: {
    x: 400,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const player2 = new Player({
  position: {
    x: 1450,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

function gameStart() {
  window.requestAnimationFrame(gameStart);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player1.drop();
  player2.drop();
}
player1.move();
player2.move2();
gameStart();
