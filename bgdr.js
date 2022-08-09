const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 180;
    this.gravity = 9.81;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, 50, this.height);
  }
  drop() {
    this.draw();
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += this.gravity;
    }
  }
}

const player1 = new Player({
  position: {
    x: 110,
    y: 200,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const player2 = new Player({
  position: {
    x: 1310,
    y: 200,
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

gameStart();
